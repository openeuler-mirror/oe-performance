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
      index: 'machine_info',
      query: {}
    }
  })
}

export function getJobValueList() {
  return createAxios({
    url: api.requestDataApi,
    method: 'post',
    data: {
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
  })
}