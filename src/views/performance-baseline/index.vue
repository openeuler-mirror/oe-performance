<template>
  <div class="oe-perf-section">
    <test-subassembly></test-subassembly>
  </div>
  <div class="oe-perf-section">
    <test-case :dataList="Data"></test-case>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import testCase from './components/test-case.vue';
import TestSubassembly from './components/test-subassembly.vue';
import { onMounted } from 'vue'

import { getPerformanceData } from '@/api/performance'
import { getDetail } from '@/api/detail'

const Data = ref<any[]>([])
onMounted(() => {
  getDetail(10).then((res) => {
    Data.value = res.data.results
  })
  // getSubmitId()
  // 获取unixbench下的submitID list
  getPerformanceData({
    'index': 'jobs',
    'query': {
      'query': {
        'term': {
          'suite': 'unixbench'
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
  })
  // 根据submitId获取它的jobs
  getPerformanceData({
    'index': 'jobs',
    'query': {
      'size': 10000,  // 取全量
      'query': {
        'term': {
          'submit_id': '005c5966-1f49-4452-a239-30c5ac1b8d72'
        }
      }
    },
  })
})

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
