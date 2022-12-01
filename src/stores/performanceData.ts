import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

const performanceData = reactive(<{[key:string]: any}>{})

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