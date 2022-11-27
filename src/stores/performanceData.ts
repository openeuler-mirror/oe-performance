import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

const performanceData = reactive(<{ [key: string]: any }>{})

const comparationList = ref(<{}>[])
const currentScene = ref('bigData')

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

export const useSceneConfig = defineStore('sceneConfig', () => {
  const setScene = (scene : string) => {
    console.log(scene)
    currentScene.value = scene
  }
  return {
    currentScene,
    setScene
  }
})
