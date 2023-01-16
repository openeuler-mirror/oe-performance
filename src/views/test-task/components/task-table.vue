<template>
   <el-row class="control-row">
     <el-col :span="24">
         <el-radio-group class="job-state-list">
            <el-radio-button label="1">全部Job({{ healthState.allState }})</el-radio-button>
            <el-radio-button label="4">Finished({{ healthState.finished }})</el-radio-button>
            <el-radio-button label="5">Fail({{ healthState.failed }})</el-radio-button>
            <el-radio-button label="3">Running({{ healthState.running }})</el-radio-button>
            <el-radio-button label="2">Others({{ healthState.others }})</el-radio-button>
         </el-radio-group>
     </el-col>
    </el-row>
    <el-row class="control-row">
     <el-col :span="12">
        <el-input
          v-model="searchValue"
          placeholder="搜索范围"
          class="input-with-select"
          @keyup.enter="onSearch"
          :disabled="tableLoading"
        >
            <template #prepend>
              <el-select v-model="searchSelection" style="width: 115px">
                <el-option label="任务ID" value="taskId" />
                <el-option label="测试套" value="suite"/>
                <el-option label="创建者" value="creator" disabled/>
              </el-select>
            </template>
            <template #append>
              <el-button :icon="Search" :disabled="tableLoading"/>
            </template>
         </el-input>
     </el-col>
     <!--
     <el-col :span="1">
       <div class="refresh-icon" style="margin: 5px 0 0 5px;">
        <el-button link="" type="primary">
          <el-icon size="18px"><RefreshRight /></el-icon>
        </el-button>
       </div>
     </el-col>
     -->
   </el-row>
   <div v-loading="tableLoading || parentLoading">
      <el-table
        class="task-table"
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        stripe
      >
        <!--<el-table-column width="58">
          <template #default>
           <el-icon size="20px" @click="changeStar"><Star /></el-icon>
             <el-icon size="20px"><StarFilled /></el-icon>
          </template>
        </el-table-column>-->
        <el-table-column label="TaskID" prop="submit_id" fixed min-width="200">
         <template #default="scope">
           <router-link :to="`/testTask/taskDetails/${scope.row.submit_id}`">
             {{ scope.row.submit_id }}
           </router-link>
         </template>
        </el-table-column>
        <el-table-column prop="suite" label="Suite" width="90" show-overflow-tooltip/>
        <!--以下字段未确认
        <el-table-column
              label="审批状态"
              width="100"
              :filters="[
            { text: 'Am', value: 'Am' },
            { text: 'Tm', value: 'Tm' },
            { text: '2016-05-03', value: '2016-05-03' },
            { text: '2016-05-04', value: '2016-05-04' },
          ]"
          :filter-method="filterHandler">
          <template #default="scope">
           <el-row>
            <el-col :span="21" :class="scope.row.approval">
             {{scope.row.approval}}
            </el-col>
            <el-col :span="3">
             <span v-if="scope.row.approval=='Pending'">
               <el-tooltip
                 class="box-item"
                 effect="dark"
                 content="Top Center prompts info"
                 placement="top">
                 <el-icon size="15px"><QuestionFilled /></el-icon>
               </el-tooltip>
             </span>
            </el-col>
           </el-row>
         </template>
       </el-table-column>
       <el-table-column
         prop="date"
         label="测试类型"
         width="100"
         :filters="[
         { text: 'Am', value: 'Am' },
         { text: 'Tm', value: 'Tm' },
         { text: '2016-05-03', value: '2016-05-03' },
         { text: '2016-05-04', value: '2016-05-04' },
       ]"
       :filter-method="filterHandler"/>
       -->
       <el-table-column width="140">
         <template #header>
           总计/成功/失败
         </template>
         <template #default="scope">
          <div class="state-counts">
            <span class="total-state">{{ scope.row?.jobStateData?.all || '-' }}</span>
            /
            <span class="finished-state">{{ scope.row?.jobStateData?.finished || '-' }}</span>
            /
            <span class="failed-state">{{ scope.row?.jobStateData?.failed || '-' }}</span>
          </div>
         </template>
       </el-table-column>
       <!--
       <el-table-column prop="address" label="所属项目" width="165" show-overflow-tooltip />
       <el-table-column prop="date" label="创建人" />
       -->
       <el-table-column label="创建时间" min-width="170">
         <template #default="scope">
           {{ scope.row.submit_time && formatDate(new Date(scope.row.submit_time), 'yyyy/MM/dd hh:mm:ss') }}
         </template>
       </el-table-column>
       <el-table-column label="完成时间" min-width="170">
         <template #default="scope">
           {{ scope.row.submit_time && formatDate(new Date(scope.row.end_time), 'yyyy/MM/dd hh:mm:ss') }}
         </template>
       </el-table-column>
       <!--
       <el-table-column prop="detail" label="操作" fixed="right" width="120px">
         <template #default>
           <el-button link type="primary">重跑</el-button>
           <el-button link type="primary">删除</el-button>
         </template>
       </el-table-column>
       -->
      </el-table>
      <el-pagination
        class="pagination"
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :small="false"
        layout="prev, pager, next, sizes, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
</template>
<script lang="ts" setup>
// dep
import { ref, reactive, watch, watchEffect, defineEmits } from 'vue'
import { ElTable, ElMessage } from 'element-plus'
import { Star, Search } from '@element-plus/icons-vue'
// store
import { usePerformanceData, useTestboxStore } from '@/stores/performanceData'
// api
import { getPerformanceData } from '@/api/performance'
// type
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { User } from '../interface'
// utils
import { formatDate } from '@/utils/utils'
import { combineJobs } from '@/views/performance-baseline/utils.js'

const props = defineProps({
  parentLoading: {
    type: Boolean,
    default: false
  },
  allData: {
    type: Array,
    default: () => []
  },
  healthState: {
    type: Object,
    default: () => {}
  }
})

const performanceStore = usePerformanceData()
const testboxStore = useTestboxStore()

const idList = ref(<any>[])
const tableData = ref([])
const tableLoading = ref(false)

// 分页参数
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizes = ref([10, 20, 50])
const total = ref(0)

const searchSelection = ref('taskId')
const searchValue = ref('')

const emit = defineEmits<{
  (event: 'search', searchKey: string, searchValue: string): void
}>()

const onSearch = () => {
  emit('search', searchSelection.value, searchValue.value)
  currentPage.value = 1
}

// 根据pagination自动分页
watchEffect(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  // 数据分页
  idList.value = props.allData.slice(startIndex, startIndex + pageSize.value)
  total.value = props.allData.length
})

// 当前页数据idList变化时，获取每个id下的jobs数据。然后更新tableData数据
// todo: 此处和performancebaseline共用job组合逻辑，可以考虑统一抽出来。
watch(idList, () => {
  tableData.value = getAllJobsData(idList.value)
})

const getAllJobsData = (idList: any[]) => {
  tableLoading.value = true
  const tempArr: any[] = reactive(Object.assign([], idList))
  getPerformanceData({
    'index': 'jobs',
    'query': {
      size: 0,
      'query': {
        bool: {
          must: [
            { terms: { submit_id: idList.map(item => item.submit_id)} },
          ],
        },
      },
      aggs: {
        submit_list: { 
          terms: { field: 'submit_id', size: 10000 },  // 取全量 
          aggs: { 
            job_list: { top_hits: { _source: {} } }
          }
        },
      }
    },
  }).then(res => {
    const submitResult = res?.data?.aggregations?.submit_list?.buckets?.map(subItem => {
      return {
        submitId: subItem.key,
        jobList: subItem?.job_list?.hits?.hits
      }
    })
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

const setDeviceInfoToObj = (resultObj) => {
  const testbox = testboxStore.testboxMap[resultObj.testbox] || {}
  resultObj.device =  testbox.device || {}
}

const filterHandler = (
  value: string,
  row: User,
  column: TableColumnCtx<User>
) => {
  const propertyKey = column['property']
  
  return row[propertyKey] === value
}
const multipleTableRef = ref<InstanceType<typeof ElTable>>()

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style lang="scss" scoped>
.control-row {
  margin-bottom:8px;
}

.job-state-list {
  :deep(.el-radio-button__inner) {
    cursor: default;
  }
}

.state-counts {
  .total-state {
    color: var(--oe-perf-color-primary)
  }
  .finished-state{
    color: var(--oe-perf-color-success);
  }
  .failed-state {
    color: var(--oe-perf-color-danger);
  }
}
.task-table {
  :deep(thead th) {
    background-color: var(--oe-perf-bg-th);
    color: #333;
  }
  :deep(thead th.el-table-fixed-column--left.is-last-column.el-table__cell) {
    background-color: var(--oe-perf-bg-th);
    color: #333;
  }
}
.Fail {
  background-color: rgb(250, 88, 88);
  color: rgb(214, 209, 209);
  border-radius: 5px;
  text-align: center;
}
.Complete {
  background-color: rgb(63, 189, 87);
  color: rgb(249, 247, 247);
  border-radius: 5px;
  text-align: center;
}
.Pending {
  background-color: rgb(244, 244, 244);
  border-radius: 5px;
  border: 1px solid rgb(223, 223, 223);
  text-align: center;
}
</style>
