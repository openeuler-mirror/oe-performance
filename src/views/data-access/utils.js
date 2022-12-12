import { reactive } from 'vue'
import flattenObj from '@/utils/utils'

import { testParamsMap, kpiListMap } from '@/views/data-access/config_li.js'

export const combineJobs = (jobList) => {
  const tempList = jobList.map(job => job._source)
    .map(job => prePrecessJob(job))
  const ppGroup = groupDataByTestparam(tempList)
  // 一个submit下的公共参数都类似，取第一个job的公共属性
  // 公共属性目前没有筛选，取得全量
  const tempSubmit = reactive(tempList[0])
  console.log('groupData: ', ppGroup)
  tempSubmit['groupData'] = ppGroup
  console.log(tempSubmit)
  return tempSubmit
}
// 数据预处理
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
    keyStringArr.push(`${key}=${job[key]}`)
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