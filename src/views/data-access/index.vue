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
      size: 10000,  // 需要分suite获取
      _source: ['suite', 'id', 'submit_id', 'group_id', 'tags',
        'os', 'os_version', 'arch', 'kernel',
        'testbox', 'tbox_group',
        'pp', 'stats',
        'job_state', 'time'
      ],
      'query': {
        bool: {
          must: [
            { match: { suite: 'stream' }},
            { match: { testbox: '2288hv5-2s40p-256g--b1004' } }
          ],
        }
      }
    },
  }).then(res => {
    res.data.hits.hits.forEach(item => {
      // jobs转换成ejobs
      const tempFlattenItem = flattenObj(item._source)
      // 增加需组装的参数
      tempFlattenItem['osv'] = `${tempFlattenItem.os}@${tempFlattenItem.os_version}`
      // 保存硬件信息
      const tempHardwareInfo = allHostsMap[tempFlattenItem.testbox]
      tempFlattenItem['hw.nr_cpu'] = tempHardwareInfo.cpu.nr_cpu
      tempFlattenItem['hw.nr_node'] = tempHardwareInfo.cpu.nr_node
      tempFlattenItem['hw.memory'] = tempHardwareInfo.memory.all_memory_size
      // 保存
      const { suite } = tempFlattenItem
      if (ejobs[suite]) {
        ejobs[suite].push(tempFlattenItem)
        ejobsMap[suite][tempFlattenItem.id] = tempFlattenItem
      } else {
        ejobs[suite] = [tempFlattenItem]
        ejobsMap[suite] = {}
        ejobsMap[suite][tempFlattenItem.id] = tempFlattenItem
      }
    })
    console.log('ejobs: ', ejobs, ejobsMap)
  })
}

const e2tConverter = (ejobs) => {
  // for each
  ejobs['stream'].forEach(ejob => {
    Object.keys(kpiMaps['stream']).forEach(kpi => {
      const tempJob = JSON.parse(JSON.stringify(ejob))
      tempJob.testcase = kpiMaps['stream'][kpi].testcase // 列名
      tempJob[`stats.${'stream'}.${kpiMaps['stream'][kpi].kpi}`] = ejob[`stats.${'stream'}.${kpi}`]
    })
  })
}

onMounted(() => {
  // 获取主机列表和信息
  // todo: 后续删除。目前已将testbox的请求切换到baseline-layout中进行公共请求。请求结果存到store中。
  getTestBoxes().then(res => {
    const testboxListRaw = res.data.hits.hits.map(rawItem => rawItem._source)
    testboxListRaw.forEach(testboxItem => {
      allHostsMap[testboxItem.id] = testboxItem
    })
    console.log(allHostsMap)
  })
  // 获取job中的通用筛选项
  getJobValueList()
})

</script>
  
<style lang="scss" scoped>
</style>