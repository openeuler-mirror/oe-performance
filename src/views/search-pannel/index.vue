<template>
  <div class="performance-baseline-search-pannel">
    <!--测试组件只在性能基线页面中使用-->
    <el-row class="suite-selection" v-if="suiteByScene" :gutter="4">
      <el-col class="suite-selection-label" :span="2">
        <span>测试组件:</span>
      </el-col>
      <el-col :span="22">
        <el-checkbox-group v-model="searchParams['suite']">
          <el-checkbox-button
            v-for="(item, index) in suiteList"
            :key="index"
            :label="item.suiteName"
            :disabled="item.unavailable"/>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <!--测试组件 end-->
    <el-row class="search-field-section" :gutter="4">
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
            :key="index"
          >
            <span class="fields-label">{{ `${subField[paramKey].label}:` }}</span>
            <!--for osv group-->
            <el-cascader
              class="field-selection"
              v-if="paramKey==='osv'"
              v-model="searchParams[paramKey]"
              :loading="subField[paramKey].origin === 'jobs' ? jobFieldsLoading : hostFieldsLoading"
              :options="subField[paramKey].fieldSettings.listValues"
              :props="cascaderProps"
              collapse-tags
              collapse-tags-tooltip
              size="small"
              filterable
              clearable
            />
            <!--end-->
            <el-select
              v-else
              class="field-selection"
              v-model="searchParams[paramKey]"
              :loading="subField[paramKey].origin === 'jobs' ? jobFieldsLoading : hostFieldsLoading"
              filterable
              multiple
              collapse-tags
              collapse-tags-tooltip
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
    <el-row :gutter="4">
      <el-col :span="2">
        <span class="search-field-section-label">数据时间:</span>
      </el-col>
      <el-col :span="22">
        <div class="time-controller">
          查询距当前
          <el-input-number
            v-model="searchTime"
            controls-position="right"
            size="small"
            :min="1"
            :max="365"
            :precision="0"
          />
          天的数据
          <el-button
            class="update-button"
            link
            type="primary"
            :disabled="jobFieldsLoading || hostFieldsLoading"
            @click="handleUpdateFields"
          >更新筛选项</el-button>
          <div class="loading-icon" v-if="jobFieldsLoading || hostFieldsLoading" v-loading="1"></div>
          <el-tooltip placement="top" effect="light">
            <template #content>
              <p>提示1：系统默认搜索 距当前时间10天 内的数据。用户可根据需要修改.</p>
              <p>如果使用较长跨度的搜索时间，可能会导致查询时间较长。</p>
              <p>提示2：修改搜索时间后，请手动更新筛选项，获取目标时间跨度内的数据可筛选项。</p>
            </template>
            <el-icon class="update-tooltip"><QuestionFilled /></el-icon>
          </el-tooltip>
        </div>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-button @click="handleReset">重置</el-button>
      <el-button
        type="primary"
        @click="handleSearch"
        :loading="searchLoading"
        >
        搜索
      </el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { suiteConfig, fieldsConfiguration } from './config'

import { useTestboxStore } from '@/stores/performanceData'
import { parseQueryStringTo2dArray } from './utils'
// api
import { getJobValueList, getTestBoxes } from '@/api/performance'

const props = defineProps({
  // 是否根据场景区分展示套件, 并将套件的展示通过独立组建展示出来。只在性能基线表格页面中使用
  suiteByScene: {
    type: Boolean,
    default: false
  },
  // 外部指定一个数组，元素为套件名称。通过这个套件数组来控制获取选择菜单项
  fieldsBySecne: {
    type: Array,
    default: () => []
  },
  searchLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (event: 'search', params: searchParams, searchTime: number): void,
  // 当搜索条件重置是
  (event: 'resetSearchValue'): void
}>()

let fieldsConfig = JSON.parse(JSON.stringify(fieldsConfiguration))

const route = useRoute()
const router = useRouter()
const testboxStore = useTestboxStore()

const fieldsListForRender = ref([] as string[])
const suiteList = ref([])
// uite = ref('unixbench')
const testboxList = ref([])
const jobFieldsLoading = ref(false)
const hostFieldsLoading = ref(false)

const fieldOrigin = {} as objectItem // 字典，用来判断某个field字段的origin
const hostFieldList = [] as any // 中间数据，用来循环host类型的field字段
const jobFieldList = [] as any // 中间数据，用来循环job类型的field字段

const searchTime = ref(10)
const searchParams = ref({} as objectItem)
const cascaderProps = { multiple: true }

interface objectItem {
  [key: string]: string | string[] | string[][]
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
  const { scene, searchLimitTime, ...fields } = route.query
  Object.keys(fields).forEach(fieldKey => {
    if (fieldKeys.indexOf(fieldKey) > -1) {
      // 只添加当前选择框中存在的field选择
      if (fieldKey === 'osv') {
        searchParams.value[fieldKey] = parseQueryStringTo2dArray(fields[fieldKey])
      } else {
        if (Array.isArray(fields[fieldKey])) {
          searchParams.value[fieldKey] = fields[fieldKey]
        } else {
          searchParams.value[fieldKey] = [fields[fieldKey]]
        }
      }
    }
  })
  searchLimitTime && (searchTime.value = Number(searchLimitTime))
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
const setDefaultSuite = (forcedUpdateSuite=false) => {
  let suite = []
  const queryObj = route.query
  if (queryObj.suite) {
    if (Array.isArray(queryObj.suite)) {
      suite.push(...queryObj.suite)
    } else {
      suite.push(queryObj.suite)
    }
  }
  searchParams.value['suite'] = []
  if (suite.length < 1 || forcedUpdateSuite) {
    searchParams.value['suite'] = suiteList.value[0] && [suiteList.value[0].suiteName]
    return
  }
  suite.forEach(suiteItem => {
    if (suiteList.value.find(s => s.suiteName === suiteItem)) {
      searchParams.value['suite'].push(String(suiteItem))
    }
  })
}

// 获取搜索条件
const getFieldsOptions = () => {
  jobFieldsLoading.value  = true
  getJobValueList({
    jobFieldList,
    searchTime: searchTime.value,
    byScene: (props.suiteByScene && searchParams.value.suite) || (props.fieldsBySecne.length > 0 && props.fieldsBySecne)
  }).then(res => {
    const aggs = res.data.aggregations || {}
    Object.keys(aggs).forEach(field => {
      // 通过请求获取的可选项
      const listValues = aggs[field].buckets.map((item: any) => {
        return {
          value: item.key
        }
      })
      // 重置listValues
      const originData = JSON.parse(JSON.stringify(fieldsConfiguration[field].fieldSettings.listValues))
      fieldsConfig[field].fieldSettings.listValues = originData
      // 获取对应field的listValues引用
      const staticValues = fieldsConfig[field].fieldSettings.listValues || []
      if (field === 'osv') {
        const osvOptions = constrcutOsvOptions(listValues)
        addNewOptionValues(staticValues, osvOptions)
      } else {
        addNewOptionValues(staticValues, listValues)
      }
    })
  }).catch(err => {
    ElMessage({
      message: err.message,
      type: 'error'
    })
  }).finally(() => {
    jobFieldsLoading.value = false
  })
}

// 设置osv 分组选项
const constrcutOsvOptions = (osvList) => {
  if (!osvList || osvList.length < 1) return []
  const osMap = {}
  const osvListNew = []
  osvList.forEach((osv:string) => {
    const osParams = osv?.value.split('@')
    const os = osParams[0]
    let osLabel = os
    const version = osParams[1]
    let versionLabel = version
    // 如果有自定义的系统名
    if (osv.label) {
      if (version) {
        const tempLabel = osv.label.split(' ')
        osLabel = tempLabel.slice(0, tempLabel.length -1).join(' ')
        versionLabel = tempLabel[tempLabel.length -1]
      } else {
        osLabel = osv.label
      }
    }
    if (osMap[os]) {
      const oldChildren = osMap[os].children
      if (!oldChildren) return
      if (!oldChildren.find(item => item.value === version)) {
        oldChildren.push({ value: version, label: versionLabel })
      }
    } else {
      osMap[os] = { value: os, label: osLabel }
      if (version) {
        osMap[os].children = [{ value: version, label: versionLabel }]
      }
    }
  })
  Object.keys(osMap).forEach(os => { osvListNew.push(osMap[os]) })
  return osvListNew
  // sourceArr.push(...osvListNew)
}
// 获取主机相关搜索条件。
const getHostOptions = () => {
  hostFieldsLoading.value = true
  const fieldList = hostFieldList.map((field:string) => field.replace('hw.', ''))
  getTestBoxes().then((testboxRes => {
    testboxList.value = testboxRes.data.hits.hits.map(item => {
      return {
        testboxId: item._id,
        ...item._source
      }
    })
    testboxStore.setTestboxData(testboxList.value)
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
      const originData = JSON.parse(JSON.stringify(fieldsConfiguration[`hw.${field}`].fieldSettings.listValues))
      fieldsConfig[`hw.${field}`].fieldSettings.listValues = originData
      const staticValues = fieldsConfig[`hw.${field}`].fieldSettings.listValues || []
      addNewOptionValues(staticValues, listValues)
    })
  })).catch(err => {
    ElMessage({
      message: err.message,
      type: 'error'
    })
  }).finally(() => {
    hostFieldsLoading.value = false
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
  sourceArr.sort((prev, curv) => prev.value - curv.value)
}

const handleReset = () => {
  if (props.suiteByScene) {
    searchParams.value = { suite: searchParams.value.suite }
  } else {
    searchParams.value = {}
  }
}

const handleSearch = () => {
  // 记录查询条件到url上
  setQueryToUrl()
  const { hostParams, jobParams } = splitParamsByOrigin(searchParams.value)
  // osv特殊处理
  if (jobParams.osv && Array.isArray(jobParams.osv)) {
    jobParams.osv = jobParams.osv.map((arr:string[]) => arr.join('@'))
  }
  if (Object.keys(hostParams).length > 0) {
    const testboxSearchList = []
    Object.keys(hostParams).forEach(hostFieldKey => {
      const fieldKeyInTestbox = hostFieldKey.replace('hw.', '')
      let tempIdList = []
      if (Array.isArray(hostParams[hostFieldKey])) {
        tempIdList = testboxList.value.filter(testbox => {
          return testbox[fieldKeyInTestbox] && hostParams[hostFieldKey].indexOf(testbox[fieldKeyInTestbox]) > -1
        }).map(testbox => testbox.testboxId)
      } else {
        tempIdList = testboxList.value.filter(testbox => {
          return testbox[fieldKeyInTestbox] && String(testbox[fieldKeyInTestbox]) === String(hostParams[hostFieldKey])
        }).map(testbox => testbox.testboxId)
      }
      testboxSearchList.push(...tempIdList)
    })
    const searchParamData = { ...jobParams }
    // 当testbox存在时，说明用户指定了testboxId，此时使用硬件的筛选没有意义了
    if (testboxSearchList.length > 0 && (!searchParamData.testbox || searchParamData.testbox.length < 1)) { 
      searchParamData.testbox = testboxSearchList
    }

    emit('search', searchParamData, searchTime.value)
  } else {
    emit('search', jobParams, searchTime.value)
  }
}

// 将筛选条件添加到url中
const setQueryToUrl = () => {
  const newQuery = {} as objectItem
  Object.keys(searchParams.value).forEach(field => {
    searchParams.value[field] && (newQuery[field] = searchParams.value[field])
    // osv值拼接
    if (field === 'osv' && searchParams.value[field]) {
      newQuery[field] = searchParams.value[field].join('@')
    }
  })
  newQuery['scene'] = route.query.scene as string
  newQuery['searchLimitTime'] = String(searchTime.value)
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

const handleUpdateFields = () => {
  getFieldsOptions()
  if (props.suiteByScene) {
    const oldSuite = searchParams.value.suite
    searchParams.value = {}
    searchParams.value.suite = oldSuite
  }
}

// 当场景切换时，初始化页面
watch(
  () => route.query.scene,
  () => {
    emit('resetSearchValue')
    setSuiteList()
    setDefaultSuite(true) // 这里个会更新suite，触发下一个的watch，加载新的查询条件并重置searchParams
  }
)

// 在基线页面切换suite时，重新获取fields的可选值
// 需要调整
watch(
  () => searchParams.value.suite,
  (curv, prev) => {
    // 当prev为false时， 说明是新进入的当前页面，而不是在列表模块间切换suite
    if (props.suiteByScene && prev) {
      getFieldsOptions()
      getHostOptions()
      // 当suite不一致时，候选项可能会不能匹配原suite数据，因此需要重置搜索内容
      // todo: 此处有待优化，searchParams重置后各个字段应和组件初始化后的各个字段保持一致。目前只给了一个suite字段。
      searchParams.value = { suite: curv }
    }
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

.suite-selection-label  {
  line-height: 32px;
}


.search-field-section {
  z-index:5;
  margin-bottom: 30px;
  &-label {
    line-height: 32px;
  }
  .react-row {
    .field-item {
      position: relative;
    }
    .fields-label {
      display: inline-block;
      line-height: 24px;
      height: 24px;
    }
    .field-selection {
      position: absolute;
      right: 20px;
      width: 60%;
    }
    :deep(.el-cascader) {
      position: absolute;
      display: inline-flex;
      right: 20px;
      width: 60%;
      z-index: 1;
    }
  }
}
span {
  font-size: 14px;
  min-width: 60px;
}
.time-controller {
  display: inline-flex;
  align-items: center;
  height: 32px;
  font-size: 14px;
  :deep(.el-input-number) {
    margin: 0 8px;
  }
  .update-button {
    margin-left:12px;
  }
  :deep(.loading-icon) {
    width: 12px;
    .circular {
      width: 12px;
    }
  }
  :deep(.update-tooltip) {
    margin-left:8px;
    cursor: pointer;
  }
}
</style>
