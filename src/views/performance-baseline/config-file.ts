import { ref } from 'vue'
export const columnConfig = [
  {
    label: '操作系统',
    prop: 'os_release'  // 需要拼接
  },
  {
    label: '测试机',
    prop: 'testbox'
  },
  {
    label: '系统架构',
    prop: 'os_arch'
  },
  {
    label: 'CPU核数',
    prop: 'nr_cpu'
  },
  {
    label: 'CPU内核',
    prop: 'kernel_version'
  },
  {
    label: '内存配置',
    prop: 'memory'
  },
  {
    label: '操作系统页表大小',
    prop: 'nr_node'
  },
  {
    label: '提交时间',
    prop: 'submit_time'
  },
  {
    label: '创建人',
    prop: 'created_by'
  },
  {
    label: '测试人',
    prop: 'tested_by'
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

export const optionConfig = ref([
  [
    {
      title: '测试模型版本',
      paramKey: 'testv',
      bindValue: '',
      tag: 'case',
      options: [
        {
          value: 'guide',
          label: 'Guide'
        },
        {
          value: 'disciplines',
          label: 'Disciplines'
        },
        {
          value: 'yut',
          label: 'uityu'
        }
      ]
    },
    {
      title: '服务器型号',
      paramKey: 'model',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'model',
          label: 'sdad'
        }
      ]
    },
    {
      title: 'CPU配置',
      paramKey: 'cpuconfig',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'gu',
          label: 'Gu'
        }
      ]
    },
    {
      title: '内存配置',
      paramKey: 'memory',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'g',
          label: 'G'
        },
        {
          value: 'disc',
          label: 'Disc'
        }
      ]
    }
  ],
  [
    {
      title: '硬件配置',
      paramKey: 'con',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'gsd',
          label: 'Gsd'
        },
        {
          value: 'discipl',
          label: 'Discipl'
        }
      ]
    },
    {
      title: 'Raid卡',
      paramKey: 'Raid',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'gui',
          label: 'Gui'
        },
        {
          value: 'disciplines',
          label: 'Disciplines'
        }
      ]
    },
    {
      title: '组网配置',
      paramKey: 'netGroup',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'cpu',
          label: 'Cpu'
        },
        {
          value: 'discipl',
          label: 'Discipl'
        }
      ]
    },
    {
      title: '测试用例',
      paramKey: 'testCase',
      bindValue: '',
      tag: 'case',
      options: [
        {
          value: 'system',
          label: 'System'
        },
        {
          value: 'disc',
          label: 'Disc'
        }
      ]
    }
  ],
  [
    {
      title: '测试工具版本',
      paramKey: 'testTool',
      bindValue: '',
      tag: 'case',
      options: [
        {
          value: 'ui',
          label: 'Ui'
        },
        {
          value: 'discip',
          label: 'Discip'
        }
      ]
    },
    {
      title: '操作系统',
      paramKey: 'os',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'po',
          label: 'Po'
        },
        {
          value: 'yebfghj',
          label: 'yebfghj'
        }
      ]
    },
    {
      title: '数据来源',
      paramKey: 'resourse',
      bindValue: '',
      tag: 'case',
      options: [
        {
          value: 'gfe',
          label: 'Gfe'
        },
        {
          value: 'jkyhiotjh',
          label: 'jkyhiotjh'
        }
      ]
    }
  ]
])

export const optionConfig2 = ref([
  [
    {
      title: '测试模型版本2',
      paramKey: 'testv',
      bindValue: '',
      tag: 'case',
      options: [
        {
          value: 'guide',
          label: 'Guide'
        },
        {
          value: 'disciplines',
          label: 'Disciplines'
        },
        {
          value: 'yut',
          label: 'uityu'
        }
      ]
    },
    {
      title: '服务器型号2',
      paramKey: 'model',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'model',
          label: 'sdad'
        }
      ]
    },
    {
      title: 'CPU配置2',
      paramKey: 'cpuconfig',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'gu',
          label: 'Gu'
        }
      ]
    },
    {
      title: '内存配置2',
      paramKey: 'memory',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'g',
          label: 'G'
        },
        {
          value: 'disc',
          label: 'Disc'
        }
      ]
    }
  ],
  [
    {
      title: '硬件配置2',
      paramKey: 'con',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'gsd',
          label: 'Gsd'
        },
        {
          value: 'discipl',
          label: 'Discipl'
        }
      ]
    },
    {
      title: 'Raid卡2',
      paramKey: 'Raid',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'gui',
          label: 'Gui'
        },
        {
          value: 'disciplines',
          label: 'Disciplines'
        }
      ]
    },
    {
      title: '组网配置2',
      paramKey: 'netGroup',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'cpu',
          label: 'Cpu'
        },
        {
          value: 'discipl',
          label: 'Discipl'
        }
      ]
    },
    {
      title: '测试用例2',
      paramKey: 'testCase',
      bindValue: '',
      tag: 'case',
      options: [
        {
          value: 'system',
          label: 'System'
        },
        {
          value: 'disc',
          label: 'Disc'
        }
      ]
    }
  ],
  [
    {
      title: '测试工具版本2',
      paramKey: 'testTool',
      bindValue: '',
      tag: 'case',
      options: [
        {
          value: 'ui',
          label: 'Ui'
        },
        {
          value: 'discip',
          label: 'Discip'
        }
      ]
    },
    {
      title: '操作系统2',
      paramKey: 'os',
      bindValue: '',
      tag: 'system',
      options: [
        {
          value: 'po',
          label: 'Po'
        },
        {
          value: 'yebfghj',
          label: 'yebfghj'
        }
      ]
    },
    {
      title: '数据来源2',
      paramKey: 'resourse',
      bindValue: '',
      tag: 'case',
      options: [
        {
          value: 'gfe',
          label: 'Gfe'
        },
        {
          value: 'jkyhiotjh',
          label: 'jkyhiotjh'
        }
      ]
    }
  ]
])

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
  // contrast: [
  //   {
  //     label: '基础性能',
  //     prop: 'basicPerformance'
  //   },
  //   {
  //     label: '解决方案',
  //     prop: 'solution'
  //   }
  // ]
}

export interface configItem {
  [key: string]: any
}

export const config: configItem = {
  bigData: {
    testSubassembly: ['unixbench', 'lmbench3', 'iperf'],
    filterCriteria: optionConfig,
    column: columnConfig
  },
  dataBase: {
    testSubassembly: ['???', '??', '?'],
    filterCriteria: optionConfig2,
    column: columnConfig2
  },
  distributedStorage: {
    testSubassembly: ['unixbench', 'lmbench3', 'iperf'],
    filterCriteria: optionConfig,
    column: columnConfig
  },
  cpu: {
    testSubassembly: ['???', '??', '?'],
    filterCriteria: optionConfig2,
    column: columnConfig2
  },
  memory: {
    testSubassembly: ['unixbench', 'lmbench3', 'iperf'],
    filterCriteria: optionConfig,
    column: columnConfig
  },
  storage: {
    testSubassembly: ['???', '??', '?'],
    filterCriteria: optionConfig2,
    column: columnConfig2
  },
  network: {
    testSubassembly: ['unixbench', 'lmbench3', 'iperf'],
    filterCriteria: optionConfig,
    column: columnConfig
  },
  basic: {
    testSubassembly: ['???', '??', '?'],
    filterCriteria: optionConfig2,
    column: columnConfig2
  },
  basicPerformance: {
    testSubassembly: ['unixbench', 'lmbench3', 'iperf'],
    filterCriteria: optionConfig,
    column: columnConfig
  },
  solution: {
    testSubassembly: ['???', '??', '?'],
    filterCriteria: optionConfig2,
    column: columnConfig2
  }
}
