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
      <el-col :span="6" class="filter-criteria-col">
        <div class="filter-criteria">
          <el-row
            :gutter="8"
            v-for="(options, index) in filterCriteria"
            :key="index">
            <el-col
              :span="6"
              v-for="(option, secIndex) in options"
              :key="secIndex">
              <span class="general-font-style">{{ option.title + ':' }}</span>
              <el-select
                v-model="option.bindValue"
                @clear="handleClearCriteria(option.paramKey, option.tag)"
                clearable
                size="small">
                <el-option
                  v-for="item in option.options"
                  @click="handleCriteriaChange(option, item.value)"
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
      <el-col :span="2"
        ><el-button type="primary" @click="handleSearch"
          >搜索</el-button
        ></el-col
      >
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { config, sceneConfig } from '../config-file'

const emit = defineEmits<{
  // 在此处收集查询菜单中的查询条件，整理后去请求全量的submit_id列表
  // 如果用户选择了机器配置类的条件，则需要先根据机器配置去获取对应的主机列表。
  // 然后通过主机列表和其他条件去查询submit_id列表
  (event: 'search', params: searchParams): void
}>()

const route = useRoute()
const router = useRouter()
const testSubassembly = ref([] as string[])
const filterCriteria = ref([] as any[])

const systemParams = [] as any[]
const caseParams = [] as any[]

interface queryItem {
  [key: string]: string
} 
const handleQueryChange = () => {
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
    path: '/normalBaseline/list',
    query: { ...newQuery }
  })
}

const handleCriteriaChange = (value: any, param: string) => {
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
const handleClearCriteria = (paramKey: string, tag: string) => {
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
const selectedSuite = ref('unixbench')

const handleSearch = () => {
  handleQueryChange()
  emit('search', { os: 'openEuler', suite: selectedSuite.value })
}

watchEffect(() => {
  const scene = route.query.scene ? route.query.scene : 'bigData'
  let key: keyof typeof sceneConfig
  for (key in sceneConfig) {
    if (sceneConfig[key].findIndex(item => item.prop === scene) !== -1) {
      testSubassembly.value = config[scene as string].testSubassembly || []
      filterCriteria.value = config[scene as string].filterCriteria.value || []
    }
  }
})

onMounted(() => {
  selectedSuite.value = route.query.testSubassembly ? route.query.testSubassembly as string : 'unixbench'
  const keys = Object.keys(route.query)
  keys.forEach((key: string) => {
    filterCriteria.value.forEach((item: any[]) => {
      const index = item.findIndex(criteriaItem => criteriaItem.paramKey === key)
      if (index !== -1) {
        item[index].bindValue = route.query[key]
      }
    })
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
