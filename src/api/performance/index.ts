import createAxios from '@/utils/request/axios'
import { BaseLine } from '@/views/performance-baseline/types'
import { PerformanceApi } from '../types'

export interface DataObject {
  [key: string]: any
}

const api = {
  requestDataApi: '/data-api/search'
}

export function getSearchParams(params: any) {
  return createAxios({
    url: api.requestDataApi,
    method: 'post',
    data: params
  })
}

export function getPerformanceData(
  params: PerformanceApi.PerformanceDataParams
) {
  return createAxios({
    url: api.requestDataApi,
    method: 'post',
    data: params
  })
}

export function getTestBoxes() {
  return createAxios({
    url: api.requestDataApi,
    method: 'post',
    data: {
      index: 'hosts',
      query: {}
    }
  })
}

/**
 * 请求示例：
 * data: {
      index: 'jobs',
      query: {
        'size': 0,
        'query': {
          'range': {
            'time': {
              'gte': 'now-10d/d'
            }
          }
        },
        'aggs': {
          'my-agg1': {
            'terms': {
              'field': 'suite',
              'size': 100
            }
          },
          'my-agg2': {
            'terms': {
              'field': 'os_version',
              'size': 100
            }
          },
          'my-agg3': {
            'terms': {
              'field': 'os',
              'size': 100
            }
          }
        }
      }
    }
 */

/**
 *  应该构造一个函数SearchParamsFilter，传入searchPanel的原始值，返回的是过滤后的值
 * 过滤内容：
 * 1. 将osv数组（每一个元素都是字符串数组）中，每一个元素使用join('@')连接
 */
interface Aggs {
  [propName: string]: any
}
export function getJobValueList(params: PerformanceApi.JobValueListParams) {
  const { jobFieldList, searchTime = 10, byScene, searchParams } = params
  const aggs: Aggs = {}
  const mustArr = []
  mustArr.push({ range: { time: { gte: `now-${searchTime}d/d` } } })
  if (byScene && byScene?.length > 0) {
    mustArr.push({ terms: { suite: byScene } })
  }
  jobFieldList.forEach((field: string) => {
    if (field === 'tags') return // 只要包含tag就会全部返回空
    aggs[field] = {
      terms: {
        field: field,
        size: 100
      }
    }
  })
  // 请求时根据目前已选的searchParam值进行过滤
  ;(Object.keys(searchParams) as (keyof BaseLine.SearchParams)[]).forEach(
    param => {
      if (!searchParams[param]) return
      if (Array.isArray(searchParams[param]) && searchParams[param]!.length < 1)
        return
      const tempObj = <DataObject>{}
      // 在getSearchParamsByFields以及预处理了
      tempObj[param] = searchParams[param]
      mustArr.push({ terms: tempObj })
    }
  )
  const query = {
    size: 10,
    query: {
      bool: {
        must: mustArr
      }
    },
    aggs
  }

  return createAxios({
    url: api.requestDataApi,
    method: 'post',
    data: {
      index: 'jobs',
      query
    }
  })
}

// 这个接口中的类型, 可以参考PerformanceApi命名空间下的类型
// host表中的几个数据聚合不到,目前没有使用这个接口
export function getHostValueList(params: any) {
  const { hostFieldList } = params
  const aggs: Aggs = {}
  hostFieldList.forEach((field: string) => {
    aggs[field] = {
      terms: {
        field: `${field}`,
        size: 100
      }
    }
  })
  const query = {
    size: 1000,
    aggs
  }
  return createAxios({
    url: api.requestDataApi,
    method: 'post',
    data: {
      index: 'hosts',
      query
    }
  })
}

interface anyObj {
  [propName: string]: any
}

// 这个接口中的类型, 可以参考@/views/performance-baseline/index.vue中的setMustCase函数
// 目前是直接获取全量host数据，直接在本地过滤的，暂时没有用这个接口
export function getTestboxBySearchParams(params: anyObj) {
  const mustCasees = <anyObj>[]
  Object.keys(params).forEach(paramKey => {
    if (params[paramKey]) {
      const searchKey = paramKey.replace('hw.', '')
      const matchObj: anyObj = {}
      matchObj[searchKey] = params[paramKey]
      mustCasees.push({
        match: matchObj
      })
    }
  })

  const query = {
    size: 1000,
    query: {
      bool: {
        must: mustCasees
      }
    }
  }
  return createAxios({
    url: api.requestDataApi,
    method: 'post',
    data: {
      index: 'hosts',
      query
    }
  })
}
