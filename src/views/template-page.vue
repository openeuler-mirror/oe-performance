<template>
  <div class="oe-perf-section">
    <test-component></test-component>
  </div>
  <div class="oe-perf-section">
    <test-case-vue></test-case-vue>
    <el-button @click="getDetailData">测试数据</el-button>
  </div>
</template>

<script setup lang="ts">
import testCaseVue from './performance-baseline/test-case.vue';
import TestComponent from './performance-baseline/test-component.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { getDetail } from '@/api/detail'

const router = useRouter()

onMounted(() => {
  console.log(router)
})

const getDetailData = () => {
  getDetail(10).then((res) => {
    console.log(res.data.results)
  })
}
</script>

<style>
</style>
