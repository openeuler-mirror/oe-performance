import createAxios from '@/utils/request/axios';

const api = {
  getPerformanceData: '/data-api/search'
}

export function getPerformanceData(params:any) {
  return createAxios({
    url: api.getPerformanceData,
    method: 'post',
    data: params
  })
}