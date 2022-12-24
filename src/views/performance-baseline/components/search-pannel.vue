<template>
  <div class="performance-baseline-test-subassembly">
    <el-row class="subassembly">
      <el-col :span="2">
        <span>测试组件:</span>
      </el-col>
      <el-col :span="22">
        <el-radio-group v-model="selectedSuite">
          <el-radio-button
            v-for="(item, index) in suiteList"
            :key="index"
            :label="item" />
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="filter-content">
      <el-col :span="2">
        <span>筛选内容:</span>
      </el-col>
      <el-col :span="22">
        <el-row
          class="filter-criteria"
          v-for="(subField, fieldIndex) in fieldsValue"
          :key="fieldIndex">
          <el-col
            :xs="6"
            :sm="6"
            :md="6"
            :lg="6"
            :xl="6"
            class="filter-item"
            v-for="(paramKey, index) in Object.keys(subField)"
            :key="index">
            <span>{{ `${subField[paramKey].label}:` }}</span>
            <el-select
              class="filter-values"
              v-model="searchParams[paramKey]"
              clearable
              size="small">
              <el-option
                v-for="(item, listIndex) in subField[paramKey].fieldSettings
                  .listValues"
                :label="item.label || item.value"
                :value="item.value"
                :key="listIndex" />
            </el-select>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row justify="center">
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
import { config, fieldsConfig } from '../config-file'
import { getJobValueList } from '@/api/performance'

const route = useRoute()
const router = useRouter()

const performanceStore = usePerformanceData()

const emit = defineEmits<{
  (event: 'search', params: searchParams): void
}>()

// 修改fieldConfig的格式，方便展示
const initailizefieldsValue = () => {
  const fieldKeys = Object.keys(fieldsConfig)
  const len = Math.ceil(fieldKeys.length / 4)
  let temp = []
  for (let i = 0; i < len; i++) {
    const tempSec = {} as any
    for (let j = 0; j < 4 && i * 4 + j < fieldKeys.length; j++) {
      tempSec[fieldKeys[i * 4 + j]] = fieldsConfig[fieldKeys[i * 4 + j]]
    }
    temp.push(tempSec)
  }
  console.log(temp)
  return temp
}
const fieldsValue = initailizefieldsValue()

const suiteList = ref([] as string[])
const selectedSuite = ref('unixbench')

const fieldOrigin = {} as objectItem // 字典，用来判断某个field字段的origin
const hostFieldList = [] // 中间数据，用来循环host类型的field字段
const jobFieldList = [] as any // 中间数据，用来循环job类型的field字段

const searchParams = ref({} as objectItem)

interface objectItem {
  [key: string]: string
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
  const { scene } = route.query
  if (!scene) return
  const matchSenceConfig = config[String(scene)]
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
  const fieldKeys = Object.keys(fieldsConfig)

  // 设置field类型字典，便于快速识别field类型
  fieldKeys.forEach(field => {
    fieldOrigin[field] = fieldsConfig[field].origin
    if (fieldsConfig[field].origin === 'hosts') {
      hostFieldList.push(field)
    }
    if (fieldsConfig[field].origin === 'jobs') {
      jobFieldList.push(field)
    }
  })
}
// url上查询条件回填至查询项上
const setFieldSelection = () => {
  const fieldKeys = Object.keys(fieldsConfig)
  const { scene, suite, ...fields } = route.query
  Object.keys(fields).forEach(fieldKey => {
    if (fieldKeys.indexOf(fieldKey) > -1) {
      // 只添加当前选择框中存在的field选择
      searchParams.value[fieldKey] = fields[fieldKey] as string
    }
  })
}

// 获取搜索条件
const getFieldsOptions = () => {
  getJobValueList({ jobFieldList }).then(res => {
    const aggs = res.data.aggregations || {}
    Object.keys(aggs).forEach(field => {
      // 通过请求获取的可选项
      const listValues = aggs[field].buckets.map((item: any) => {
        return {
          value: item.key
        }
      })
      // default可选项
      const staticValues = fieldsConfig[field].fieldSettings.listValues || []
      addNewOptionValues(staticValues, listValues)
    })
  })
}
// 将inputArr中与sourceArr不同的选项追加到sourceArr中
const addNewOptionValues = (sourceArr: any[], inputArr: any[]) => {
  // 只需要m+n的运算复杂度
  const sourceMap = {} as any
  sourceArr.forEach(item => (sourceMap[item.value] = true))
  inputArr.forEach(inputItem => {
    if (!sourceMap[inputItem.value]) {
      sourceArr.push(inputItem)
    }
  })
}

// 获取主机相关搜索条件。
const getHostOptions = () => {
  // todo: 从store中获取主机信息
  // 合并主机数据，提出各个field的可选项
  // 通过addNewOptionValues将可选项追加到对应的field下
}

const handleReset = () => {
  searchParams.value = {}
}

const handleSearch = () => {
  // 记录查询条件到url上
  setQueryToUrl()
  const { hostParams, jobParams } = splitParamsByOrigin(searchParams.value)
  console.log(hostParams, jobParams)
  // todo: 请求逻辑待实现
  emit('search', { ...hostParams, ...jobParams, suite: selectedSuite.value })

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
  const newQuery = {} as objectItem
  Object.keys(searchParams.value).forEach(field => {
    newQuery[field] = searchParams.value[field]
  })
  newQuery['scene'] = route.query.scene as string
  newQuery['suite'] = selectedSuite.value
  router.push({
    path: '/baseline/list',
    query: { ...newQuery }
  })
}
// 将查询参数区分成主机参数和一般参数
const splitParamsByOrigin = (paramObj: objectItem) => {
  const hostParams = {} as objectItem
  const jobParams = {} as objectItem
  Object.keys(paramObj).forEach(field => {
    if (fieldOrigin[field] === 'hosts') {
      hostParams[field] = paramObj[field]
    } else {
      jobParams[field] = paramObj[field]
    }
  })
  return { hostParams, jobParams }
}

// 当场景切换时，初始化页面
watch(
  () => route.query.scene,
  () => {
    initailizing()
  }
)

onMounted(() => {
  initailizing()
  getFieldsOptions()
  getHostOptions()
})
// onBeforeMount(() => {
//   initailizefieldsValue()
// })
</script>

<style scoped lang="scss">
.el-col {
  border-radius: 4px;
}
.el-row {
  margin: 0 0 5px 0;
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

.filter-content {
  .filter-criteria {
    .filter-item {
      position: relative;
    }
    .filter-values {
      position: absolute;
      right: 20px;
      width: 60%;
    }
  }
}
span {
  font-size: 14px;
  min-width: 60px;
}
</style>
