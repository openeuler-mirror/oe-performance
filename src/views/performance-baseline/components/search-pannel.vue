<template>
  <div class="performance-baseline-test-subassembly">
    <div class="subassembly">
      <span>测试组件:</span>
      <el-radio-group v-model="selectedSuite" class="subassembly-btn">
        <el-radio-button
          v-for="(item, index) in suiteList"
          :key="index"
          :label="item" />
      </el-radio-group>
    </div>
    <div class="filter-content">
      <span>筛选内容:</span>
      <div class="filter-criteria">
        <div
          class="filter-item"
          v-for="(paramKey, index) in Object.keys(fieldsConfigs)"
          :key="index">
          <span>{{ `${fieldsConfigs[paramKey].label}:` }}</span>
          <el-select
            class="filter-values"
            v-model="searchParams[paramKey]"
            clearable
            size="small"
          >
            <el-option
              v-for="(item, listIndex) in fieldsConfigs[paramKey].fieldSettings.listValues"
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
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePerformanceData } from '@/stores/performanceData'
import { config } from '../config-file'
import { jobModel } from '/data-model'
import { queryBySystemParam } from '@/api/detail'
import { ElMessage } from 'element-plus'
import { getJobValueList } from '@/api/performance'

// import { optionBind } from './search-pannel-config'

const route = useRoute()
const router = useRouter()

const performanceStore = usePerformanceData()

const emit = defineEmits<{
  (event: 'search', params: searchParams): void
}>()

const fieldsConfigs = jobModel.fields

const selectedSuite = ref('unixbench')

const suiteList = ref([] as string[])
// const fieldList = ref([] as string[])
const systemParams = [] as any[]
const caseParams = [] as any[]

const fieldOrigin = {}
const hostFieldList = []
const jobFieldList = []

const searchParams = ref({})

interface queryItem {
  [key: string]: string
}

// 获取搜索条件
const getFieldsOptions = () => {
  getJobValueList({jobFieldList}).then((res) => {
    const aggs = res.data.aggregations || {}
    Object.keys(aggs).forEach(field => {
      // 通过请求获取的可选项
      const listValues = aggs[field].buckets.map(item => {
        return {
          value:item.key
        }
      })
      // default可选项
      const staticValues = fieldsConfigs[field].fieldSettings.listValues || []
      addNewOptionValues(staticValues, listValues)
    })
  })
}
// 将inputArr中与sourceArr不同的选项追加到sourceArr中
const addNewOptionValues = (sourceArr, inputArr) => {
  // 只需要m+n的运算复杂度
  const sourceMap = {}
  sourceArr.forEach(item => sourceMap[item.value] = true)
  inputArr.forEach(inputItem => {
    if (!sourceMap[inputItem.value]) {
      sourceArr.push(inputItem)
    }
  })
}

const handleReset = () => {
  searchParams.value = {}
}

const handleSearch = () => {
  // 记录查询条件到url上
  setQueryToUrl()
  const { hostParams, jobParams } = splitParamsByOrigin(searchParams.value)
  console.log(hostParams, jobParams)
  return 

  // if (systemParams.length > 0) {
  //   // 如果有选择硬件配置，则先通过硬件信息查询testbox列表
  //   queryBySystemParam(systemParams)
  //     .then(res => { // testboxIdList
  //       emit('search', { ...systemParams, ...caseParams, suite: selectedSuite.value })
  //     })
  //     .catch(err => {
  //       ElMessage.error(err)
  //     })
  // } else {
  //   emit('search', { ...caseParams, suite: selectedSuite.value })
  // }
}

// 将筛选条件添加到url中
const setQueryToUrl = () => {
  const newQuery = {} as queryItem
  Object.keys(searchParams.value).forEach(field => {
    newQuery[field] = searchParams.value[field]
  })
  newQuery['scence'] = route.query.scence as string
  newQuery['suite'] = selectedSuite.value
  router.push({
    path: '/baseline/list',
    query: { ...newQuery }
  })
}
// 将查询参数区分成主机参数和一般参数
const splitParamsByOrigin = (paramObj) => {
  const hostParams = {}
  const jobParams = {}
  Object.keys(paramObj).forEach(field => {
    if (fieldOrigin[field] === 'hosts') {
      hostParams[field] = paramObj[field]
    } else {
      jobParams[field] = paramObj[field]
    }
  })
  return { hostParams, jobParams }
}

// 页面初始化方法
const initailizing = () => {
  setFeildsData()
  setSuiteList()
  setDefaultSuite()
  setFieldSelection()
}
// 根据当前场景，显示不同的suite可选项
const setSuiteList = () => {
  const { scence } = route.query
  if (!scence) return
  const matchSenceConfig = config[String(scence)]
  if (!matchSenceConfig) return
  suiteList.value = matchSenceConfig.suiteList || []
}
// 设置默认选中的suite，如果url中有，则使用url的
const setDefaultSuite = () => {
  const { suite } = route.query
  if (suite && suiteList.value.indexOf(String(suite)) > -1) {
    selectedSuite.value = String(suite)
  } else {
    selectedSuite.value = suiteList.value[0]
  }
}
// 设置可查询项
const setFeildsData = () => {
  const fieldKeys = Object.keys(fieldsConfigs)

  // 设置field类型字典，便于快速识别field类型
  fieldKeys.forEach(field => {
    fieldOrigin[field] = jobModel.fields[field].origin
    if (jobModel.fields[field].origin === 'hosts') {
      hostFieldList.push(field)
    }
    if (jobModel.fields[field].origin === 'jobs') {
      jobFieldList.push(field)
    }
  })
}
// url上查询条件回填至查询项上
const setFieldSelection = () => {
  const fieldKeys = Object.keys(fieldsConfigs)
  const { scence, suite, ...fields } = route.query
  Object.keys(fields).forEach(fieldKey => {
    if (fieldKeys.indexOf(fieldKey) > -1) { // 只添加当前选择框中存在的field选择
      searchParams.value[fieldKey] = fields[fieldKey]
    }
  })
}

// 当场景切换时，初始化页面
watch(
  () => route.query.scence,
  () => {
    initailizing()
  }
)

onMounted(() => {
  initailizing()
  getFieldsOptions()
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
