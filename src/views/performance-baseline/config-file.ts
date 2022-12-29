import { jobModel } from '@/model/data-model'

const { suite, ...temp } = jobModel.fields
export const fieldsConfig = {...temp} as configItem

export const columnConfig = [
  {
    label: '提交编号',
    prop: 'sbumit_id',
    show: true
  },
  {
    label: '提交日期',
    prop: 'submit_date',
    show: true
  },
  {
    label: '提交时间',
    prop: 'submit_time',
    show: true
  },
  {
    label: '操作系统',
    prop: 'os_release',  // 需要拼接
    show: true
  },
  {
    label: '测试机',
    prop: 'testbox',
    show: true
  },
  {
    label: '系统架构',
    prop: 'os_arch',
    show: true
  },
  {
    label: 'CPU核数',
    prop: 'nr_cpu',
    show: true
  },
  {
    label: 'CPU内核',
    prop: 'kernel_version',
    show: true
  },
  {
    label: '内存配置',
    prop: 'memory',
    show: true
  },
  {
    label: '操作系统页表大小',
    prop: 'nr_node',
    show: true
  },
  {
    label: '创建人',
    prop: 'created_by',
    show: true
  },
  {
    label: '测试人',
    prop: 'tested_by',
    show: true
  },
  {
    label: '服务器型号',
    prop: '',
    show: true
  },
  {
    label: '数据状态',
    prop: 'job_state',
    show: true
  },
  {
    label: 'CPU总核数',
    prop: '',
    show: true
  },
  {
    label: 'CPU频率MHz',
    prop: '',
    show: true
  },
  {
    label: '操作系统页表大小',
    prop: '',
    show: true
  },
  {
    label: '测试模型',
    prop: 'model_name',
    show: true
  },
  {
    label: '命令行',
    prop: '',
    show: true
  },
  {
    label: '单位(描述)',
    prop: '',
    show: true
  },
  {
    label: '指标',
    prop: '',
    show: true
  },
  {
    label: 'CPU总线程数',
    prop: '',
    show: true
  },
  {
    label: '所属系列',
    prop: '',
    show: true
  },
  {
    label: 'CPU配置',
    prop: '',
    show: true
  },
  {
    label: '硬盘配置',
    prop: '',
    show: true
  },
  {
    label: '硬盘型号',
    prop: 'model_name',
    show: true
  },
  {
    label: 'Raid卡配置',
    prop: '',
    show: true
  },
  {
    label: 'Raid组',
    prop: '',
    show: true
  },
  {
    label: '网卡配置',
    prop: '',
    show: true
  },
  {
    label: 'PSU配置',
    prop: '',
    show: true
  },
  {
    label: '风扇配置',
    prop: '',
    show: true
  },
  {
    label: '板卡配置',
    prop: '',
    show: true
  },
  {
    label: 'BMC版本',
    prop: '',
    show: true
  },
  {
    label: 'BIOS版本',
    prop: '',
    show: true
  },
  {
    label: 'BIOS配置详情',
    prop: '',
    show: true
  },
  {
    label: '系统内核',
    prop: '',
    show: true
  },
  {
    label: '编译器版本',
    prop: '',
    show: true
  },
  {
    label: '测试工具版本',
    prop: '',
    show: true
  },
  {
    label: 'GLIBC版本',
    prop: '',
    show: true
  },
  {
    label: 'JDK版本',
    prop: '',
    show: true
  },
  {
    label: 'numa信息',
    prop: '',
    show: true
  },
  {
    label: '性能数据',
    prop: 'perf-profile',
    show: true
  },
  {
    label: '测试模型',
    prop: '',
    show: true
  },
  {
    label: '创建时间',
    prop: '',
    show: true
  }
]

export const columnConfig2 = [
  {
    label: '提交编号',
    prop: 'sbumit_id',
    show: true
  },
  {
    label: '提交日期',
    prop: 'submit_date',
    show: true
  },
  {
    label: '提交时间',
    prop: 'submit_time',
    show: true
  },
  {
    label: '操作系统',
    prop: 'os_release',  // 需要拼接
    show: true
  },
  {
    label: '测试机',
    prop: 'testbox',
    show: true
  },
  {
    label: '系统架构',
    prop: 'os_arch',
    show: true
  },
  {
    label: 'CPU核数',
    prop: 'nr_cpu',
    show: true
  },
  {
    label: 'CPU内核',
    prop: 'kernel_version',
    show: true
  },
  {
    label: '内存配置',
    prop: 'memory',
    show: true
  },
  {
    label: '操作系统页表大小',
    prop: 'nr_node',
    show: true
  },
  {
    label: '创建人',
    prop: 'created_by',
    show: true
  },
  {
    label: '测试人',
    prop: 'tested_by',
    show: true
  },
  {
    label: '服务器型号',
    prop: '',
    show: true
  },
  {
    label: '数据状态',
    prop: 'job_state',
    show: true
  },
  {
    label: 'CPU总核数',
    prop: '',
    show: true
  },
  {
    label: 'CPU频率MHz',
    prop: '',
    show: true
  },
  {
    label: '操作系统页表大小',
    prop: '',
    show: true
  },
  {
    label: '测试模型',
    prop: 'model_name',
    show: true
  },
  {
    label: '命令行',
    prop: '',
    show: true
  },
  {
    label: '单位(描述)',
    prop: '',
    show: true
  },
  {
    label: '指标',
    prop: '',
    show: true
  },
  {
    label: 'CPU总线程数',
    prop: '',
    show: true
  },
  {
    label: '所属系列',
    prop: '',
    show: true
  },
  {
    label: 'CPU配置',
    prop: '',
    show: true
  },
  {
    label: '内存配置',
    prop: '',
    show: true
  },
  {
    label: '硬盘配置',
    prop: '',
    show: true
  },
  {
    label: '硬盘型号',
    prop: '',
    show: true
  },
  {
    label: 'Raid卡配置',
    prop: '',
    show: true
  },
  {
    label: 'Raid组',
    prop: '',
    show: true
  },
  {
    label: '网卡配置',
    prop: '',
    show: true
  },
  {
    label: 'PSU配置',
    prop: '',
    show: true
  },
  {
    label: '风扇配置',
    prop: '',
    show: true
  },
  {
    label: '板卡配置',
    prop: '',
    show: true
  },
  {
    label: 'BMC版本',
    prop: '',
    show: true
  },
  {
    label: 'BIOS版本',
    prop: '',
    show: true
  },
  {
    label: 'BIOS配置详情',
    prop: '',
    show: true
  },
  {
    label: '系统内核',
    prop: '',
    show: true
  },
  {
    label: '编译器版本',
    prop: '',
    show: true
  },
  {
    label: '测试工具版本',
    prop: '',
    show: true
  },
  {
    label: 'GLIBC版本',
    prop: '',
    show: true
  },
  {
    label: 'JDK版本',
    prop: '',
    show: true
  },
  {
    label: 'numa信息',
    prop: '',
    show: true
  },
  {
    label: '性能数据',
    prop: 'perf-profile',
    show: true
  },
  {
    label: '测试模型',
    prop: '',
    show: true
  },
  {
    label: '创建时间',
    prop: '',
    show: true
  }
]

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
  ]
}

export interface configItem {
  [key: string]: any
}

export const config: configItem = {
  bigData: {
    suiteList: ['unixbench', 'lmbench3', 'stream'],
    column: columnConfig
  },
  dataBase: {
    suiteList: ['???', '??', '?'],
    column: columnConfig2
  },
  distributedStorage: {
    suiteList: ['unixbench', 'lmbench3', 'iperf'],
    column: columnConfig
  },
  cpu: {
    suiteList: ['???', '??', '?'],
    column: columnConfig2
  },
  memory: {
    suiteList: ['unixbench', 'lmbench3', 'iperf'],
    column: columnConfig
  },
  storage: {
    suiteList: ['???', '??', '?'],
    column: columnConfig2
  },
  network: {
    suiteList: ['unixbench', 'lmbench3', 'iperf'],
    column: columnConfig
  },
  basic: {
    suiteList: ['???', '??', '?'],
    column: columnConfig2
  },
  basicPerformance: {
    suiteList: ['unixbench', 'lmbench3', 'iperf'],
    column: columnConfig
  },
  solution: {
    suiteList: ['???', '??', '?'],
    column: columnConfig2
  }
}
