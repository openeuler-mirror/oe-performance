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