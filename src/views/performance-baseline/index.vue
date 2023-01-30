<template>
  <div class="oe-perf-section">
    <search-pannel @search="getAllData" suiteByScene></search-pannel>
  </div>
  <div class="oe-perf-section">
    <testment-table
      :dataList="data"
      :submitDataLoading="submitDataLoading"
      @tableSearch="handleTableSearch"
      @refreash="refreashData"
    ></testment-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import TestmentTable from './components/testment-table.vue'
import SearchPannel from '@/views/search-pannel/index.vue'

import { getPerformanceData } from '@/api/performance'

const data = ref<any[]>([])
const searchParams = ref({})
const tableSearchParams = ref({})
const submitDataLoading = ref(false)

const refreashData = () => {
  getAllData(searchParams.value)
}

const handleTableSearch = (searchKey, searchValue) => {
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
        tempArr.push({ terms: matchObj })
      } else {
        tempArr.push({ match: matchObj })
      }
      // if (paramKey === 'testbox') {
      //   if (typeof searchParams[paramKey] === 'string') {
      //     // 用户指定testbox
      //     tempArr.push( { match: { testbox: searchParams[paramKey] } } )
      //   } else {
      //     // 用户通过硬件配置过滤
      //     tempArr.push( { terms: { testbox: searchParams[paramKey] } } )
      //   }
      // } else {
      //   const matchObj = {}
      //   matchObj[paramKey] = searchParams[paramKey]
      //   tempArr.push({ match: matchObj })
      // }
    }
  })
  return tempArr
}

const getAllData = (params: searchParams) => {
  searchParams.value = params
  submitDataLoading.value = true

  const matchCases = setMustCase(params)
  if (tableSearchParams.value.searchValue) {
    const matchObj = {}
    matchObj[tableSearchParams.value.searchKey] = tableSearchParams.value.searchValue
    matchCases.push({ match: matchObj })
  }

  matchCases.push({ match: {job_state: 'finished'} })
  matchCases.push({ range: { time: { gte: 'now-10d/d' } } })

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
          terms: {
            field: 'submit_id',
            size: 10000 // 取全量
          }
        }
      }
    },
  }).then((res) => {
    // todo: 数据为空的异常处理
    data.value = res.data.aggregations.jobs_terms.buckets
      .map((item: any) => { return { submit_id: item.key }})
  }).catch((err) => {
    ElMessage({
      message: err.message,
      type: 'error'
    })
  }).finally(() => {
    submitDataLoading.value = false
  })
}
</script>

<style></style>
