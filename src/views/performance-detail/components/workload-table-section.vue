<template>
  <div>
    <el-card class="baseline-detail-workload-tables">
      <div class="pp-group-section" v-for="pp in Object.keys(groupData || {})" :key="pp">
        {{`用例: ${pp}`}}
        <div v-for="tableInfo in tableColumnMap[suite]||[]" :key="tableInfo.tableName">
          表格： {{ tableInfo.tableName }}
          <el-table
            :data="tableData[pp]"
            border
          >
            <el-table-column
              v-for="column in tableInfo.column"
              :key="column.prop"
              :label="column.label"
              :prop="column.prop">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>
    
<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'

import { tableColumnMap } from '@/views/data-access/config_li.js'

const props = defineProps({
  groupData: {
    type: Object,
    default: () => {}
  },
  suite: {
    type: String,
    default: ''
  }
})

const tableData = ref([])

const getTableData = (groupData) => {
  console.log(11111, groupData)
  const resultObj = {}
  Object.keys(groupData).forEach(ppKey => {
    const ppObj = {}
    Object.keys(groupData[ppKey]).forEach(kpi => {
      const kpiValue = groupData[ppKey][kpi].reduce(function(prev, curr){
        return prev + curr
      })/groupData[ppKey][kpi].length // 获取kpi的平均值
      ppObj[kpi] = kpiValue
    })
    resultObj[ppKey] = [ppObj]
  })
  console.log('tableData: ', resultObj)
  return resultObj
}

watchEffect(() => {
  console.log(tableColumnMap[props.suite])
  tableData.value = getTableData(props.groupData || {})
})

onMounted(() => {
  console.log(props.groupData)
})
</script>
  
<style lang="scss" scoped>
  .pp-group-section {
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
</style>