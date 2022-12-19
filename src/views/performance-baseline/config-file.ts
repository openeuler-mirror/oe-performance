import { ref } from 'vue'
export const columnConfig = [
  {
    label: '测试用例名称',
    prop: 'submit_id'
  },
  {
    label: '测试人',
    prop: 'my_account'
  },
  {
    label: '服务器型号',
    prop: ''
  },
  {
    label: '数据状态',
    prop: 'job_state'
  },
  {
    label: 'CPU总核数',
    prop: ''
  },
  {
    label: 'CPU频率MHz',
    prop: ''
  },
  {
    label: '操作系统页表大小',
    prop: ''
  },
  {
    label: '内存型号',
    prop: 'memory'
  },
  {
    label: '测试模型',
    prop: 'model_name'
  },
  {
    label: '命令行',
    prop: ''
  },
  {
    label: '单位(描述)',
    prop: ''
  },
  {
    label: '指标',
    prop: ''
  },
  {
    label: 'CPU总线程数',
    prop: ''
  },
  {
    label: '所属系列',
    prop: ''
  },
  {
    label: 'CPU配置',
    prop: ''
  },
  {
    label: '内存配置',
    prop: ''
  },
  {
    label: '硬盘配置',
    prop: ''
  },
  {
    label: '硬盘型号',
    prop: ''
  },
  {
    label: 'Raid卡配置',
    prop: ''
  },
  {
    label: 'Raid组',
    prop: ''
  },
  {
    label: '网卡配置',
    prop: ''
  },
  {
    label: 'PSU配置',
    prop: ''
  },
  {
    label: '风扇配置',
    prop: ''
  },
  {
    label: '板卡配置',
    prop: ''
  },
  {
    label: 'BMC版本',
    prop: ''
  },
  {
    label: 'BIOS版本',
    prop: ''
  },
  {
    label: 'BIOS配置详情',
    prop: ''
  },
  {
    label: '操作系统',
    prop: ''
  },
  {
    label: '系统内核',
    prop: ''
  },
  {
    label: '编译器版本',
    prop: ''
  },
  {
    label: '测试工具版本',
    prop: ''
  },
  {
    label: 'GLIBC版本',
    prop: ''
  },
  {
    label: 'JDK版本',
    prop: ''
  },
  {
    label: 'numa信息',
    prop: ''
  },
  {
    label: '性能数据',
    prop: ''
  },
  {
    label: '测试模型',
    prop: ''
  },
  {
    label: '创建时间',
    prop: ''
  }
]

export const columnConfig2 = [
  {
    label: '测试用例名称2',
    prop: 'submit_id'
  },
  {
    label: '测试人2',
    prop: 'my_account'
  },
  {
    label: '服务器型号2',
    prop: ''
  },
  {
    label: '数据状态2',
    prop: 'job_state'
  },
  {
    label: 'CPU总核数2',
    prop: ''
  },
  {
    label: 'CPU频率MHz',
    prop: ''
  },
  {
    label: '操作系统页表大小',
    prop: ''
  },
  {
    label: '内存型号',
    prop: 'memory'
  },
  {
    label: '测试模型',
    prop: 'model_name'
  },
  {
    label: '命令行',
    prop: ''
  },
  {
    label: '单位(描述)',
    prop: ''
  },
  {
    label: '指标',
    prop: ''
  },
  {
    label: 'CPU总线程数',
    prop: ''
  },
  {
    label: '所属系列',
    prop: ''
  },
  {
    label: 'CPU配置',
    prop: ''
  },
  {
    label: '内存配置',
    prop: ''
  },
  {
    label: '硬盘配置',
    prop: ''
  },
  {
    label: '硬盘型号',
    prop: ''
  },
  {
    label: 'Raid卡配置',
    prop: ''
  },
  {
    label: 'Raid组',
    prop: ''
  },
  {
    label: '网卡配置',
    prop: ''
  },
  {
    label: 'PSU配置',
    prop: ''
  },
  {
    label: '风扇配置',
    prop: ''
  },
  {
    label: '板卡配置',
    prop: ''
  },
  {
    label: 'BMC版本',
    prop: ''
  },
  {
    label: 'BIOS版本',
    prop: ''
  },
  {
    label: 'BIOS配置详情',
    prop: ''
  },
  {
    label: '操作系统',
    prop: ''
  },
  {
    label: '系统内核',
    prop: ''
  },
  {
    label: '编译器版本',
    prop: ''
  },
  {
    label: '测试工具版本',
    prop: ''
  },
  {
    label: 'GLIBC版本',
    prop: ''
  },
  {
    label: 'JDK版本',
    prop: ''
  },
  {
    label: 'numa信息',
    prop: ''
  },
  {
    label: '性能数据',
    prop: ''
  },
  {
    label: '测试模型',
    prop: ''
  },
  {
    label: '创建时间',
    prop: ''
  }
]

export interface bindValue {
  [key: string]: string
}

export const optionBind = ref({
  'suite': '',
  'submit_id': '',
  'group_id': '',
  'tags': '',
  'osv': '',
  'os_arch': '',
  'testbox': '',
  'hw.nr_cpu': '',
  'hw.nr_node': '',
  'hw.memory': '',
} as bindValue)

export const sceneConfig = {
  solution: [
    {
      label: '大数据',
      prop: 'bigData'
    },
    {
      label: '数据库',
      prop: 'dataBase'
    },
    {
      label: '分布式存储',
      prop: 'distributedStorage'
    }
  ],
  basic: [
    {
      label: 'CPU',
      prop: 'cpu'
    },
    {
      label: '内存',
      prop: 'memory'
    },
    {
      label: '存储',
      prop: 'storage'
    },
    {
      label: '网络',
      prop: 'network'
    },
    {
      label: '基础库',
      prop: 'basic'
    }
  ],
  contrast: [
    {
      label: '基础性能',
      prop: 'basicPerformance'
    },
    {
      label: '解决方案',
      prop: 'solution'
    }
  ]
}

export interface configItem {
  [key: string]: any
}

export const config: configItem = {
  bigData: {
    testSubassembly: ['unixbench', 'lmbench3', 'iperf'],
    column: columnConfig
  },
  dataBase: {
    testSubassembly: ['???', '??', '?'],
    column: columnConfig2
  },
  distributedStorage: {
    testSubassembly: ['unixbench', 'lmbench3', 'iperf'],
    column: columnConfig
  },
  cpu: {
    testSubassembly: ['???', '??', '?'],
    column: columnConfig2
  },
  memory: {
    testSubassembly: ['unixbench', 'lmbench3', 'iperf'],
    column: columnConfig
  },
  storage: {
    testSubassembly: ['???', '??', '?'],
    column: columnConfig2
  },
  network: {
    testSubassembly: ['unixbench', 'lmbench3', 'iperf'],
    column: columnConfig
  },
  basic: {
    testSubassembly: ['???', '??', '?'],
    column: columnConfig2
  },
  basicPerformance: {
    testSubassembly: ['unixbench', 'lmbench3', 'iperf'],
    column: columnConfig
  },
  solution: {
    testSubassembly: ['???', '??', '?'],
    column: columnConfig2
  }
}
