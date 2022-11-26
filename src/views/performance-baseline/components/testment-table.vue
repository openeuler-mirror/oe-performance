<template>
  <div class="performance-baseline-test-table">
    <div class="handle-pannel">
      <div>
        <el-button
          type="primary"
          class="button"
          :disabled="selectedTableRows.length < 2 || selectedTableRows.length > 5"
        >对比</el-button
        >
        <el-button type="primary" class="button">导出</el-button>
      </div>
      <el-input
        v-model="input"
        placeholder="请输入搜索内容"
        clearable
        class="input-with-select">
        <template #prepend>
          <el-select
            clearable
            v-model="selectedOption"
            placeholder="搜索条件"
            class="select">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="handleSearch(selectedOption)" />
        </template>
      </el-input>
      <div>
        <el-button
          :icon="RefreshLeft"
          :loading="reFreshLodaing"
          class="button"
          @click="handleReFresh"
          >刷新</el-button
        >
        <el-popover placement="bottom" :width="400" trigger="click">
          <template #reference>
            <el-button :icon="Setting" type="primary" class="button"
              >设置</el-button
            >
          </template>
          <div>
            <el-checkbox
              v-model="checkAllColumn"
              :indeterminate="isIndeterminate"
              @change="handlecheckAllColumn"
              >全选</el-checkbox
            >
            <el-checkbox-group
              v-model="tableColumn"
              @change="handleCheckedTableCloumn">
              <el-checkbox
                v-for="item in allColumn"
                :label="item"
                :key="item"
                >{{ item.label }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </el-popover>
        <el-dropdown trigger="click">
          <el-button-group>
            <el-button type="primary" class="more-button">更多</el-button>
            <el-button
              type="primary"
              :icon="MoreFilled"
              class="more-icon-button"></el-button>
          </el-button-group>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>上传</el-dropdown-item>
              <el-dropdown-item>下载模板</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="tips">
      <el-icon><WarningFilled color="rgb(16,142,233)" /></el-icon>
      <span> 已选择{{ selectedTableRows.length }}项 </span>
      <el-divider direction="vertical" />
      <span
        >数据所用"测试用例名称"一致可以进行对比操作(最多勾选5条)，可以导出当前所选数据。</span
      >
    </div>
    <el-table
      :data="tableData"
      v-loading="tableLoading || submitDataLoading" 
      :header-cell-style="{ background: 'rgb(243,243,243)' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column fixed="left" width="150" label="数据来源" prop="submit_id">
      </el-table-column>
      <el-table-column
        v-for="(item, index) in tableColumn"
        :prop="item.prop"
        :label="item.label"
        :key="index"
        width="150">
      </el-table-column>
      <el-table-column prop="detail" label="详细数据" fixed="right">
        <template #default="scope">
             <router-link :to="`/normalBaseline/detail/${scope.row.submit_id}`">
                <el-button link="" type="primary">
                <span>查看</span>
              </el-button>
            </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      v-model:currentPage="pagination.currentPage"
      v-model:page-size="pagination.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total" />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, toRaw, watchEffect, reactive, watch } from 'vue'
import {
  Search,
  Setting,
  RefreshLeft,
  MoreFilled,
  WarningFilled
} from '@element-plus/icons-vue'
import { allColumns } from '../test-data'
import { ElMessage } from 'element-plus'

import {  usePerformanceData } from '@/stores/performanceData'

import { getPerformanceData } from '@/api/performance'

export interface Column {
  label: string
  prop: string
}
export interface TableItem {
  [key: string]: any
}
const props = defineProps({
  dataList: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  submitDataLoading: {
    type: Boolean,
    default: false
  }
})

const performanceStore = usePerformanceData()

const input = ref('')

const reFreshLodaing = ref(false)

const selectedOption = ref('')
const selectOptions = [
  {
    label: '测试用例',
    value: 'testCase'
  },
  {
    label: '任务名称',
    value: 'missionName'
  },
  {
    label: '测试人',
    value: 'tester'
  }
]

const tableData = ref<any[]>([])
const tableColumn = ref<Column[]>([])
// const selectedCase = ref(0)
const checkAllColumn = ref(true)

const selectedTableRows = ref([])

// let selectedContrastList = <any[]>[]

const isIndeterminate = ref(true)
// const checkAllItems = ref(false)

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const allColumn = allColumns()
const copy = JSON.parse(JSON.stringify(tableData.value))

tableColumn.value = allColumn

// const handleTableData = <T extends object>(data: T[]) => {
//   data.forEach((Element: any) => {
//     tableData.value.push(flattenObj(Element))
//   })
// }
// 
// const flattenObj = (ob: any) => {
//   let result = <TableItem>{}
//   for (const i in ob) {
//     if (typeof ob[i] === 'object' && !Array.isArray(ob[i])) {
//       const temp = flattenObj(ob[i])
//       for (const j in temp) {
//         result[`${i}_${j}`] = temp[j]
//       }
//     } else {
//       result[i] = ob[i]
//     }
//   }
//   return result
// }

const handlecheckAllColumn = (val: boolean) => {
  tableColumn.value = val ? allColumn : []
  isIndeterminate.value = false
}
// 
const handleCheckedTableCloumn = (value: object[]) => {
  const checkedCount = value.length
  checkAllColumn.value = checkedCount === allColumn.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allColumn.length
}
// 
// const handleCheckedAllItems = (val: boolean) => {
//   tableData.value.forEach((element: any) => {
//     element.check = val
//   })
//   if (val) {
//     copy.forEach((element: any) => {
//       selectedContrastList.push(element)
//     })
//   } else {
//     selectedContrastList = []
//   }
// }
// 
// const handleCheckedItem = (value: any) => {
//   const index = selectedContrastList.findIndex(
//     item => item.index === value.row.index
//   )
//   if (index === -1) {
//     selectedContrastList.push(toRaw(value.row))
//   } else {
//     selectedContrastList.splice(index, 1)
//   }
//   checkAllItems.value = selectedContrastList.length === copy.length
// }

const handleSelectionChange = (selectedRow: any) => {
  selectedTableRows.value = selectedRow
}

const handleSearch = (key: any) => {
  if (selectedOption.value === '') {
    ElMessage('请选择搜索条件！')
  } else if (input.value === '') {
    ElMessage('请输入搜索内容！')
  } else {
    tableData.value = copy.value.filter(
      (item: any) => item[key] === input.value
    )
  }
}

// const handleSizeChange = (val: number) => {
//   console.log(`${val} items per page`)
// }
// const handleCurrentChange = (val: number) => {
//   console.log(`current page: ${val}`)
// }

const handleReFresh = () => {
  reFreshLodaing.value = !reFreshLodaing.value
}

// watchEffect(() => {
//   if (input.value === '') {
//     tableData.value = copy
//   }
// })

const requestCount = ref(0) // 记录请求总是
const tableLoading = ref(false)
// 获取并合并jobs的逻辑
// todo: 这段逻辑可以考虑一直store中
const getAllJobsData = (idList:any) => {
  const tempArr = reactive(Object.assign([], idList))
  // todo: 每次遍历请求前，应取消之前所有未完成的请求
  idList.forEach((idObj:any, idx:number) => {
    // 如果之前已经获得过数据则不再重复请求
    if (performanceStore.performanceData[idObj.submit_id]) {
      tempArr[idx] = performanceStore.performanceData[idObj.submit_id]
      return
    }
    // 根据submitId获取它的jobs
    requestCount.value += 1
    tableLoading.value = true
    getPerformanceData({
      'index': 'jobs',
      'query': {
        'size': 10000,  // 取全量
        'query': {
          'term': {
            'submit_id': idObj.submit_id
          }
        }
      },
    }).then((res) => {
      const resultObj = combineJobs(res.data.hits.hits)
      performanceStore.setPerformanceData(idObj.submit_id,resultObj)
      tempArr[idx] = resultObj
    }).catch((err) => {
      ElMessage({
        message: err.message,
        type: 'error'
      })
    }).finally(() => {
      requestCount.value -= 1
      if (requestCount.value === 0) {
        tableLoading.value = false
      }
    })
  })

  return tempArr
}

const combineJobs = (jobList: any) => {
  // 在这里实现jobs的混合和映射逻辑，生成完整的一条submit_id对象
  return jobList[0]._source
}

const idList = ref(<any>[])

// 自动分页
watchEffect(() => {
  const startIndex = (pagination.currentPage -1) * pagination.pageSize
  // 数据分页
  idList.value = props.dataList.slice(startIndex, startIndex + pagination.pageSize)
  pagination.total = props.dataList.length
})

// 当前页数据变化时，获取jobs数据
watch(idList, () => {
  tableData.value = getAllJobsData(idList.value)
})

</script>

<style scoped lang="scss">
a {
  text-decoration: none !important;
}
.handle-pannel {

  display: flex;
  justify-content: space-between;
  align-items: center;
  .button {
    min-width: 90px;
  }
  .more-button {
    margin-left: 12px;
    min-width: 70px;
  }
  .more-icon-button {
    margin-left: 3px;
    max-width: 30px;
  }
  .input-with-select {
    min-width: 200px;
    width: 35%;
    max-height: 32px;
  }
  .select {
    width: 100px;
  }
}
.tips {
  display: flex;
  align-items: center;
  background-color: rgb(230, 247, 255);
  border: 1px solid rgb(195, 232, 255);
  padding: 8px 10px;
  border-radius: 3px;
  margin: 8px 0;

  span {
    margin-left: 12px;
    font-size: 14px;
    text-align: center;
  }
}
.pagination {
  margin-top: 30px;
}
</style>
