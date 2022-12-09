<template>
  <el-container>
    <el-aside width="250px">
      <el-menu :default-active="currentKey" router>
        <el-menu-item index="/testTask/taskList">测试任务</el-menu-item>
        <el-menu-item index="/testTask/createTask">提交测试</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div class="basic-layout-content">
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
$header-height: 56px;
$breadcrumb-nav-height: 32px;
.basic-layout-header {
  display: flex;
  height: $header-height;
  line-height: $header-height;
  background: var(--oe-perf-color-primary);
  color: var(--oe-perf-font-color);
  justify-content: space-between;
  .header-left {
    display: flex;
    height: $header-height;
    line-height: $header-height;
    background: var(--oe-perf-color-primary);
    color: var(--oe-perf-font-color);
    justify-content: space-between;
    .logo {
      width: 250px;
      font-size: 24px;
      padding-left: 50px;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    .logout-btn {
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .header-nav {
    display: flex;
    align-items: center;
    padding-left: var(--oe-perf-padding);
    .el-menu {
      border-bottom: 0;
      height: $header-height;
    }
  }
}
.breadcrumb-nav {
  height: $breadcrumb-nav-height;
  line-height: $breadcrumb-nav-height;
  padding-left: var(--oe-perf-padding);
}
.el-main {
  padding: 0;
}
.basic-layout-content {
  min-height: calc(100vh - $header-height - $breadcrumb-nav-height);
  background: var(--oe-perf-bg-layout);
  padding: var(--oe-perf-padding);
}
</style>
