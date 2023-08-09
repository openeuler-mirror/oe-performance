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
            :disabled="item.unavailable" />
        </el-checkbox-group>
      </el-col>
    </el-row>
    <!--测试组件 end-->
    <el-row class="search-field-section" :gutter="4">
      <el-col :span="2">
        <span>筛选内容:</span>
        <el-tooltip popper-class="tooltip-popper" placement="bottom-start">
          <el-icon>
            <QuestionFilled />
          </el-icon>
          <template #content>
            <ul>
              <li>数据时间：搜索至今N天的数据</li>
              <li>数据量限制：控制搜索返回的数据量。默认3000条，最大10000条</li>
            </ul>
          </template>
        </el-tooltip>
      </el-col>
      <el-col :span="22">
        <el-row class="react-row">
          <el-col
            :xs="24"
            :sm="12"
            :lg="6"
            class="field-item"
            v-for="(paramKey, index) in Object.keys(fieldsConfigForRender)"
            :key="index">
            <span class="fields-label">{{
              `${fieldsConfigForRender[paramKey].label}:`
            }}</span>
            <!--for osv group-->
            <el-cascader
              class="field-selection"
              v-if="paramKey === 'osv'"
              v-model="searchParams[paramKey]"
              :loading="
                fieldsConfigForRender[paramKey].origin === 'jobs'
                  ? jobFieldsLoading
                  : hostFieldsLoading
              "
              :options="
                fieldsConfigForRender[paramKey].fieldSettings.listValues
              "
              :props="cascaderProps"
              collapse-tags
              collapse-tags-tooltip
              size="small"
              filterable
              clearable
              @visible-change="paramSelected"
              @remove-tag="paramSelected"
              @clear="paramSelected" />
            <!--end-->
            <el-select
              v-else
              class="field-selection"
              v-model="searchParams[paramKey as keyof BaseLine.SearchParams]"
              :loading="
                fieldsConfigForRender[paramKey].origin === 'jobs'
                  ? jobFieldsLoading
                  : hostFieldsLoading
              "
              filterable
              multiple
              collapse-tags
              collapse-tags-tooltip
              clearable
              size="small"
              @visible-change="paramSelected"
              @remove-tag="paramSelected"
              @clear="paramSelected">
              <el-option
                v-for="(item, listIndex) in fieldsConfigForRender[paramKey]
                  .fieldSettings.listValues"
                :label="item.label || item.value"
                :value="item.value as CascaderNodeValue"
                :key="listIndex" />
            </el-select>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="6" class="field-item">
            <span class="fields-label">{{ `数据时间:` }}</span>
            <el-input-number
              class="field-selection"
              v-model="searchTime"
              controls-position="right"
              size="small"
              :min="1"
              :precision="0"
              :controls="false"
              @change="paramEnterChagned" />
          </el-col>
          <el-col :xs="24" :sm="12" :lg="6" class="field-item">
            <span class="fields-label">{{ `数据量限制:` }}</span>
            <el-input-number
              class="field-selection"
              v-model="searchTotal"
              controls-position="right"
              size="small"
              :min="1"
              :max="10000"
              :precision="0"
              :controls="false" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleSearch" :loading="searchLoading">
        搜索
      </el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CascaderNodeValue, ElMessage } from 'element-plus'
import { suiteConfig, fieldsConfiguration } from './config'
import { useTestboxStore } from '@/stores/performanceData'
import { parseQueryStringTo2dArray } from './utils'
// api
import { getJobValueList, getTestBoxes } from '@/api/performance'
import type { JobModel } from '@/model/types'
import { BaseLine } from '../performance-baseline/types'

interface objectItem {
  [key: string]: string | string[] | string[][]
}

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
  (
    event: 'search',
    params: BaseLine.SearchParams,
    searchTime: number,
    searchTotal: number
  ): void
  // 当搜索条件重置是
  (event: 'resetSearchValue'): void
}>()

let fieldsConfig: JobModel.Fields = JSON.parse(
  JSON.stringify(fieldsConfiguration)
)

const route = useRoute()
const router = useRouter()
const testboxStore = useTestboxStore()

const fieldsConfigForRender = ref<JobModel.Fields>({})
const suiteList = ref<SearchPanel.SuiteList>([])
// uite = ref('unixbench')
const testboxList = ref<DictObject[]>([])
const filteredTestboxList = ref<objectItem[]>([])
const jobFieldsLoading = ref(false)
const hostFieldsLoading = ref(false)

const fieldOrigin = {} as objectItem // 字典，用来判断某个field字段的origin
const hostFieldList = <string[]>[] // 中间数据，用来循环host类型的field字段
const jobFieldList = [] as any // 中间数据，用来循环job类型的field字段

const searchTime = ref(10)
const searchTotal = ref(3000)
const searchParams = ref<BaseLine.SearchParams>({})
const cascaderProps = { multiple: true }

// 页面初始化方法
const initailizing = () => {
  fieldsConfigForRender.value = initailizefieldsList() // 初始化选项配置数据
  setFeildsData() // 记录有哪些选项
  setFieldSelection() // 将url上的查询条件的值读取到查询数据searchParam中

  if (props.suiteByScene) {
    // 在性能基线模块中根据路由自动设置suite查询条件
    setSuiteList()
    setDefaultSuite()
  }
}

// 修改fieldConfig的格式，方便展示
const initailizefieldsList = () => {
  let fieldKeys = Object.keys(fieldsConfig)
  if (props.suiteByScene) {
    fieldKeys = fieldKeys.filter(key => key !== 'suite')
  }
  // const len = Math.ceil(fieldKeys.length / 4)
  const tempObj: JobModel.Fields = [] as any
  fieldKeys.forEach(key => {
    tempObj[key] = fieldsConfig[key]
  })
  // for (let i = 0; i < len; i++) {
  //   const tempSec = {} as any
  //   for (let j = 0; j < 4 && i * 4 + j < fieldKeys.length; j++) {
  //     tempSec[fieldKeys[i * 4 + j]] = fieldsConfig[fieldKeys[i * 4 + j]]
  //   }
  //   temp.push(tempSec)
  // }
  return tempObj
}

// 记录有哪些查询项目，并区分是hosts项目还是jobs项目
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
  const { searchLimitTime, searchLimitTotal, ...fields } = route.query

  Object.keys(fields).forEach(fieldKey => {
    if (fieldKeys.includes(fieldKey)) {
      // 只添加当前选择框中存在的field选择
      if (fieldKey === 'osv') {
        searchParams.value[fieldKey] = parseQueryStringTo2dArray(
          fields[fieldKey] as string
        )
      } else {
        // if (Array.isArray(fields[fieldKey])) {
        //   searchParams.value[fieldKey] = fields[fieldKey]
        // } else {
        //   searchParams.value[fieldKey] = [fields[fieldKey]]
        // }
        searchParams.value[fieldKey as keyof BaseLine.SearchParams] = (
          Array.isArray(fields[fieldKey])
            ? fields[fieldKey]
            : [fields[fieldKey]]
        ) as string[]
      }
    }
  })
  searchLimitTime && (searchTime.value = Number(searchLimitTime))
  searchLimitTotal && (searchTotal.value = Number(searchLimitTotal))
}
// 性能基线页面中:
// 根据当前场景，显示不同的suite可选项
const setSuiteList = () => {
  const { scene } = route.query
  if (!scene) return
  const matchSceneConfig = suiteConfig[scene as keyof SearchPanel.SuiteConfig]
  if (!matchSceneConfig) return
  suiteList.value = matchSceneConfig.suiteList || []
}
// 性能基线页面中:
// 设置默认选中的suite，如果url中有，则使用url的
const setDefaultSuite = (forcedUpdateSuite = false) => {
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
    searchParams.value['suite'] = suiteList.value[0] && [
      suiteList.value[0].suiteName
    ]
    return
  }
  suite.forEach(suiteItem => {
    if (suiteList.value.find(s => s.suiteName === suiteItem)) {
      searchParams.value['suite']!.push(String(suiteItem))
    }
  })
}

/* ====================以上为init相关方法======================= */

// 获取并更新搜索条件中每个param的可选项，只有job表中涉及的条件
// eslint-disable-next-line max-lines-per-function
function getFieldsOptions() {
  jobFieldsLoading.value = true
  const searchParamObject = JSON.parse(JSON.stringify(searchParams.value))
  // 如果搜索了硬件参数，需根据硬件参数过滤出的testboxList来限制job参数的获取
  if (
    (!searchParamObject.testbox || searchParamObject.testbox?.length < 1)
    && filteredTestboxList.value.length > 0
    && !isSearchParamsEmpty(
      getSearchParamsByFields(searchParams.value, hostFieldList)
    )
  ) {
    searchParamObject.testbox = filteredTestboxList.value.map(
      testbox => testbox.testboxId
    )
  }

  getJobValueList({
    jobFieldList,
    searchTime: searchTime.value,
    searchTotal: searchTotal.value,
    byScene:
      (props.suiteByScene && searchParams.value.suite)
      || ((props.fieldsBySecne.length > 0 && props.fieldsBySecne) as string[]),
    searchParams: getSearchParamsByFields(searchParamObject, jobFieldList)
  })
    .then(res => {
      const aggs = res.data.aggregations || {}

      Object.keys(aggs).forEach(field => {
        // 通过请求获取的可选项
        const listValues = aggs[field].buckets.map((item: any) => {
          return {
            value: item.key
          }
        })
        // 重置listValues
        const originData = JSON.parse(
          JSON.stringify(fieldsConfiguration[field].fieldSettings.listValues)
        )
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
    })
    .catch(err => {
      ElMessage({
        message: err.message,
        type: 'error'
      })
    })
    .finally(() => {
      jobFieldsLoading.value = false
    })
}

// 工具函数
const isSearchParamsEmpty = (searchParams: any) => {
  if (Object.keys(searchParams).length < 1) return true
  let isEmpty = true
  Object.keys(searchParams).forEach(field => {
    if (Object.keys(searchParams[field]).length > 0) {
      isEmpty = false
    }
  })
  return isEmpty
}

// 这个fieldList初始值是hw.memory hw.nr_cpu hw.nr_node, 有点疑惑
// 工具函数
const getSearchParamsByFields = (
  searchParams: BaseLine.SearchParams,
  fieldList: string[]
) => {
  //
  const tempObj: DictObject = {}
  ;(Object.keys(searchParams) as Array<keyof BaseLine.SearchParams>).forEach(
    param => {
      if (fieldList.includes(param)) {
        tempObj[param] = searchParams[param]
      }
      if (param === 'osv' && Array.isArray(searchParams[param])) {
        tempObj[param] = (searchParams[param] as string[][])?.map(item =>
          item.join('@')
        )
      }
    }
  )

  return tempObj
}

// 工具函数，设置osv数据格式以支持分组选项组件
const constrcutOsvOptions = (osvList: SearchPanel.OSVListValues) => {
  const osMap = new Map<string, SearchPanel.OSVListValue>()
  let osvListNew: SearchPanel.OSVListValues = []

  osvList.forEach(osv => {
    const [os, version] = osv.value.split('@')
    if (!osMap.has(os)) osMap.set(os, { value: os, label: os, children: [] })
    osMap.get(os)?.children!.push({
      label: version,
      value: version
    })
  })

  Array.from(osMap.entries()).map(item => {
    osvListNew.push({
      label: item[0],
      value: item[0],
      children: item[1].children
    })
  })

  // 没有实现旧方法中的自定义系统名
  return osvListNew
}

// 获取并更新搜索条件中每个param的可选项，只有hosts表中涉及的条件
// eslint-disable-next-line max-lines-per-function
function getHostOptions() {
  hostFieldsLoading.value = true
  const fieldList: string[] = hostFieldList.map((field: string) =>
    field.replace('hw.', '')
  )

  const hostSearchParams = getSearchParamsByFields(
    searchParams.value,
    hostFieldList
  )
  getTestBoxes()
    .then(testboxRes => {
      testboxList.value = testboxRes.data.hits.hits.map((item: any) => {
        return {
          testboxId: item._id,
          ...item._source
        }
      })
      testboxStore.setTestboxData(testboxList.value)
      filteredTestboxList.value = filteringTestboxBySearchParams(
        testboxList.value,
        hostSearchParams,
        searchParams.value?.testbox
      )
      fieldList.forEach(field => {
        // 遍历硬件的fieldList，从testBoxList聚合信息。
        const listValues = <{ value: string }[]>[]
        const repeatMap = new Map<string, number>()
        filteredTestboxList.value.forEach(testbox => {
          if (testbox[field] && !repeatMap.has(testbox[field] as string)) {
            listValues.push({
              value: testbox[field] as string
            })
            repeatMap.set(testbox[field] as string, 1)
          }
        })
        const originData = JSON.parse(
          JSON.stringify(
            fieldsConfiguration[`hw.${field}`].fieldSettings.listValues
          )
        )
        fieldsConfig[`hw.${field}`].fieldSettings.listValues = originData
        const staticValues
          = fieldsConfig[`hw.${field}`].fieldSettings.listValues || []
        addNewOptionValues(staticValues, listValues)
      })
    })
    .catch(err => {
      ElMessage({
        message: err.message,
        type: 'error'
      })
    })
    .finally(() => {
      // 获取硬件信息后，在获取job选项。因为有可能需要根据信息选项过滤jobs选项
      getFieldsOptions()
      hostFieldsLoading.value = false
    })
}

// 工具函数，根据查询参数过滤获取到的testbox
const filteringTestboxBySearchParams = (
  testboxList: Array<objectItem>,
  searchParams: objectItem,
  searchParamTestbox: Array<string> | undefined
) => {
  // 如果用户选择了testbox，则直接由testbox过滤
  if (
    searchParamTestbox
    && Array.isArray(searchParamTestbox)
    && searchParamTestbox.length > 0
  ) {
    return testboxList.filter(
      testbox => searchParamTestbox.indexOf(testbox.testboxId as string) > -1
    )
  }
  const searchParamList = Object.keys(searchParams).filter(
    hwField => Object.keys(searchParams[hwField]).length > 0
  )
  if (searchParamList.length < 1) return JSON.parse(JSON.stringify(testboxList))

  return testboxList.filter(testbox => {
    let isTestboxMatch = false
    searchParamList.forEach(hwField => {
      if (
        searchParams[hwField].includes(
          testbox[hwField.replace('hw.', '')] as string & string[]
        )
      ) {
        isTestboxMatch = true
      }
    })
    return isTestboxMatch
  })
}

// 工具函数，将inputArr中与sourceArr不同的选项追加到sourceArr中
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

// 重置逻辑
const handleReset = () => {
  if (props.suiteByScene) {
    searchParams.value = { suite: searchParams.value.suite }
  } else {
    searchParams.value = {}
  }
}

// 查询逻辑
// eslint-disable-next-line max-lines-per-function
function handleSearch() {
  if (isNaN(searchTime.value) || searchTime.value === null) {
    searchTime.value = 10
  }
  if (isNaN(searchTotal.value) || searchTotal.value === null) {
    searchTime.value = 3000
  }
  // 记录查询条件到url上
  setQueryToUrl()
  const { hostParams, jobParams } = splitParamsByOrigin(searchParams.value)
  // osv特殊处理
  if (jobParams.osv && Array.isArray(jobParams.osv)) {
    jobParams.osv = jobParams.osv.map(arr => (arr as string[]).join('@'))
  }
  if (Object.keys(hostParams).length > 0) {
    const testboxSearchList = <string[]>[]
    Object.keys(hostParams).forEach(hostFieldKey => {
      const fieldKeyInTestbox = hostFieldKey.replace('hw.', '')
      let tempIdList = <string[]>[]
      if (Array.isArray(hostParams[hostFieldKey])) {
        tempIdList = testboxList.value
          .filter(testbox => {
            return (
              testbox[fieldKeyInTestbox]
              && hostParams[hostFieldKey].indexOf(testbox[fieldKeyInTestbox]) > -1
            )
          })
          .map(testbox => testbox.testboxId)
      } else {
        tempIdList = testboxList.value
          .filter(testbox => {
            return (
              testbox[fieldKeyInTestbox]
              && String(testbox[fieldKeyInTestbox])
                === String(hostParams[hostFieldKey])
            )
          })
          .map(testbox => testbox.testboxId)
      }
      testboxSearchList.push(...tempIdList)
    })
    const searchParamData = { ...jobParams }
    // 当testbox存在时，说明用户指定了testboxId，此时使用硬件的筛选没有意义了
    if (
      testboxSearchList.length > 0
      && (!searchParamData.testbox || searchParamData.testbox.length < 1)
    ) {
      searchParamData.testbox = testboxSearchList
    }

    emit('search', searchParamData, searchTime.value, searchTotal.value)
  } else {
    emit('search', jobParams, searchTime.value, searchTotal.value)
  }
}

// 工具函数，将筛选条件添加到url中
const setQueryToUrl = () => {
  const newQuery = <DictObject>{}
  ;(
    Object.keys(searchParams.value) as Array<keyof BaseLine.SearchParams>
  ).forEach(field => {
    if (searchParams.value[field]) {
      newQuery[field] = searchParams.value[field]
    }
    // osv值拼接
    if (field === 'osv' && searchParams.value[field]) {
      newQuery[field] = (searchParams.value[field] as string[]).join('@')
    }
  })

  newQuery['scene'] = route.query.scene as string
  newQuery['searchLimitTime'] = String(searchTime.value)
  newQuery['searchLimitTotal'] = String(searchTotal.value)

  router.push({
    path: route.path,
    query: { ...newQuery }
  })
}
// 工具函数，将查询参数区分成主机参数和一般参数
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

// 更新查询项逻辑
// const handleUpdateFields = () => {
//   getFieldsOptions() // 因为host表获取的是全部时间的，因此只有job选项需要更新。
//   if (props.suiteByScene) {
//     const oldSuite = searchParams.value.suite
//     searchParams.value = {}
//     searchParams.value.suite = oldSuite
//   }
// }

const searchParamForOptionsUpdate = ref({})

const paramSelected = (isOpen: boolean) => {
  if (isOpen === true) return
  if (
    JSON.stringify(searchParams.value)
    === JSON.stringify(searchParamForOptionsUpdate.value)
  )
    return
  searchParamForOptionsUpdate.value = JSON.parse(
    JSON.stringify(searchParams.value)
  )
  getHostOptions()
}

const paramEnterChagned = () => {
  getHostOptions()
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
      getHostOptions()
      // 当suite不一致时，候选项可能会不能匹配原suite数据，因此需要重置搜索内容
      // todo: 此处有待优化，searchParams重置后各个字段应和组件初始化后的各个字段保持一致。目前只给了一个suite字段。
      searchParams.value = { suite: curv }
    }
  }
)

onMounted(() => {
  initailizing()
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

.suite-selection-label {
  line-height: 32px;
}

.search-field-section {
  z-index: 5;
  margin-bottom: 12px;

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

  .el-tooltip__trigger {
    cursor: pointer;
    vertical-align: top;
    top: 2px;
    margin-left: 2px;
  }
}

.tooltip-popper {
  padding: 4px;

  ul {
    margin-left: 11px;
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
    margin-left: 12px;
  }

  :deep(.loading-icon) {
    width: 12px;

    .circular {
      width: 12px;
    }
  }

  :deep(.update-tooltip) {
    margin-left: 8px;
    cursor: pointer;
  }
}
</style>
