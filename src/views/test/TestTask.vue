<template>
  <el-card shadow="always">
    <el-tabs v-model="activeTab" class="demo-tabs" @tab-change="handleChange">
    <el-tab-pane label="全部任务" name="全部任务">
      <TaskTableVue
      v-if="activeTab =='全部任务'"
      :activeTab="activeTab"></TaskTableVue>
    </el-tab-pane>
    <el-tab-pane label="我创建的任务" name="我创建的任务">
      <TaskTableVue
      v-if="activeTab =='我创建的任务'"
      :activeTab="activeTab"></TaskTableVue>
    </el-tab-pane>
    <el-tab-pane label="我的收藏" name="我的收藏">
      <TaskTableVue
      v-if="activeTab =='我的收藏'"
      :activeTab="activeTab"></TaskTableVue>
    </el-tab-pane>
  </el-tabs>
 </el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'
import TaskTableVue from './components/TaskTable.vue';


const activeTab = ref('全部任务')



const handleChange = (tab: TabPaneName) => {
  console.log(tab,'active改变了')
}


</script>



<style lang="scss" scoped>
 .refresh-icon{
    margin: 8px 0 0 8px;
 }
 .pagination {
  margin-top: 20px;
}
</style>