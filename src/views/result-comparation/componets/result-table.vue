<template>
  <div class="result-tables">
    <div v-if="checkDataEmpty(tableDatas)" class="empty-content">
      <img src="@/assets/empty.png" />
      <h5>暂无数据</h5>
    </div>
    <!--所有数据都为空时，展示empty样式--<div v-if="isSuiteDataEmpty(tableDatas[suite])" class="empty-content">

    </div>-->
    <div
      class="result-tables-container"
      v-for="suite in Object.keys(tableConfigs)"
      :key="suite">
      <template v-if="!isSuiteDataEmpty(tableDatas[suite] || [])">
        <h3>测试套：{{ suite }}</h3>
        <div
          v-for="(config, tableIdx) in tableConfigs[suite]"
          :key="config.tableName">
          <template v-if="tableDatas[suite][tableIdx].length > 0">
            {{ config.tableName }}
            <el-table :data="tableDatas[suite][tableIdx]" border>
              <el-table-column
                :prop="config.column[0].prop"
                :label="config.column[0].label"
                :key="config.column[0].prop"
                min-width="200"
                fixed>
              </el-table-column>
              <el-table-column
                v-if="!checkFilterListDataEmpty(filterListDataUnderDimension)"
                prop="matchedFilters"
                label="过滤参数"
                min-width="180">
                <template #header>
                  <div class="filter-tag-header">
                    过滤参数
                    <el-tooltip class="box-item" placement="top" effect="light">
                      <el-icon><QuestionFilled /></el-icon>
                      <template #content>
                        数据意义：筛选出当前数据的过滤条件。<br />
                        如果一个筛选维度下有不同的筛选项存在，则当前数据可能包含分别匹配到不同筛选项的job。
                      </template>
                    </el-tooltip>
                  </div>
                </template>
                <template #default="scope">
                  <span
                    class="filter-tag"
                    v-for="filterVal in scope.row.matchedFilters"
                    :key="filterVal">
                    {{ filterVal }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                v-for="item in config.column.slice(1)"
                :prop="item.prop"
                :label="item.label"
                :key="item.prop">
              </el-table-column>
            </el-table>
            <el-card
              v-if="tableDatas[suite][tableIdx].length !== 0"
              shadow="hover"
              style="margin-bottom: 20px">
              <compare-chart
                :chartConfigs="tableConfigs[suite][tableIdx]"
                :chartData="tableDatas[suite][tableIdx]" />
            </el-card>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watchEffect } from 'vue'
import CompareChart from './compare-chart.vue'
import { jobModel, suiteTables } from '../config'
import {
  supportedSuiteList,
  getDimensionValue,
  isTjobPassedFilterCheck,
  checkTjobDimensionVal,
  getMatchedFilterValList
} from '../utils/tjobCompute'
import { JobModel } from '@/model/types'

const props = defineProps({
  tjobsAll: {
    type: Object,
    default: () => {}
  },
  dimension: {
    // 数据组织维度
    type: String,
    default: 'osv'
  },
  filterListDataUnderDimension: {
    type: Object,
    default: () => {}
  },
  suiteFilterList: {
    type: Array,
    default: () => []
  }
})

const JobModelInstance = jobModel as JobModel.Job
const tableConfigs = ref<Comparison.ResultTableConfigs>({})
const tableDatas: Ref<any> = ref({})

const generateTableConfigsAndData = (
  tjobs: JobObject,
  dimension: string,
  filterListData: Object
) => {
  tableDatas.value = {}
  filteringSuiteList().forEach(suite => {
    // 遍历每一个套件
    const tableConfigsInSuite = (suiteTables as JobModel.SuiteTable)[suite]
    if (!tableConfigs.value[suite]) {
      tableConfigs.value[suite] = []
    }
    if (!tableDatas.value[suite]) {
      tableDatas.value[suite] = []
    }
    tableConfigsInSuite.forEach((tableConfig, tableIndex) => {
      // 配置每个table的配置
      const tempConfig: Config_li.CommonItem = {
        tableName: '',
        column: []
      }
      const tempTableDataList = tableDatas.value[suite][tableIndex] || [] // 拿到每个表格对应的数据list
      // 生成表格名
      tempConfig['tableName'] = constructTableName(tableConfig, suite)

      const tempColumn = [{ label: tableConfig.x_param, prop: 'dimensionId' }]
      const tempDataMap: DictObject = {} // 当前表格下的数据字典，字典的键是dimensionId。
      // 遍历tjob，找出对应的数据存在dataMap（对应维度的数组中）。同时找出tjob中存在的列名，保存在tempColumn表格配置中
      setTjobValuesToDataMapAndColumn(
        tjobs,
        suite,
        { dimension, filterListData },
        tableConfig,
        { tempColumn, tempDataMap }
      )
      // 赋值列/
      tempConfig['column'] = tempColumn
      setTableColConfig(tempConfig, suite, tableIndex)
      // 拼装好的数据进行赋值
      // 需要遍历tempDataMap中的各个dimension，然后push入tempTableataList即可
      Object.keys(tempDataMap).forEach(dimension => {
        const calculatedObj = calculateValues(tempDataMap[dimension]) // 计算平均值
        calculatedObj['dimensionId'] = dimension // 添加数据名称
        calculatedObj['matchedFilters']
          = tempDataMap[dimension].matchedFilterValues
        tempTableDataList.push(calculatedObj)
      })
      tableDatas.value[suite][tableIndex] = tempTableDataList
    })
  })
}

const filteringSuiteList = () => {
  return supportedSuiteList.filter(
    item => props.suiteFilterList.indexOf(item) > -1
  )
}

const constructTableName = (
  tableConfig: JobModel.SuiteTableItem,
  suite: string
) => {
  const filterName
    = tableConfig.filters
    && `${Object.keys(tableConfig.filters)[0]}=${
      tableConfig.filters[
        (
          Object.keys(
            tableConfig.filters
          ) as (keyof JobModel.SuiteTableItemFilters)[]
        )[0]
      ]
    }`
  const labelName
    = JobModelInstance.kpis[`stats.${suite}.${tableConfig.kpi}`].label
  const directionName
    = JobModelInstance.kpis[`stats.${suite}.${tableConfig.kpi}`].direction
  return `${filterName || ''}${labelName}${
    directionName > 0 ? '（越大越好）' : '（越小越好）'
  }`
}

const setTableColConfig = (
  tempConfig: Config_li.CommonItem,
  suite: string,
  tableIndex: number
) => {
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

const getColNameFromTjob = (
  tjob: JobObject,
  suite: string,
  tableConfig: JobModel.SuiteTableItem,
  tempColumn: Config_li.ColumnItem[]
): string | undefined => {
  if (!tjob[`stats.${suite}.${tableConfig.kpi}`]) {
    return '' // 如果当前tjob不存在当前表格对应的kpi值，说明当前tjob没有对应当前表格的列名。
  }
  if (!isTjobPassedFilterCheck(tjob, suite, tableConfig)) {
    return
  }
  const columnName: string = (
    tjob[`pp.${suite}.${tableConfig.x_param}`] || ''
  ).toString()
  // 如果这个column已经存在在tempColumn中的话，就不用重新赋值了。
  if (columnName && !tempColumn.filter(col => col.prop === columnName)[0]) {
    tempColumn.push({
      label: columnName,
      prop: columnName
    })
  }
  return columnName
}

/**
 * 遍历tjob，根据输入的表格配置获取表格中对应的数据和列名
 * @param tjobs
 * @param suite
 * @param dimensionFilterConfig
 * @param tableConfig
 * @param manipulateDataObj
 */
const setTjobValuesToDataMapAndColumn = (
  tjobs: JobObject,
  suite: string,
  dimensionFilterConfig: Comparison.DimensionFilterCOnfig,
  tableConfig: JobModel.SuiteTableItem,
  manipulateDataObj: Comparison.ManipulateData
) => {
  const { dimension, filterListData } = dimensionFilterConfig
  const { tempColumn, tempDataMap } = manipulateDataObj
  tjobs[suite]
    && tjobs[suite].forEach((tjob: JobObject) => {
      // 遍历一个suite下的所有tjob
      // 1、拿到当前tjob的维度值, 并根据选择的list过滤
      const dimensionValue = getDimensionValue(tjob, dimension) // tjob[dimension]
      if (!dimensionValue) return // 没有对应维度的话退出
      if (!checkTjobDimensionVal(tjob, filterListData)) return
      // 2、拿到当前tjob对应的列名：将tjob中能根据x_param匹配到的值作为表格的列。
      const columnName = getColNameFromTjob(
        tjob,
        suite,
        tableConfig,
        tempColumn
      )
      if (!columnName) return // 没有对应的列名，说明当前tjob的数据不属于当前表格，因此不做其他处理，跳出。
      // 3、根据col获取对应的数据设置在tempDataMap[dimensionValue]上
      if (!tempDataMap[dimensionValue]) {
        // 如果是一个新的demision，则初始化一下数据
        tempDataMap[dimensionValue] = {}
      }
      setValuesFromTjobByCol(
        tjob,
        suite,
        columnName,
        tableConfig,
        tempDataMap[dimensionValue]
      )
      setMatchedFilterValue(
        tjob,
        suite,
        tableConfig,
        filterListData,
        tempDataMap[dimensionValue]
      )
    })
}

/**
 * 将数据设置给tempDataObj中。tempDataObj对应一个维度的数据。
 * @param tjob
 * @param suite
 * @param columnName
 * @param tableConfig
 * @param tempDataObj
 */
const setValuesFromTjobByCol = (
  tjob: JobObject,
  suite: string,
  columnName: string,
  tableConfig: JobModel.SuiteTableItem,
  tempDataObj: JobObject
) => {
  if (!isTjobPassedFilterCheck(tjob, suite, tableConfig)) {
    return
  }

  if (tempDataObj[columnName]) {
    tempDataObj[columnName].push(tjob[`stats.${suite}.${tableConfig.kpi}`])
  } else {
    tempDataObj[columnName] = [tjob[`stats.${suite}.${tableConfig.kpi}`]]
  }
}

/**
 * 将匹配的过滤参数设置给tempDataObj。
 */
const setMatchedFilterValue = (
  tjob: JobObject,
  suite: string,
  tableConfig: JobModel.SuiteTableItem,
  filterListData: Comparison.FilterList,
  tempDataObj: JobObject
) => {
  if (!isTjobPassedFilterCheck(tjob, suite, tableConfig)) {
    return
  }
  const matchedList = getMatchedFilterValList(tjob, filterListData)

  if (tempDataObj.matchedFilterValues) {
    matchedList.forEach(matchString => {
      if (tempDataObj.matchedFilterValues.indexOf(matchString) < 0) {
        tempDataObj.matchedFilterValues.push(matchString)
      }
    })
  } else {
    tempDataObj.matchedFilterValues = matchedList
  }
}

const calculateValues = (obj: JobObject) => {
  const tempObj: DictObject = {}
  Object.keys(obj).forEach(param => {
    if (param === 'matchedFilterValues') return // 非计算数据
    let count = 0
    let sum = 0
    // 求和
    obj[param].forEach((val: number) => {
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

const isSuiteDataEmpty = (tableDatasUnderSuite: []) => {
  let emptyFlag = true
  if (tableDatasUnderSuite.length < 1) return true
  tableDatasUnderSuite.forEach((tableDataByIdx: string) => {
    if (Array.isArray(tableDataByIdx) && tableDataByIdx.length > 0) {
      emptyFlag = false
    }
  })
  return emptyFlag
}

const checkDataEmpty = (tableDatas: DictObject) => {
  let emptyFlag = true
  Object.keys(tableDatas).forEach(suite => {
    if (!isSuiteDataEmpty(tableDatas[suite])) {
      emptyFlag = false
    }
  })
  return emptyFlag
}

const checkFilterListDataEmpty = (filterListData: Comparison.FilterList) => {
  let isEmpty = true
  const keys = Object.keys(filterListData)
  if (keys.length <= 0) return isEmpty
  keys.forEach((dim: string) => {
    if (
      filterListData[dim]
      && Array.isArray(filterListData[dim])
      && filterListData[dim].length > 0
    ) {
      isEmpty = false
    }
  })
  return isEmpty
}

// 当表格数据或者展示维度切换时，更新表格配置数据
watchEffect(() => {
  generateTableConfigsAndData(
    props.tjobsAll,
    props.dimension,
    props.filterListDataUnderDimension
  )
})
</script>

<style lang="scss" scoped>
:deep(.el-card__body) {
  padding-bottom: 0px;
}
.el-table {
  margin-bottom: 20px;
}
.empty-content {
  padding: 80px 0;
  text-align: center;
}

.filter-tag {
  display: inline-block;
  font-size: 12px;
  background-color: var(--oe-perf-color-primary);
  color: #fff;
  padding: 2px 4px;
  border-radius: 3px;
  &:not(:last-child) {
    margin-right: 2px;
    margin-bottom: 2px;
  }

  &-header {
    .el-icon {
      vertical-align: top;
      margin-top: 3px;
      cursor: pointer;
    }
  }
}
</style>
