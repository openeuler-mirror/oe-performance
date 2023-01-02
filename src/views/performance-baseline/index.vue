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
  console.log(params)
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

  // 获取选择的套件下的submitID list
  getPerformanceData({
    'index': 'jobs',
    'query': {
      size: 1,
      'query': {
        bool: {
          // suite': params.suite,
          // // 其他查询条件应该是放在这里
          // 'nr_cpu': params.nr_cpu,
          // 'testbox': params.testbox,
          // 'memory': params.memory
          must: matchCases,
          // "must_not":{
          //   "exists":{
          //     "field":"errid"
          //   }
          // }
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
    /*
    index: 'jobs',
    query: {
      size: 2,
      _source: ['submit_id', 'suite'],
      query: {
        bool: {
          must: [
            {
              match: {
                suite: params.suite
              }
            },
            {
              exists: {
                field: "submit_id"
              }
            }
          ]
        }
      },
      aggs: {
        uid_aggs: {
          terms: {
            field: "submit_id",
            size: 10000,
          },
          aggs: {
            my_top_hits: {
              top_hits: {
                _source: {
                  includes: ['suite', 'submit_id', 'os', 'os_version', 'nr_cpu', 'testbox', 'kernel_version', 'nr_node', "job_stage", "job_health"]
                },
                size: 100 // 最大只能取100个
              }
            }
          }
        }
      }
    } */ 
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
    .then(res => {
      // todo: 数据为空的异常处理
      data.value = res.data.aggregations.jobs_terms.buckets.map((item: any) => {
        return { submit_id: item.key }
      })
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
</script>

<style></style>
