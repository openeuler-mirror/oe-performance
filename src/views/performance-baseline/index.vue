<template>
  <div class="oe-perf-section">
    <search-pannel
      @search="getAllData"
      @reset-search-value="clearTableData"
      suiteByScene></search-pannel>
  </div>
  <div class="oe-perf-section">
    <testment-table
      :dataList="data"
      :submitDataLoading="submitDataLoading"
      :jobCount="jobCount"
      @refreash="refreashData"></testment-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import TestmentTable from './components/testment-table.vue'
import SearchPannel from '@/views/search-pannel/index.vue'
import { useBaselineTableInfoStore } from '@/stores/performanceData'
import { getPerformanceData } from '@/api/performance'

const route = useRoute()
const baselineTableInfoStore = useBaselineTableInfoStore()

const data = ref<any[]>([])
const jobCount = ref<number>(0)
const searchParams = ref<SearchPanel.SearchParams>({} as any)
const searchLimitTime = ref<number>(10)
const searchLimitTotal = ref<number>(3000)
const submitDataLoading = ref<boolean>(false)

const refreashData = () => {
  getAllData(searchParams.value, searchLimitTime.value, searchLimitTotal.value)
}

// 计算query中的Must数组
function setMustCase(
  searchParams: SearchPanel.SearchParams
): PerformanceApi.MulQueryMust {
  const tempArr: PerformanceApi.MulQueryMust = []

  ;(Object.keys(searchParams) as (keyof SearchPanel.SearchParams)[]).forEach(
    paramKey => {
      if (searchParams[paramKey]) {
        const matchObj: SearchPanel.SearchParams = {} as any
        matchObj[paramKey] = searchParams[paramKey] as string[]
        if (Array.isArray(searchParams[paramKey])) {
          searchParams[paramKey]!.length > 0
            && tempArr.push({ terms: matchObj } as PerformanceApi.MulQueryTerms)
        } else {
          // 这一行在逻辑上可以删掉, 因为searchParams内每个对象都是字符串数组
          tempArr.push({ match: matchObj } as any)
        }
      }
    }
  )
  return tempArr
}

// eslint-disable-next-line max-lines-per-function
function getAllData(
  params: SearchPanel.SearchParams,
  searchTime: number,
  searchTotal: number
) {
  searchParams.value = params
  searchLimitTime.value = searchTime
  searchLimitTotal.value = searchTotal
  submitDataLoading.value = true

  const matchCases = setMustCase(params)

  matchCases.push({ match: { job_state: 'finished' } })
  matchCases.push({ range: { time: { gte: `now-${searchTime}d/d` } } })

  // 获取选择的套件下的submitID list
  getPerformanceData({
    index: 'jobs',
    query: {
      size: 1,
      query: {
        bool: {
          must: matchCases
        }
      },
      aggs: {
        jobs_terms: {
          terms: { field: 'submit_id', size: searchTotal }
        }
      }
    }
  })
    .then(res => {
      // todo: 数据为空的异常处理
      const submitList
        = res?.data?.aggregations?.jobs_terms?.buckets.map((item: any) => {
          return { submit_id: item.key }
        }) || []
      baselineTableInfoStore.setSubmitList(submitList)
      baselineTableInfoStore.setGeneralSearchParam({
        searchLimitTime,
        searchLimitTotal,
        suite: searchParams.value.suite
      })
      data.value = submitList
      jobCount.value = res?.data?.hits?.total?.value
      baselineTableInfoStore.setJobCount(jobCount.value)
    })
    .catch(err => {
      ElMessage({
        message: err.message,
        type: 'error'
      })
    })
    .finally(() => {
      submitDataLoading.value = false
    })
}

const clearTableData = () => {
  data.value = []
}

onMounted(() => {
  if (route.meta.isGoback) {
    if (baselineTableInfoStore.baselineSubmitList?.length > 0) {
      data.value = baselineTableInfoStore.baselineSubmitList
      searchLimitTime.value
        = baselineTableInfoStore.searchParamData.searchLimitTime
      searchLimitTotal.value
        = baselineTableInfoStore.searchParamData.searchLimitTotal
      searchParams.value.suite = baselineTableInfoStore.searchParamData.suite
      jobCount.value = baselineTableInfoStore.jobCount
    }
  }
})
</script>

<style></style>
