import { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

const RouteView = {
  render() {
    return <router-view></router-view>
  }
}

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'headerLayout',
    // todo: 默认跳转页面需要定一下
    redirect: '/baseline/list',
    component: () => import('@/layout/basic-layout.vue'),
    children: [
      {
        path: 'baseline',
        name: 'baselineLayout',
        redirect: '/baseline/list',
        component: () => import('@/layout/sub-layout/baseline-layout.vue'),
        children: [
          {
            path: 'list',
            name: 'baseline-list',
            component: () => import('@/views/performance-baseline/index.vue'),
          },
          {
            path: 'detail/:submit_id',
            name: 'baseline-detail',
            component: () => import('@/views/performance-detail/index.vue'),
            meta: {
              title: 'detail'
            }
          },
          {
            path: 'detail/:submit_id/workloadDetail',
            name: 'baseline-workloadDetail',
            component: () => import('@/views/performance-detail/workload-detail.vue'),
            meta: {
              title: 'workloadDetail'
            }
          },
          {
            path: 'comparativeSearch',
            name: 'comparativeSearch',
            component: RouteView,
            meta: {
              title: 'comparativeSearch'
            },
            children: [
              {
                path: 'basicPerformance',
                name: 'performanceCompare',
                component: () =>
                  import('@/views/performance-comparation/index.vue'),
                meta: {
                  title: 'basicPerformance'
                }
              },
              {
                path: 'solution',
                name: 'solutionCompare',
                component: () =>
                  import('@/views/performance-comparation/index.vue'),
                meta: {
                  title: 'solution'
                }
              }
            ]
          },
          {
            path: 'dataAccess',
            name: 'dataAccess',
            component: import('@/views/data-access/index.vue'),
          }
        ]
      },
      {
        path: '/userCenter',
        name: 'userCenter',
        redirect: '/userCenter/application/applicationList',
        component: () => import('@/layout/sub-layout/user-center-layout.vue'),
        meta: {
          title: 'userCenter'
        },
        children: [
          {
            path: 'application/applicationList',
            name: 'applicationList',
            component: () => import('@/views/user-center/user-list/index.vue'),
            meta: {
              title: 'applicationList'
            }
          },
          {
            path: 'application/applicationProgress',
            name: 'applicationProgress',
            component: () => import('@/views/user-center/user-progress/index.vue'),
            meta: {
              title: 'applicationProgress'
            }
          },
          {
            path: 'approval/approveList',
            name: 'approveList',
            component: () => import('@/views/user-center/user-list/index.vue'),
            meta: {
              title: 'approveList'
            }
          },
          {
            path: 'approval/approvalprogress',
            name: 'approvalprogress',
            component: () => import('@/views/user-center/user-progress/index.vue'),
            meta: {
              title: 'approvalprogress'
            }
          }
        ]  
      },
      {
        path: '/testTask',
        name: 'testTask',
        redirect: '/testTask/taskList',
        component: () => import('@/layout/sub-layout/test-task-layout.vue'),
        meta: {
          title: 'testTask'
        },
        children: [
          {
            path: 'taskList',
            name: 'taskList',
            component: () => import('@/views/test-task/task-list.vue'),
            meta: {
              title: 'taskList'
            }
          },
          {
            path: 'createTask',
            name: 'createTask',
            component: () => import('@/views/test-task/create-task.vue'),
            meta: {
              title: 'createTask'
            }
          },
          {
            path: 'taskDetails/:task_id',
            name: 'taskDetail',
            component: () => import('@/views/test-task/task-detail.vue'),
            meta: {
              title: 'taskDetail'
            }
          },
        ]
      }
    ]
  },
  // {
  //   path: '/:path(.*)*',
  //   redirect: '/404'
  // },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/common/error/404.vue'),
    meta: {
      title: '404'
    }
  }
]

const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/user/login',
    name: 'login',
    component: () => import('@/views/user/login-page.vue'),
    meta: {
      title: 'login'
    }
  }
]

export { staticRoutes, asyncRoutes }
