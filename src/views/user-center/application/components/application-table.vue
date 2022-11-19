<template>
   <el-table
       ref="multipleTableRef"
       :data="tableData"
       :default-sort="{ prop: 'date', order: 'descending' }"
       style="width: 100%; margin-top: var(--oe-perf-padding);"
       @selection-change="handleSelectionChange"
     >
       <!-- <el-table-column label="Task ID">
         <template #default="scope">
           <el-button link type="primary">{{ scope.row.date }}</el-button>
         </template>
       </el-table-column> -->
       <el-table-column prop="name" label="申请单号" />
       <el-table-column prop="name" label="申请类型" />
       <el-table-column prop="name" label="提交人" />
       <el-table-column prop="date" sortable label="提交日期" show-overflow-tooltip />
       <el-table-column prop="name" label="描述" />
       <el-table-column prop="date" sortable label="密级" show-overflow-tooltip />
       <el-table-column prop="name" label="审批人" />
       <el-table-column prop="name" label="审批状态" />
       <el-table-column prop="detail" label="操作" fixed="right">
         <template #default>
           <el-button link type="primary">查看</el-button>
           <el-button link type="primary">删除</el-button>
         </template>
       </el-table-column>
     </el-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import { User } from '../interface'

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
  
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tm',
    address: 'No. 189, Grove St, Los Angeles',
  }
]
</script>