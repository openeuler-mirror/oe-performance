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
        job[`stats.${kpi}`] && resultObj[testParamName][kpi].push(job[`stats.${kpi}`])
      })
    } else {
      resultObj[testParamName] = {}
      kpiListMap[job.suite].forEach(kpi => {
        job[`stats.${kpi}`] && (resultObj[testParamName][kpi] = [job[`stats.${kpi}`]])
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
  case 'unixbench':  // 表格分成两组数据，一组展示单核，一组展示多核
    gruopDataForUnixbench(ppGroup, tableDatas)
    break;
  default:
    // stream、lmbench
    groupDataForDefault(ppGroup, tableDatas, suite)
    break;
  }
  
  return tableDatas
}

const gruopDataForUnixbench = (ppGroup, tableDatas) => {
  Object.keys(ppGroup).forEach(ppKey => {
    const ppObj = {}
    Object.keys(ppGroup[ppKey]).forEach(kpi => {
      ppObj[kpi] = computeMean(ppGroup[ppKey][kpi])
    })
    ppObj['li-testcase'] = ppKey
    if (ppKey.split('=')[1] === '1') {
      tableDatas['单核'] = [ppObj]
    } else {
      if (tableDatas['多核']) {
        tableDatas['多核'].push(ppobj)
      } else {
        tableDatas['多核'] = [ppObj]
      }
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
    tableDatas[tableInfo.tableName] = resultArr
  })
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
  // 当数据都是
  if (count === 0) {
    return -1 // 标识特殊情况，输入数据为空或者数据都是NaN
  }
  return (sum / count).toFixed(2)
}

const computeGeoMean = (inputArr) =>{
  const tempArr = inputArr.filter(val => val >= 0) 
}