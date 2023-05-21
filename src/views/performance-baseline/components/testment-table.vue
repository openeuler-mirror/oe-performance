<template>
  <div class="performance-baseline-test-table">
    <div class="handle-pannel">
      <div class="button-group-left">
        <el-button
          type="primary"
          class="button"
          :disabled="
            true || selectedTableRows.length < 2 || selectedTableRows.length > 5
          "
          @click="handleComaration"
          >对比</el-button
        >
        <el-button type="primary" class="button" @click="handleExportCsv"
          >导出</el-button
        >
        <p v-if="dataList.length > 0" class="jobs-count">共计{{ jobCount }}条jobs</p>
      </div>
      <div class="button-group-right">
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
        <!--上传功能尚未接入
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
        -->
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
      ref="multipleTableRef"
      :data="tableData"
      v-loading="tableLoading || submitDataLoading"
      stripe
      :header-cell-style="{ background: 'rgb(243,243,243)' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="30" />
      <el-table-column
        fixed="left"
        width="200"
        label="性能几何平均值"
        prop="performanceVal"
      >
        <template #default="scope">
            <div
              v-if="scope.row.suite!=='lmbench'"
              class="important-value"
            >{{ perfValformatter(scope.row.performanceVal) }}</div>
            <div v-else>
              <p>
                <span>Bandwidth：</span>
                <span class="important-value">
                  {{ perfValformatter(scope.row.performanceVal_local_bandwidths) }}
                </span>
              </p>
              <p>
                <span>Latency：</span>
                <span class="important-value">
                  {{ perfValformatter(scope.row.performanceVal) }}
                </span>
              </p>
            </div>
          </template>
      </el-table-column>
      <template v-for="(item, index) in tableColumn">
        <el-table-column
          v-if="item.show"
          :prop="item.prop"
          :label="item.label"
          :key="index"
          :width="item.width"
          :min-width="item.minWidth"
          :class-name="item.className"
        >
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
      small
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" />
    <el-dialog
      v-model="dialogVisible"
      class="export-dialog"
      width="70%"
      @close="handleDialogClose">
      <template #header>
        <div class="export-dialog-header">
          <h3>选择基准</h3>
          <p>请选择一条作为基准,其他记录将与之进行比较</p>
        </div>
      </template>
      <el-table
        ref="exportTableRef"
        :data="testDataVals"
        stripe
        highlight-current-row
        @current-change="currentRow => handleCurrentChange(currentRow)"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(243,243,243)' }">
        <el-table-column fixed width="50">
          <template #default="scope">
            <el-radio
              v-model="currentCheckboxData[scope.$index]"
              :label="scope.row.submit_id"
              @change="cuurentCheckboxSelected"
            />
          </template>
        </el-table-column>
        <el-table-column fixed prop="submit_id" label="提交编号" width="200" show-overflow-tooltip/>
        <el-table-column
          min-width="100"
          label="总性能值"
          prop="performanceVal"
        >
          <template #default="scope">
            <div class="important-value">{{ perfValformatter(scope.row.performanceVal) }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :prop="item['prop']"
          :label="item['label']"
          :key="item['prop']"
          min-width="160"
          :formatter="tableCellFormatter"
          v-for="(item) in testDataColumns"/>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleExportMultiple" :loading="exportButtonLoading">导出</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Search,
  Setting,
  RefreshLeft,
  WarningFilled
} from '@element-plus/icons-vue'
import { config, sceneConfig, Column } from '../config-file'
import { ElMessage, ElTable } from 'element-plus'
import { usePerformanceData, useBaselineTableInfoStore, useTestboxStore } from '@/stores/performanceData'
import { getPerformanceData } from '@/api/performance'
import { combineJobs, invalidNumberSymbol } from '@/views/performance-baseline/utils.js'
import { tableColumnMap } from '@/views/performance-baseline/config_li.js'
import { exportSingle, exportMultiple } from '@/views/performance-baseline/export-data'

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
  },
  jobCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits<{
  (event: 'refreash'): void
  (event: 'tableSearch', searchKey: string, searchValue: string): void
}>()

const router = useRouter()
const route = useRoute()
const performanceStore = usePerformanceData()
const baselineTableInfoStore = useBaselineTableInfoStore()
const testboxStore = useTestboxStore()

const searcherValue = ref('')
const searcherKey = ref('my_account')
const searcherOptions = [
  {
    label: '测试人',
    value: 'my_account'
  },
  {
    label: '测试用例',
    value: 'submit_id',
    disabled: true // 该属性未录入数据库
  },
  {
    label: '任务名称',
    value: 'missionName',
    disabled: true // 该属性未录入数据库
  }
]

const tableData = ref<TableItem[]>([])
// let originData: TableItem[] = []

const allColumn = ref([] as Column[])
const tableColumn = ref([] as Column[])
const allColumnLabel = ref([] as string[])
const cloumnLabel = ref([] as string[])
const isIndeterminate = ref(false)
const checkAllColumn = ref(true)

const selectedTableRows = ref<any[]>([])

const idList = ref(<any>[])
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizes = ref([10, 20, 50])
const total = ref(0)
const background = ref(false)
const disabled = ref(false)

const reFreshLodaing = ref(false)
const tableLoading = ref(false)
const dialogVisible = ref(false)
const testDataVals = ref<any[]>([])
const testDataColumns = ref<any[]>([])
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const exportButtonLoading = ref(false)

const changeSizeOnly = ref(false)

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
}

const handleSearchTable = () => {
  if (searcherKey.value === '') {
    ElMessage('请选择搜索条件！')
    return
  } 
  emit('tableSearch', searcherKey.value, searcherValue.value)
}

// 获取并合并jobs的逻辑
const getAllJobsData = (idList: any[]) => {
  tableLoading.value = true
  const tempArr: any[] = reactive(Object.assign([], idList))
  getPerformanceData({
    'index': 'jobs',
    'query': {
      size: 10000,
      _source: ['suite', 'id', 'submit_id', 'group_id', 'tags', 'os', 'os_version', 'osv', 'arch', 'kernel',
        'testbox', 'tbox_group', 'pp', 'stats', 'job_state', 'job_stage', 'job_health', 'time', 'start_time', 'end_time', 'submit_time',
        'my_account', 'group_id'
      ],
      'query': {
        constant_score : {
          filter : {
            terms : { 
              submit_id : idList.map(item => item.submit_id)
            }
          }
        }
      }
    },
  }).then(res => {
    const submitResult = constructSubmitDataList(res?.data?.hits?.hits)
    submitResult.forEach((submitItem, idx) => {
      if (performanceStore.performanceData[submitItem.submitId]) {
        tempArr[idx] = performanceStore.performanceData[submitItem.submitId]
        return
      }
      const submitData = combineJobs(submitItem.jobList)
      setDeviceInfoToObj(submitData)
      performanceStore.setPerformanceData(submitItem.submitId, submitData)
      tempArr[idx] = submitData
    })
  }).catch(err => {
    ElMessage({ message: err.message, type: 'error' })
  }).finally(() => {
    tableLoading.value = false
  })
  return tempArr
}

const constructSubmitDataList = (jobList) => {
  const submitList = <any>[]
  const submitMap = {}
  jobList.forEach(job => {
    const submitId = job?._source?.submit_id
    if (submitMap[submitId]) {
      submitMap[submitId].jobList.push(job)
    } else {
      submitMap[submitId] = {
        submitId,
        jobList: [job]
      }
      submitList.push(submitMap[submitId])
    }
  })
  return submitList
}

const setDeviceInfoToObj = (resultObj) => {
  const testbox = testboxStore.testboxMap[resultObj.testbox] || {}
  resultObj.device =  testbox.device || {}
}

// 对比
const handleComaration = () => {
  performanceStore.setComparationList(selectedTableRows.value)
  router.push({ name: 'basicPerformance' })
}
// 导出
const exportTableRef = ref()
/* eslint-disable max-lines-per-function */
const handleExportCsv = () => {
  if (selectedTableRows.value.length === 0) {
    ElMessage({
      message: '请先选择要导出的数据',
      type: 'warning'
    })
  } else if (selectedTableRows.value.length === 1) {
    exportSingle(allColumn.value, selectedTableRows.value, tableColumnMap)
    multipleTableRef.value!.clearSelection()
  } else {
    let suites = selectedTableRows.value.map<string>(record => record['suite'])
    suites = Array.from(new Set(suites))
    if (suites.length > 1) {
      ElMessage({
        message: '请选择相同测试套的数据',
        type: 'warning'
      })
      multipleTableRef.value!.clearSelection()
      return
    }
    // 准备好弹窗内表格的内容
    const tableInfos:any[] = tableColumnMap[selectedTableRows.value[0]['suite']]
    tableInfos.forEach((tableInfo:any) => {  // 设置基准选择表格的列
      testDataColumns.value.push({
        prop: `performanceVal_${tableInfo['tableName']}`,
        label: `${tableInfo['tableName']}(性能值)`
      })
      tableInfo['column'].forEach((column:any) => {
        testDataColumns.value.push({
          prop: `${tableInfo['tableName']}(${column['label']})`,
          label: `${tableInfo['tableName']}(${column['label']})`
        })
      })
    })
    selectedTableRows.value.forEach((record:any) => {
      let rowData:{ [propName:string]: any } = {}
      tableInfos.forEach((tableInfo:any) => {
        // 有的数据中可能缺少某些表格的数据
        if (!record['tableDatas'][tableInfo['tableName']]){
          return
        }
        const performanceVal = record['tableDatas'][tableInfo['tableName']][0][`performanceVal_${tableInfo['tableName']}`]
        rowData[`performanceVal_${tableInfo['tableName']}`] = performanceVal
        tableInfo['column'].forEach((column:any) => {
          const val = record['tableDatas'][tableInfo['tableName']][0][column['prop']]
          rowData[`${tableInfo['tableName']}(${column['label']})`] = val
        })
      })
      testDataVals.value.push({
        submit_id: record['submit_id'],
        performanceVal: record['performanceVal'],
        ...rowData
      })
    })
    dialogVisible.value = true
  }
}

const perfValformatter = (cellValue: number) => {
  if (cellValue === undefined || cellValue === invalidNumberSymbol) {
    return '暂无数据'
  }
  return cellValue
}
const tableCellFormatter = (row, column, cellValue) => {
  if (cellValue === undefined || cellValue === invalidNumberSymbol) {
    return '暂无数据'
  }
  return cellValue
}

const handleReFresh = () => {
  emit('refreash')
}
const currentCheckboxData = ref([])
const currentRow = ref()

const handleDialogClose = () => {
  exportButtonLoading.value = false
  testDataVals.value = []
  testDataColumns.value = []
  currentRow.value = undefined
  currentCheckboxData.value = []
  multipleTableRef.value!.clearSelection()
}

// 联动控制基准选择和radio
const handleCurrentChange = (val:any) => {
  currentRow.value = val
  if (!val) return  // 取消选择时，val会为null
  const radioSelectedList = <string>[]
  testDataVals.value.forEach(() => {
    radioSelectedList.push(val.submit_id)
  })
  currentCheckboxData.value = radioSelectedList
}
const cuurentCheckboxSelected = (val) => {
  // 当checkbox取消时，取消当前行的选择
  if (!val) {
    exportTableRef.value.setCurrentRow()
    currentRow.value = undefined
  }
}

const handleExportMultiple = () => {
  if (currentRow.value) {
    exportButtonLoading.value = true
    exportMultiple(allColumn.value,selectedTableRows.value,tableColumnMap,currentRow.value)
    // 退出
    dialogVisible.value = false
    handleDialogClose()
    ElMessage({
      message: '导出成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: '请先选择一条记录作为基准',
      type: 'warning'
    })
  }
}

watch(
  () => route.query.scene,
  () => {
    initailizeColumn
  }
)

// 自动分页
const paging = () => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  // 数据分页
  idList.value = props.dataList.slice(startIndex, startIndex + pageSize.value)
  total.value = props.dataList.length
  baselineTableInfoStore.setTableInfo({
    currentPage: currentPage.value,
    pageSize: pageSize.value
  })
}
watch(
  () => currentPage.value,
  () => paging()
)
watch(
  () => pageSize.value,
  () => {
    if (changeSizeOnly.value) {
      changeSizeOnly.value = false
    } else {
      if (currentPage.value === 1) {
        paging()
      } else {
        currentPage.value = 1
      }
    }
  }
)
// 获取submitList后
watch(
  () => props.dataList,
  () => paging()
)

// 分页后，获取jobs数据
watch(
  () => idList.value,
  () => {
    tableData.value = getAllJobsData(idList.value)
  }
)

onMounted(() => {
  initailizeColumn()
  if (route.meta.isGoback) {
    if (baselineTableInfoStore.baselineTableInfo && baselineTableInfoStore.baselineTableInfo.currentPage) {
      changeSizeOnly.value = true
      pageSize.value = baselineTableInfoStore.baselineTableInfo.pageSize
      currentPage.value = baselineTableInfoStore.baselineTableInfo.currentPage
    }
  }
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
  flex-wrap: wrap;
  .button-group-left {
    min-width: 200px;
    .button {
      min-width: 90px;
    }
    .jobs-count {
      display: inline-block;
      margin-left: 8px;
      line-height: 32px;
      vertical-align: top;
    }
  }

  .table-searcher {
    margin: 10px 0 10px 0;
    min-width: 250px;
    width: 35%;
    max-height: 32px;
    .searcher-selector {
      width: 100px;
    }
  }
  .button-group-right {
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

.important-value {
  color: var(--oe-perf-color-primary);
}
</style>
<style lang="scss">
.export-dialog {
  .el-dialog__body {
    padding-top: 8px;
  }
  &-header {
    display: flex;
    align-items: baseline;
    line-height: 32px;
    h3 {
      font-size: 20px;
    }
    p {
      margin-left: 8px;
      font-size: 12px;
    }
  }
  .el-radio__label {
    display: none;
  }
  tbody .el-table__row {
    cursor: pointer;
  }
}
</style>
