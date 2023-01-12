<template>
  <div class="performance-baseline-search-pannel">
    <!--测试组件只在性能基线页面中使用-->
    <el-row class="suite-selection" v-if="suiteByScene">
      <el-col :span="2">
        <span>测试组件:</span>
      </el-col>
      <el-col :span="22">
        <el-radio-group v-model="searchParams['suite']">
          <el-radio-button
            v-for="(item, index) in suiteList"
            :key="index"
            :label="item.suiteName"
            :disabled="item.unavailable"/>
        </el-radio-group>
      </el-col>
    </el-row>
    <!--测试组件 end-->
    <el-row class="search-field-section">
      <el-col :span="2">
        <span>筛选内容:</span>
      </el-col>
      <el-col :span="22">
        <el-row
          class="react-row"
          v-for="(subField, fieldIndex) in fieldsListForRender"
          :key="fieldIndex">
          <el-col
            :xs="24"
            :sm="12"
            :lg="6"
            class="field-item"
            v-for="(paramKey, index) in Object.keys(subField)"
            :key="index">
            <span>{{ `${subField[paramKey].label}:` }}</span>
            <el-select
              class="field-selection"
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
      <el-button @click="handleReset">重置</el-button>
      <el-button
        type="primary"
        @click="handleSearch"
        :loading="searchLoading || fieldLoadingCount !== 0"
        >
        搜索
      </el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { suiteConfig, fieldsConfig } from './config'

import { getJobValueList, getTestBoxes } from '@/api/performance'

const props = defineProps({
  // 是否根据场景区分展示套件。只在性能基线表格页面中使用
  suiteByScene: {
    type: Boolean,
    default: false
  },
  searchLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (event: 'search', params: searchParams): void
}>()

const route = useRoute()
const router = useRouter()

const fieldsListForRender = ref([] as string[])
const suiteList = ref([] as string[])
// uite = ref('unixbench')
const testboxList = ref([])
const fieldLoadingCount = ref(0)

const fieldOrigin = {} as objectItem // 字典，用来判断某个field字段的origin
const hostFieldList = [] as any // 中间数据，用来循环host类型的field字段
const jobFieldList = [] as any // 中间数据，用来循环job类型的field字段

const searchParams = ref({} as objectItem)

interface objectItem {
  [key: string]: string
}

// 修改fieldConfig的格式，方便展示
const initailizefieldsList = () => {
  let fieldKeys = Object.keys(fieldsConfig)
  if (props.suiteByScene) {
    fieldKeys = fieldKeys.filter(key => key !== 'suite')
  }
  const len = Math.ceil(fieldKeys.length / 4)
  let temp = []
  for (let i = 0; i < len; i++) {
    const tempSec = {} as any
    for (let j = 0; j < 4 && i * 4 + j < fieldKeys.length; j++) {
      tempSec[fieldKeys[i * 4 + j]] = fieldsConfig[fieldKeys[i * 4 + j]]
    }
    temp.push(tempSec)
  }
  return temp
}

// 页面初始化方法
const initailizing = () => {
  fieldsListForRender.value = initailizefieldsList()
  setFeildsData()
  setFieldSelection()

  if (props.suiteByScene) {
    setSuiteList()
    setDefaultSuite()
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
  const { scene, ...fields } = route.query
  Object.keys(fields).forEach(fieldKey => {
    if (fieldKeys.indexOf(fieldKey) > -1) {
      // 只添加当前选择框中存在的field选择
      searchParams.value[fieldKey] = fields[fieldKey] as string
    }
  })
}
// 性能基线页面中:
// 根据当前场景，显示不同的suite可选项
const setSuiteList = () => {
  const { scene } = route.query
  if (!scene) return
  const matchSenceConfig = suiteConfig[String(scene)]
  if (!matchSenceConfig) return
  suiteList.value = matchSenceConfig.suiteList || []
}
// 性能基线页面中:
// 设置默认选中的suite，如果url中有，则使用url的
const setDefaultSuite = () => {
  const { suite } = route.query
  if (suite && suiteList.value.find(suiteItem => suiteItem.suiteName === suite)) {
    searchParams.value['suite'] = String(suite)
  } else {
    searchParams.value['suite'] = suiteList.value[0] && suiteList.value[0].suiteName
  }
}

// 获取搜索条件
const getFieldsOptions = () => {
  fieldLoadingCount.value ++
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
  }).finally(() => {
    fieldLoadingCount.value --
  })
}
// 获取主机相关搜索条件。
const getHostOptions = () => {
  fieldLoadingCount.value ++
  const fieldList = hostFieldList.map((field:string) => field.replace('hw.', ''))
  getTestBoxes().then((testboxRes => {
    testboxList.value = testboxRes.data.hits.hits.map(item => {
      return {
        testboxId: item._id,
        ...item._source
      }
    })
    fieldList.forEach(field => {
      const listValues = []
      const repeatMap = {}
      testboxList.value.forEach(testbox => {
        if (testbox[field] && !repeatMap[testbox[field]]) {
          listValues.push({
            value: testbox[field]
          })
          repeatMap[testbox[field]] = 1
        }
      })
      const staticValues = fieldsConfig[`hw.${field}`].fieldSettings.listValues || []
      addNewOptionValues(staticValues, listValues)
    })
  })).finally(() => {
    fieldLoadingCount.value --
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

const handleReset = () => {
  searchParams.value = {}
}

const handleSearch = () => {
  // 记录查询条件到url上
  setQueryToUrl()
  const { hostParams, jobParams } = splitParamsByOrigin(searchParams.value)
  if (Object.keys(hostParams).length > 0) {
    const testboxSearchList = []
    Object.keys(hostParams).forEach(hostFieldKey => {
      const tempKey = hostFieldKey.replace('hw.', '')
      const tempIdList = testboxList.value.filter(testbox => {
        return testbox[tempKey] && testbox[tempKey] === hostParams[hostFieldKey]})
        .map(testbox => testbox.testboxId)
      testboxSearchList.push(...tempIdList)
    })
    const searchParams = { ...jobParams }
    if (testboxSearchList.length > 0) {
      searchParams.testboxByParams = testboxSearchList
    }
    emit('search', searchParams)
  } else {
    emit('search', jobParams)
  }
}

// 将筛选条件添加到url中
const setQueryToUrl = () => {
  const newQuery = {} as objectItem
  Object.keys(searchParams.value).forEach(field => {
    searchParams.value[field] && (newQuery[field] = searchParams.value[field])
  })
  newQuery['scene'] = route.query.scene as string
  router.push({
    path: route.path,
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
</script>

<style scoped lang="scss">
.el-col {
  margin-bottom: 5px;
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

.search-field-section {
  .react-row {
    .field-item {
      position: relative;
    }
    .field-selection {
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
