import createAxios from '@/utils/request/axios';

const api = {
  getDetail: '/performance_result/unixbench/',
  getWorkLoadDetail: '/performance_result/unixbench/workload'
//   detailCompare: '/performance_result/unixbench/?distinct=unixbench_testcase_name'
}

export function getDetail(limit: number) {
  return createAxios({
    url: api.getDetail,
    method: 'get',
    params: {
      limit: limit
    }
  })
}

export function getWorkLoadDetail() {
  return createAxios({
    url: api.getWorkLoadDetail,
    method: 'get'
  })
}
