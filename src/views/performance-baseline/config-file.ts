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

export const optionConfig = [
  [
    {
      title: '测试模型版本',
      tag: 'case',
      options: [
        {
          value: 'guide',
          label: 'Guide',
          children: [
            {
              value: 'disciplines',
              label: 'Disciplines'
            }
          ]
        }
      ]
    },
    {
      title: '服务器型号',
      tag: 'system',
      options: [
        {
          value: 'model',
          label: 'Model',
          children: [
            {
              value: 'di',
              label: 'Di'
            }
          ]
        }
      ]
    },
    {
      title: 'CPU配置',
      tag: 'system',
      options: [
        {
          value: 'gu',
          label: 'Gu',
          children: [
            {
              value: 'dis',
              label: 'Dis'
            }
          ]
        }
      ]
    },
    {
      title: '内存配置',
      tag: 'system',
      options: [
        {
          value: 'g',
          label: 'G',
          children: [
            {
              value: 'disc',
              label: 'Disc'
            }
          ]
        }
      ]
    }
  ],
  [
    {
      title: '硬件配置',
      tag: 'system',
      options: [
        {
          value: 'gsd',
          label: 'Gsd',
          children: [
            {
              value: 'discipl',
              label: 'Discipl'
            }
          ]
        }
      ]
    },
    {
      title: 'Raid卡',
      tag: 'system',
      options: [
        {
          value: 'gui',
          label: 'Gui',
          children: [
            {
              value: 'discip',
              label: 'Disciplines'
            }
          ]
        }
      ]
    },
    {
      title: '组网配置',
      tag: 'system',
      options: [
        {
          value: 'cpu',
          label: 'Cpu',
          children: [
            {
              value: 'discipl',
              label: 'Discipl'
            }
          ]
        }
      ]
    },
    {
      title: '测试用例',
      tag: 'case',
      options: [
        {
          value: 'system',
          label: 'Ssytem',
          children: [
            {
              value: 'disc',
              label: 'Disc'
            }
          ]
        }
      ]
    }
  ],
  [
    {
      title: '测试工具版本',
      tag: 'case',
      options: [
        {
          value: 'ui',
          label: 'Ui',
          children: [
            {
              value: 'discipl',
              label: 'Discipl'
            }
          ]
        }
      ]
    },
    {
      title: '操作系统',
      tag: 'system',
      options: [
        {
          value: 'po',
          label: 'Po',
          children: [
            {
              value: 'yebfghj',
              label: 'yebfghj'
            }
          ]
        }
      ]
    },
    {
      title: '数据来源',
      tag: 'case',
      options: [
        {
          value: 'gfe',
          label: 'Gfe',
          children: [
            {
              value: 'jkyhiotjh',
              label: 'jkyhiotjh'
            }
          ]
        }
      ]
    }
  ]
]

export const optionConfig2 = [
  [
    {
      title: '测试模型版本2',
      tag: 'case',
      options: [
        {
          value: 'guide',
          label: 'Guide',
          children: [
            {
              value: 'disciplines',
              label: 'Disciplines'
            }
          ]
        }
      ]
    },
    {
      title: '服务器型号2',
      tag: 'system',
      options: [
        {
          value: 'model',
          label: 'Model',
          children: [
            {
              value: 'di',
              label: 'Di'
            }
          ]
        }
      ]
    },
    {
      title: 'CPU配置2',
      tag: 'system',
      options: [
        {
          value: 'gu',
          label: 'Gu',
          children: [
            {
              value: 'dis',
              label: 'Dis'
            }
          ]
        }
      ]
    },
    {
      title: '内存配置2',
      tag: 'system',
      options: [
        {
          value: 'g',
          label: 'G',
          children: [
            {
              value: 'disc',
              label: 'Disc'
            }
          ]
        }
      ]
    }
  ],
  [
    {
      title: '硬件配置2',
      tag: 'system',
      options: [
        {
          value: 'gsd',
          label: 'Gsd',
          children: [
            {
              value: 'discipl',
              label: 'Discipl'
            }
          ]
        }
      ]
    },
    {
      title: 'Raid卡',
      tag: 'system',
      options: [
        {
          value: 'gui',
          label: 'Gui',
          children: [
            {
              value: 'discip',
              label: 'Disciplines'
            }
          ]
        }
      ]
    },
    {
      title: '组网配置',
      tag: 'system',
      options: [
        {
          value: 'cpu',
          label: 'Cpu',
          children: [
            {
              value: 'discipl',
              label: 'Discipl'
            }
          ]
        }
      ]
    },
    {
      title: '测试用例',
      tag: 'case',
      options: [
        {
          value: 'system',
          label: 'Ssytem',
          children: [
            {
              value: 'disc',
              label: 'Disc'
            }
          ]
        }
      ]
    }
  ],
  [
    {
      title: '测试工具版本',
      tag: 'case',
      options: [
        {
          value: 'ui',
          label: 'Ui',
          children: [
            {
              value: 'discipl',
              label: 'Discipl'
            }
          ]
        }
      ]
    },
    {
      title: '操作系统',
      tag: 'system',
      options: [
        {
          value: 'po',
          label: 'Po',
          children: [
            {
              value: 'yebfghj',
              label: 'yebfghj'
            }
          ]
        }
      ]
    },
    {
      title: '数据来源',
      tag: 'case',
      options: [
        {
          value: 'gfe',
          label: 'Gfe',
          children: [
            {
              value: 'jkyhiotjh',
              label: 'jkyhiotjh'
            }
          ]
        }
      ]
    }
  ]
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

export interface configItem{
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
