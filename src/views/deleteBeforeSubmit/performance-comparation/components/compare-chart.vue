<template>
  <el-row>
    <el-col :lg="12" :sm="24"><div ref="chartContainer" style="width: 100%; height: 400px"></div></el-col>
    <el-col :lg="12" :sm="24"><div ref="lineChartContainer" style="width: 100%; height: 400px"></div></el-col>
  </el-row>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Chart from '../utils/chart'
import lineChart from '../utils/line-chart'

const chartContainer = ref<any>(null)
const lineChartContainer = ref<any>(null)

onMounted(() => {
  Chart(chartContainer.value)
  lineChart(lineChartContainer.value)
})
</script>
  
<style lang="scss" scoped>
</style>
