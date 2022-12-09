import { RouteRecordRaw, RouterView } from 'vue-router'

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
    name: 'indexLayout',
    redirect: '/normalBaseline/list',
    component: () => import('@/layout/basic-layout.vue'),
    children: [
      /*
       * todo: 待确定布局方案。
       * 第一级对应菜单第一级目录
       * 第一级目录可能出现的情况：1.点击后直接进入对应页面；2.点击后展开，不会打开对应的页面。通过children属性长度>1判断。
       * 第二级有两种情况：1.对应菜单的第二级目录，点击后进入对应页面；2.路径匹配相应的页面但是不在菜单中展示（配置hidden属性）。
       * 但是页面应至少匹配一个二级路径？
       * 第三极及更深层的child，均不在菜单中展示。
       */
      {
        path: '/solutionBaseline',
        name: 'index',
        component: RouteView,
        meta: {
          title: 'solutionBaseline'
        },
        children: [
          {
            path: '/solutionBaseline/bigData',
            name: 'bigData',
            component: () => import('@/views/performance-baseline/index.vue'),
            meta: {
              title: 'bigData'
            }
          }
        ]
      },
      {
        path: '/normalBaseline',
        name: 'normalBaseline',
        component: RouterView,
        meta: {
          title: 'normalBaseline'
        },
        children: [
          {
            path: '/normalBaseline/list',
            name: 'normalBaseline-list',
            component: () => import('@/views/performance-baseline/index.vue'),
          },
          {
            path: '/normalBaseline/detail/:submit_id',
            name: 'detail',
            component: () => import('@/views/performance-detail/index.vue'),
            meta: {
              title: 'detail'
            }
          },
          {
            path: '/normalBaseline/detail/:submit_id/workloadDetail',
            name: 'workloadDetail',
            component: () =>
              import('@/views/performance-detail/workload-detail.vue'),
            meta: {
              title: 'workloadDetail'
            }
          }
        ]
      },
      {
        path: '/comparativeSearch',
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
        path: '/userCenter',
        name: 'userCenter',
        component: RouteView,
        meta: {
          title: 'userCenter'
        },
        children: [
          {
            path: '/userCenter/application/applicationList',
            name: 'applicationList',
            component: () => import('@/views/user-center/list/user-list.vue'),
            meta: {
              title: 'applicationList'
            }
          },
          {
            path: '/userCenter/application/applicationProgress',
            name: 'applicationProgress',
            component: () => import('@/views/user-center/progress/user-progress.vue'),
            meta: {
              title: 'applicationProgress'
            }
          },
          {
            path: '/userCenter/approval/approveList',
            name: 'approveList',
            component: () => import('@/views/user-center/list/user-list.vue'),
            meta: {
              title: 'approveList'
            }
          },
          {
            path: '/userCenter/approval/approvalprogress',
            name: 'approvalprogress',
            component: () => import('@/views/user-center/progress/user-progress.vue'),
            meta: {
              title: 'approvalprogress'
            }
          }
        ]  
      },
      {
        path: '/testTask',
        name: 'testTask',
        component: RouteView,
        meta: {
          title: 'testTask'
        },
        children: [
          {
            path: '/testTask/taskList',
            name: 'taskList',
            component: () => import('@/views/test/task-list.vue'),
            meta: {
              title: 'taskList'
            }
          },
          {
            path: '/testTask/createTask',
            name: 'createTask',
            component: () => import('@/views/test/create-task.vue'),
            meta: {
              title: 'createTask'
            }
          },
          {
            path: '/submitTest/testTask/resultDetails/:task_id',
            name: 'taskDetail',
            component: () => import('@/views/test/task-detail.vue'),
            meta: {
              title: 'taskDetail'
            }
          },
        ]
      }
    ]
  },
  {
    path: '/:path(.*)*',
    redirect: '/404'
  },
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
