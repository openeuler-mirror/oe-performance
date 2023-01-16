<template>
  <div ref="testTaskDoughnut" style="width: 100%; height: 180px"></div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue'

const props = defineProps({
  stateData: {
    type: Object,
    default: ()=>{}
  },
})

const testTaskDoughnut = ref<any>(null)

const success = ref(12)

const option = {
  title: {
    text: `All cases \n ${success.value}`,
    left: 'center',
    top: 'center'
  },
  legend: {
    orient: 'horizontal',
    icon:'none',
    bottom: '0',
    data: [
      {
        name:'Finished',
        textStyle:{
          color: 'rgba(67, 187, 87)'
        }
      },
      {
        name:'Fail',
        textStyle:{
          color: 'rgba(249, 88, 88, 1)'
        }
      },
      {
        name:'Running',
        textStyle:{
          color: 'rgba(51, 51, 51, 1)'
        }
      },
      {
        name:'Others',
        textStyle:{
          color: 'rgba(255, 166, 52, 1)'
        }
      },]
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
      data: [
        {
          value: 1335,
          name: '通过(111)',
          itemStyle: {
            color: 'rgba(67, 187, 87, 1)'
          }
        },
        {
          value: 234,
          name: '失败',
          itemStyle: {
            color: 'red'
          }
        },
        {
          value: 1548,
          name: '跳过',
          itemStyle: {
            color: 'rgb(108, 114, 126)'
          }
        },
        {
          value: 548,
          name: '警告',
          itemStyle: {
            color: 'rgb(232, 222, 130)'
          }
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