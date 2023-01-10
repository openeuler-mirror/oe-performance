<template>
  <div class="performance-baseline-test-table">
    <div class="handle-pannel">
      <div class="button-group-1">
        <el-button
          type="primary"
          class="button"
          :disabled="
            selectedTableRows.length < 2 || selectedTableRows.length > 5
          "
          @click="handleComaration"
          >对比</el-button
        >
        <el-button type="primary" class="button" @click="handleExportCsv"
          >导出</el-button
        >
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
          <el-button :icon="Search" @click="handleSearchTable" />
        </template>
      </el-input>
      <div class="button-group-2">
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
              v-model="cloumnLabel"
              @change="handleCheckedTableCloumn">
              <el-checkbox
                v-for="item in allColumnLabel"
                :label="item"
                :key="item"
                >{{ item }}</el-checkbox
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
      <span> 已选择 {{ selectedTableRows.length }}项 </span>
      <el-divider direction="vertical" />
      <span
        >数据所用"测试用例名称"一致可以进行对比操作(最多勾选5条)，可以导出当前所选数据。</span
      >
    </div>
    <el-table
      :data="tableData"
      v-loading="tableLoading || submitDataLoading"
      :header-cell-style="{ background: 'rgb(243,243,243)' }"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="30" />
      <el-table-column
        fixed="left"
        width="150"
        label="数据来源"
        prop="submit_id">
      </el-table-column>
      <template v-for="(item, index) in tableColumn">
        <el-table-column
          v-if="item.show"
          :prop="item.prop"
          :label="item.label"
          :key="index"
          width="150">
        </el-table-column>
      </template>
      <el-table-column prop="detail" label="详细数据" fixed="right">
        <template #default="scope">
          <router-link :to="`/baseline/detail/${scope.row.submit_id}`">
            <el-button link type="primary">
              <span>查看</span>
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch, reactive, onMounted, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Search,
  Setting,
  RefreshLeft,
  MoreFilled,
  WarningFilled
} from '@element-plus/icons-vue'
import { config, sceneConfig } from '../config-file'
import { ElMessage } from 'element-plus'
import { usePerformanceData } from '@/stores/performanceData'
import { getPerformanceData } from '@/api/performance'
import { downloadBlobFile } from '@/utils/request/downloadBlobFile'
import { combineJobs } from '@/views/performance-baseline/utils.js'

export interface Column {
  label: string
  prop: string
  show: boolean
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

const router = useRouter()
const route = useRoute()
const performanceStore = usePerformanceData()

const input = ref('')
const selectedOption = ref('')
const selectOptions = [
  {
    label: '测试用例',
    value: 'submit_id'
  },
  {
    label: '任务名称',
    value: 'missionName'
  },
  {
    label: '测试人',
    value: 'my_account'
  }
]

const tableData = ref<TableItem[]>([])
let originData: TableItem[] = []

const allColumn = ref([] as Column[])
const tableColumn = ref([] as Column[])
const allColumnLabel = ref([] as string[])
const cloumnLabel = ref([] as string[])
const isIndeterminate = ref(false)
const checkAllColumn = ref(true)

const selectedTableRows = ref(<{}[]>[])

const currentPage = ref(1)
const pageSize = ref(5)
const pageSizes = ref([10, 20, 50])
const total = ref(1)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const requestCount = ref(0) // 记录请求总是
const reFreshLodaing = ref(false)
const tableLoading = ref(false)

onMounted(() => {
  initailizeColumn()
})

const initailizeColumn = () => {
  const scene = route.query.scene ? route.query.scene : 'bigData'
  let key: keyof typeof sceneConfig
  for (key in sceneConfig) {
    if (sceneConfig[key].findIndex(item => item.prop === scene) !== -1) {
      allColumn.value = config[scene as string].column
      allColumnLabel.value = allColumn.value.map(item => {
        return item.label
      })
      tableColumn.value = allColumn.value
      cloumnLabel.value = allColumnLabel.value
    }
  }
}

watch(
  () => route.query.scene,
  () => {
    initailizeColumn
  }
)
// 数据扁平化，便于table展示

// const handleTableData = (page: number) => {
//   let start = (page - 1) * 5
//   let end =
//     props.dataList.length <= start + 5 ? props.dataList.length : start + 5
//   const temp = []
//   for (let i = start; i < end; i++) {
//     temp.push(flattenObj(props.dataList[i]))
//   }
//   tableData.value = temp
//   originData = JSON.parse(JSON.stringify(tableData.value))
// }

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

const handlecheckAllColumn = (val: any) => {
  if (val) {
    tableColumn.value.forEach(cloumn => {
      cloumn.show = true
    })
  } else {
    tableColumn.value.forEach(cloumn => {
      cloumn.show = false
    })
  }
  cloumnLabel.value = val ? allColumnLabel.value : []
  isIndeterminate.value = false
}
const handleCheckedTableCloumn = (value: any[]) => {
  const checkedCount = value.length
  tableColumn.value.forEach(cloumn => {
    cloumn.show =
      value.findIndex(item => item === cloumn.label) === -1 ? false : true
  })
  checkAllColumn.value = checkedCount === allColumn.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allColumn.value.length
}

const handleSelectionChange = (selectedRow: any) => {
  selectedTableRows.value = selectedRow
  console.log(selectedTableRows.value)
}

const handleSearchTable = () => {
  console.log(originData)
  if (selectedOption.value === '') {
    ElMessage('请选择搜索条件！')
  } else if (input.value === '') {
    ElMessage('请输入搜索内容！')
  } else {
    tableData.value = originData.filter(
      data =>
        !input.value ||
        data[selectedOption.value]
          .toLowerCase()
          .includes(input.value.toLowerCase())
    )
  }
}
watchEffect(() => {
  if (input.value === '') {
    tableData.value = originData
  }
})

const handleReFresh = () => {
  reFreshLodaing.value = !reFreshLodaing.value
}

// 获取并合并jobs的逻辑
// todo: 这段逻辑可以考虑一直store中
const getAllJobsData = (idList: any[]) => {
  const tempArr: any[] = reactive(Object.assign([], idList))
  // todo: 每次遍历请求前，应取消之前所有未完成的请求
  idList.forEach((idObj: any, idx: number) => {
    // 如果之前已经获得过数据则不再重复请求
    if (performanceStore.performanceData[idObj.submit_id]) {
      tempArr[idx] = performanceStore.performanceData[idObj.submit_id]
      return
    }
    // 根据submitId获取它的jobs
    requestCount.value += 1
    tableLoading.value = true
    performanceStore.changeLoadingStatus(true)
    getPerformanceData({
      index: 'jobs',
      query: {
        size: 10000, // 取全量
        query: {
          term: {
            submit_id: idObj.submit_id
          }
        }
      }
    })
      .then(res => {
        const resultObj = combineJobs(res.data.hits.hits) // 工具函数，合并job数据为一个submitId数据
        performanceStore.setPerformanceData(idObj.submit_id, resultObj) // save submit data to store
        tempArr[idx] = resultObj
      })
      .catch(err => {
        ElMessage({
          message: err.message,
          type: 'error'
        })
      })
      .finally(() => {
        requestCount.value -= 1
        if (requestCount.value === 0) {
          tableLoading.value = false
          performanceStore.changeLoadingStatus(false)
        }
      })
  })
  return tempArr
}

const idList = ref(<any>[])

// 自动分页
watchEffect(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  // 数据分页
  idList.value = props.dataList.slice(startIndex, startIndex + pageSize.value)
  total.value = props.dataList.length
  // for (let i = 0; total.value > i * 10; i++) {
  //   pageSizes.value.push((i + 1) * 10)
  // }
})

// 当前页数据变化时，获取jobs数据
watch(idList, () => {
  tableData.value = getAllJobsData(idList.value)
  originData = JSON.parse(JSON.stringify(tableData.value))
  console.log(tableData.value)
})

// 对比
const handleComaration = () => {
  performanceStore.setComparationList(selectedTableRows.value)
  router.push({ name: 'basicPerformance' })
}
// 导出
const handleExportCsv = () => {
  if (selectedTableRows.value.length === 0) {
    ElMessage({
      message: '请先选择要导出的数据',
      type: 'warning'
    })
  } else {
    const data = []
    // 这里要深拷贝,不然影响列的字段
    const titleData: any[] = JSON.parse(JSON.stringify(allColumn))
    titleData.splice(0, 0, { label: '数据来源', prop: 'submit_id' })
    const title = titleData.map<string>((item: any) => item.label).join(',')
    const keys = titleData.map<string>((item: any) => item.prop)
    data.push(`${title}\r\n`)
    selectedTableRows.value.forEach((item: any) => {
      const temp: string[] = []
      keys.forEach((key: string) => {
        temp.push(item[key])
      })
      const tmpStr = temp.join(',')
      data.push(`${tmpStr}\r\n`)
    })
    const dataString = data.join('')
    const blob = new Blob([`\uFEFF${dataString}`], {
      type: 'text/csv;charset=utf-8'
    })
    downloadBlobFile(blob, '导出.csv')
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none !important;
}
.handle-pannel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .button-group-1 {
    min-width: 200px;
    .button {
      min-width: 90px;
    }
  }

  .input-with-select {
    margin: 10px 0 10px 0;
    min-width: 250px;
    width: 35%;
    max-height: 32px;
  }
  .select {
    width: 100px;
  }
  .button-group-2 {
    min-width: 290px;
    .more-button {
      margin-left: 12px;
      min-width: 70px;
    }
    .more-icon-button {
      margin-left: 3px;
      max-width: 30px;
    }
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
