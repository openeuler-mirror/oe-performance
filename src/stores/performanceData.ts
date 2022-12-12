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
    setComparationList
  }
})

// 获取主机信息
const testboxList = ref(<{}>[])
const testboxMap = reactive(<{ [key: string]: any }>{})
export const useTestboxStore = defineStore('testboxStore', () => {
  const setTestboxData = (list: []) => {
    testboxList.value = list
    list.forEach((testboxItem:{id:string}) => {
      testboxMap[testboxItem.id] = testboxItem
    })
  }

  return {
    testboxList,
    testboxMap,
    setTestboxData
  }
})