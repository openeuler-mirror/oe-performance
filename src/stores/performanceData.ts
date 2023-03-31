import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

// submit维度新能数据获取及存储
const performanceData = reactive(<{ [key: string]: any }>{})

const comparationList = ref(<{}>[])
const loadingStatus = reactive({
  searchLoading:false
})
export const usePerformanceData= defineStore('performanceData', () => {
  const setPerformanceData = (key:string, data: any) => {
    performanceData[key] = data
  }

  const setComparationList = (comapreArr: {}[]) => {
    comparationList.value = comapreArr
  }

  const changeLoadingStatus = (state:boolean) => {
    loadingStatus.searchLoading = state
  }

  return {
    loadingStatus,
    changeLoadingStatus,
    performanceData,
    setPerformanceData,
    comparationList,
    setComparationList,
  }
})

// 性能基线页，保存当前查询的列表数据submitId，用于从详情页返回时还原表格数据。
const baselineSubmitList = ref<string[]>([])
const baselineTableInfo = ref({})

export const useBaselineTableInfoStore= defineStore('baselineTableInfo', () => {
  const resetSubmitIdList = () => {
    baselineSubmitList.value = []
    baselineTableInfo.value = {}
  }

  const setSubmitList = (submitList:string[]) => {
    baselineSubmitList.value = submitList
  }
  const setTableInfo = (tableInfo: {}) => {
    baselineTableInfo.value = tableInfo
  }

  return {
    baselineSubmitList,
    baselineTableInfo,
    resetSubmitIdList,
    setSubmitList,
    setTableInfo
  }
})

// 获取主机信息
const testboxList = ref(<{}>[])
const testboxMap = reactive(<{ [key: string]: any }>{})
export const useTestboxStore = defineStore('testboxStore', () => {
  const setTestboxData = (list: {testboxId:string}[]) => {
    testboxList.value = list
    list.forEach((testboxItem:{testboxId:string}) => {
      testboxMap[testboxItem.testboxId] = testboxItem
    })
  }

  return {
    testboxList,
    testboxMap,
    setTestboxData
  }
})