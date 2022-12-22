/**
 * 基于submit_id维度的数据处理
 */
import { reactive } from 'vue'
import flattenObj from '@/utils/utils'

import { testParamsMap, kpiListMap, tableMode, tableColumnMap } from '@/views/data-access/config_li.js'

export const combineJobs = (jobList) => {
  const tempList = jobList.map(job => job._source)
    .map(job => prePrecessJob(job))
  const ppGroup = groupDataByTestparam(tempList)
  // 一个submit下的公共参数都类似，取第一个job的公共属性
  // 公共属性目前没有筛选，取得全量
  const tempSubmit = reactive(tempList[0])
  tempSubmit['groupData'] = ppGroup
  tempSubmit['tableDatas'] = mapGroupDataToTableData(ppGroup, tempSubmit.suite)
  console.log('submitIdData: ', tempSubmit)
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

const mapGroupDataToTableData = (ppGroup, suite) => {
  console.log('rawData: ', ppGroup)
  const tableDatas = {}
  const resultArr = []
  
  switch (tableMode[suite]) {
  case 'unixbench':  // 表格分成两组数据，一组展示单核，一组展示多核
    console.log(ppGroup)
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
  
  console.log('tableData: ', tableDatas)
  return tableDatas
}