<template>
  <div class="oe-perf-section">
    <search-pannel @search="onSearch" :searchLoading="searchLoading"/>
    <div class="dimension-controller">
      <div class="label">对比维度</div>
      <div class="dimension-controller-inner">
        <el-radio-group v-model="dimension">
          <el-radio-button label="osv" />
          <el-radio-button label="testbox" />
          <el-radio-button label="tags" />
        </el-radio-group>
        <el-input></el-input>
      </div>
    </div>
  </div>
  <div class="oe-perf-section" v-loading="searchLoading">
    <div v-if="!isSearched" class="banner-text">请搜索数据进行对比</div>
    <result-table 
      v-else
      :tjobsAll="inputData"
      :dimension="dimension"
      :suiteControl="searchParams?.suite[0]"
    ></result-table>
  </div>
</template>
    
<script setup lang="ts">
import { ref } from 'vue'
import SearchPannel from '@/views/search-pannel/index.vue'
import ResultTable from './componets/result-table.vue'
import { flattenObj } from '@/utils/utils'

import { useTestboxStore } from '@/stores/performanceData'

import { getPerformanceData } from '@/api/performance'

import { kpiMaps, kpiMapFuncs, addtionalKpiMaps } from './config.js'

const testboxStore = useTestboxStore()

const dimension = ref('osv')

// ejobs
let ejobs = {}
let ejobsMap = {}
// tjobs
let tjobs = {}

let inputData = ref({})
const searchParams = ref({})
const searchLoading = ref(false)

const isSearched = ref(false)

// 获取jobs数据
const onSearch = (params) => {
  searchParams.value = params
  getTotalData(params)
}

const setMustCase = (searchParams) => {
  const tempArr = []
  Object.keys(searchParams).forEach(paramKey => {
    if (searchParams[paramKey]) {
      const matchObj = {}
      matchObj[paramKey] = searchParams[paramKey]
      if (Array.isArray(searchParams[paramKey])) {
        searchParams[paramKey].length > 0 && tempArr.push({ terms: matchObj })
      } else {
        tempArr.push({ match: matchObj })
      }
    }
  })
  return tempArr
}

const getTotalData = (searchParams) => {
  searchLoading.value = true
  const mustCases = setMustCase(searchParams)

  getPerformanceData({
    'index': 'jobs',
    'query': {
      size: 10000,
      _source: ['suite', 'id', 'submit_id', 'group_id', 'tags', 'os', 'os_version', 'osv', 'arch', 'kernel',
        'testbox', 'tbox_group', 'pp', 'stats', 'job_state', 'time'
      ],
      'query': {
        bool: {
          must: [
            { terms: { suite: ['stream', 'netperf', 'lmbench', 'unixbench', 'libmicro']} }, // 对应配置文件，目前只能查到这几个数据
            ...mustCases,
            { 'range': {'time': {'gte': 'now-10d/d'} } } // 需要限制数据时间和主机，不然加载时间太长，不便于测试
          ],
        },
      }
    },
  }).then(res => {
    resetData() 
    res?.data?.hits?.hits?.filter(item => {
      return item._source.stats && Object.keys(item._source.stats).length > 0
    }).forEach(item => {
      const tempFlattenItem = flattenObj(item._source)       // jobs转换成ejobs
      tempFlattenItem['osv'] = `${tempFlattenItem.os}@${tempFlattenItem.os_version}` // 增加需组装的参数
      // 保存硬件信息
      addHardwareInfoToJob(tempFlattenItem)
      // 生成ejobs
      constructEjobData(tempFlattenItem, ejobs, ejobsMap)
    })
    console.log('ejobs: ', ejobs, ejobsMap)
    e2tConverter(ejobs, tjobs)
    inputData.value = tjobs
  }).finally(() => {
    isSearched.value = true
    searchLoading.value = false
  })
}

const addHardwareInfoToJob = (job) => {
  const hardwareInfo = testboxStore.testboxMap[job.testbox] || {}
  job['hw.nr_cpu'] = hardwareInfo.nr_cpu
  job['hw.nr_node'] = hardwareInfo.nr_node
  job['hw.memory'] = hardwareInfo.memory
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
      } else if (kpiMapFuncs[suiteKey]) { // 如果kpiMaps中没有匹配，则使用kpiMapFuncs
        if (!addtionalKpiMaps[suiteKey]) return
        addtionalKpiMaps[suiteKey].forEach(kpi => {
          const tjob = JSON.parse(JSON.stringify(tempJob))
          tjob[`pp.${suiteKey}.testcase`] = kpiMapFuncs[suiteKey](kpi).testcase
          tjob[`pp.${suiteKey}.testgroup`] = kpiMapFuncs[suiteKey](kpi).testgroup
          tjob[`stats.${suiteKey}.${kpiMapFuncs[suiteKey](kpi).kpi}`] = ejob[`stats.${suiteKey}.${kpi}`]
          if (tjobs[suiteKey]) {
            tjobs[suiteKey].push(tjob)
          } else {
            tjobs[suiteKey] = [tjob]
          }
        })
      }
    })
  })
  console.log('tjobs:', tjobs)
}

const resetData = () => {
  ejobs = {}
  ejobsMap = {}
  tjobs = {}
}

</script>
  
<style lang="scss" scoped>
.banner-text {
  text-align: center;
}
.dimension-controller {
  margin-top: 24px;
  display: flex;
  .label {
    line-height: 32px;
    margin-right: 10px;
  }
}
</style>