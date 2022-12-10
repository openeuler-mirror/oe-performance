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

// testbox字典
const allHosts = reactive({})
// ejobs
const ejobs = reactive([])
const ejobsMap = reactive({})

// 获取jobs数据
const onSearch = () => {
  getPerformanceData({
    'index': 'jobs',
    'query': {
      size: 10000,  // 需要分suite获取
      _source: ['suite', 'id', 'submit_id','os', 'os_version', 'arch', 'kernel', 'testbox', 'tbox_group', 'pp', 'stats', 'job_state', 'time'],
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
      const tempHardwareInfo = allHosts[tempFlattenItem.testbox]
      tempFlattenItem['hw'] = tempHardwareInfo
      // 保存
      ejobs.push(tempFlattenItem)
      ejobsMap[tempFlattenItem.id] = tempFlattenItem
    })
    console.log(ejobs, ejobsMap)
  })
}

onMounted(() => {
  // 获取主机列表和信息
  getTestBoxes().then(res => {
    const testboxListRaw = res.data.hits.hits.map(rawItem => rawItem._source)
    testboxListRaw.forEach(testboxItem => {
      allHosts[testboxItem.id] = testboxItem
    })
    console.log(allHosts)
  })
  // 获取job中的通用筛选项
  getJobValueList()
})

</script>
  
<style lang="scss" scoped>
</style>