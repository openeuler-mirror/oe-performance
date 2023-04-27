<template>
  <div>
    <el-table border>
      <el-table-column
        v-for="(column, idx) in tableColumns"
        :key="`${column.label}_${idx}`"
        :label="column.label"
        :prop="column.prop"/>
    </el-table>
  </div>
</template>

<script setup lang="ts">
/**
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
import { supportedSuiteList, getDimensionValue, isTjobPassedFilterCheck } from '../utils/tjobCompute'
import { computeMean, computeStddev } from '@/utils/utils'

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
  filterListUnderDimension: {
    type: Array,
    default: () => []
  },
  suiteFilterList: {
    type: Array,
    default: () => []
  }
})

const dataMap:Ref<DictObject> = ref({})

const tableColumns:Ref<Array<DictObject>> = ref([])
const tableData = ref([])

const generateTableConfigsAndData = (tjobs, dimension:string, filterList: Array<string|unknown>) => {
  dataMap.value = {}
  filteringSuiteList().forEach(suite => {
    suiteTables[suite].forEach((tableConfig: Array<DictObject>, tableIndex: number) => {
      tjobs[suite] && tjobs[suite].forEach(tjob => {
        const dimensionValue = getDimensionValue(tjob, dimension)
        if (!dimensionValue) return
        if (filterList.length > 0
          && filterList.indexOf(dimensionValue) < 0) return
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
  console.log(dataMap.value)
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
    dataItem.perfData[suite] = []
    dataItem.perfData[suite][tableIndex] = initialDataByTable
    return dataItem.perfData[suite][tableIndex]
  } 
  if (!dataItem.perfData[suite]) {
    dataItem.perfData[suite] = []
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
    Object.keys(dataMap[dim].perfData).forEach(suite => {
      dataMap[dim].perfData[suite].forEach((perfDataByTable: InitialDataByTable) => {
        computingGeoMeanAndStddev(perfDataByTable)
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
  const dimList = Object.keys(dataMap)
  tableColumns.value = generateTableColumn(dimList)
  filteringSuiteList().forEach((suite:string) => {
    
  })
  dimList.forEach(dim => {
    Object.keys(dataMap[dim].perfData).forEach(suite => {
      dataMap[dim].perfData[suite].forEach((perfDataByTable: InitialDataByTable) => {
        
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
      tempArr.push({ label: '%change', prop: `change_${index}`})
    }
    tempArr.push({ label: dim, prop: `perfVal_${index}` })
    tempArr.push({ label: '%stddev', prop: `stddev_${index}` })
  })
  tempArr.push({ label: 'kpi', prop: 'kpi' })
  tempArr.push({ label: 'params', prop: 'params' })
  tempArr.push({ label: 'jobs', prop: 'jobs' })
  return tempArr
}

// 当表格数据或者展示维度切换时，更新表格配置数据
watchEffect(() => {
  generateTableConfigsAndData(props.tjobsAll, props.dimension, props.filterListUnderDimension)
})
</script>