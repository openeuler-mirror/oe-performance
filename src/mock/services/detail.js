import Mock from 'mock2js';
import { createResponseBody } from '../util.js';
import { detailObj } from './mockData/detail'

// import { detailDataList } from '../mockData/detail'
// 
// const responseObj = {
//   'count': 12,
//   'results': detailDataList
// }

const getDetail = () => {
  return createResponseBody(
    detailObj,
    '获取详情数据成功',
    200,
    { 'Custom-Header': Mock.mock('@guid') }
  );
};

const getWorkLoadDetail = () => {
  return createResponseBody(
    detailObj,
    '获取workload详情数据成功',
    200,
    { 'Custom-Header': Mock.mock('@guid') }
  );
};

Mock.mock(/\/performance_result\/unixbench/, 'get', getDetail);
Mock.mock(/\/performance_result\/unixbench\/workload/, 'get', getWorkLoadDetail);
