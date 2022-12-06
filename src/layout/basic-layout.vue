<template>
  <el-container>
    <el-header class="basic-layout-header">
      <div class="header-left">
        <h5 class="logo">openEuler</h5>
        <div class="header-nav">
          <div class="nav-item active">性能基线</div>
          <div class="nav-item">性能测试</div>
          <div class="nav-item">提交测试</div>
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
    <el-container>
      <el-aside width="250px">
        <el-menu :default-active="currentKey" @select="handleChangeScene">
          <el-sub-menu index="1">
            <template #title>
              <span>解决方案性能基线</span>
            </template>
            <el-menu-item
              v-for="(item, index) in sceneConfig.solution"
              :key="index"
              :index="item.prop"
              >{{ item.label }}</el-menu-item
            >
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>基础性能基线</span>
            </template>
            <el-menu-item
              v-for="(item, index) in sceneConfig.basic"
              :key="index"
              :index="item.prop"
              >{{ item.label }}</el-menu-item
            >
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <span>对比检索</span>
            </template>
            <el-menu-item
              v-for="(item, index) in sceneConfig.contrast"
              :key="index"
              :index="item.prop"
              >{{ item.label }}</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="breadcrumb-nav">面包屑/导航</div>
        <div class="basic-layout-content">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUserInfo } from '@/stores/userInfo'
import { ElMessage } from 'element-plus'
import { sceneConfig } from '@/views/performance-baseline/config-file'
import { onMounted, ref } from 'vue'

const router = useRouter()
const route = useRoute()
const userInfoStore = useUserInfo()
const currentKey = ref('bigData')

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

const handleChangeScene = (index: string) => {
  router.replace({
    path: '/normalBaseline/list',
    query: { ...route.query, scene: index }
  })
}

onMounted(() => {
  if (route.query.scene) {
    currentKey.value = route.query.scene as string
  } else {
    handleChangeScene('bigData')
  }
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
    .nav-item {
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      &:not(:first-child) {
        margin-left: 20px;
      }
      &.active {
        border-bottom: 2px solid var(--oe-perf-font-color);
      }
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
