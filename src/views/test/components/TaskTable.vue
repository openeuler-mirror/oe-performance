<template>
   <el-row>
     <el-col :span="15">
         <el-radio-group v-model="radio" @change="selectRadio">
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
       <div class="refresh-icon">
           <el-icon><RefreshRight /></el-icon>
       </div>
     </el-col>
   </el-row>
   <el-row>
     <el-table
       ref="multipleTableRef"
       :data="tableData"
       :default-sort="{ prop: 'date', order: 'descending' }"
       style="width: 100%; margin-top: 30px;"
       @selection-change="handleSelectionChange"
     >
       <el-table-column type="selection"/>
       <el-table-column width="58">
         <template #default="scope">
           <el-icon><Star /></el-icon>
           {{scope}}
         </template>
       </el-table-column>
       <el-table-column label="Task ID">
         <template #default="scope">
           <el-button link type="primary">{{ scope.row.date }}</el-button>
         </template>
       </el-table-column>
       <el-table-column prop="name" label="Task Name" />
       <el-table-column
             prop="name"
             label="审批状态"
             :filters="[
           { text: 'Am', value: 'Am' },
           { text: 'Tm', value: 'Tm' },
           { text: '2016-05-03', value: '2016-05-03' },
           { text: '2016-05-04', value: '2016-05-04' },
         ]"
         :filter-method="filterHandler"/>
       <el-table-column
       prop="date"
       label="测试类型"
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
       <el-table-column prop="address" label="所属项目" show-overflow-tooltip />
       <el-table-column prop="date" label="创建人" show-overflow-tooltip />
       <el-table-column prop="date" sortable label="创建时间" show-overflow-tooltip />
       <el-table-column prop="date" sortable label="完成时间" show-overflow-tooltip />
       <el-table-column prop="detail" label="操作" fixed="right">
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
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="prev, pager, next, sizes, jumper"
      :total="10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import { Star, Search } from '@element-plus/icons-vue'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { User } from '../interface'

// const props = defineProps({
//   activeTab: String
// })

const radio = ref('1')
const select = ref('Task ID')


const number = ref('423')
const searchInput = ref('')

const selectRadio = (label: string) => {
  console.log(label)
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

// 分页
const currentPage = ref(1)
const pageSize = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tm',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'TA',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Am',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'IC',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tc',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'cm',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'bm',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>