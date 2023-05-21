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
      @tableSearch="handleTableSearch"
      @refreash="refreashData"
    ></testment-table>
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
const jobCount = ref(0)
const searchParams = ref({})
const tableSearchParams = ref({})
const submitDataLoading = ref(false)

const refreashData = () => {
  getAllData(searchParams.value)
}

const handleTableSearch = (searchKey, searchValue) => {
  // 表格子搜索
  tableSearchParams.value = {
    searchKey,
    searchValue
  }
  getAllData(searchParams.value)
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

const getAllData = (params: searchParams, searchTime: number, searchTotal: number) => {
  searchParams.value = params
  submitDataLoading.value = true

  const matchCases = setMustCase(params)
  if (tableSearchParams.value.searchValue) {
    const matchObj = {}
    matchObj[tableSearchParams.value.searchKey] = tableSearchParams.value.searchValue
    matchCases.push({ match: matchObj })
  }

  matchCases.push({ match: {job_state: 'finished'} })
  matchCases.push({ range: { time: { gte: `now-${searchTime}d/d` } } })

  // 获取选择的套件下的submitID list
  getPerformanceData({
    'index': 'jobs',
    'query': {
      size: 1,
      'query': {
        bool: {
          must: matchCases,
        },
      },
      aggs: {
        jobs_terms: {
          terms: { field: 'submit_id', size: searchTotal }
        }
      }
    },
  }).then((res) => {
    // todo: 数据为空的异常处理
    const submitList = res?.data?.aggregations?.jobs_terms?.buckets
      .map((item: any) => { return { submit_id: item.key }}) || []
    baselineTableInfoStore.setSubmitList(submitList)
    data.value = submitList
    jobCount.value = res?.data?.hits?.total?.value
  }).catch((err) => {
    ElMessage({
      message: err.message,
      type: 'error'
    })
  }).finally(() => {
    submitDataLoading.value = false
  })
}

const clearTableData = () => {
  data.value =[]
}

onMounted(() => {
  if (route.meta.isGoback) {
    if (baselineTableInfoStore.baselineSubmitList && baselineTableInfoStore.baselineSubmitList.length > 0) {
      data.value = baselineTableInfoStore.baselineSubmitList
    }
  }
})
</script>

<style></style>
