<template>
  <div class="baseline-detail-workload-tables" v-loading="loading">
    <!-- <el-card class=""> -->
    <div
      class="table-wrap"
      v-for="tableInfo in (tableColumnMap as Config_li.tableColumnMap)[
        detailData.suite
      ]"
      :key="tableInfo.tableName">
      <div class="tableName">
        {{ tableInfo.tableLabel || tableInfo.tableName }}
      </div>
      <el-table :data="tableDatas[tableInfo.tableName]" border>
        <el-table-column
          label="测试参数"
          prop="li-testcase"
          min-width="100"></el-table-column>
        <el-table-column
          label="几何平均值"
          :prop="`performanceVal_${tableInfo.tableName}`"
          :formatter="tableCellFormatter"
          min-width="100"
          className="important-value"></el-table-column>
        <el-table-column
          v-for="column in tableInfo.column"
          :key="column.prop"
          :label="column.label"
          :prop="column.prop"
          :formatter="tableCellFormatter"
          min-width="100">
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
import { DataObject, getPerformanceData } from '@/api/performance'
import { tableColumnMap } from '@/views/performance-baseline/config_li'
import {
  combineJobs,
  invalidNumberSymbol
} from '@/views/performance-baseline/utils.js'
import { Config_li } from '../performance-baseline/types'

const router = useRouter()
const { performanceData, setPerformanceData } = usePerformanceData()

const detailData = ref<DataObject>({})
const tableDatas = ref([])
const loading = ref(false)

onMounted(() => {
  // 从store中获取详情数据。
  // todo: 如果store中没有，需要发送请求获取
  const submitId = router.currentRoute.value.params.submit_id as string
  if (performanceData[submitId]) {
    detailData.value = performanceData[submitId]
    tableDatas.value = detailData.value.tableDatas
  } else {
    loading.value = true
    getPerformanceData({
      index: 'jobs',
      query: {
        size: 10000,
        // prettier-ignore
        _source: [ 'suite', 'id', 'submit_id', 'group_id', 'tags', 'os', 'os_version', 'osv', 'arch', 'kernel', 'testbox', 'tbox_group', 'pp', 'stats', 'job_state', 'job_stage', 'job_health', 'time', 'start_time', 'end_time', 'submit_time'],
        query: {
          term: {
            submit_id: submitId
          }
        }
      }
    })
      .then(res => {
        const resultObj = combineJobs(res.data.hits.hits) // 工具函数，合并job数据为一个submitId数据
        setPerformanceData(submitId, resultObj) // save submit data to store
        detailData.value = resultObj
        tableDatas.value = resultObj.tableDatas
      })
      .catch(err => {
        ElMessage({
          message: err.message,
          type: 'error'
        })
        console.error(err)
      })
      .finally(() => {
        loading.value = false
      })
  }
})

// 重复, element中table-column的formatter的cellValue是string
const tableCellFormatter = (row: any, column: any, cellValue: number) => {
  if (cellValue === undefined || cellValue === invalidNumberSymbol) {
    return '暂无数据'
  }
  return cellValue.toString()
}
</script>

<style lang="scss" scoped>
.pp-group-section {
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.baseline-detail-workload-tables {
  .table-wrap {
    margin-bottom: 30px;
    .tableName {
      margin-bottom: 10px;
    }
  }
  :deep(td.important-value) {
    color: var(--oe-perf-color-primary);
  }
}
</style>
