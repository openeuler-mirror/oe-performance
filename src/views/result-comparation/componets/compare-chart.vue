<template>
  <el-row :gutter="16">
    <el-col :lg="12" :sm="24">
      <div :id="props.chartConfigs['tableName'] + 1" style="width: 100%; height: 400px"></div>
    </el-col>
    <el-col :lg="12" :sm="24">
      <div :id="props.chartConfigs['tableName'] + 2" style="width: 100%; height: 400px"></div>
    </el-col>
  </el-row>
</template>
  
<script setup lang="ts">
import { defineProps, onMounted, ref, Ref } from 'vue'
import Chart from '../utils/chart'
import lineChart from '../utils/line-chart'

const props = defineProps<{
  chartConfigs: any,
  chartData: any[]
}>()
// console.log(props.chartConfigs)
// console.log(props.chartData)
const chart1:Ref<any> = ref(null)
const chart2:Ref<any> = ref(null)

onMounted(() => {
  chart1.value = Chart(<HTMLElement>document.getElementById(props.chartConfigs['tableName'] + 1), props.chartConfigs['tableName'], props.chartData)
  chart2.value = lineChart(<HTMLElement>document.getElementById(props.chartConfigs['tableName'] + 2), props.chartConfigs['tableName'], props.chartData)
})
</script>
  
<style lang="scss" scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
