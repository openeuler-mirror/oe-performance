/**
 * 基于submit_id维度的数据处理
 */
import { reactive } from 'vue'
import { flattenObj } from '@/utils/utils'

import { testParamsMap, kpiListMap, tableMode, tableColumnMap } from '@/views/performance-baseline/config_li.js'

export const combineJobs = (jobList) => {
  const tempList = jobList.map(job => job._source)
    .map(job => prePrecessJob(job))
  const ppGroup = groupDataByTestparam(tempList)
  // 一个submit下的公共参数都相同，因此简单取第一个job作为初始数据。
  // 后续可以只保留公共数据
  const tempSubmit = reactive(tempList[0])
  // 配置submit对象的属性
  tempSubmit['jobStateData'] = getjobStateData(tempList)
  tempSubmit['jobList'] = tempList

  tempSubmit['groupData'] = ppGroup
  // 计算性能数据
  tempSubmit['tableDatas'] = mapGroupDataToTableData(ppGroup, tempSubmit.suite)
  tempSubmit['performanceVal'] = computeTotalPerformanceValue(tempSubmit['tableDatas'])
  return tempSubmit
}

// 每个job数据扁平、预处理
const prePrecessJob = (job) => {
  const tempObj = reactive(flattenObj(job))
  tempObj['submit_time'] = new Date(tempObj['submit_time']).toLocaleString()
  // 组合参数
  tempObj['os_release'] = `${tempObj['os']}@${tempObj['os_version']}`
  // 将pp中的值转换成testcase字段，test_params(p1)
  tempObj['li-testcase'] = getTestParamsName(tempObj)
  // tempObj['li-testcase'] = `pp.stream.nr_threads=${tempObj['pp.stream.nr_threads']}`
  return tempObj
}

// 根据配置文件拼接test_params(p1)， 这样没有一个job可以对应一个pp组合值
const getTestParamsName = (job) => {
  let keyStringArr = []
  const mapList = testParamsMap[job.suite] || []
  mapList.forEach(key => {
    job[key] && keyStringArr.push(`${key}=${job[key]}`)
  })
  return keyStringArr.join(',')
}

/**
 * 根据testPram分组数据
 * 数据格式：
 * {
 *  pp1: {
 *       kpi1: [val1、val2...],
 *       kpi2: [val1、val2、val3...]
 *     },
 *  pp2: {
 *       kpi1: [],
 *       kpi2: [val1]
 *     }
 * }
 * 每个pp将对应表格中的每一行，每个kpi对应表格中的每一列。
 */
const groupDataByTestparam = (dataList) => {
  const resultObj = {}
  dataList.forEach(job => {
    if (!kpiListMap[job.suite]) {
      return
    }
    const testParamName = job['li-testcase']
    if (resultObj[testParamName]) {
      kpiListMap[job.suite].forEach(kpi => {
        resultObj[testParamName][kpi].push(job[`stats.${kpi}`])
      })
    } else {
      resultObj[testParamName] = {}
      kpiListMap[job.suite].forEach(kpi => {
        // 没有stats值的话会存一个空数组
        resultObj[testParamName][kpi] = [job[`stats.${kpi}`]]
      })
    }
  })
  return resultObj
}

// 统计一个submit下job的状态信息，目前是给任务列表用
const getjobStateData = (jobList) => {
  const stateData = {}
  jobList.forEach(job => {
    switch(job.job_state) {
    case 'finished':
    case 'failed':
      if (!stateData[job.job_state]) stateData[job.job_state] = 0
      stateData[job.job_state] += 1
      break
    default:
      if (!stateData['others']) stateData['others'] = 0
      stateData['others'] += 1
    }
  })
  let count = 0
  Object.keys(stateData).forEach(state => {
    count += stateData[state]
  })
  stateData['all'] = count
  return stateData
}

const mapGroupDataToTableData = (ppGroup, suite) => {
  const tableDatas = {}
  if (!tableColumnMap[suite]) {
    return {}
  }
  switch (tableMode[suite]) {
  case 'unixbench':
    // 表格分成两组数据，一组展示pp参数=单核，一组展示pp参数=多核
    gruopDataForUnixbench(ppGroup, tableDatas, suite)
    break
  case 'netperf':
    // netperf不适用kpi做列，而是使用pp参数send_size或者test作为列名。需要转换数据维度
    groupDataForNetperf(ppGroup, tableDatas, suite)
    break
  case 'speccpu2006':
    groupDataForSpeccpu2006(ppGroup, tableDatas, suite)
    break
  case 'speccpu2017':
    // 2017和2006几乎一样，就是数据归类到对应表格的逻辑有点小区别
    groupDataForSpeccpu2017(ppGroup, tableDatas, suite)
    break
  default:
    // stream、lmbench
    // 这个类型下kpi分布部在不同的表上，不需要对pp数据作区分
    groupDataForDefault(ppGroup, tableDatas, suite)
    break
  }
  return tableDatas
}

const gruopDataForUnixbench = (ppGroup, tableDatas, suite) => {
  Object.keys(ppGroup).forEach(ppKey => {
    const ppObj = {}
    Object.keys(ppGroup[ppKey]).forEach(kpi => {
      ppObj[kpi] = computeMean(ppGroup[ppKey][kpi])
    })
    ppObj['li-testcase'] = ppKey
    // todo: 需要适配下多pp参数的情况
    if (ppKey.split('=')[1] === '1') {
      computePerformanceValue(ppObj, tableColumnMap[suite].find(table => table.tableName === 'single'))
      tableDatas['single'] = [ppObj]
    } else {
      computePerformanceValue(ppObj, tableColumnMap[suite].find(table => table.tableName === 'multiple'))
      if (tableDatas['multiple']) {
        tableDatas['multiple'].push(ppobj)
      } else {
        tableDatas['multiple'] = [ppObj]
      }
    }
  })
}

const groupDataForNetperf = (ppGroup, tableDatas, suite) => {
  // pp参数需要合并，因此每个表就一个pp对象
  const ppObjTCPStream = { 'li-testcase': 'Throughput_Mbps' }
  const ppObjDUPStream = { 'li-testcase': 'Throughput_Mbps' }
  const ppObjProtoclKind = { 'li-testcase': 'Throughput_tps' }
  Object.keys(ppGroup).forEach(ppKey => {
    const ppObj = {}
    Object.keys(ppGroup[ppKey]).forEach(kpi => {
      ppObj[kpi] = computeMean(ppGroup[ppKey][kpi])
    })
    const testKey = getPpParamAndValue(ppKey, 'pp.netperf.test')
    if (!testKey) return
    switch (testKey.split('=')[1]) {
    case 'TCP_STREAM':
      const propKeyTCP = getPpParamAndValue(ppKey, 'pp.netperf.send_size')
      ppObjTCPStream[propKeyTCP] = ppObj['netperf.Throughput_Mbps']
      break
    case 'UDP_STREAM':
      const propKeyUDP = getPpParamAndValue(ppKey, 'pp.netperf.send_size')
      ppObjDUPStream[propKeyUDP] = ppObj['netperf.Throughput_Mbps']
      break
    case 'TCP_RR':
    case 'UDP_RR':
    case 'TCP_CRR':
      ppObjProtoclKind[testKey] = ppObj['netperf.Throughput_tps']
      break
    }
  })
  computePerformanceValue(ppObjTCPStream, tableColumnMap[suite].find(table => table.tableName === 'TCP_STREAM'))
  computePerformanceValue(ppObjDUPStream, tableColumnMap[suite].find(table => table.tableName === 'UDP_STREAM'))
  computePerformanceValue(ppObjProtoclKind, tableColumnMap[suite].find(table => table.tableName === 'Protocol_kind'))
  addElementArrayToObj(tableDatas, 'TCP_STREAM', ppObjTCPStream)
  addElementArrayToObj(tableDatas, 'UDP_STREAM', ppObjDUPStream)
  addElementArrayToObj(tableDatas, 'Protocol_kind', ppObjProtoclKind)
}

const groupDataForSpeccpu2006 = (ppGroup, tableDatas, suite) => {
  Object.keys(ppGroup).forEach(ppKey => {
    const ppObj = {}
    // 计算每一个kpi的值。
    Object.keys(ppGroup[ppKey]).forEach(kpi => {
      ppObj[kpi] = computeMean(ppGroup[ppKey][kpi])
    })
    ppObj['li-testcase'] = ppKey
    const testItemVal = getPpParamAndValue(ppKey, 'pp.speccpu2006.test_item')?.split('=')[1]
    const numTypeVal = getPpParamAndValue(ppKey, 'pp.speccpu2006.num_type')?.split('=')[1]
    switch (testItemVal) {
    case 'rate':
      switch (numTypeVal) {
      case 'int':
        computePerformanceValue(ppObj, tableColumnMap[suite].find(table => table.tableName === 'intrate'))
        addElementArrayToObj(tableDatas, 'intrate', ppObj)
        break
      case 'fp':
        computePerformanceValue(ppObj, tableColumnMap[suite].find(table => table.tableName === 'fprate'))
        addElementArrayToObj(tableDatas, 'fprate', ppObj)
        break
      }
      break
    case 'speed':
      switch (numTypeVal) {
      case 'int':
        computePerformanceValue(ppObj, tableColumnMap[suite].find(table => table.tableName === 'intspeed'))
        addElementArrayToObj(tableDatas, 'intspeed', ppObj)
        break
      case 'fp':
        computePerformanceValue(ppObj, tableColumnMap[suite].find(table => table.tableName === 'fpspeed'))
        addElementArrayToObj(tableDatas, 'fpspeed', ppObj)
        break
      }
      break
    }
  })
}

const groupDataForSpeccpu2017 = (ppGroup, tableDatas, suite) => {
  Object.keys(ppGroup).forEach(ppKey => {
    const ppObj = {}
    // 计算每一个kpi的值。
    Object.keys(ppGroup[ppKey]).forEach(kpi => {
      ppObj[kpi] = computeMean(ppGroup[ppKey][kpi])
    })
    ppObj['li-testcase'] = ppKey
    const itemVal = getPpParamAndValue(ppKey, 'pp.speccpu2017.item')?.split('=')[1]
    switch (itemVal) {
    case 'intrate':
      computePerformanceValue(ppObj, tableColumnMap[suite].find(table => table.tableName === 'intrate'))
      addElementArrayToObj(tableDatas, 'intrate', ppObj)
      break
    case 'intspeed':
      computePerformanceValue(ppObj, tableColumnMap[suite].find(table => table.tableName === 'intspeed'))
      addElementArrayToObj(tableDatas, 'intspeed', ppObj)
      break
    case 'fpspeed':
      computePerformanceValue(ppObj, tableColumnMap[suite].find(table => table.tableName === 'fpspeed'))
      addElementArrayToObj(tableDatas, 'fpspeed', ppObj)
      break  
    case 'fprate':
      computePerformanceValue(ppObj, tableColumnMap[suite].find(table => table.tableName === 'fprate'))
      addElementArrayToObj(tableDatas, 'fprate', ppObj)
      break
    }
  })
}

const groupDataForDefault = (ppGroup, tableDatas, suite) => {
  const resultArr = []
  // 基于ppKey区分每条数据。每个kpi作为每条数据的属性。
  Object.keys(ppGroup).forEach(ppKey => {
    const ppObj = {}
    // 计算每一个kpi的值。
    Object.keys(ppGroup[ppKey]).forEach(kpi => {
      ppObj[kpi] = computeMean(ppGroup[ppKey][kpi])
    })
    ppObj['li-testcase'] = ppKey
    resultArr.push(ppObj)
  })
  tableColumnMap[suite].forEach(tableInfo => {
    // 为每条数据计算对应表格下的几何平均值
    resultArr.forEach(ppData => {
      computePerformanceValue(ppData, tableInfo)
    })
    tableDatas[tableInfo.tableName] = resultArr
  })
}

// 根据指定的pp字段，返回pp字段+字段值
// example: ppName = pp.netperf.test=TCP_STREAM,pp.netperf.send_size=1; 
//          getPpParamAndValue(ppName, 'pp.netperf.send_size') => 'pp.netperf.send_size=1'
const getPpParamAndValue = (ppName, ppKey) => {
  const ppArr = ppName.split(',')
  return ppArr.find(ppString => ppString.indexOf(ppKey) > -1)
}

// 计算单条pp数据的性能值
const computePerformanceValue = (ppData, tableInfo) => {
  const computeArr = []
  // 只取对应表格下的字段进行计算
  tableInfo.column.forEach(col => {
    computeArr.push(ppData[col.prop])
  })
  const geoMean = computeGeoMean(computeArr)
  ppData[`performanceVal_${tableInfo.tableName}`] = geoMean
  return geoMean
}

// 计算总的性能值
const computeTotalPerformanceValue = (tableDatas) => {
  const performanceValList = []
  Object.keys(tableDatas).forEach(tableName => {
    const tablePerformanceValList = []
    // 计算每张表的总性能值（合并表中不同pp的性能值）
    tableDatas[tableName].forEach(rowData => {
      tablePerformanceValList.push(rowData[`performanceVal_${tableName}`])
    })
    performanceValList.push(computeGeoMean(tablePerformanceValList))
  })
  // 返回所有表性能值的几何平均值
  return computeGeoMean(performanceValList)
}

const computeMean = (inputArr) => {
  let sum = 0
  let count = 0
  if (!Array.isArray(inputArr)) {
    return -1
  }
  inputArr.forEach(val => {
    if (isNaN(val)) {
      return
    }
    sum += Number(val)
    count += 1
  })
  // 无数据情况
  if (count === 0) {
    return -1 // 特殊标识
  }
  return (sum / count).toFixed(2)
}

const computeGeoMean = (inputArr) =>{
  let testmentVal = 1
  let count = 0
  const tempArr = inputArr.filter(val => val >= 0)
  if (tempArr.length < 1) {
    return -1 // 无数据情况
  }
  tempArr.forEach(val => {
    testmentVal *= val
    count += 1
  })
  return Math.pow(testmentVal, 1/count).toFixed(3)
}

const addElementArrayToObj = (obj, arrKey, element) => {
  if (!element) {
    obj[arrKey] = []
  }
  if (!obj[arrKey] || !Array.isArray(obj[arrKey])) {
    obj[arrKey] = [element]
  } else {
    obj[arrKey].push(element)
  }
}