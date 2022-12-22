<template>
   <el-row>
     <el-col :span="15">
         <el-radio-group
           v-model="radio"
           @change ="selectRadio">
             <el-radio-button label="1">全部任务({{ number }})</el-radio-button>
             <el-radio-button label="2">Pending({{ number }})</el-radio-button>
             <el-radio-button label="3">Running({{ number }})</el-radio-button>
             <el-radio-button label="4">Complete({{ number }})</el-radio-button>
             <el-radio-button label="5">Fail({{ number }})</el-radio-button>
         </el-radio-group>
     </el-col>
     <el-col :span="8">
         <el-input
         v-model="searchInput"
         placeholder="搜索范围"
         class="input-with-select">
             <template #prepend>
               <el-select v-model="select" placeholder="Select" style="width: 115px">
                 <el-option label="Task ID" value="1" />
                 <el-option label="Task Name" value="2" />
                 <el-option label="Creator" value="3" />
               </el-select>
             </template>
             <template #append>
               <el-button :icon="Search" />
             </template>
         </el-input>
     </el-col>
     <el-col :span="1">
       <div class="refresh-icon" style="margin: 5px 0 0 5px;">
        <el-button link="" type="primary">
          <el-icon size="18px"><RefreshRight /></el-icon>
        </el-button>
       </div>
     </el-col>
   </el-row>
   <el-row>
     <el-table
       ref="multipleTableRef"
       :data="tableData"
       v-loading="tableLoading"
       :default-sort="{ prop: 'date', order: 'descending' }"
       style="width: 100%; margin-top: 30px;"
       @selection-change="handleSelectionChange"
     >
       <el-table-column width="58">
         <template #default>
          <el-icon size="20px" @click="changeStar"><Star /></el-icon>
          <!-- <el-icon size="20px"><StarFilled /></el-icon> -->
         </template>
       </el-table-column>
       <el-table-column fixed label="TaskID" width="110" prop="submit_id">
         <template #default="scope">
             <router-link :to="`/testTask/taskDetails/${scope.row.submit_id}`">
                {{ scope.row.submit_id }}
            </router-link>
        </template>
       </el-table-column>
       <el-table-column prop="name" label="Task名称" width="90" show-overflow-tooltip/>
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
       <el-table-column prop="name" :formatter="formatter" width="140">
         <template #header>
           总计/成功/失败
           <el-tooltip
             class="box-item"
             effect="dark"
             content="Top Center prompts info"
             placement="top">
             <el-icon><QuestionFilled /></el-icon>
           </el-tooltip>
         </template>
       </el-table-column>
       <el-table-column prop="address" label="所属项目" width="165" show-overflow-tooltip />
       <el-table-column prop="date" label="创建人" />
       <el-table-column prop="date" sortable label="创建时间" width="165"/>
       <el-table-column prop="date" sortable label="完成时间" width="165">
        <template #default="scope">
          <div>
            {{scope.row.date}}
          </div>
         </template>
       </el-table-column>
       <el-table-column prop="detail" label="操作" fixed="right" width="120px">
         <template #default>
           <el-button link type="primary">重跑</el-button>
           <el-button link type="primary">删除</el-button>
         </template>
       </el-table-column>
     </el-table>
   </el-row>
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
</template>
<script lang="ts" setup>
// dep
import { ref, reactive, watch, watchEffect } from 'vue'
import { ElTable, ElMessage } from 'element-plus'
import { Star, Search } from '@element-plus/icons-vue'
// store
import { usePerformanceData } from '@/stores/performanceData'
// api
import { getPerformanceData } from '@/api/performance'
// type
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { User } from '../interface'
// utils
import { combineJobs } from '@/views/data-access/utils.js'

const props = defineProps({
  allData: {
    type: Array,
    default: () => []
  }
})

const performanceStore = usePerformanceData()

const idList = ref(<any>[])
const tableData = ref([])
const requestCount = ref(0)
const tableLoading = ref(false)

// 分页参数
const currentPage = ref(1)
const pageSize = ref(5)
const pageSizes = ref([10, 20, 50])
const total = ref(0)

const radio = ref('1')
const select = ref('Task ID')

const number = ref('423')
const searchInput = ref('')

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
  console.log('taskList data: ', tableData.value)
})

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
        // 只取必要的字段
        // _source: ['suite', 'id', 'submit_id', 'group_id', 'tags',
        //   'os', 'os_version', 'arch', 'kernel',
        //   'testbox', 'tbox_group',
        //   'pp', 'stats',
        //   'job_state', 'time'
        // ],
        query: {
          term: {
            submit_id: idObj.submit_id
          }
        }
      }
    }).then(res => {
      const resultObj = combineJobs(res.data.hits.hits) // 工具函数，合并job数据为一个submitId数据
      performanceStore.setPerformanceData(idObj.submit_id, resultObj) // save submit data to store
      tempArr[idx] = resultObj
    }).catch(err => {
      ElMessage({
        message: err.message,
        type: 'error'
      })
    }).finally(() => {
      requestCount.value -= 1
      if (requestCount.value === 0) {
        tableLoading.value = false
        performanceStore.changeLoadingStatus(false)
      }
    })
  })
  return tempArr
}


const selectRadio = (label: any) => {
  console.log(label, '切换任务类型的处理')
}
// , column: TableColumnCtx<User>
const formatter = (row: User) => {
  return `${row.name} / ${row.name} / ${row.name}`
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
const multipleSelection = ref<User[]>([])

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
  
}

const changeStar = () => {
  console.log('点击收藏处理')
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style lang="scss" scoped>
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
