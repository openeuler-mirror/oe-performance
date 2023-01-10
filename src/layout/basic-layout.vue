<template>
  <el-container>
    <el-header class="basic-layout-header">
      <div class="header-left">
        <h5 class="logo">openEuler</h5>
        <div class="header-nav">
          <el-menu
            mode="horizontal"
            :ellipsis="false"
            background-color="#002FA1"
            text-color="FFF"
            active-text-color="#FFF"
            :default-active="currentKey"
            router
          >
            <el-menu-item key="h-1" index="/comparation">对比检索</el-menu-item>
            <el-menu-item key="h-2" index="/baseline">性能基线</el-menu-item>
            <el-menu-item key="h-3" index="/testTask">测试任务</el-menu-item>
            <el-menu-item key="h-4" index="/userCenter">用户中心</el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="header-right">
        {{ userInfoStore.userInfo.username }}
        <el-popconfirm title="登出系统？" @confirm="userLogout">
          <template #reference>
            <el-icon class="logout-btn"><SwitchButton /></el-icon>
          </template>
        </el-popconfirm>
      </div>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserInfo } from '@/stores/userInfo'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userInfoStore = useUserInfo()

const currentKey = computed({
  get() {
    return String(`/${router.currentRoute.value.path.split('/')[1]}`)
  },
  set() {}
})

const userLogout = () => {
  userInfoStore
    .userLogout()
    .then(() => {
      router.push('/user/login')
    })
    .catch(err => {
      ElMessage.error(err.message)
    })
}

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
</style>
