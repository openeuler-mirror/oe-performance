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
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePerformanceData } from '@/stores/performanceData'
import { config, sceneConfig, optionBind } from '../config-file'
import { jobModel } from '/data-model'
import { queryBySystemParam, queryCriteria } from '@/api/detail'
import { ElMessage } from 'element-plus'

const selectedSuite = ref('unixbench')

const performanceStore = usePerformanceData()

const emit = defineEmits<{
  // 在此处收集查询菜单中的查询条件，整理后去请求全量的submit_id列表
  // 如果用户选择了机器配置类的条件，则需要先根据机器配置去获取对应的主机列表。
  // 然后通过主机列表和其他条件去查询submit_id列表
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
  emit('search', { os: 'openEuler', suite: selectedSuite.value })
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
