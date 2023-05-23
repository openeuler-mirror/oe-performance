<template>
  <div class="dev-perf-table">
    <el-table
      class="main-table"
      border
      :data="tableData"
    >
      <el-table-column
        v-for="(column, idx) in tableColumns"
        :key="`${column.label}_${idx}`"
        :label="column.label"
        :prop="column.prop"
        :width="column.minWidth"
        :formatter="column.formatter"
      />
      <el-table-column prop="kpi" label="kpi" min-width="150px"></el-table-column>
      <el-table-column prop="params" label="params" min-width="400px">
        <template #default="scope">
          <p v-for="(param, idx) in scope.row.params.split(',')" :key="idx">
            {{ param }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="jobs" label="jobs">
        <template #default="scope">
          <el-link type="primary" :underline="false" @click="() => showJobListDialog(scope.row)">
            链接
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      class="job-list-dialog"
      v-model="jobListDialogVisible"
      title="Jobs 列表"
      width="800px"
      :before-close="closeJobListDialog"
    >
      <div class="dialog-talbe-container">
        <el-table :data="jobListData" border>
          <el-table-column prop="id" label="job id" min-width="150px"></el-table-column>
          <el-table-column :prop="dimension" label="维度" min-width="150px"></el-table-column>
          <el-table-column prop="perfVal" label="kpi value" min-width="150px">
            <template #default="scope">
              <span>{{ scope.row[`stats.${scope.row.suite}.${jobListKpi}`] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="jobs" label="jobs">
            <template #default="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="goJobDetail(`https://api.compass-ci.openeuler.org${scope.row.result_root}`)"
              >
                详情
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
/**
 * 5.22: 所有的filterList替换为filterData。y_param通过filterData[dim]控制
 * props.filterList相当于y_param列表，基于y_param维度组织数据。最后绘制表格时，从data_map中提取对应数据进行对比。
 * 1、遍历支持解析的suite列表
 * 2、不同suite下的不同表格会有不同的params。为保证params的顺序需要在遍历tjobs前先遍历当前suite对应的tableConfig.
 *    这样相同表格中的不同值的params会排列在一起。（如size=1k、size=2k、size=4k...）。
 * 3、通过tjobs[suite]获得suite下tjobs -> 遍历tjob。
 * 4、tjob通过dim和filterList过滤,过滤通过则得到y_param。创建data_map[y_param] = {}。
 * 5、在tjob中得到params。ppParams在传入时已计算好。
 * 6、在tjob中，遍历tableConfig[suite]下的各个表格配置项，获取kpi的名字、基于kpi对应x_param得到数据[v1,v2,v3,...] 
 *    -> 将x_param和对应的数据数组保存到data_map[y_param]中.
 * 7、当前tjob数据保存到data_map[y_param]中，需要跟x_param关联。存储在数组中。
 *    数据结构：
 *    data_map[y_param].perfData[suite][tableIndex] = {
 *       kpi: kpi,
 *       paramsList: [pp1、pp2、pp3...], <-sort后可以固定顺序。后续展示时，可根据list以固定顺序展示
 *       dataRaw: {
 *           pp1: [val1、val2、val3...],
 *           pp2: [val1、val2、val3...],
 *       }，
 *       jobListOfParam: {
 *           pp1: [job1、job2...],
 *           pp2: [job10、job11...],
 *       }
 *       dataResult: {  // 计算后的结果数据
 *           pp1: [geo_mean(dataRaw.pp1), stddev],
 *           pp2: [geo_mean(dataRaw.pp2), stddev],
 *       }
 *    }
 */
import { ref, Ref, watchEffect } from 'vue'
import { suiteTables } from '../config'
import { supportedSuiteList, getDimensionValue, isTjobPassedFilterCheck,checkTjobDimensionVal } from '../utils/tjobCompute'
import { computeMean, computeStddev, formatterPercentage } from '@/utils/utils'

interface InitialDataByTable {
  kpi: String,
  paramsList: Array<string>,
  dataRaw: DictObject,
  jobListOfParam: DictObject,
  dataResult: DictObject
}

const props = defineProps({
  tjobsAll: {
    type: Object,
    default: () => {}
  },
  dimension: {  // 数据组织维度
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

const dataMap:Ref<DictObject> = ref({})
const jobListDialogVisible = ref(false)
const jobListData = ref([])
const jobListKpi = ref('')

const tableColumns:Ref<Array<DictObject>> = ref([])
const tableData:Ref<Array<DictObject>> = ref([])

const generateTableConfigsAndData = (tjobs, dimension:string, filterListData: DictObject) => {
  dataMap.value = {}
  filteringSuiteList().forEach(suite => {
    suiteTables[suite].forEach((tableConfig: Array<DictObject>, tableIndex: number) => {
      tjobs[suite] && tjobs[suite].forEach(tjob => {
        const dimensionValue = getDimensionValue(tjob, dimension)
        if (!dimensionValue) return
        if (!checkTjobDimensionVal(tjob, filterListData)) return
        if (!isTjobBelongToCurrentTable(tjob, suite, tableConfig)) {
          return
        }

        if (!dataMap.value[dimensionValue]) dataMap.value[dimensionValue] = {}
        const perfDataByTable = getPerfDataByTable(dataMap.value[dimensionValue], suite, tableIndex)
        const param = `${tjob.ppParams},pp.${suite}.testcase=${tjob[`pp.${suite}.testcase`]}`
        perfDataByTable.kpi = tableConfig.kpi
        if (perfDataByTable.paramsList.indexOf(param) < 0) {
          perfDataByTable.paramsList.push(param)
          perfDataByTable.dataRaw[param] = []
          perfDataByTable.jobListOfParam[param] = []
        }
        perfDataByTable.dataRaw[param].push(tjob[`stats.${suite}.${tableConfig.kpi}`])
        perfDataByTable.jobListOfParam[param].push(tjob)
      })
      // 遍历完全部tjob后，计算总体数据
      computeAllResultValue(dataMap.value)
    })
  })
  constructTableData(dataMap.value)
}

const filteringSuiteList = () => {
  return supportedSuiteList.filter(item => props.suiteFilterList.indexOf(item) > -1)
}

/**
 * 获取表格数据对象。perfData[suite][tableIndex]
 * 访问时如果当期层级为空，则初始化对应数据结构
 * @param dataItem 
 * @param suite 
 * @param tableIndex 
 */
const getPerfDataByTable = (dataItem: DictObject, suite:string, tableIndex: number) => {
  const initialDataByTable = {
    paramsList: [],
    dataRaw: {},
    jobListOfParam: {},
    dataResult: {}
  }
  if (!dataItem.perfData) {
    dataItem.perfData = {}
    dataItem.perfData[suite] = {}
    dataItem.perfData[suite][tableIndex] = initialDataByTable
    return dataItem.perfData[suite][tableIndex]
  } 
  if (!dataItem.perfData[suite]) {
    dataItem.perfData[suite] = {}
    dataItem.perfData[suite][tableIndex] = initialDataByTable
    return dataItem.perfData[suite][tableIndex]
  } 
  if (!dataItem.perfData[suite][tableIndex]) {
    dataItem.perfData[suite][tableIndex] = initialDataByTable
    return dataItem.perfData[suite][tableIndex]
  }
  return dataItem.perfData[suite][tableIndex]
}

const isTjobBelongToCurrentTable = (tjob, suite, tableConfig) => {
  if (!tjob[`stats.${suite}.${tableConfig.kpi}`]) {
    return false // 如果当前tjob不存在当前表格对应的kpi值，说明当前tjob不属于当前表格。
  }
  if (!isTjobPassedFilterCheck(tjob, suite, tableConfig)) {
    return false
  }
  return true
}

const computeAllResultValue = (dataMap: DictObject) => {
  Object.keys(dataMap).forEach(dim => {
    if (!dataMap[dim].perfData) return
    Object.keys(dataMap[dim].perfData).forEach(suite => {
      Object.keys(dataMap[dim].perfData[suite]).forEach((tableIndex) => {
        computingGeoMeanAndStddev(dataMap[dim].perfData[suite][tableIndex])
      })
    })
  })
}

const computingGeoMeanAndStddev = (perfData: InitialDataByTable) => {
  perfData.paramsList.forEach(param => {
    perfData.dataResult[param] = [
      computeMean(perfData.dataRaw[param]),
      computeStddev(perfData.dataRaw[param])
    ]
  })
}

const constructTableData = (dataMap: DictObject) => {
  tableData.value= []
  const dimList = Object.keys(dataMap)
  tableColumns.value = generateTableColumn(dimList)
  filteringSuiteList().forEach((suite:string) => {
    suiteTables[suite].forEach((tableConfig: Array<DictObject>, tableIndex: number) => {
      const paramsList = getParamListUnderTable(dataMap, suite, tableIndex)
      paramsList.forEach((params:string) => {
        const rowData:DictObject = {}
        let basePerfVal:number
        dimList.forEach((dim, idx) => {
          if (!isPerfDataExsitUnderTable(dataMap, dim, suite, tableIndex)) return
          // 设置kpi和params数据
          if (!rowData.kpi) rowData.kpi = dataMap[dim].perfData[suite][tableIndex].kpi
          if (!rowData.params) rowData.params = params
          
          if (!dataMap[dim].perfData[suite][tableIndex].dataResult[params]) return
          if (idx === 0) { // 记录基线数据，用来计算%change
            basePerfVal = dataMap[dim].perfData[suite][tableIndex].dataResult[params][0]
          } else {
            const currentPerfVal = dataMap[dim].perfData[suite][tableIndex].dataResult[params][0]
            if (basePerfVal) {
              rowData[`change_${idx}`] = ((currentPerfVal - basePerfVal) / basePerfVal).toFixed(3)
            }
          }
          rowData[`perfVal_${idx}`] = dataMap[dim].perfData[suite][tableIndex].dataResult[params][0]
          rowData[`stddev_${idx}`] = dataMap[dim].perfData[suite][tableIndex].dataResult[params][1]
          if (rowData.jobs) {
            rowData.jobs.push(...dataMap[dim].perfData[suite][tableIndex].jobListOfParam[params])
          } else {
            rowData.jobs = dataMap[dim].perfData[suite][tableIndex].jobListOfParam[params]
          }
        })
        tableData.value.push(rowData)
      })
    })
  })
}

/**
 * 生成性能大表表头
 * @param dimList
 */
const generateTableColumn = (dimList: Array<string>) => {
  const tempArr:Array<DictObject> = []
  dimList.forEach((dim:string, index:number) => {
    if (index !== 0) {
      tempArr.push({ label: '%change', prop: `change_${index}`, minWidth: '90px', formatter: formatterPercentage})
    }
    tempArr.push({ label: dim, prop: `perfVal_${index}`, minWidth: '200px' })
    tempArr.push({ label: '%stddev', prop: `stddev_${index}`, minWidth: '80px', formatter: formatterPercentage })
  })
  return tempArr
}

/**
 * 从所有数据中提取出某个table下所有可能的param的列表
 * @param dataMap
 * @param suite 
 * @param tableIndex 
 */
const getParamListUnderTable = (dataMap:DictObject, suite: string, tableIndex: number) => {
  const tempSet = new Set()
  Object.keys(dataMap).forEach((dimVal:string) => {
    if (!isPerfDataExsitUnderTable(dataMap, dimVal, suite, tableIndex)) return
    dataMap[dimVal].perfData[suite][tableIndex].paramsList.forEach((param:string) => {
      tempSet.add(param)
    })
  })
  return Array.from(tempSet).sort()
}

const isPerfDataExsitUnderTable = (dataMap:DictObject, dim:string, suite:string, tableIndex: number) => {
  if (!dataMap[dim].perfData) return false
  if (!dataMap[dim].perfData[suite]) return false
  if (!dataMap[dim].perfData[suite][tableIndex]) return false
  return true
}

const showJobListDialog = (row:DictObject) => {
  jobListData.value = row.jobs
  jobListKpi.value = row.kpi
  jobListDialogVisible.value = true
}

const closeJobListDialog = () => {
  jobListDialogVisible.value = false
}

const goJobDetail = (url:string) => {
  window.open(url)
}

// 当表格数据或者展示维度切换时，更新表格配置数据
watchEffect(() => {
  generateTableConfigsAndData(props.tjobsAll, props.dimension, props.filterListDataUnderDimension)
})
</script>

<style lang="scss" scoped>
.dev-perf-table {
  .main-table {
    :deep(td) {
      &:nth-child(6n+3),&:nth-child(6n+4),&:nth-child(6n+5) {
        background-color: #f6f6f6;
      }
      &:nth-last-child(1),&:nth-last-child(2),&:nth-last-child(3){
        background-color: #fff;
      }
    }
    :deep(th) {
      background-color: #f3f7ff;
    }
  } 
}
.job-list-dialog {
  .dialog-talbe-container {
    max-height:400px;
    overflow-y:auto;
  }
}
</style>