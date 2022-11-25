<template>
  <div class="performance-baseline-test-subassembly">
    <el-row :gutter="25" class="subassembly-btn">
      <el-col :span="2"
        ><span class="general-font-style">测试组件:</span></el-col
      >
      <el-col :span="8">
        <el-button-group>
          <el-button size="small" class="general-font-style">Spark</el-button>
          <el-button size="small" class="general-font-style">Hice</el-button>
          <el-button size="small" class="general-font-style">Hbase</el-button>
        </el-button-group>
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
            v-for="(options, index) in optionData"
            :key="index">
            <el-col
              :span="6"
              v-for="(option, secIndex) in options"
              :key="secIndex">
              <span class="general-font-style">{{ option.title + ':' }}</span>
              <el-cascader
                :options="option.options"
                @change="handleCriteriaChange(option)"
                clearable
                size="small" />
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="center">
      <el-col :span="2"><el-button>重置</el-button></el-col>
      <el-col :span="2"
        ><el-button type="primary" @click="handleQueryCriteria"
          >搜索</el-button
        ></el-col
      >
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TableItem } from '../components/test-case.vue'
import { criteriaQuery } from '../config-data'
import { queryBySystemParam, queryCriteria } from '@/api/detail'

const optionData = criteriaQuery()
const systemParams = [] as any[]
const caseParams = [] as any[]
const filterData = ref([] as TableItem[])

const handleCriteriaChange = (value: any) => {
  let index: number
  if (value.tag === 'system') {
    index = systemParams.findIndex(item => item.title === value.title)
    if (index === -1) {
      systemParams.push(value)
    } else {
      systemParams.splice(index, 1)
    }
  } else {
    index = caseParams.findIndex(item => item.title === value.title)
    if (index === -1) {
      caseParams.push(value)
    } else {
      caseParams.splice(index, 1)
    }
  }
}
const handleQueryCriteria = () => {
  const submitCaseParams = [] as any[]
  caseParams.forEach((elem: any) => {
    submitCaseParams.push(elem.options)
  })
  if (systemParams.length > 0) {
    console.log('submit1')
    const submitSystemParams = [] as any[]
    systemParams.forEach((elem: any) => {
      submitSystemParams.push(elem.options)
    })
    queryBySystemParam(submitSystemParams).then(res => {
      queryCriteria(submitCaseParams, res.data).then(resCase => {
        filterData.value = resCase.data
      })
    })
  } else {
    console.log('submit2')
    queryCriteria(submitCaseParams).then(resCase => {
      filterData.value = resCase.data
    })
  }
}
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
  :deep(.el-cascader--small) {
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
