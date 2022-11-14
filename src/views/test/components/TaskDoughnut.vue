<template>
  <div ref="testTaskDoughnut" style="width: 100%; height: 180px"></div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue'
const testTaskDoughnut = ref<any>(null)

const option = {
  title: {
    text: 'All cases \n 2908',
    left: 'center',
    top: 'center'
  },
  legend: {
    orient: 'horizontal',
    bottom: '0',
    data: ['通过', '失败', '跳过','警告']
  },
  label: {
    show: false
  },
  series: [
    {
      type: 'pie',
      radius: ['60%', '90%'],
      bottom: '20',
      data: [
        {
          value: 335,
          name: '通过'
        },
        {
          value: 234,
          name: '失败'
        },
        {
          value: 1548,
          name: '跳过'
        },
        {
          value: 1548,
          name: '警告'
        }
      ]
    }
  ]
};

onMounted(() => {
  const Chart = echarts.init(testTaskDoughnut.value as HTMLCanvasElement);
  option && Chart.setOption(option);
  // window.onresize = function () {
  //   Chart.resize()
  // }
})
</script>