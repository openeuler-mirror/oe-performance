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
  // 一个submit下的公共参数都类似，取第一个job的公共属性
  // 公共属性目前没有筛选，取得全量
  const tempSubmit = reactive(tempList[0])
  // 配置submit对象的属性
  tempSubmit['jobStateData'] = getjobStateData(tempList)

  tempSubmit['groupData'] = ppGroup
  tempSubmit['tableDatas'] = mapGroupDataToTableData(ppGroup, tempSubmit.suite)
  return tempSubmit
}
// 数据预处理、合成公共数据
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

// 根据配置文件拼接test_params(p1)
const getTestParamsName = (job) => {
  let keyStringArr = []
  const mapList = testParamsMap[job.suite] || []
  mapList.forEach(key => {
    job[key] && keyStringArr.push(`${key}=${job[key]}`)
  })
  return keyStringArr.join(',')
}

// 根据testPram分组数据
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
        resultObj[testParamName][kpi] = [job[`stats.${kpi}`]]
      })
    }
  })
  return resultObj
}

// 统计一个submit哈桑job的综合信息，目前是给任务列表用
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
  const resultArr = []
  if (!tableColumnMap[suite]) {
    return {}
  }
  
  switch (tableMode[suite]) {
  case 'unixbench':  // 表格分成两组数据，一组展示单核，一组展示多核
    Object.keys(ppGroup).forEach(ppKey => {
      const ppObj = {}
      Object.keys(ppGroup[ppKey]).forEach(kpi => {
        const kpiValue = ppGroup[ppKey][kpi].reduce(function(prev, curr){
          return prev + curr
        })/ppGroup[ppKey][kpi].length // 获取kpi的平均值
        ppObj[kpi] = kpiValue.toFixed(2)
      })
      ppObj['li-testcase'] = ppKey
      if (ppKey.split('=')[1] === '1') {
        tableDatas['单核'] = [ppObj]
      } else {
        tableDatas['多核'] = [ppObj]
      }
    })
    break;
  default:
    // 基于ppKey区分每条数据。每个kpi作为每条数据的属性。
    Object.keys(ppGroup).forEach(ppKey => {
      const ppObj = {}
      Object.keys(ppGroup[ppKey]).forEach(kpi => {
        const kpiValue = ppGroup[ppKey][kpi].reduce(function(prev, curr){
          return prev + curr
        })/ppGroup[ppKey][kpi].length // 获取kpi的平均值
        ppObj[kpi] = kpiValue.toFixed(2)
      })
      ppObj['li-testcase'] = ppKey
      resultArr.push(ppObj)
    })
    tableColumnMap[suite].forEach(tableInfo => {
      tableDatas[tableInfo.tableName] = resultArr
    })
    break;
  }
  
  return tableDatas
}