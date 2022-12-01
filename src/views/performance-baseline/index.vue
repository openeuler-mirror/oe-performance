<template>
  <div class="oe-perf-section">
    <search-pannel @search="getAllData"></search-pannel>
  </div>
  <div class="oe-perf-section">
    <testment-table :dataList="data" :submitDataLoading="submitDataLoading"></testment-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import TestmentTable from './components/testment-table.vue';
import SearchPannel from './components/search-pannel.vue';

import { getPerformanceData } from '@/api/performance'

const data = ref<any[]>([])
const submitDataLoading = ref(false)

const getAllData = (params: searchParams) => {
  console.log(params)
  submitDataLoading.value = true

  // 获取unixbench下的submitID list
  getPerformanceData({
    'index': 'jobs',
    'query': {
      'query': {
        'term': {
          'suite': params.suite
          // 其他查询条件应该是放在这里
        }
      },
      'aggs': {
        'jobs_terms': {
          'terms': {
            'field': 'submit_id',
            'size': 10000  // 取全量
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

const getSubmitId = () => {
  // 华为的实例，获取job，只展示submit数据
  getPerformanceData({
    'index': 'jobs',
    'query': {
      'size': 10,
      '_source': ['submit_id'],
      'query': {
        'term': {
          'suite': 'unixbench'
        }
      }
    }
  })
}
</script>

<style>
</style>
