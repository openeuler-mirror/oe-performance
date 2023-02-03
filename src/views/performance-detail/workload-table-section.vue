<template>
  <div class="baseline-detail-workload-tables" v-loading="loading">
    <!-- <el-card class=""> -->
      <div class="table-wrap" v-for="tableInfo in tableColumnMap[detailData.suite]" :key="tableInfo.tableName">
          <div class="tableName">{{ `测试用例： ${tableInfo.tableLabel || tableInfo.tableName}` }}</div>
          <el-table
            :data="tableDatas[tableInfo.tableName]"
            border
          >
            <el-table-column label="测试参数" prop="li-testcase"></el-table-column>
            <el-table-column
              label="性能值"
              :prop="`performanceVal_${tableInfo.tableName}`"
              :formatter="tableCellFormatter"
              min-width="100"
            ></el-table-column>
            <el-table-column
              v-for="column in tableInfo.column"
              :key="column.prop"
              :label="column.label"
              :prop="column.prop"
              :formatter="tableCellFormatter"
              min-width="100"
            >
            </el-table-column>
          </el-table>
        </div>
    <!-- </el-card> -->
  </div>
</template>
    
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { usePerformanceData } from '@/stores/performanceData'
import { getPerformanceData } from '@/api/performance'
import { tableColumnMap } from '@/views/performance-baseline/config_li.js'
import { combineJobs } from '@/views/performance-baseline/utils.js'

const router = useRouter()
const { performanceData, setPerformanceData } = usePerformanceData()

const detailData = ref({})
const tableDatas = ref([])
const loading = ref(false)

onMounted(() => {
  // 从store中获取详情数据。
  // todo: 如果store中没有，需要发送请求获取
  const submitId = router.currentRoute.value.params.submit_id
  if (performanceData[submitId]) {
    detailData.value = performanceData[submitId]
    tableDatas.value = detailData.value.tableDatas
  } else {
    loading.value = true
    getPerformanceData({
      index: 'jobs',
      query: {
        size: 10000,
        _source: ['suite', 'id', 'submit_id', 'group_id', 'tags', 'os', 'os_version', 'osv', 'arch', 'kernel',
          'testbox', 'tbox_group', 'pp', 'stats', 'job_state', 'job_stage', 'job_health', 'time', 'start_time', 'end_time', 'submit_time'
        ],
        query: {
          term: {
            submit_id: submitId
          }
        }
      },
    }).then(res => {
      const resultObj = combineJobs(res.data.hits.hits) // 工具函数，合并job数据为一个submitId数据
      setPerformanceData(submitId, resultObj) // save submit data to store
      detailData.value = resultObj
      tableDatas.value = resultObj.tableDatas
    }).catch((err) => {
      ElMessage({
        message: err.message,
        type: 'error'
      })
    }).finally(() => {
      loading.value = false
    })
  }
})

const tableCellFormatter = (row, column, cellValue) => {
  if (cellValue === undefined) {
    return '暂无数据'
  }
  if (cellValue === -1) {
    return '数据错误'
  }
  return cellValue
}

</script>
  
<style lang="scss" scoped>
  .pp-group-section {
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .baseline-detail-workload-tables{
    .table-wrap{
      margin-bottom: 30px;
      .tableName{
      margin-bottom: 10px;
    }
    }
    
  }
</style>