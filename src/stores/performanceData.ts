import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

const performanceData = reactive(<{ [key: string]: any }>{})

const comparationList = ref(<{}>[])

export const usePerformanceData = defineStore('performanceData', () => {
  const setPerformanceData = (key: string, data: any) => {
    performanceData[key] = data
  }

  const setComparationList = (comapreArr: {}[]) => {
    comparationList.value = comapreArr
  }

  return {
    performanceData,
    setPerformanceData,
    comparationList,
    setComparationList
  }
})

