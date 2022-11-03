import createAxios from '@/utils/request/axios';

const api = {
  getDetail: '/performance_result/unixbench/?limit=10',
//   detailCompare: '/performance_result/unixbench/?distinct=unixbench_testcase_name'
}

export function getDetail() {
  return createAxios({
    url: api.getDetail,
    method: 'get'
  })
}
