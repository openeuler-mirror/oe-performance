import { jobModel } from '@/model/data-model'

export interface configObject {
  [key: string]: any
}

export const fieldsConfig = Object.assign({}, jobModel.fields) as configObject

// 根据场景，可选择不同的套件进行查询
// 只在性能基线页面中使用
export const suiteConfig: configObject = {
  bigData: {
    suiteList: ['unixbench', 'lmbench3', 'stream'],
  },
  dataBase: {
    suiteList: ['???', '??', '?'],
  },
  distributedStorage: {
    suiteList: ['unixbench', 'lmbench3', 'iperf'],
  },
  cpu: {
    suiteList: ['???', '??', '?'],
  },
  memory: {
    suiteList: ['unixbench', 'lmbench3', 'iperf'],
  },
  storage: {
    suiteList: ['???', '??', '?'],
  },
  network: {
    suiteList: ['unixbench', 'lmbench3', 'iperf'],
  },
  basic: {
    suiteList: ['???', '??', '?'],
  },
  basicPerformance: {
    suiteList: ['unixbench', 'lmbench3', 'iperf'],
  },
  solution: {
    suiteList: ['???', '??', '?'],
  }
}