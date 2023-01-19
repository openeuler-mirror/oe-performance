import * as echarts from 'echarts';

/* eslint-disable max-lines-per-function */
const option = function(title:string, data:any[], cases:string[]){ 
  const series:any[] = []
  data.forEach((item:any) => {
    series.push(
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
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    // color: ['#00c853','#2979ff','#1e88e5','#29b6f6','#90caf9'],  
    legend: {
      x:'center',
      y: 'bottom',
      type: 'scroll'
    },
    grid: { // 图表主体区域
      top: '8%',
      left: '2%',
      right: '2%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: cases
    },
    series
  }
}

export default function (container:HTMLElement, title:string, data:any) {
  const cases = Object.keys(data[0]).filter(item => item !== 'dimensionId') // 比较项
  const myChart = echarts.init(container);
  option && myChart.setOption(option(title, data, cases))
  window.addEventListener('resize', () => {
    myChart.resize()
  })
  return {
    chart: myChart,
    option: option(title, data, cases)
  }
}
