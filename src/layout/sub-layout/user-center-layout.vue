<template>
  <el-container>
    <el-aside width="250px">
      <el-menu :default-active="currentKey" router>
        <el-sub-menu index="my-application">
          <template #title>
            <span>我的申请</span>
          </template>
          <el-menu-item index="/userCenter/application/applicationList">所有申请</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="my-approve-list">
          <template #title>
            <span>我的审批</span>
          </template>
          <el-menu-item index="/userCenter/approval/approveList">所有审批</el-menu-item>
        </el-sub-menu>
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
