<template>
  <div ref="testTaskDoughnut" style="width: 100%; height: 180px"></div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  stateData: {
    type: Object,
    default: () => {}
  }
})

let chart: any = null

const testTaskDoughnut = ref<any>(null)

const allState = ref(0)

const option = {
  tooltip: {
    trigger: 'item'
  },
  title: {
    text: '',
    left: 'center',
    top: 'center'
  },
  series: [
    {
      type: 'pie',
      radius: ['60%', '90%'],
      bottom: '20',
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
}

watch(
  () => props.stateData,
  stateData => {
    allState.value = stateData.all
    option.title.text = `All Cases \n ${allState.value}`
    const stateList: TestTask.DoughnutStateList = []
    stateList.push({
      value: stateData.finished || 0,
      name: '完成'
    })
    stateList.push({
      value: stateData.failed || 0,
      name: '失败'
    })
    stateList.push({
      value: stateData.others || 0,
      name: '其他'
    })
    // 当前版本 echarts 的typescript类型并不完善
    option.series[0].data = stateList as any

    chart.setOption(option, true)
  }
)

onMounted(() => {
  chart = echarts.init(testTaskDoughnut.value as HTMLCanvasElement)
  option && chart.setOption(option)
  // window.onresize = function () {
  //   Chart.resize()
  // }
})
</script>
