import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

// submit维度新能数据获取及存储
const performanceData = reactive(<{ [key: string]: any }>{})
// 性能基线页，保存当前查询的列表数据submitId，用于从详情页返回时还原表格数据。
const currentPageSubmitIdList = ref<string[]>([])

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

  const resetSubmitIdList = () => {
    currentPageSubmitIdList.value = []
  }

  const addSubmitIdToList = (submitId:string) => {
    currentPageSubmitIdList.value.push(submitId)
  }

  return {
    loadingStatus,
    changeLoadingStatus,
    performanceData,
    setPerformanceData,
    comparationList,
    setComparationList,

    currentPageSubmitIdList,
    resetSubmitIdList,
    addSubmitIdToList
  }
})

// 获取主机信息
const testboxList = ref(<{}>[])
const testboxMap = reactive(<{ [key: string]: any }>{})
export const useTestboxStore = defineStore('testboxStore', () => {
  const setTestboxData = (list: []) => {
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