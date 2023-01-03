<template>
  <div class="result-tables">
    <div v-for="suite in Object.keys(tableConfigs)" :key="suite">
      {{ suite }}
      <div v-for="(config, tableIdx) in tableConfigs[suite]" :key="config.tableName">
        {{ config.tableName }}
        <el-table border :data="tableDatas[suite][tableIdx]">
          <el-table-column
            :prop="config.column[0].prop"
            :label="config.column[0].label"
            :key="config.column[0].prop"
            width="200"
            fixed
          >
          </el-table-column>
          <el-table-column
            v-for="item in config.column.slice(1)"
            :prop="item.prop"
            :label="item.label"
            :key="item.prop">
          </el-table-column>
        </el-table>
        <el-card v-if="tableDatas[suite][tableIdx].length !== 0" shadow="hover" style="margin-bottom:20px">
          <compare-chart
          :chartConfigs="tableConfigs[suite][tableIdx]"
          :chartData="tableDatas[suite][tableIdx]"/>
        </el-card>
      </div>
    </div>
  </div>
</template>
    
<script setup lang="ts">
import { ref, Ref, watchEffect } from 'vue'
import CompareChart from './compare-chart.vue'
import { jobModel, suiteTables } from '@/views/data-access/config'

const props = defineProps({
  tjobsAll: {
    type: Object,
    default: () => {}
  },
  dimension: {  // 数据组织维度
    type: String,
    default: 'testbox'
  }
})

// 这里可以指定表格顺序
const tableListOrder = [
  'stream',
  'netperf',
  'lmbench',
  'unixbench',
  'libmicro'
]
const tableConfigs:Ref<any> = ref({})

const tableDatas:Ref<any> = ref({})

const generateTableConfigsAndData = (tjobs, dimension:string) => {
  tableDatas.value = {}
  tableListOrder.forEach(suite => { // 遍历每一个套件
    const tableConfigsInSuite = suiteTables[suite]
    if (!tableConfigs.value[suite]) {tableConfigs.value[suite] = []}
    if (!tableDatas.value[suite]) {tableDatas.value[suite] = []}
    tableConfigsInSuite.forEach((tableConfig: Array<Object>, tableIndex: number) => { // 配置每个table的配置
      const tempConfig = { tableName: '', column: [] }
      const tempTableDataList = tableDatas.value[suite][tableIndex] || [] // 拿到每个表格对应的数据list
      // 生成表格名
      const filterName = tableConfig.filters
        && `${Object.keys(tableConfig.filters)[0]}=${tableConfig.filters[Object.keys(tableConfig.filters)[0]]}`
      const labelName = jobModel.kpis[`stats.${suite}.${tableConfig.kpi}`].label
      const directionName = jobModel.kpis[`stats.${suite}.${tableConfig.kpi}`].direction
      const tableName = `${filterName || ''}${labelName}${directionName > 0 ? '（越大越好）':'（越小越好）'}`
      tempConfig['tableName'] = tableName

      const tempColumn = [{ label: tableConfig.kpi, prop: 'dimensionId' }]
      const tempDataMap = {} // 当前表格下的数据字典，字典的键是dimensionId。
      tjobs[suite] && tjobs[suite].forEach(tjob => { // 遍历一个suite下的所有tjob
        // 1、拿到当前tjob的维度值
        const dimensionValue = tjob[dimension]
        if (!dimensionValue) return // 没有对应维度的话退出
        // 2、拿到当前tjob对应的列名：将tjob中能根据x_param匹配到的值作为表格的列。
        const columnName = getColNameFromTjob(tjob, suite, tableConfig, tempColumn)
        if (!columnName) return // 没有对应的列名，说明当前tjob的数据不属于当前表格，因此不做其他处理，跳出。
        // 3、根据col获取对应的数据设置在tempDataMap[dimensionValue]上
        if (!tempDataMap[dimensionValue]) {
        // 如果是一个新的demision，则初始化一下数据
          tempDataMap[dimensionValue] = {}
        }
        setValuesFromTjobByCol(tjob, suite, columnName, tableConfig, tempDataMap[dimensionValue])
      })
      // 赋值列
      tempConfig['column'] = tempColumn
      setTableColConfig(tempConfig, suite, tableIndex)
      
      // 拼装好的数据进行赋值
      // 需要遍历tempDataMap中的各个dimension，然后push入tempTableataList即可
      Object.keys(tempDataMap).forEach(dimension => {
        const calculatedObj = calculateValues(tempDataMap[dimension]) // 计算平均值
        calculatedObj['dimensionId'] = dimension // 添加数据名称
        tempTableDataList.push(calculatedObj)
      })
      tableDatas.value[suite][tableIndex] = tempTableDataList
    })
  })
}

const setTableColConfig = (tempConfig, suite, tableIndex) => {
  if (tableConfigs.value[suite][tableIndex]) {
    const oldCols = tableConfigs.value[suite][tableIndex].column
    const newCols = tempConfig.column
    const tempCols = [...oldCols]
    newCols.forEach(col => {
      if (!oldCols.filter(item => item.label === col.label)[0]) {
        tempCols.push(col)
      }
    })
    tempConfig.column = tempCols
    tableConfigs.value[suite][tableIndex] = tempConfig
  } else {
    tableConfigs.value[suite].push(tempConfig)
  }
}

const getColNameFromTjob = (tjob, suite, tableConfig, tempColumn) => {
  if (!tjob[`stats.${suite}.${tableConfig.kpi}`]) {
    return '' // 如果当前tjob不存在当前表格对应的kpi值，说明当前tjob没有对应当前表格的列名。
  }
  if (!isTjobPassedFilterCheck(tjob, suite, tableConfig)) {
    return
  }
  const columnName = (tjob[`pp.${suite}.${tableConfig.x_param}`] || '').toString()
  // 如果这个column已经存在在tempColumn中的话，就不用重新赋值了。
  if (columnName && !tempColumn.filter(col => col.prop === columnName)[0]){
    tempColumn.push({
      label: columnName,
      prop: columnName
    })
  }
  return columnName
}

const setValuesFromTjobByCol = (tjob, suite, columnName, tableConfig, tempDataObj) => {
  if (!isTjobPassedFilterCheck(tjob, suite, tableConfig)) {
    return
  }
  
  if (tempDataObj[columnName]) {
    tempDataObj[columnName].push(tjob[`stats.${suite}.${tableConfig.kpi}`])
  } else {
    tempDataObj[columnName] = [tjob[`stats.${suite}.${tableConfig.kpi}`]]
  }
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

const isTjobPassedFilterCheck = (tjob, suite, tableConfig) => {
  // 如果当前表格有filters的话，需要通过filters来判断是否要获取当前数据的值。
  if (tableConfig.filters) {
    const filterKey = Object.keys(tableConfig.filters)[0]
    let filteredValue = tjob[`pp.${suite}.${filterKey}`]
    if (suite === 'unixbench') { // unixbench过滤器的值需要特殊处理，除了nr_task=1的，都为100%
      filteredValue = filteredValue === 1 ? '1' : '100%'
    }
    if (filteredValue !== tableConfig.filters[filterKey]) {
      return false // 如果有过滤器的情况下，过滤其中的值如果不匹配则忽略当前数据
    }
    return true
  }
  return true
}

// 当表格数据或者展示维度切换时，更新表格配置数据
watchEffect(() => {
  generateTableConfigsAndData(props.tjobsAll, props.dimension)
})
</script>
  
<style lang="scss" scoped>
:deep(.el-card__body) {
  padding-bottom: 0px;
}
.el-table {
  margin-bottom: 20px;
}
</style>