<template>
  <div class="result-tables">
    <div v-for="suite in Object.keys(tableConfigs)" :key="suite">
      {{ suite }}
      <div v-for="(config, tableIdx) in tableConfigs[suite]" :key="config.tableName">
        {{ config.tableName }}
        <el-table border :data="tableDatas[suite][tableIdx]">
          <el-table-column
            v-for="item in config.column"
            :prop="item.prop"
            :label="item.label"
            :key="item.prop">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
    
<script setup lang="ts">
import { ref, watch } from 'vue'
import { jobModel, suiteTables } from '@/views/data-access/config'

const props = defineProps({
  tjobs: {
    type: Object,
    default: () => {}
  }
})

// 这里可以指定表格顺序
const tableListOrder = [
  'stream',
  'netperf'
]
const tableConfigs = ref({})

const tableDatas = ref({})

// const tableDataList = computed(() => {
//   console.log(222)
//   if (props.tjobs.state === '1'){
//     return generateTableConfigsAndData(props.tjobs)
//   }
//   return {}
// })

watch(
  () => props.tjobs,
  () => generateTableConfigsAndData(props.tjobs)
)

const generateTableConfigsAndData = (tjobs) => {
  tableListOrder.forEach(suite => { // 遍历每一个套件
    const tableConfigsInSuite = suiteTables[suite]
    if (!tableConfigs.value[suite]) {tableConfigs.value[suite] = []}
    if (!tableDatas.value[suite]) {tableDatas.value[suite] = []}
    tableConfigsInSuite.forEach((tableConfig: Array<Object>, tableIndex: number) => { // 配置每个table的配置
      const tempConfig = {
        tableName: '',
        column: []
      }
      const tempTableDataList = tableDatas.value[suite][tableIndex] || [] // 每个表格对应的数据
      // 生成表格名
      const filterName = tableConfig.filters
        && `${Object.keys(tableConfig.filters)[0]}=${tableConfig.filters[Object.keys(tableConfig.filters)[0]]}`
      const labelName = jobModel.kpis[`stats.${suite}.${tableConfig.kpi}`].label
      const directionName = jobModel.kpis[`stats.${suite}.${tableConfig.kpi}`].direction
      const tableName = `${filterName || ''}${labelName}${directionName > 0 ? '（越大越好）':'（越小越好）'}`
      tempConfig['tableName'] = tableName

      const tempColumn = []
      const tempDataObj = {} // 当前os的数据
      tjobs[suite] && tjobs[suite].forEach(tjob => { // 遍历一个suite下的所有tjob
        // 将tjob中能根据x_param匹配到的值作为表格的列
        const columnName = (tjob[`pp.${suite}.${tableConfig.x_param}`] || '').toString()
        if (columnName && !tempColumn.filter(col => col.prop === columnName)[0]){
          tempColumn.push({
            label: columnName,
            prop: columnName
          })
        }
        // 拼装数据
        if (tempDataObj[columnName]) {
          tempDataObj[columnName].push(tjob[`stats.${suite}.${tableConfig.kpi}`])
        } else {
          tempDataObj[columnName] = [tjob[`stats.${suite}.${tableConfig.kpi}`]]
        }
      })
      // 拼装好的数据进行赋值
      tempConfig['column'] = tempColumn
      tempTableDataList.push(calculateValues(tempDataObj))
      tableConfigs.value[suite].push(tempConfig)
      tableDatas.value[suite][tableIndex] = tempTableDataList
    })
  })
  return {}
}

const calculateValues = (obj) => {
  const tempObj = {}
  Object.keys(obj).forEach(param => {
    let count = 0
    let sum = 0
    // 求和
    obj[param].forEach(val => {
      if (val && !isNaN(val)) {
        sum += val
        count++
      }
    })
    if (count > 0) {
      tempObj[param] = (sum / count).toFixed(2)
    } else {
      tempObj[param] = null
    }
  })
  return tempObj
}
</script>
  
<style lang="scss" scoped>
</style>