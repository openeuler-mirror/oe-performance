export const allColumns = () => {
  return [
    {
      label: '测试人',
      prop: 'tester'
    },
    {
      label: '测试用例',
      prop: 'testCase'
    },
    {
      label: '任务名称',
      prop: 'missionName'
    },
    {
      label: '服务器型号',
      prop: 'serverModel'
    },
    {
      label: '数据状态',
      prop: 'dataState'
    },
    {
      label: 'CPU总核数',
      prop: 'cpuNums'
    },
    {
      label: 'CPU频率MHz',
      prop: 'cpuMHz'
    },
    {
      label: '操作系统页表大小',
      prop: 'pageTableSize'
    },
    {
      label: '内存型号',
      prop: 'memoryModel'
    },
    {
      label: '单位(描述)',
      prop: 'describe'
    }
  ]
}

export const tableDatas = () => {
  return [
    {
      check: true,
      testCase: '用例一',
      missionName: '任务一',
      dataSource: 'openEuler',
      tester: 'chen',
      serverModel: 'Taishang200',
      dataState: '待审核',
      cpuNums: '8',
      cpuMHz: '2000',
      pageTableSize: '4k',
      memoryModel: '312*32GB 2R DDR4 2933',
      describe: 'openEuler',
      testCaseName: 'TPC-DS'
    },
    {
      check: false,
      testCase: '用例四',
      missionName: '任务四',
      dataSource: 'Windows',
      tester: 'zilanser',
      serverModel: 'Taishang200',
      dataState: '审核中',
      cpuNums: '8',
      cpuMHz: '2000',
      pageTableSize: '4k',
      memoryModel: '312*32GB 2R DDR4 2933',
      describe: 'openEuler',
      testCaseName: 'TPC-DS'
    },
    {
      check: false,
      testCase: '用例二',
      missionName: '任务二',
      dataSource: 'Centos',
      tester: 'chd',
      serverModel: 'Taishang200',
      dataState: '已审核',
      cpuNums: '8',
      cpuMHz: '2000',
      pageTableSize: '4k',
      memoryModel: '312*32GB 2R DDR4 2933',
      describe: 'openEuler',
      testCaseName: 'TPC-DS'
    }
  ]
}
