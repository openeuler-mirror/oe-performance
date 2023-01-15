<template>
  <el-card shadow="always">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
    <el-tab-pane label="全部任务" name="allTask">
    </el-tab-pane>
    <el-tab-pane label="我创建的任务" name="myTask">
    </el-tab-pane>
    <el-tab-pane label="我的收藏" name="myCollection">
    </el-tab-pane>
  </el-tabs>
  <div>
    <TaskTable
      :allData="dataList"
      :healthState="healthState"
    ></TaskTable>
  </div>
 </el-card>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { TabPaneName } from 'element-plus'
import { ElMessage } from 'element-plus'
import TaskTable from './components/task-table.vue';

import { getTaskStatusCounts } from '@/api/center'
import { getPerformanceData } from '@/api/performance'

const router = useRouter()

const activeName = ref('allTask')
const dataList = ref([])
const healthState = ref({})

const handleChange = (tab: TabPaneName) => {
  activeName.value = tab
  router.push({
    name: 'taskList',
    query: {
      type: activeName.value
    }
  })
  // 当切换tab时，根据不同tab的状态去获取新的任务列表数据
  getJobsState(activeName.value)
  getDataList(activeName.value)
}

const getDataList = (type: string) => {
  // 获取选择的套件下的submitID list
  getPerformanceData({
    'index': 'jobs',
    'query': {
      size: 1,
      'query': {
        bool: {
          must: [ 
            // todo： 根据type进行查询
            // 暂时只查询知道格式的套件数据
            // { terms: { suite: ['stream']} },
            // 查询最近十天的数据，后续视情况调整。
            { 'range': {'time': {'gte': 'now-10d/d'} } }
          ],
        },
      },
      aggs: {
        jobs_terms: {
          terms: {
            field: 'submit_id',
            size: 10000 // 取全量
          }
        },
      }
    },
  }).then((res) => {
    dataList.value = res.data.aggregations.jobs_terms.buckets
      .map((item: any) => { return { submit_id: item.key }})
  }).catch((err) => {
    ElMessage({
      message: err.message,
      type: 'error'
    })
  })
}

// 获取job的状态枚举值和属性
const getJobsState = (type: string) => {
  getTaskStatusCounts().then((res) => {
    const tempDataList = res.data.aggregations.job_state.buckets
    healthState.value = computeJobsHealthAmount(tempDataList)
  })
}

const computeJobsHealthAmount = (dataList) => {
  const dataObj = {}
  dataList.forEach(healthItem=> {
    switch (healthItem.key){
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
  getJobsState(activeName.value)
  // 获取数据
  getDataList(activeName.value)
})



</script>



<style lang="scss" scoped>
 .refresh-icon{
    margin: 8px 0 0 8px;
 }
 .pagination {
  margin-top: 20px;
}
</style>