<template>
  <div class="oe-perf-section">
    <search-pannel
      @search="onSearch"
      :searchLoading="searchLoading"
      :fieldsBySecne="availableSuites" />
  </div>
  <div class="oe-perf-section" v-loading="searchLoading">
    <template v-if="isSearched">
      <h2 class="oe-perf-section-title">请选择维度及过滤项</h2>
      <p>共{{ jobCount }}条job</p>
      <dimension-controller
        ref="dimensionControlerRef"
        :options-data="optionsData"
        :suiteFilter="(Array.from(suiteOptions) as string[]) || []"
        @filtering="handleDimensionFiltering"
        @suiteFiltering="handleSuiteFiltering" />
    </template>
    <div v-else class="banner-text">请搜索数据进行对比</div>
  </div>
  <div v-if="isSearched" class="oe-perf-section" v-loading="searchLoading">
    <el-tabs v-model="tabName" class="demo-tabs">
      <el-tab-pane label="性能对比" name="comparationResult">
        <result-table
          :tjobsAll="inputData"
          :dimension="filterDimension"
          :filterListDataUnderDimension="filterListData"
          :suiteFilterList="suiteFilterList"></result-table>
      </el-tab-pane>
      <el-tab-pane label="开发者性能大表" name="performanceTable">
        <dev-perf-table
          :tjobsAll="inputData"
          :dimension="filterDimension"
          :filterListDataUnderDimension="filterListData"
          :suiteFilterList="suiteFilterList"></dev-perf-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import SearchPannel from '@/views/search-pannel/index.vue'
import dimensionController from './componets/dimension-controller.vue'
import ResultTable from './componets/result-table.vue'
import DevPerfTable from './componets/dev-perf-table.vue'
// util tool
import { flattenObj } from '@/utils/utils'
// store
import { useTestboxStore } from '@/stores/performanceData'
// api
import { getPerformanceData } from '@/api/performance'
// configs
import { kpiMaps, kpiMapFuncs, addtionalKpiMaps } from './config.js'

const testboxStore = useTestboxStore()

const availableSuites = [
  'stream',
  'netperf',
  'lmbench',
  'unixbench',
  'libmicro'
]

const kpiMapInstance = kpiMaps as ComparisonConfig.KPI
const kpiMapFuncsInstance = kpiMapFuncs as ComparisonConfig.KpiMapFuncs
const addtionalKpiMapsInstance = addtionalKpiMaps as ComparisonConfig.AddtionalKpiMap
// ejobs
let ejobs: JobObject = {}
let ejobsMap: JobObject = {}
// tjobs
let tjobs: JobObject = {}
let inputData = ref<JobObject>({})
const jobCount = ref(0)
const tabName = ref('comparationResult')
const searchParams = ref<SearchPanel.SearchParams>({})
const searchLoading = ref(false)

const isSearched = ref(false)

// 在vue3使用<script setup>构建组件是不能使用InstanceType获取到在组件内没有expose出来的属性和方法
const dimensionControlerRef = ref<InstanceType<typeof dimensionController>>()
const osvOptions = ref(new Set<string>())
const archOptions = ref(new Set<string>())
const tboxGroupOptions = ref(new Set<string>())
const tagsOptions = ref(new Set<string>())
const suiteOptions = ref(new Set<string>())
const ppOptions = ref(new Set<string>())
const ssOptions = ref(new Set<string>())
const groupOptions = ref(new Set<string>())
const optionsData = ref<DictObject>({
  osv: osvOptions,
  arch: archOptions,
  tbox_group: tboxGroupOptions,
  group_id: groupOptions,
  tags: tagsOptions,
  pp: ppOptions,
  ss: ssOptions
})

const filterDimension = ref('osv')
const filterListData = ref<Comparison.FilterList>({})
const suiteFilterList: Ref<string[]> = ref([])

// 获取jobs数据
const onSearch = (
  params: SearchPanel.SearchParams,
  searchTime: number,
  searchTotal: number
) => {
  searchParams.value = params
  getTotalData(params, searchTime, searchTotal)
}

// 这个函数在@/views/performance-baseline/index内有一摸一样的
const setMustCase = (searchParams: SearchPanel.SearchParams) => {
  const tempArr: PerformanceApi.MulQueryMust = []
  ;(Object.keys(searchParams) as Array<keyof SearchPanel.SearchParams>).forEach(
    paramKey => {
      if (searchParams[paramKey]) {
        const matchObj: SearchPanel.SearchParams = {}
        matchObj[paramKey] = searchParams[paramKey] as string[]
        if (Array.isArray(searchParams[paramKey])) {
          searchParams[paramKey]!.length > 0
            && tempArr.push({ terms: matchObj } as PerformanceApi.MulQueryTerms)
        } else {
          tempArr.push({ match: matchObj } as any)
        }
      }
    }
  )
  return tempArr
}
// eslint-disable-next-line max-lines-per-function
const getTotalData = (
  searchParams: SearchPanel.SearchParams,
  searchTime: number,
  searchTotal: number
) => {
  searchLoading.value = true
  const mustCases = setMustCase(searchParams)

  getPerformanceData({
    index: 'jobs',
    query: {
      size: searchTotal,
      // prettier-ignore
      _source: ['suite', 'id', 'submit_id', 'group_id', 'tags', 'os', 'os_version', 'osv', 'arch', 'kernel', 'testbox', 'tbox_group', 'pp', 'stats', 'job_state', 'time', 'result_root'],
      query: {
        bool: {
          must: [
            {
              terms: { suite: availableSuites }
            }, // 对应配置文件，目前只能查到这几个数据
            {
              range: { time: { gte: `now-${searchTime}d/d` } }
            }, // 需要限制数据时间和主机，不然加载时间太长，不便于测试
            ...mustCases
          ]
        }
      }
    }
  })
    .then(res => {
      resetData()
      jobCount.value = res?.data?.hits?.total?.value
      res?.data?.hits?.hits
        ?.filter((item: JobObject) => {
          return (
            item._source.stats && Object.keys(item._source.stats).length > 0
          )
        })
        .forEach((item: JobObject) => {
          const tempFlattenItem = flattenObj(item._source)
          // jobs转换成ejobs
          tempFlattenItem[
            'osv'
          ] = `${tempFlattenItem.os}@${tempFlattenItem.os_version}` // 增加需组装的参数
          addHardwareInfoToJob(tempFlattenItem) // 保存硬件信息
          constructEjobData(tempFlattenItem, ejobs, ejobsMap) // 生成ejobs
          getFilterOptions(tempFlattenItem) // 记录可选择项
        })
      e2tConverter(ejobs, tjobs)
      inputData.value = tjobs
    })
    .catch(err => {
      ElMessage({
        message: err.message,
        type: 'error'
      })
    })
    .finally(() => {
      isSearched.value = true
      searchLoading.value = false
      nextTick(() => dimensionControlerRef.value!.checkedListInit()) // 触发dimensionController组件重置选项
    })
}

const addHardwareInfoToJob = (job: DictObject) => {
  const hardwareInfo = testboxStore.testboxMap[job.testbox] || {}
  job['hw.nr_cpu'] = hardwareInfo.nr_cpu
  job['hw.nr_node'] = hardwareInfo.nr_node
  job['hw.memory'] = hardwareInfo.memory
}

const constructEjobData = (
  job: JobObject,
  ejobs: JobObject,
  ejobsMap: JobObject
) => {
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

const e2tConverter = (ejobs: JobObject, tjobs: JobObject) => {
  Object.keys(ejobs).forEach((suiteKey: string) => {
    ejobs[suiteKey].forEach((ejob: JobObject) => {
      const program = ejob.suite
      const tempJob = JSON.parse(JSON.stringify(ejob))
      tempJob[`pp.${program}.testcase`] = ejob[`pp.${program}.test`] || '' // 如果有test，设为默认值

      // 如果配置文件kpiMaps中没有映射关系，则直接使用不做转换
      if (!kpiMapInstance[suiteKey] && !kpiMapFuncsInstance[suiteKey]) {
        const tjob = JSON.parse(JSON.stringify(tempJob))
        if (tjobs[suiteKey]) {
          tjobs[suiteKey].push(tjob)
        } else {
          tjobs[suiteKey] = [tjob]
        }
        return
      }
      // 有配置文件的话，进行转换
      if (kpiMapInstance[suiteKey]) {
        Object.keys(kpiMapInstance[suiteKey]).forEach(kpi => {
          // 遍历所有kpi，每个kpi生成一个tjob
          const tjob = JSON.parse(JSON.stringify(tempJob))
          tjob[`pp.${suiteKey}.testcase`]
            = kpiMapInstance[suiteKey][kpi].testcase
          tjob[`stats.${suiteKey}.${kpiMapInstance[suiteKey][kpi].kpi}`]
            = ejob[`stats.${suiteKey}.${kpi}`]
          if (tjobs[suiteKey]) {
            tjobs[suiteKey].push(tjob)
          } else {
            tjobs[suiteKey] = [tjob]
          }
        })
      } else if (kpiMapFuncsInstance[suiteKey]) {
        // 如果kpiMaps中没有匹配，则使用kpiMapFuncs
        if (!addtionalKpiMapsInstance[suiteKey]) return
        addtionalKpiMapsInstance[suiteKey].forEach(kpi => {
          const tjob = JSON.parse(JSON.stringify(tempJob))
          tjob[`pp.${suiteKey}.testcase`]
            = kpiMapFuncsInstance[suiteKey](kpi).testcase
          tjob[`pp.${suiteKey}.testgroup`]
            = kpiMapFuncsInstance[suiteKey](kpi).testgroup
          tjob[`stats.${suiteKey}.${kpiMapFuncsInstance[suiteKey](kpi).kpi}`]
            = ejob[`stats.${suiteKey}.${kpi}`]
          if (tjobs[suiteKey]) {
            tjobs[suiteKey].push(tjob)
          } else {
            tjobs[suiteKey] = [tjob]
          }
        })
      }
    })
  })
}

const resetData = () => {
  ejobs = {}
  ejobsMap = {}
  tjobs = {}
  osvOptions.value.clear()
  archOptions.value.clear()
  tboxGroupOptions.value.clear()
  tagsOptions.value.clear()
  suiteOptions.value.clear()
  ppOptions.value.clear()
  ssOptions.value.clear()
  groupOptions.value.clear()
}

const handleDimensionFiltering = (
  dimension: string,
  checkedListObject: Comparison.FilterList
) => {
  filterDimension.value = dimension
  filterListData.value = checkedListObject
}

const handleSuiteFiltering = (suiteList: string[]) => {
  suiteFilterList.value = suiteList
}

/**
 * 获取job中的信息，记录各个维度的可选项
 * @param flattenJob
 */
const getFilterOptions = (flattenJob: JobObject) => {
  flattenJob['osv'] && osvOptions.value.add(flattenJob['osv'])
  flattenJob['arch'] && archOptions.value.add(flattenJob['arch'])
  flattenJob['tbox_group'] 
  && tboxGroupOptions.value.add(flattenJob['tbox_group'])
  flattenJob['tags'] && tagsOptions.value.add(flattenJob['tags'])
  flattenJob['group_id'] && groupOptions.value.add(flattenJob['group_id'])
  flattenJob['suite'] && suiteOptions.value.add(flattenJob['suite'])
  suiteFilterList.value = Array.from(suiteOptions.value) as string[]
  const ppParamsList = getPpParams(flattenJob) // 获取组合的ppParams
  flattenJob['ppParams'] = ppParamsList.join(',')
  ppParamsList.length > 0 && addPpParamToOptions(ppParamsList)
  const ssParams = getSsParams(flattenJob)
  flattenJob['ssParams'] = ssParams
  ssParams && ssOptions.value.add(ssParams)
}

const getPpParams = (flattenJob: JobObject) => {
  const tempArr: string[] = []
  Object.keys(flattenJob)
    .sort()
    .forEach(key => {
      if (key.startsWith(`pp.${flattenJob.suite}`)) {
        tempArr.push(`${key}=${flattenJob[key]}`)
      }
    })
  return tempArr
}

// 原先的ppOptions实际上还是ref定义的ppOptions
const addPpParamToOptions = (paramList: string[]) => {
  paramList.forEach((paramPair: string) => {
    ppOptions.value.add(paramPair.replace(/^pp./, ''))
  })
}

/**
 * stats数据结构中可能会有写保存信息需要特殊处理。因此处理方法和pp的params的获取一致。
 * @param flattenJob
 */
const getSsParams = (flattenJob: JobObject) => {
  const tempArr: string[] = []
  Object.keys(flattenJob)
    .sort()
    .forEach(key => {
      if (key.startsWith(`ss.${flattenJob.suite}`)) {
        tempArr.push(`${key}=${flattenJob[key]}`)
      }
    })
  return tempArr.join(',')
}
</script>

<style lang="scss" scoped>
.banner-text {
  text-align: center;
}

.oe-perf-section-title {
  font-size: 24px;
  margin-bottom: 24px;
}
</style>
