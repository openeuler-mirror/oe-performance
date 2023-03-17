<template>
  <div class="performance-baseline-test-table">
    <div class="handle-pannel">
      <div class="button-group-left">
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
        class="oe-input-with-select table-searcher"
        v-model="searcherValue"
        placeholder="请输入搜索内容"
        clearable>
        <template #prepend>
          <el-select
            class="searcher-selector"
            v-model="searcherKey"
            placeholder="搜索条件"
            clearable
          >
            <el-option
              v-for="item in searcherOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
              />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="handleSearchTable" />
        </template>
      </el-input>
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
        label="提交编号"
        prop="submit_id">
      </el-table-column>
      <template v-for="(item, index) in tableColumn">
        <el-table-column
          v-if="item.show"
          :prop="item.prop"
          :label="item.label"
          :key="index"
          :width="item.width">
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
    <el-dialog
      v-model="dialogVisible"
      class="export-dialog"
      width="70%"
      @close="handleDialogClose">
      <template #header>
        <span style="font-size:20px;line-height: 24px;">选择基准</span>
        <el-tooltip
          content="选择一条作为基准,其他记录将与之进行比较"
          placement="bottom">
          <el-icon style="margin-left: 4px;" color="var(--oe-perf-color-secondary)"><InfoFilled /></el-icon>
        </el-tooltip>
      </template>
      <el-table
        :data="testData"
        stripe
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(243,243,243)' }">
        <el-table-column fixed prop="submit_id" label="提交编号" width="200" />
        <el-table-column
          :prop="item['prop']"
          :label="item['label']"
          :key="item['prop']"
          v-for="(item) in testDataColumn"/>
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
import { PropType, ref, watch, reactive, onMounted, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Search,
  Setting,
  RefreshLeft,
  WarningFilled
} from '@element-plus/icons-vue'
import { config, sceneConfig } from '../config-file'
import { ElMessage, ElTable } from 'element-plus'
import { usePerformanceData, useTestboxStore } from '@/stores/performanceData'
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

const emit = defineEmits<{
  (event: 'refreash'): void
  (event: 'tableSearch', searchKey: string, searchValue: string): void
}>()

const router = useRouter()
const route = useRoute()
const performanceStore = usePerformanceData()
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
let originData: TableItem[] = []

const allColumn = ref([] as Column[])
const tableColumn = ref([] as Column[])
const allColumnLabel = ref([] as string[])
const cloumnLabel = ref([] as string[])
const isIndeterminate = ref(false)
const checkAllColumn = ref(true)

const selectedTableRows = ref(<{}[]>[])

const idList = ref(<any>[])
const currentPage = ref(1)
const pageSize = ref(5)
const pageSizes = ref([10, 20, 50])
const total = ref(1)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const reFreshLodaing = ref(false)
const tableLoading = ref(false)
const dialogVisible = ref(false)
const testData = ref<any[]>([])
const testDataColumn = ref<any[]>([])
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const exportButtonLoading = ref(false)
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
  // else if (searcherValue.value === '') {
  //   ElMessage('请输入搜索内容！')
  // } else {
  //   tableData.value = originData.filter(
  //     data =>
  //       !searcherValue.value ||
  //       data[searcherKey.value]
  //         .toLowerCase()
  //         .includes(searcherValue.value.toLowerCase())
  //   )
  // }
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
const handleExportCsv = () => {
  if (selectedTableRows.value.length === 0) {
    ElMessage({
      message: '请先选择要导出的数据',
      type: 'warning'
    })
  } else if (selectedTableRows.value.length === 1) {
    // 公共部分数据
    const commonPartData = handleExportCommonPart()
    // + workload数据
    const dataString = handleExportSingle(commonPartData)
    const blob = new Blob([`\uFEFF${dataString}`], {
      type: 'text/csv;charset=utf-8'
    })
    downloadBlobFile(blob, '导出.csv')
  } else {
    // 准备好弹窗内表格的内容
    const testDatas = selectedTableRows.value[0]['tableDatas']
    const subjects = Object.keys(testDatas)
    subjects.forEach(item => {
      let testDataItemKeys = Object.keys(testDatas[item][0])
      testDataItemKeys.splice(testDataItemKeys.indexOf('li-testcase'),1)
      testDataItemKeys = testDataItemKeys.map((item:string) => item.split('.')[1])
      testDataItemKeys.forEach(value =>{
        testDataColumn.value.push({
          'prop': `${item}.${value}`,
          'label': `${item}(${value})`
        })
      })
    })
    selectedTableRows.value.forEach(item => {
      let detailData = {}
      for (let subject in item['tableDatas']) {
        for (let key in item['tableDatas'][subject][0]) {
          if (key !== 'li-testcase') {
            const tmp = key.split('.')[1]
            detailData[`${subject}.${tmp}`] = item['tableDatas'][subject][0][key]
          }
        }
      }
      testData.value.push({
        'submit_id': item['submit_id'],
        ...detailData
      })
    })
    dialogVisible.value = true
  }
}

const handleReFresh = () => {
  emit('refreash')
}
const handleDialogClose = () => {
  exportButtonLoading.value = false
  testData.value = []
  testDataColumn.value = []
  currentRow.value = undefined
  multipleTableRef.value!.clearSelection()
}
const currentRow = ref()
const handleCurrentChange = (val:any) => {
  currentRow.value = val
  console.log(val)
}
const handleExportCommonPart = ():string => {
  const data = []
  // 这里要深拷贝,不然影响列的字段
  const titleData: any[] = JSON.parse(JSON.stringify(allColumn.value))
  const extraColumn: any[] = [
    { label: '提交编号', prop: 'submit_id' },
    { label: '测试套', prop: 'suite' }
  ]
  titleData.splice(0, 0, ...extraColumn)
  titleData.splice(titleData.length, 0, { label: '测试人', prop: 'my_account' })
  const title = titleData.map<string>((item: any) => item.label).join(',')
  const keys = titleData.map<string>((item: any) => item.prop)
  data.push(`${title}\r\n`)
  selectedTableRows.value.forEach((item: any) => {
    const temp: string[] = []
    keys.forEach((key: string) => {
      temp.push(getProperty(item,key))
    })
    const tmpStr = temp.join(',')
    data.push(`${tmpStr}\r\n`)
  })
  return data.join('').concat('\r\n\r\n')
}
const handleExportSingle = (commonPartData:string):string => {
  const testDatas = selectedTableRows.value[0]['tableDatas']
  const subjects = Object.keys(testDatas)
  subjects.forEach((value) => {
    commonPartData = commonPartData.concat(`${value}\r\n`)
    const testDataItemKeys = Object.keys(testDatas[value][0])
    testDataItemKeys.splice(testDataItemKeys.indexOf('li-testcase'),1)
    const tempArr = testDataItemKeys.map((item:string) => item.split('.')[1])
    tempArr.splice(0,0,'提交编号')
    commonPartData = commonPartData.concat(`${tempArr.join(',')}\r\n`)
    // 写入各项指标值
    const values:string[] = []
    values.push(selectedTableRows.value[0]['submit_id'])
    testDataItemKeys.forEach((item:string) => {
      values.push(testDatas[value][0][item])
    })
    commonPartData = commonPartData.concat(`${values.join(',')}\r\n`)
  })
  return commonPartData;
}
/* eslint-disable max-lines-per-function */
const handleExportMultiple = () => {
  if (currentRow.value === undefined) {
    ElMessage({
      message: '请先选择一条记录作为基准',
      type: 'warning'
    })
  } else {
    exportButtonLoading.value = true
    let commonPartData = handleExportCommonPart()
    // 基准移到第一位
    const index = testData.value.findIndex(item => item['submit_id'] === currentRow.value['submit_id'])
    if(index !== -1){
      testData.value.splice(0, 0, testData.value[index])
      testData.value.splice(index + 1, 1)
    }
    // 表头
    const testDataKeys:string[] = []
    testDataKeys.push('提交编号')
    for (let key in testData.value[0]) {
      if (key !== 'submit_id') {
        testDataKeys.push(key)
      }
    }
    // 基准数据
    const baseRecordData:string[] = []
    testDataKeys.forEach(item => {
      if (item === '提交编号') {
        baseRecordData.push(testData.value[0]['submit_id'])
      } else {
        baseRecordData.push(testData.value[0][item])
      }
    })
    testData.value.forEach((record, index) => {
      if (index !== 0) {
        commonPartData = commonPartData.concat(`${testDataKeys.join(',')}\r\n`)
        commonPartData = commonPartData.concat(`${baseRecordData.join(',')}\r\n`)
        const temp:string[] = []
        const diffData:any[] = ['提升情况']
        testDataKeys.forEach(item => {
          if (item === '提交编号') {
            temp.push(record['submit_id'])
          } else {
            temp.push(record[item])
            diffData.push(Number(record[item]) - Number(testData.value[0][item]))
          }
        })
        commonPartData = commonPartData.concat(`${temp.join(',')}\r\n`)
        commonPartData = commonPartData.concat(`${diffData.join(',')}\r\n\r\n`)
      }
    })
    const blob = new Blob([`\uFEFF${commonPartData}`], {
      type: 'text/csv;charset=utf-8'
    })
    downloadBlobFile(blob, '导出.csv')
    // 退出
    dialogVisible.value = false
    handleDialogClose()
    ElMessage({
      message: '导出成功',
      type: 'success'
    })
  }
}
const getProperty = (item:any, key:string) => {
  const index = key.split('.')
  index.forEach(e => {
    item = item[e] || ''
  })
  return item
}
watch(
  () => route.query.scene,
  () => {
    initailizeColumn
  }
)

// watchEffect(() => {
//   if (searcherValue.value === '') {
//     tableData.value = originData
//   }
// })

// 自动分页
watchEffect(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  // 数据分页
  idList.value = props.dataList.slice(startIndex, startIndex + pageSize.value)
  total.value = props.dataList.length
})

// 当前页数据变化时，获取jobs数据
watch(idList, () => {
  tableData.value = getAllJobsData(idList.value)
  originData = JSON.parse(JSON.stringify(tableData.value))
})

onMounted(() => {
  initailizeColumn()
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
</style>
<style lang="scss">
.export-dialog {
  .el-dialog__body {
    padding-top: 20px;
  }
}
</style>
