import createAxios from '@/utils/request/axios';

const api = {
  requestDataApi: '/data-api/search'
}

export function getSearchParams(params:any) {
  return createAxios({
    url: api.requestDataApi,
    method: 'post',
    data: params
  })
}

export function getPerformanceData(params:any) {
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

interface Aggs {
  [propName: string]: any
}
export function getJobValueList(params:any) {
  const { jobFieldList, searchTime = 10, byScene } = params
  const aggs: Aggs = {}
  const mustArr = []
  mustArr.push({ range: { time: { gte: `now-${searchTime}d/d` } } })
  if (byScene && byScene?.length > 0) {
    mustArr.push({ terms: { suite: byScene } })
  }
  jobFieldList.forEach((field:string) => {
    if (field === 'tags') return // 只要包含tag就会全部返回空
    aggs[field] = {
      terms: {
        field: field,
        size: 100
      }
    }
  })
  // aggs['nr_cpu'] = {terms: {field: 'nr_cpu', size:100}}
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
// host表中的几个数据聚合不到,目前没有使用这个接口
export function getHostValueList(params:any) {
  const { hostFieldList } = params
  const aggs: Aggs = {}
  hostFieldList.forEach((field:string) => {
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
// 目前是直接获取全量host数据，直接在本地过滤的，暂时没有用这个接口
export function getTestboxBySearchParams(params: anyObj) {
  const mustCasees = <anyObj>[]
  Object.keys(params).forEach(paramKey => {
    if (params[paramKey]) {
      const searchKey = paramKey.replace('hw.', '')
      const matchObj:anyObj = {}
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