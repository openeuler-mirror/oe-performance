<template>
  <div ref="chartContainer" style="width: 100%; height: 400px"></div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Chart from '../utils/chart'

const chartContainer = ref<any>(null)

onMounted(() => {
  Chart(chartContainer.value)
})
</script>
  
<style lang="scss" scoped>
</style>
