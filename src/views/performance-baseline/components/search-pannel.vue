<template>
  <div class="performance-baseline-test-subassembly">
    <el-row :gutter="25" class="subassembly-btn">
      <el-col :span="2"
        ><span class="general-font-style">测试组件:</span></el-col
      >
      <el-col :span="22">
        <el-radio-group v-model="selectedSuite" class="ml-4">
          <el-radio-button
            v-for="(item, index) in testSubassembly"
            :key="index"
            :label="item" />
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="25">
      <el-col :span="2"
        ><span class="general-font-style">筛选内容:</span></el-col
      >
      <el-col :span="22" class="filter-criteria-col">
        <div class="filter-criteria">
          <el-row :gutter="8">
            <el-col
              :span="6"
              :xs="{span:24}"
              :sm="{span:12}"
              :lg="{span:6}"
              v-for="(param, index) in searchParamList"
              :key="index">
              <span class="general-font-style">{{ param.title + ':' }}</span>
              <el-select
                v-model="param.bindValue"
                @clear="clearParamValue(param.paramKey, param.tag)"
                clearable
                size="small">
                <el-option
                  v-for="item in param.options"
                  @click="selectParamValue(param, item.value)"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value" />
              </el-select>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="center">
      <el-col :span="2"><el-button>重置</el-button></el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          @click="handleSearch"
          :disabled="performanceStore.loadingStatus.searchLoading"
          >
          搜索
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePerformanceData } from '@/stores/performanceData'

import { getSearchParams, getJobValueList } from '@/api/performance'

import { config, sceneConfig } from '../config-file'

const selectedSuite = ref('unixbench')

const performanceStore = usePerformanceData()

const emit = defineEmits<{
  (event: 'search', params: searchParams): void
}>()

const route = useRoute()
const router = useRouter()
const testSubassembly = ref([] as string[])
const searchParamList = ref([] as any[])

const systemParams = [] as any[]
const caseParams = [] as any[]

interface queryItem {
  [key: string]: string
}

// 获取搜索条件
const getRawSearchParams = () => {
  getSearchParams({
    index: 'jobs',
    query: {
      size: 0,
      _source: ['submit_id', 'suite'],
      query: {
        bool: {
          must: [
            {match: {suite: selectedSuite.value}},
            {exists: {field: 'submit_id'}}
          ]
        }
      },
      aggs: {
        uid_aggs: {
          terms: {
            field: 'submit_id',
            size: 10000,
          },
          aggs: {
            my_top_hits: {
              top_hits: {
                _source: {
                  includes: ['suite', 'submit_id', 'os', 'os_version', 'nr_cpu', 'memory', 'testbox', 'kernel_version', 'nr_node', 'job_stage', 'job_health']
                },
                size: 1 // 查询配置是通用配置，只取其中的第一个job的数据做处理
              }
            }
          }
        }
      }
    }
  }).then((res) => {
    const rawData = res.data.aggregations.uid_aggs.buckets.map(sub_item => sub_item.my_top_hits.hits.hits[0]._source)
    console.log('粗粒度筛选数据: ', rawData)
    setSearchOptions(rawData)
  })
}

const setSearchOptions = (testResultCommonParamsList: any) => {
  searchParamList.value.forEach(param => {
    testResultCommonParamsList.forEach(submitItem => {
      if (submitItem[param.paramKey] 
      && !param.options.filter(option => submitItem[param.paramKey] === option.value)[0]) {
        param.options.push({
          label: submitItem[param.paramKey],
          value: submitItem[param.paramKey]
        })
      }
    })
  })
  console.log('筛选数据: ', searchParamList.value)
}

const selectParamValue = (value: any, param: string) => {
  let index: number
  if (value.tag === 'system') {
    index = systemParams.findIndex(item => item.paramKey === value.paramKey)
    if (index === -1) {
      systemParams.push({
        paramKey: value.paramKey,
        value: param
      })
    } else {
      systemParams[index].value = param
    }
  } else {
    index = caseParams.findIndex(item => item.paramKey === value.paramKey)
    if (index === -1) {
      caseParams.push({
        paramKey: value.paramKey,
        value: param
      })
    } else {
      caseParams[index].value = param
    }
  }
}
const clearParamValue = (paramKey: string, tag: string) => {
  if (tag === 'system') {
    systemParams.splice(systemParams.findIndex(item => item.paramKey === paramKey), 1)
  } else {
    caseParams.splice(caseParams.findIndex(item => item.paramKey === paramKey), 1)
  }
}
// const handleQueryCriteria = () => {
//   const submitCaseParams = [] as any[]
//   caseParams.forEach((elem: any) => {
//     submitCaseParams.push(elem.options)
//   })
//   if (systemParams.length > 0) {
//     console.log('submit1')
//     const submitSystemParams = [] as any[]
//     systemParams.forEach((elem: any) => {
//       submitSystemParams.push(elem.options)
//     })
//     queryBySystemParam(submitSystemParams).then(res => {
//       queryCriteria(submitCaseParams, res.data).then(resCase => {
//         filterData.value = resCase.data
//       })
//     })
//   } else {
//     console.log('submit2')
//     queryCriteria(submitCaseParams).then(resCase => {
//       filterData.value = resCase.data
//     })
//   }
// }

const setQueryToUrl = () => {
  const newQuery = {} as queryItem
  caseParams.forEach((item: any) => {
    newQuery[item.paramKey] = item.value
  })
  systemParams.forEach((item: any) => {
    newQuery[item.paramKey] = item.value
  })
  newQuery['scene'] = route.query.scene as string
  newQuery['testSubassembly'] = selectedSuite.value
  router.replace({
    path: '/baseline/list',
    query: { ...newQuery }
  })
}

const handleSearch = () => {
  const searchParams = reactive({})
  searchParamList.value.forEach(item => {
    searchParams[item.paramKey] = item.bindValue
  })
  setQueryToUrl()
  emit('search', { ...searchParams, suite: selectedSuite.value})
}

watchEffect(() => {
  const scene = route.query.scene ? route.query.scene : 'bigData'
  let key: keyof typeof sceneConfig
  for (key in sceneConfig) {
    if (sceneConfig[key].findIndex(item => item.prop === scene) !== -1) {
      testSubassembly.value = config[scene as string].testSubassembly || []
      searchParamList.value = config[scene as string].searchParamList.value || []
    }
  }
})

onMounted(() => {
  selectedSuite.value = route.query.testSubassembly ? route.query.testSubassembly as string : 'unixbench'
  const keys = Object.keys(route.query)
  keys.forEach((key: string) => {
    const matchedObj = searchParamList.value.filter(paramItem => paramItem.paramKey === key)[0]
    if (matchedObj) {
      matchedObj.bindValue = route.query[key]
    }
  })

  getRawSearchParams()
  getJobValueList()
})
</script>

<style scoped lang="scss">
.el-col {
  border-radius: 4px;
  position: relative;
}
.el-row {
  margin: 0 0 5px 0;
}
.filter-criteria {
  :deep(.el-select--small) {
    position: absolute;
    left: 100px;
  }
}

.general-btn {
  padding: 5px 8%;
  border: 1px solid var(--oe-perf-normal-border-color);
  color: #7c7c7c;
  user-select: none;
  cursor: pointer;
}
.index-btn {
  color: #25b3f2;
  border-color: #25b3f2;
}
.first-btn {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.last-btn {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.general-font-style {
  font-size: 14px;
  justify-content: space-between;
  // align-self: flex-end;
}
</style>
