import createAxios from '@/utils/request/axios';

const api = {
  getDetail: '/performance_result/unixbench/',
  getWorkLoadDetail: '/performance_result/unixbench/workload',
  queryBySystemParam: 'performance_result/unixbench/queryBySystemParam',
  queryCriteria: 'performance_result/unixbench/queryCriteria'
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

export function queryBySystemParam(param: any) {
  return createAxios({
    url: api.queryBySystemParam,
    method: 'get',
    params: {
      param: param
    }
  })
}

export function queryCriteria(param: any, submit_id?: string[]) {
  return createAxios({
    url: api.queryCriteria,
    method: 'get',
    params: {
      param: param,
      submit_id: submit_id
    }
  })
}