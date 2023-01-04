import * as echarts from 'echarts'
 
/* eslint-disable max-lines-per-function */
const option = function(title:string, data:any[], cases:string[]){
  const series:any[] = []
  data.forEach((item:any) => {
    series.push(
      {
        name: item['dimensionId'],
        type: 'line',
        data: Object.values(item)
      }
    )
  })
  return {
    title: {
      text: title,
      left: 'center',
      textStyle: {
        fontWeight: 500,
        fontSize: 15
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    color: ['#00c853','#2979ff','#1e88e5','#29b6f6','#90caf9'],
    legend: {
      x:'center',
      y: 'bottom',
      type: 'scroll'
    },
    grid: {
      top: '8%',
      left: '2%',
      right: '2%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        // interval: 0 // 强制显示所有标签
      },
      data: cases
    },
    yAxis: {
      type: 'value'
    },
    series
  }
}

export default function (container:HTMLElement, title:string, data:any) {
  const cases = Object.keys(data[0]).filter(item => item !== 'dimensionId')
  const myChart = echarts.init(container)
  option && myChart.setOption(option(title, data, cases))
  window.addEventListener('resize', () => {
    myChart.resize()
  })
  return myChart
}

