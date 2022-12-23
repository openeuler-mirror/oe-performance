<template>
    <div>
        数据测试
    </div>
    <div>
        <el-button @click="onSearch">查询</el-button>
    </div>
    <result-table :tjobsAll="inputData"></result-table>
</template>
    
<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import ResultTable from './componets/result-table.vue'
import flattenObj from '@/utils/utils'

import { getPerformanceData, getTestBoxes } from '@/api/performance'

import { kpiMaps, kpiMapFuncs } from './config.js'

// testbox字典
const allHostsMap = reactive({})
// ejobs
const ejobs = {}
const ejobsMap = {}
// tjobs
const tjobs = {}

let inputData = ref({})

/**
os
: 
"openeuler"
os_version
: 
"22.03-LTS-SP1-RC2-iso"
osv
: 
"openeuler@22.03-LTS-SP1-RC2-iso"
======================
os: "centos"
os_version: "7.6.1810"
osv: centos@7.6.1810
 */
// 获取jobs数据

const dataLoadCount = ref(0)

const onSearch = () => {
  dataLoadCount.value++
  getTotalData()
}

watch(
  () => dataLoadCount.value,
  () => {
    if (dataLoadCount.value === 0) {
      inputData.value = tjobs
    }
  }
)

const getTotalData = () => {
  getPerformanceData({
    'index': 'jobs',
    'query': {
      size: 10000,
      _source: ['suite', 'id', 'submit_id', 'group_id', 'tags', 'os', 'os_version', 'arch', 'kernel',
        'testbox', 'tbox_group', 'pp', 'stats', 'job_state', 'time'
      ],
      'query': {
        bool: {
          must: [
            { terms: { suite: ['stream', 'netperf', 'lmbench', 'unixbench']} }, // 对应皮遏制文件，目前只能查到这几个数据
            { terms: { os_version: ['22.03-LTS-SP1-RC4-iso', '22.03-LTS-SP1-RC3-iso', '8.6-GA-iso'] }},
            // { match: { os_version: osVersion }}, 
            // { match: { suite: 'stream' }},  // 测试，指定suite
            // { match: { testbox: 'taishan200-2280-2s48p-384g--a1006' } },
            { 'range': {'time': {'gte': 'now-10d/d'} } } // 需要限制数据时间和主机，不然加载时间太长，不便于测试s
          ],
        },
      }
    },
  }).then(res => {
    let _osv = ''
    res.data.hits.hits.filter(item => {
      // 去掉没有stats的job数据
      return item._source.stats && Object.keys(item._source.stats).length > 0
    }).forEach(item => {
      const tempFlattenItem = flattenObj(item._source)       // jobs转换成ejobs
      tempFlattenItem['osv'] = `${tempFlattenItem.os}@${tempFlattenItem.os_version}` // 增加需组装的参数
      // _osv = tempFlattenItem['osv']
      // 保存硬件信息
      addHardwareInfoToJob(tempFlattenItem)
      // 生成ejobs
      constructEjobData(tempFlattenItem, ejobs, ejobsMap)
      // 转换为tjobs
    })
    console.log('ejobs: ', ejobs, ejobsMap)
    e2tConverter(ejobs, tjobs)
    // ejobsAll = ejobs
    // ejobsMapAll  = ejobsMap
    // tjobsAll = tjobs
  }).finally(() => {
    dataLoadCount.value--
  })
}

const addHardwareInfoToJob = (job) => {
  const hardwareInfo = allHostsMap[job.testbox] || {}
  job['hw.nr_cpu'] = hardwareInfo.cpu && hardwareInfo.cpu.nr_cpu
  job['hw.nr_node'] = hardwareInfo.cpu && hardwareInfo.cpu.nr_node
  job['hw.memory'] = hardwareInfo.memory && hardwareInfo.memory.all_memory_size
}

const constructEjobData = (job, ejobs, ejobsMap) => {
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

const e2tConverter = (ejobs, tjobs) => {
  Object.keys(ejobs).forEach((suiteKey:string) => {
    ejobs[suiteKey].forEach(ejob => {
      const program = ejob.suite
      const tempJob =  JSON.parse(JSON.stringify(ejob))
      tempJob[`pp.${program}.testcase`] = ejob[`pp.${program}.test`] || '' // 如果有test，设为默认值
      
      // 如果配置文件kpiMaps中没有映射关系，则直接使用不做转换
      if (!kpiMaps[suiteKey] && !kpiMapFuncs[suiteKey]) {
        const tjob = JSON.parse(JSON.stringify(tempJob))
        if (tjobs[suiteKey]) {
          tjobs[suiteKey].push(tjob)
        } else {
          tjobs[suiteKey] = [tjob]
        }
        return
      }
      // 有配置文件的话，进行转换
      if (kpiMaps[suiteKey]) {
        Object.keys(kpiMaps[suiteKey]).forEach(kpi => { // 遍历所有kpi，每个kpi生成一个tjob
          const tjob = JSON.parse(JSON.stringify(tempJob))
          tjob[`pp.${suiteKey}.testcase`] = kpiMaps[suiteKey][kpi].testcase  // todo，libmicro需要调用func生成结果
          tjob[`stats.${suiteKey}.${kpiMaps[suiteKey][kpi].kpi}`] = ejob[`stats.${suiteKey}.${kpi}`]
          if (tjobs[suiteKey]) {
            tjobs[suiteKey].push(tjob)
          } else {
            tjobs[suiteKey] = [tjob]
          }
        })
      } else { // 如果kpiMaps中没有匹配，则使用kpiMapFuncs
        
      }
    })
  })
  console.log('tjobs:', tjobs)
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
  // getJobValueList()
})

</script>
  
<style lang="scss" scoped>
</style>