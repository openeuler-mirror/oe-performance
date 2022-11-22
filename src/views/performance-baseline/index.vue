<template>
  <div class="oe-perf-section">
    <test-subassembly></test-subassembly>
  </div>
  <div class="oe-perf-section">
    <test-case :dataList="Data" v-if="Data.length !== 0"></test-case>
  </div>
</template>

<script setup lang="ts">
import testCase from './components/test-case.vue';
import TestSubassembly from './components/test-subassembly.vue';
import { onMounted, ref } from 'vue'

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
