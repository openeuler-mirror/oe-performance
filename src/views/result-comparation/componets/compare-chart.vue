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
import { defineProps, onMounted, watch } from 'vue'
import Chart from '../utils/chart'
import lineChart from '../utils/line-chart'

const props = defineProps<{
  chartConfigs: any,
  chartData: any[]
}>()

// 这里不要用响应式,不然图表更新后,tooltip和legend失效
let chart1:any = null
let chart2:any = null

onMounted(() => {
  chart1 = Chart(<HTMLElement>document.getElementById(props.chartConfigs['tableName'] + 1),
    props.chartConfigs['tableName'], props.chartData)
  chart2 = lineChart(<HTMLElement>document.getElementById(props.chartConfigs['tableName'] + 2),
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
        // stack: 'total',
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

  chart1.option['yAxis']['data'] = Object.keys(newVal[0]).filter(item => item !== 'dimensionId')
  chart1.option['series'] = series1
  chart1.chart.setOption(chart1.option, true)

  chart2.option['xAxis']['data'] = Object.keys(newVal[0]).filter(item => item !== 'dimensionId')
  chart2.option['series'] = series2
  chart2.chart.setOption(chart2.option, true)
})
</script>
  
<style lang="scss" scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
