<template>
  <el-row v-for="(item) in props.chartConfigs" :key="item.tableName">
    <el-col :lg="12" :sm="24"><div :id="item.tableName + 1" style="width: 100%; height: 400px"></div></el-col>
    <el-col :lg="12" :sm="24"><div :id="item.tableName + 2" style="width: 100%; height: 400px"></div></el-col>
  </el-row>
</template>
  
<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import Chart from '../utils/chart'
import lineChart from '../utils/line-chart'
// 每个套件下的图表
const props = defineProps<{
  chartConfigs: any[],
  chartData: any[]
}>()
// console.log(props.chartConfigs)
// console.log(props.chartData)
onMounted(() => {
  props.chartConfigs.forEach(item => {
    Chart(<HTMLElement>document.getElementById(item.tableName + 1), item.tableName, null)
    lineChart(<HTMLElement>document.getElementById(item.tableName + 2), item.tableName, null)
  })
})
</script>
  
<style lang="scss" scoped>
</style>
