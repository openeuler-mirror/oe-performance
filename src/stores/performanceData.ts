import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

// submit维度新能数据获取及存储
const performanceData = reactive(<{ [key: string]: any }>{})

const comparationList = ref(<{}>[])
const loadingStatus = reactive({
  searchLoading: false
})
export const usePerformanceData = defineStore('performanceData', () => {
  const setPerformanceData = (key: string, data: any) => {
    // performanceData[key] = data
    performanceData[key] = data
  }

  const setComparationList = (comapreArr: {}[]) => {
    comparationList.value = comapreArr
  }

  const changeLoadingStatus = (state: boolean) => {
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

// 性能基线页，保存当前查询的列表数据submitId，用于从详情页返回时还原表格数据。
const baselineSubmitList = ref<string[]>([])
const baselineTableInfo = ref<UseBaselineTableInfoStore.BaselineTableInfo>(
  {} as any
)
const searchParamData = {
  searchLimitTime: 10,
  searchLimitTotal: 3000,
  suite: []
}
const jobCount = ref(0)

export const useBaselineTableInfoStore = defineStore(
  'baselineTableInfo',
  () => {
    const resetSubmitIdList = () => {
      baselineSubmitList.value = []
      baselineTableInfo.value = {} as any
    }

    const setSubmitList = (submitList: string[]) => {
      baselineSubmitList.value = submitList
    }
    const setTableInfo = (
      tableInfo: UseBaselineTableInfoStore.BaselineTableInfo
    ) => {
      baselineTableInfo.value = tableInfo
    }
    const setGeneralSearchParam = (data: DictObject) => {
      searchParamData.searchLimitTime = data.searchLimitTime.value || 10
      searchParamData.searchLimitTotal = data.searchLimitTotal.value || 3000
      searchParamData.suite = data.suite
    }
    const setJobCount = (count: number) => {
      jobCount.value = count
    }

    return {
      baselineSubmitList,
      baselineTableInfo,
      searchParamData,
      jobCount,
      resetSubmitIdList,
      setSubmitList,
      setTableInfo,
      setGeneralSearchParam,
      setJobCount
    }
  }
)

// 获取主机信息
const testboxList = ref(<{}>[])
const testboxMap = reactive(<{ [key: string]: any }>{})
export const useTestboxStore = defineStore('testboxStore', () => {
  const setTestboxData = (list: { testboxId: string }[]) => {
    testboxList.value = list
    list.forEach((testboxItem: { testboxId: string }) => {
      testboxMap[testboxItem.testboxId] = testboxItem
    })
  }

  return {
    testboxList,
    testboxMap,
    setTestboxData
  }
})
