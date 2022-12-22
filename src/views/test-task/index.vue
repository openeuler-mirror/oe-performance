<template>
  <el-card shadow="always">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
    <el-tab-pane label="全部任务" name="全部任务">
      <TaskTable
        :allData="dataList"
        ></TaskTable>
    </el-tab-pane>
    <el-tab-pane label="我创建的任务" name="我创建的任务">
      <TaskTable
        :allData="dataList"
      ></TaskTable>
    </el-tab-pane>
    <el-tab-pane label="我的收藏" name="我的收藏">
      <TaskTable
        :allData="dataList"
      ></TaskTable>
    </el-tab-pane>
  </el-tabs>
 </el-card>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { TabPaneName } from 'element-plus'
import { ElMessage } from 'element-plus'
import TaskTable from './components/task-table.vue';

import { getTaskStatusCounts } from '@/api/center'
import { getPerformanceData } from '@/api/performance'

const activeName = ref('全部任务')
const dataList = ref([1])

const handleChange = (tab: TabPaneName) => {
  console.log(tab,'active改变了')
  // todo: 所有数据通过本页面管理；
  // 当切换tab时，根据不同tab的状态去获取新的任务列表数据
}

const getDataList = () => {
  // 获取选择的套件下的submitID list
  getPerformanceData({
    'index': 'jobs',
    'query': {
      size: 1,
      'query': {
        bool: {
          must: [ 
            // todo： 后续增加根据任务状态查询
            // 暂时只查询知道格式的套件数据
            { terms: { suite: ['stream', 'netperf', 'lmbench', 'unixbench']} },
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
        }
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
  }).finally(() => {
    console.log('rawData: ', dataList)
  })
}

onMounted(() => {
  // 测试job的几个状态的可选值
  getTaskStatusCounts()
  // 获取数据
  getDataList()
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