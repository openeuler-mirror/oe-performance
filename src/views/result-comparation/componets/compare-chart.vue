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
import { defineProps, onMounted, ref, Ref, watch } from 'vue'
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
  chart1.value = Chart(<HTMLElement>document.getElementById(props.chartConfigs['tableName'] + 1),
    props.chartConfigs['tableName'], props.chartData)
  chart2.value = lineChart(<HTMLElement>document.getElementById(props.chartConfigs['tableName'] + 2),
    props.chartConfigs['tableName'], props.chartData)
})

watch(() => props.chartData, (newVal) => {
  const series1:any[] = []
  const series2:any[] = []
  newVal.forEach((item:any) => {
    series1.push(
      {
        name: item['dimensionId'],
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: Object.values(item)
      }
    )
    series2.push(
      {
        name: item['dimensionId'],
        type: 'line',
        data: Object.values(item)
      }
    )
  })

  chart1.value.option['yAxis'] = {
    type: 'category',
    data: Object.keys(newVal[0]).filter(item => item !== 'dimensionId')
  }
  chart1.value.option['series'] = series1
  chart1.value.chart.setOption(chart1.value.option, true)

  chart2.value.option['xAxis'] = {
    type: 'category',
    data: Object.keys(newVal[0]).filter(item => item !== 'dimensionId')
  }
  chart2.value.option['series'] = series2
  chart2.value.chart.setOption(chart2.value.option, true)
})
</script>
  
<style lang="scss" scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
