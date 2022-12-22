import createAxios from '@/utils/request/axios';
import { UploadUserFile } from 'element-plus'

const api = {
  getApplicationList: '/usercenter/application/getapplicationlist',
  removeApplication: '/usercenter/application/removeApplication',
  testScenario: '/usercenter/new/getscenario',
  newApplication: '/usercenter/new',
  approvalAction: '/usercenter/approval/approvalAction',

  // 通用es接口
  requestDataApi: '/data-api/search'
}

export function getTaskStatusCounts() {
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
          'job_stage': {
            'terms': {
              'field': 'job_stage',
              'size': 100
            }
          },
          'job_state': {
            'terms': {
              'field': 'job_state',
              'size': 100
            }
          },
          'job_health': {
            'terms': {
              'field': 'job_health',
              'size': 100
            }
          }
        }
      }
    }
  })
}

export function getApplicationList() {
  return createAxios({
    url: api.getApplicationList,
    method: 'get'
  })
}

export function removeApplication(requestCode: string) {
  return createAxios({
    url: api.removeApplication,
    method: 'get',
    data: {
      requestCode
    }
  })
}

export function getScenario() {
  return createAxios({
    url: api.testScenario,
    method: 'get',
  })
}

export function newApplication(testScenario: string, fileList: UploadUserFile[], describe:string) {
  return createAxios({
    url: api.newApplication,
    method: 'post',
    data: {
      testScenario,
      fileList,
      describe
    }
  })
}

export function approvalAction(requestCode: string, outcome:string, opinion:string) {
  return createAxios({
    url: api.approvalAction,
    method: 'get',
    data: {
      requestCode,
      outcome,
      opinion
    }
  })
}