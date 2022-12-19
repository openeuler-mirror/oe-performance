<template>
  <div class="performance-baseline-test-subassembly">
    <div class="subassembly">
      <span>测试组件:</span>
      <el-radio-group v-model="selectedSuite" class="subassembly-btn">
        <el-radio-button
          v-for="(item, index) in testSubassembly"
          :key="index"
          :label="item" />
      </el-radio-group>
    </div>
    <div class="filter-content">
      <span>筛选内容:</span>
      <div class="filter-criteria">
        <div
          class="filter-item"
          v-for="(paramKey, index) in filterCriteria"
          :key="index">
          <span>{{ optionConfig[paramKey].label + ':' }}</span>
          <el-select
            class="filter-values"
            v-model="optionBind[paramKey]"
            @clear="handleClearCriteria(paramKey)"
            clearable
            size="small">
            <el-option
              v-for="(item, listIndex) in optionConfig[paramKey].fieldSettings
                .listValues"
              @click="handleCriteriaChange(paramKey, item.value)"
              :label="item.label || item.value"
              :value="item.value"
              :key="listIndex" />
          </el-select>
        </div>
      </div>
    </div>
    <el-row :gutter="20" justify="center">
      <el-col :span="2"
        ><el-button @click="handleReset">重置</el-button></el-col
      >
      <el-col :span="2">
        <el-button
          type="primary"
          @click="handleSearch"
          :disabled="performanceStore.loadingStatus.searchLoading">
          搜索
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePerformanceData } from '@/stores/performanceData'
import { config, sceneConfig, optionBind } from '../config-file'
import { jobModel } from '/data-model'
import { queryBySystemParam, queryCriteria } from '@/api/detail'
import { ElMessage } from 'element-plus'
import { getSearchParams, getJobValueList } from '@/api/performance'

const selectedSuite = ref('unixbench')

const performanceStore = usePerformanceData()

const emit = defineEmits<{
  (event: 'search', params: searchParams): void
}>()

const route = useRoute()
const router = useRouter()
const testSubassembly = ref([] as string[])
const filterCriteria = ref([] as string[])
const optionConfig = jobModel.fields

const systemParams = [] as any[]
const caseParams = [] as any[]

interface queryItem {
  [key: string]: string
}
const handleQueryChange = () => {
  // 将筛选条件添加到url中
  const newQuery = {} as queryItem
  caseParams.forEach((item: any) => {
    newQuery[item.paramKey] = item.value
  })
  systemParams.forEach((item: any) => {
    newQuery[item.paramKey] = item.value
  })
  newQuery['scene'] = route.query.scene as string
  newQuery['testSubassembly'] = selectedSuite.value
  router.push({
    path: '/baseline/list',
    query: { ...newQuery }
  })
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
            { match: { suite: selectedSuite.value } },
            { exists: { field: 'submit_id' } }
          ]
        }
      },
      aggs: {
        uid_aggs: {
          terms: {
            field: 'submit_id',
            size: 10000
          },
          aggs: {
            my_top_hits: {
              top_hits: {
                _source: {
                  includes: ['suite',
                    'submit_id',
                    'os',
                    'os_version',
                    'nr_cpu',
                    'memory',
                    'testbox',
                    'kernel_version',
                    'nr_node',
                    'job_stage',
                    'job_health']
                },
                size: 1 // 查询配置是通用配置，只取其中的第一个job的数据做处理
              }
            }
          }
        }
      }
    }
  }).then(res => {
    const rawData = res.data.aggregations.uid_aggs.buckets.map(
      (sub_item: any) => sub_item.my_top_hits.hits.hits[0]._source
    )
    setSearchOptions(rawData)
  })
}

const setSearchOptions = (testResultCommonParamsList: any) => {
  filterCriteria.value.forEach(paramKey => {
    testResultCommonParamsList.forEach((submitItem: any) => {
      if (
        submitItem[paramKey] &&
        !optionConfig[paramKey].fieldSettings.listValues.filter(
          (option: any) => submitItem[paramKey] === option.value
        )[0]
      ) {
        optionConfig[paramKey].fieldSettings.listValues.push({
          label: submitItem[paramKey],
          value: submitItem[paramKey]
        })
      }
    })
  })
  console.log('筛选数据: ', optionConfig)
}
const handleCriteriaChange = (paramKey: any, param: string) => {
  let index: number
  const tag = optionConfig[paramKey].origin
  if (tag === 'hosts') {
    index = systemParams.findIndex(item => item.paramKey === paramKey)
    if (index === -1) {
      systemParams.push({
        paramKey: paramKey,
        value: param
      })
    } else {
      systemParams[index].value = param
    }
  } else if (tag === 'jobs') {
    index = caseParams.findIndex(item => item.paramKey === paramKey)
    if (index === -1) {
      caseParams.push({
        paramKey: paramKey,
        value: param
      })
    } else {
      caseParams[index].value = param
    }
  }
}
const handleClearCriteria = (paramKey: string) => {
  const tag = optionConfig[paramKey].origin
  if (tag === 'hosts') {
    systemParams.splice(
      systemParams.findIndex(item => item.paramKey === paramKey),
      1
    )
  } else {
    caseParams.splice(
      caseParams.findIndex(item => item.paramKey === paramKey),
      1
    )
  }
}

const handleReset = () => {
  systemParams.length = 0
  caseParams.length = 0
  filterCriteria.value.forEach((paramKey: string) => {
    optionBind.value[paramKey] = ''
  })
}

const handleSearch = () => {
  handleQueryChange()
  if (systemParams.length > 0) {
    queryBySystemParam(systemParams)
      .then(submitIdRes => {
        queryCriteria(caseParams, submitIdRes.data)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            ElMessage.error(err)
          })
      })
      .catch(err => {
        ElMessage.error(err)
      })
  } else {
    queryCriteria(caseParams)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        ElMessage.error(err)
      })
  }
  emit('search', { ...systemParams, ...caseParams, suite: selectedSuite.value })
}

watchEffect(() => {
  const scene = route.query.scene ? route.query.scene : 'bigData'
  let key: keyof typeof sceneConfig
  for (key in sceneConfig) {
    if (sceneConfig[key].findIndex(item => item.prop === scene) !== -1) {
      testSubassembly.value = config[scene as string].testSubassembly || []
      filterCriteria.value = Object.keys(jobModel.fields)
    }
  }
})

onMounted(() => {
  // 初始化页面时已经存在筛选条件的情况
  selectedSuite.value = route.query.testSubassembly
    ? (route.query.testSubassembly as string)
    : 'unixbench'
  const keys = Object.keys(route.query)
  keys.forEach((key: string) => {
    if (filterCriteria.value.findIndex(paramKey => paramKey === key) !== -1) {
      optionBind.value[key] = route.query[key] as string
      if (optionConfig[key].origin === 'hosts') {
        systemParams.push({
          paramKey: key,
          value: route.query[key] as string
        })
      } else if (optionConfig[key].origin === 'jobs') {
        systemParams.push({
          paramKey: key,
          value: route.query[key] as string
        })
      }
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
  width: 1200px;
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

.subassembly-btn {
  margin-left: 20px;
}

.filter-content {
  margin: 10px 0 10px 0;
  display: flex;
  width: 100%;

  .filter-criteria {
    display: flex;
    flex-wrap: wrap;
    margin-left: 20px;
    .filter-item {
      min-width: 200px;
      width: 20%;
      display: flex;
      justify-content: space-between;
      margin: 0 20px 5px 0;
      .filter-values {
        width: 60%;
      }
    }
  }
}
span {
  font-size: 14px;
  min-width: 60px;
}
</style>
