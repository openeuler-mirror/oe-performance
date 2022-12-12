<template>
  <div class="baseline-detail-workload-tables">
    <el-card class="">
      <div v-for="tableInfo in tableColumnMap[detailData.suite]||[]" :key="tableInfo.tableName">
          表格： {{ tableInfo.tableName }}
          <el-table
            :data="tableData"
            border
          >
            <el-table-column label="测试用例" prop="li-testcase"></el-table-column>
            <el-table-column
              v-for="column in tableInfo.column"
              :key="column.prop"
              :label="column.label"
              :prop="column.prop">
            </el-table-column>
          </el-table>
        </div>
    </el-card>
  </div>
</template>
    
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { tableColumnMap } from '@/views/data-access/config_li.js'

import { usePerformanceData } from '@/stores/performanceData'

const router = useRouter()
const { performanceData } = usePerformanceData()

const detailData = ref({})
const tableData = ref([])

const getTableData = (groupData) => {
  console.log('rawData: ', groupData)
  const resultArr = []
  Object.keys(groupData).forEach(ppKey => {
    const ppObj = {}
    Object.keys(groupData[ppKey]).forEach(kpi => {
      const kpiValue = groupData[ppKey][kpi].reduce(function(prev, curr){
        return prev + curr
      })/groupData[ppKey][kpi].length // 获取kpi的平均值
      ppObj[kpi] = kpiValue.toFixed(2)
    })
    ppObj['li-testcase'] = ppKey
    resultArr.push(ppObj)
  })
  console.log('tableData: ', resultArr)
  return resultArr
}

// watchEffect(() => {
//   tableData.value = getTableData(performanceData.g || {})
// })

onMounted(() => {
  // 从store中获取详情数据。
  // todo: 如果store中没有，需要发送请求获取
  const submitId = router.currentRoute.value.params.submit_id
  if (performanceData[submitId]) {
    detailData.value = performanceData[submitId]
    tableData.value = getTableData(detailData.value.groupData)
  }
})
</script>
  
<style lang="scss" scoped>
  .pp-group-section {
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
</style>