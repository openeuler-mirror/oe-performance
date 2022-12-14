<template>
    <div>
        数据测试
    </div>
    <div>
        <el-button @click="onSearch">查询</el-button>
    </div>
</template>
    
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import flattenObj from '@/utils/utils'

import { getPerformanceData, getJobValueList, getTestBoxes } from '@/api/performance'

import { kpiMaps, kpiMapFuncs } from './config.js'

// testbox字典
const allHostsMap = reactive({})
// ejobs
const ejobs = reactive({})
const ejobsMap = reactive({})
// tjobs
const tjobs = reactive({})

// 获取jobs数据
const onSearch = () => {
  getPerformanceData({
    'index': 'jobs',
    'query': {
      size: 10000,
      _source: ['suite', 'id', 'submit_id', 'group_id', 'tags',
        'os', 'os_version', 'arch', 'kernel',
        'testbox', 'tbox_group', 'pp', 'stats', 'job_state', 'time'
      ],
      'query': {
        bool: {
          must: [
            { terms: { suite: ['stream', 'netperf']} }, // 对应皮遏制文件，目前只能查到这几个数据 
            // { match: { suite: 'stream' }},  // 测试，指定suite
            { match: { testbox: 'taishan200-2280-2s48p-384g--a1006' } },
            { 'range': {'time': {'gte': 'now-10d/d'} } } // 需要限制数据时间和主机，不然加载时间太长，不便于测试s
          ],
        },
      }
    },
  }).then(res => {
    res.data.hits.hits.forEach(item => {
      // jobs转换成ejobs
      const tempFlattenItem = flattenObj(item._source)
      // 增加需组装的参数
      tempFlattenItem['osv'] = `${tempFlattenItem.os}@${tempFlattenItem.os_version}`
      // 保存硬件信息
      addHardwareInfoToJob(tempFlattenItem)
      // 生成ejobs
      constructEjobData(tempFlattenItem)
      // 转换为tjobs
    })
    console.log('ejobs: ', ejobs, ejobsMap)
    e2tConverter(ejobs)
  })
}

const addHardwareInfoToJob = (job) => {
  const hardwareInfo = allHostsMap[job.testbox] || {}
  job['hw.nr_cpu'] = hardwareInfo.cpu && hardwareInfo.cpu.nr_cpu
  job['hw.nr_node'] = hardwareInfo.cpu && hardwareInfo.cpu.nr_node
  job['hw.memory'] = hardwareInfo.memory && hardwareInfo.memory.all_memory_size
}

const constructEjobData = (job) => {
  const { suite } = job
  if (ejobs[suite]) {
    ejobs[suite].push(job)
    ejobsMap[suite][job.id] = job
  } else {
    ejobs[suite] = [job]
    ejobsMap[suite] = {}
    ejobsMap[suite][job.id] = job
  }
}

const e2tConverter = (ejobs) => {
  Object.keys(ejobs).forEach((suiteKey:string) => {
    ejobs[suiteKey].forEach(ejob => {
      const program = ejob.suite
      const tempJob =  JSON.parse(JSON.stringify(ejob))
      tempJob[`pp.${program}.testcase`] = ejob[`pp.${program}.test`] || '' // 如果有test，设为默认值
      Object.keys(kpiMaps[suiteKey]).forEach(kpi => { // 遍历所有kpi，每个kpi生成一个tjob
        const tjob = JSON.parse(JSON.stringify(tempJob))
        tjob[`pp.${suiteKey}.testcase`] = kpiMaps[suiteKey][kpi].testcase  // todo，libmicro需要调用func生成结果
        tjob[`stats.${suiteKey}.${kpiMaps['stream'][kpi].kpi}`] = ejob[`stats.${suiteKey}.${kpi}`]
        if (tjobs[suiteKey]) {
          tjobs[suiteKey].push(tjob)
        } else {
          tjobs[suiteKey] = [tjob]
        }
      })
    })
    console.log('tjobs:', tjobs)
  })
  // for each
  // ejobs['stream'].forEach(ejob => {
  //   Object.keys(kpiMaps['stream']).forEach(kpi => {
  //     const tempJob = JSON.parse(JSON.stringify(ejob))
  //     tempJob.testcase = kpiMaps['stream'][kpi].testcase // 列名
  //     tempJob[`stats.${'stream'}.${kpiMaps['stream'][kpi].kpi}`] = ejob[`stats.${'stream'}.${kpi}`]
  //   })
  // })
}

onMounted(() => {
  // 获取主机列表和信息
  // todo: 后续删除。目前已将testbox的请求切换到baseline-layout中进行公共请求。请求结果存到store中。
  getTestBoxes().then(res => {
    const testboxListRaw = res.data.hits.hits.map(rawItem => rawItem._source)
    testboxListRaw.forEach(testboxItem => {
      allHostsMap[testboxItem.id] = testboxItem
    })
    console.log('allHost: ', allHostsMap)
  })
  // 获取job中的通用筛选项
  getJobValueList()
})

</script>
  
<style lang="scss" scoped>
</style>