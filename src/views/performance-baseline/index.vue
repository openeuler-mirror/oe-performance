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

import { getDetail } from '@/api/detail'

const Data = ref<any[]>([])
onMounted(() => {
  getDetail(10).then((res) => {
    Data.value = res.data.results
  })
})
</script>

<style>
</style>
