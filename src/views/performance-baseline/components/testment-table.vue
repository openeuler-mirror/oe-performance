<template>
  <div class="performance-baseline-test-table">
    <div class="handle-pannel">
      <div class="button-group-left">
        <el-button
          type="primary"
          class="button"
          :disabled="
            true ||
            selectedTableRows.length < 2 ||
            selectedTableRows.length >
              5 /*这里有问题, 会一直返回true让按钮不能点击, 我删了true后发现是没有实现好功能 */
          "
          @click="handleComaration"
          >对比</el-button
        >
        <ExportModal
          :visible="exportModalVisible"
          :all-column="allColumn"
          :selected-table-rows="selectedTableRows"
          @openModal="exportModalVisible = true"
          @closeModal="closeExportModal" />
        <p v-if="dataList.length > 0" class="jobs-count">
          当前数据由{{ jobCount }}条job汇总
        </p>
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
      <el-icon>
        <WarningFilled color="rgb(16,142,233)" />
      </el-icon>
      <span> 已选择 {{ selectedTableRows.length }}项 </span>
      <el-divider direction="vertical" />
      <span>可以最多勾选5条数据进行导出；导出时可选择基准数据进行对比。</span>
    </div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      v-loading="tableLoading || submitDataLoading"
      stripe
      :header-cell-style="{ background: 'rgb(243,243,243)' }"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="30" />
      <el-table-column
        fixed="left"
        width="200"
        label="性能几何平均值"
        prop="performanceVal">
        <template #default="scope">
          <div v-if="scope.row.suite !== 'lmbench'" class="important-value">
            {{ perfValformatter(scope.row.performanceVal) }}
          </div>
          <div v-else>
            <p>
              <span>Bandwidth：</span>
              <span class="important-value">
                {{
                  perfValformatter(scope.row.performanceVal_local_bandwidths)
                }}
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
          :min-width="item.width"
          :class-name="item.className">
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
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Setting, RefreshLeft, WarningFilled } from '@element-plus/icons-vue'
import { config, sceneConfig, Column } from '../config-file'
import { ElMessage, ElTable, CheckboxValueType } from 'element-plus'
import {
  usePerformanceData,
  useBaselineTableInfoStore,
  useTestboxStore
} from '@/stores/performanceData'
import { getPerformanceData } from '@/api/performance'
import {
  combineJobs,
  invalidNumberSymbol
} from '@/views/performance-baseline/utils.js'
import ExportModal from './export-modal.vue'

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

const emit = defineEmits<{ (event: 'refreash'): void }>()

const router = useRouter()
const route = useRoute()
const performanceStore = usePerformanceData()
const baselineTableInfoStore = useBaselineTableInfoStore()
const testboxStore = useTestboxStore()

const tableData = ref<DictObject[]>([])
const allColumn = ref<Column[]>([])
const tableColumn = ref<Column[]>([])
const allColumnLabel = ref<string[]>([])
const cloumnLabel = ref<string[]>([])
const isIndeterminate = ref<boolean>(false)
const checkAllColumn = ref<boolean>(true)

const selectedTableRows = ref<any[]>([])

const idList = ref(<any>[])
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const pageSizes = ref<number[]>([10, 20, 50])
const total = ref<number>(0)
const background = ref<boolean>(false)
const disabled = ref<boolean>(false)

const reFreshLodaing = ref<boolean>(false)
const tableLoading = ref<boolean>(false)

const changeSizeOnly = ref<boolean>(false)

function initailizeColumn(): void {
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

const handlecheckAllColumn = (val: CheckboxValueType): void => {
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

const handleCheckedTableCloumn = (value: CheckboxValueType[]): void => {
  const checkedCount: number = value.length
  tableColumn.value.forEach(cloumn => {
    cloumn.show 
    = value.findIndex(item => item === cloumn.label) === -1 ? false : true
  })
  checkAllColumn.value = checkedCount === allColumn.value.length
  isIndeterminate.value 
  = checkedCount > 0 && checkedCount < allColumn.value.length
}

const handleSelectionChange = (selectedRow: any[]) => {
  selectedTableRows.value = selectedRow
}

// 获取并合并jobs的逻辑
// eslint-disable-next-line max-lines-per-function
function getAllJobsData(idList: BaseLine.SubmitIdList) {
  tableLoading.value = true
  const tempArr: DictObject[] = reactive(Object.assign([], idList))
  getPerformanceData({
    index: 'jobs',
    query: {
      size: 10000,
      // prettier-ignore
      _source: [ 'suite', 'id', 'submit_id', 'group_id', 'tags', 'os', 'os_version', 'osv', 'arch', 'kernel', 'testbox', 'tbox_group', 'pp', 'stats', 'job_state', 'job_stage', 'job_health', 'time', 'start_time', 'end_time', 'submit_time', 'my_account', 'group_id'
      ],
      query: {
        constant_score: {
          filter: {
            terms: {
              submit_id: idList.map(item => item.submit_id)
            }
          }
        }
      }
    }
  })
    .then(res => {
      const submitResult = constructSubmitDataList(res?.data?.hits?.hits)
      submitResult.forEach((submitItem: any, idx: number) => {
        if (performanceStore.performanceData[submitItem.submitId]) {
          tempArr[idx] = performanceStore.performanceData[submitItem.submitId]
          return
        }
        const submitData = combineJobs(submitItem.jobList)
        setDeviceInfoToObj(submitData)
        performanceStore.setPerformanceData(submitItem.submitId, submitData)
        tempArr[idx] = submitData
      })
    })
    .catch(err => {
      ElMessage({ message: err.message, type: 'error' })
    })
    .finally(() => {
      tableLoading.value = false
    })
  return tempArr
}

// 在task-table.vue有个一模一样的
const constructSubmitDataList = (jobList: DictObject[]) => {
  const submitList: DictObject[] = []
  const submitMap = new Map<string, BaseLine.SubmitItem>()
  jobList.forEach(job => {
    const submitId: string = job?._source?.submit_id
    if (submitMap.has(submitId)) {
      const item = submitMap.get(submitId)
      item!.jobList.push(job)
    } else {
      submitMap.set(submitId, {
        submitId: submitId,
        jobList: [job]
      })
      submitList.push(submitMap.get(submitId)!)
    }
  })

  return submitList
}

function setDeviceInfoToObj(resultObj: DictObject) {
  const testbox = testboxStore.testboxMap[resultObj.testbox] || {}
  resultObj.device = testbox.device || {}
}

// 对比
const handleComaration = () => {
  performanceStore.setComparationList(selectedTableRows.value)
  router.push({ name: 'basicPerformance' })
}
// 导出
const exportModalVisible = ref(false)
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const closeExportModal = () => {
  exportModalVisible.value = false
  multipleTableRef.value!.clearSelection()
}
function perfValformatter(cellValue: number): number | string {
  if (cellValue === undefined || cellValue === invalidNumberSymbol) {
    return '暂无数据'
  }
  return cellValue
}

const handleReFresh = (): void => {
  emit('refreash')
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
    if (baselineTableInfoStore.baselineTableInfo?.currentPage) {
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
      font-size: 12px;
      color: #999;
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
