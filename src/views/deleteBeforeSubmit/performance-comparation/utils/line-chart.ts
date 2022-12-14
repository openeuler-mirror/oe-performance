import * as echarts from 'echarts'

const option = {
  tooltip: {
    trigger: 'axis'
  },
  color: ['#00c853','#2979ff','#1e88e5','#29b6f6','#90caf9'],
  legend: {
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['test_case1', 'test_case2', 'test_case3', 'test_case4', 'test_case5']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'openEuler21.0.3LTS',
      type: 'line',
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: 'windwows server sp1',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'centos-3.0',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'centos-7.6',
      type: 'line',
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: 'ubuntu-20.04-LTS',
      type: 'line',
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ]
}

export default function (container:HTMLElement) {
  const myChart = echarts.init(container)
  option && myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

