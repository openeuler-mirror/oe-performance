<template>
  <el-card shadow="always">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
      <el-tab-pane label="全部任务" name="allTask"> </el-tab-pane>
      <el-tab-pane label="我创建的任务" name="myTask"> </el-tab-pane>
      <el-tab-pane label="我的收藏" name="myCollection"> </el-tab-pane>
    </el-tabs>
    <div>
      <TaskTable
        :allData="dataList"
        :healthState="healthState"
        :parentLoading="dataLoading"
        @search="handleSearch"
        @state-filter-change="handleStateFiltering"></TaskTable>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { TabPaneName } from 'element-plus'
import { ElMessage } from 'element-plus'
import TaskTable from './components/task-table.vue'

import { getTaskStatusCounts } from '@/api/center'
import { getPerformanceData } from '@/api/performance'

const router = useRouter()

const activeName = ref<TabPaneName>('allTask')
const dataList = ref<PerformanceBaseline.SubmitIdList>([])
const dataLoading = ref(false)
const healthState = ref<TestTask.TaskState>({})

const jobStateFilter = ref('')

const searchKey = ref<string>('submit_id')
const searchValue = ref('')

const handleChange = (tab: TabPaneName) => {
  activeName.value = tab
  router.push({
    name: 'taskList',
    query: {
      type: activeName.value
    }
  })
  // 当切换tab时，根据不同tab的状态去获取新的任务列表数据
  getJobsState()
  getDataList()
}

const handleSearch = (searchK: string, searchV: string) => {
  switch (searchK) {
  case 'taskId':
    searchKey.value = 'submit_id'
    break
  default:
    searchKey.value = searchK
  }
  searchValue.value = searchV
  getDataList()
}

const handleStateFiltering = (jobState: string) => {
  jobStateFilter.value = jobState
  getDataList()
}

const getDataList = () => {
  if (dataLoading.value) return
  dataLoading.value = true
  // 组织搜索条件
  const boolObj: PerformanceApi.TestTaskQueryBool = { must: [], must_not: [] }
  const mustList: PerformanceApi.TestTaskQueryMust = []
  mustList.push({ range: { time: { gte: 'now-10d/d' } } })
  if (searchValue.value) {
    const searchObj = {
      [searchKey.value]: ''
    }
    searchObj[searchKey.value] = `*${searchValue.value}*`
    mustList.push({
      wildcard: searchObj
    } as PerformanceApi.TestTaskQueryWildcard)
  }
  if (jobStateFilter.value) {
    if (jobStateFilter.value === 'others') {
      boolObj.must_not = [
        { terms: { job_state: ['finished', 'failed', 'running'] } }
      ]
    } else {
      mustList.push({ match: { job_state: jobStateFilter.value } })
    }
  }
  boolObj.must = mustList
  // 获取选择的套件下的submitID list
  getPerformanceData({
    index: 'jobs',
    query: {
      size: 1,
      query: {
        bool: boolObj
      },
      aggs: {
        jobs_terms: {
          terms: {
            field: 'submit_id',
            size: 10000 // 取全量
          }
        }
      }
    }
  })
    .then(res => {
      dataList.value = res.data.aggregations.jobs_terms.buckets.map(
        (item: any) => {
          return { submit_id: item.key }
        }
      )
    })
    .catch(err => {
      ElMessage({
        message: err.message,
        type: 'error'
      })
    })
    .finally(() => {
      dataLoading.value = false
    })
}

// 获取job的状态枚举值和属性
const getJobsState = () => {
  getTaskStatusCounts().then(res => {
    const tempDataList = res.data.aggregations.job_state
      .buckets as TestTask.TaskAmount
    healthState.value = computeJobsHealthAmount(tempDataList)
  })
}

const computeJobsHealthAmount = (dataList: TestTask.TaskAmount) => {
  const dataObj: TestTask.TaskState = {}
  dataList.forEach(healthItem => {
    switch (healthItem.key) {
    case 'finished':
    case 'failed':
    case 'running':
      dataObj[healthItem.key] = healthItem.doc_count
      break
    default:
      if (dataObj.others === undefined) {
        dataObj.others = 0
      }
      dataObj.others += healthItem.doc_count
    }
  })
  let allState = 0

  Object.keys(dataObj).forEach(state => {
    allState += dataObj[state]
  })
  dataObj.allState = allState
  return dataObj
}

onMounted(() => {
  if (!router.currentRoute.value.query.type) {
    router.replace({
      name: 'taskList',
      query: {
        type: activeName.value
      }
    })
  }
  getJobsState()
  // 获取数据
  getDataList()
})
</script>

<style lang="scss" scoped>
.refresh-icon {
  margin: 8px 0 0 8px;
}
.pagination {
  margin-top: 20px;
}
</style>
