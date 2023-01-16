<template>
  <el-card shadow="always" v-loading="loading">
    <h2>{{`任务ID: ${detailData?.submit_id || ''}`}}</h2>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-descriptions>
          <el-descriptions-item label="创建人">{{ detailData.subqueue   }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">
            {{formatDate(new Date(detailData.submit_time), 'yyyy/MM/dd hh:mm:ss')}}
          </el-descriptions-item>
          <el-descriptions-item label="完成时间">
            {{formatDate(new Date(detailData.end_time), 'yyyy/MM/dd hh:mm:ss')}}
          </el-descriptions-item>
          <el-descriptions-item label="所属项目"></el-descriptions-item>
          <el-descriptions-item label="测试机" :span="2">{{ detailData.testbox }}</el-descriptions-item>
        </el-descriptions>
      </el-col>
      <el-col :span="6">
        <TaskDoughnut :stateData="detailData?.jobStateData"/>
      </el-col>
    </el-row>
    <el-table :data="[detailData]" style="width: 100%" class="task-table">
      <el-table-column type="expand">
        <!-- ="props" -->
        <template #default>
          <div m="4" class="job-table">
            <el-table :data="detailData?.jobList" style="width: 100%">
              <!--
              <el-table-column type="expand">
                <template #default>
                  <div m="2" class="expand-table">
                    <el-table :data="[detailData]">
                      <el-table-column prop="suite" width="430">
                      </el-table-column>
                      <el-table-column prop="result" label="job " width="100">
                        <template #header>
                          测试结果
                          <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="Top Center prompts info"
                            placement="top">
                            <el-icon><QuestionFilled /></el-icon>
                          </el-tooltip>
                        </template>
                        <template #default="scope">
                          <div style="color: #43BB57;" v-if="scope.row.result=='suceesful'">
                             Pass
                          </div>
                          <div style="color: #F95858;" v-if="scope.row.result=='failing'">
                            No Pass
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </template>
              </el-table-column>
              -->
              <el-table-column prop="id" label="Job Id" width="160" fixed sortable/>
              <el-table-column prop="job_state" label="Job状态" width="110" sortable sortBy="job_state">
                <template #default="scope">
                  <span :class="`state-${scope.row.job_state}`">{{ scope.row.job_state }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Test Params" min-width="230" sortable>
                {{ detailData['li-testcase'] || 'N/A' }}
              </el-table-column>
              <el-table-column label="开始时间" width="200" sortable sortBy="start_time">
                <template #default="scope">
                  {{formatDate(new Date(scope.row.start_time), 'yyyy/MM/dd hh:mm:ss')}}
                </template>
              </el-table-column>
              <el-table-column label="结束时间" width="200" sortable sortBy="end_time">
                <template #default="scope">
                  {{formatDate(new Date(scope.row.end_time), 'yyyy/MM/dd hh:mm:ss')}}
                </template>
              </el-table-column>
              <el-table-column width="15" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Task Id" prop="submit_id" min-width="250"/>
      <el-table-column label="Test Suite" prop="suite" />
      <el-table-column label="总计/通过/失败/其他" prop="count" width="250">
        <template #default="scope">
          <span class="state-item" style="background-color: #002FA7;">
            {{ scope?.row?.jobStateData?.all || '0' }}
          </span>
          <span class="state-item" style="background-color: #43BB57;">
            {{ scope?.row?.jobStateData?.finished || '0' }}</span>
          <span class="state-item" style="background-color: #F95858;">
            {{ scope?.row?.jobStateData?.fail || '0' }}</span>
          <span class="state-item" style="background-color: #FFA634;">
            {{ scope?.row?.jobStateData?.others || '0' }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Result } from './interface'
import TaskDoughnut from './components/task-doughnut.vue';

import { getPerformanceData, getTestBoxes } from '@/api/performance'

import { useRouter } from 'vue-router'
import { usePerformanceData, useTestboxStore } from '@/stores/performanceData'

import { formatDate } from '@/utils/utils'
import { combineJobs } from '@/views/performance-baseline/utils.js'

const router = useRouter()
const { performanceData, setPerformanceData } = usePerformanceData()
const testboxStore = useTestboxStore()

const resultName = ref('#29206 w3pGT1xdmCorhS099')
const detailData = ref<any>({})
const loading = ref(false)

const getJobData = (submitId:string) => {
  loading.value = true
  getPerformanceData({
    index: 'jobs',
    query: {
      size: 10000,
      query: {
        term: {
          submit_id: submitId
        }
      }
    },
  }).then(res => {
    const resultObj = combineJobs(res.data.hits.hits) // 工具函数，合并job数据为一个submitId数据
    setDeviceInfoToObj(resultObj)
    setPerformanceData(submitId, resultObj) // save submit data to store
    // state.detailInfo = resultObj
    detailData.value = resultObj
    console.log(detailData)
  }).catch((err) => {
    ElMessage({
      message: err.message,
      type: 'error'
    })
  }).finally(() => {
    loading.value = false
  })
}

const setDeviceInfoToObj = (resultObj) => {
  const testbox = testboxStore.testboxMap[resultObj.testbox] || {}
  resultObj.device =  testbox.device || {}
}

const getDetailData = () => {
  const taskId = String(router.currentRoute.value.params.task_id)
  if (performanceData[taskId]) {
    detailData.value = performanceData[taskId]
  } else {
    getTestBoxes().then(testboxRes => {
      let testboxList = []
      testboxList = testboxRes.data.hits.hits.map(item => {
        return {
          testboxId: item._id,
          ...item._source
        }
      })
      testboxStore.setTestboxData(testboxList)
      getJobData(taskId)
    })
  }
}

onMounted(() => {
  getDetailData()
})

</script>
<style lang="scss" scoped>
h2 {
    margin-bottom: 30px;
}
.el-row {
  margin-bottom: 20px;
}
.task-table {
  :deep(thead th) {
    background-color: var(--oe-perf-bg-th);
    color: #333;
  }
}
.job-table {
  margin-left: 15px;
  :deep(.el-table.is-scrolling-right .el-table-fixed-column--left.is-last-column::before) {
    box-shadow: var(--el-table-fixed-left-column);
  }
  :deep(.el-table.is-scrolling-middle .el-table-fixed-column--left.is-last-column::before) {
    box-shadow: var(--el-table-fixed-left-column);
  }
  :deep(thead th.el-table-fixed-column--left.is-last-column.el-table__cell) {
    background-color: var(--oe-perf-bg-th);
    color: #333;
  }
  [class^="state-"]{
    color: #999;
  }
  .state-{
    &finished {
      color: var(--oe-perf-color-success)
    }
    &failed {
      color: var(--oe-perf-color-danger)
    }
  }
}

.state-item {
  display: block;
  text-align: center;
  float: left;
  width: 50px;
  color: white;
  border-radius: 10px;
  margin-right: 5px;
}
</style>