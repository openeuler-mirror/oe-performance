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
  const { jobFieldList } = params
  const aggs: Aggs = {}
  jobFieldList.forEach((field:string) => {
    if (field === 'tags') return // 只要包含tag就会全部返回空
    aggs[field] = {
      terms: {
        field: field,
        size: 100
      }
    }
  })
  const query = {
    size: 0,
    query: {
      range: {
        time: {
          gte: 'now-10d/d'
        }
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
export function getHostValueList(params:any) {
  const { hostFieldList } = params
  const aggs: Aggs = {}
  hostFieldList.forEach((field:string) => {
    aggs[field] = {
      terms: {
        field: field,
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
export function getTestboxBySearchParams(params: anyObj) {
  const mustCasees = <anyObj>[]
  Object.keys(params).forEach(paramKey => {
    if (params[paramKey]) {
      const matchObj:anyObj = {}
      matchObj[paramKey] = params[paramKey]
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