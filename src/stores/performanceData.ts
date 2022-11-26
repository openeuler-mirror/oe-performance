import { reactive } from 'vue'
import { defineStore } from 'pinia'

const performanceData = reactive(<{[key:string]: any}>{})

export const usePerformanceData= defineStore('performanceData', () => {
  const setPerformanceData = (key:string, data: any) => {
    performanceData[key] = data
  }

  return { performanceData, setPerformanceData }
})