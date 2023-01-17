<template>
  <div class="oe-perf-section">
    <search-pannel @search="getAllData" suiteByScene></search-pannel>
  </div>
  <div class="oe-perf-section">
    <testment-table
      :dataList="data"
      :submitDataLoading="submitDataLoading"></testment-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import TestmentTable from './components/testment-table.vue'
import SearchPannel from '@/views/search-pannel/index.vue'

import { getPerformanceData } from '@/api/performance'

const data = ref<any[]>([])
const submitDataLoading = ref(false)

/* eslint-disable */
const getAllData = (params: searchParams) => {
  submitDataLoading.value = true

  const matchCases = []
  // 组织选择参数为es QUERY的请求格式
  Object.keys(params).forEach(paramKey => {
    if (params[paramKey]) {
      const matchObj = {}
      matchObj[paramKey] = params[paramKey]
      matchCases.push({
        match: matchObj
      })
    }
  })

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
