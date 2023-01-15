<template>
  <el-container>
    <el-aside width="150px">
      <el-menu :default-active="currentKey" router>
        <el-menu-item index="/testTask/taskList">测试任务</el-menu-item>
        <el-menu-item index="/testTask/createTask">提交测试</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div class="sub-layout-content">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentKey = computed({
  get() {
    return String(router.currentRoute.value.path)
  },
  set() {}
})

</script>

<style scoped lang="scss">
@import '../style.scss'
</style>
