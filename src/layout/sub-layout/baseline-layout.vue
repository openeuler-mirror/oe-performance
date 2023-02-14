<template>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-active="currentKey" @select="handleMenuClick">
        <el-sub-menu index="baseline-solution">
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
        <el-sub-menu index="baseline-basic">
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
        <!--
        <el-sub-menu index="comparation">
          <template #title>
            <span>对比检索</span>
          </template>
          <el-menu-item index="performanceCompare">基础性能</el-menu-item>
          <el-menu-item index="solutionCompare">解决方案</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="dataAccess">数据接入</el-menu-item>
        -->
      </el-menu>
    </el-aside>
    <el-main>
      <div class="breadcrumb-nav" @click="handleGoBack">&lt;返回</div>
      <div class="sub-layout-content">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { sceneConfig } from '@/views/performance-baseline/config-file' 

const router = useRouter()
const route = useRoute()
const currentKey = ref('cpu')

const handleMenuClick = (
  index: string,
  indexPath: [subMenuIndex: string, menuItemIndex: string]
) => {
  // indexPath两项需要特殊处理，只切换scence
  if (indexPath[0] === 'baseline-solution' || indexPath[0] === 'baseline-basic') {
    router.push({
      path: '/baseline/list',
      query: { ...route.query, scene: index }
    })
  } else {
    router.push({ name: index })
  }
}

const handleGoBack = () => {
  router.go(-1)
}

onMounted(() => {
  if (route.query.scene) {
    currentKey.value = route.query.scene as string
  } else if (route.path === '/baseline/list') {
    // 如果是性能基线页面，但是有没有设置场景值的话，跳转至第一个场景（一般登录第一次进来或者顶部导航切换是没有场景的）
    handleMenuClick('cpu', ['baseline-basic', 'cpu'])
    currentKey.value = 'cpu'
  } else {
    currentKey.value = String(route.name || '')
  }
})

onBeforeRouteUpdate(async (to, from) => {
  if (to.path === '/baseline/list' && to.path !== from.path) {
    if (!to.query.scene) {
      handleMenuClick('cpu', ['baseline-basic', 'cpu'])
      currentKey.value = 'cpu'
    }
  }
  console.log(22, to ,from)
})
</script>
<style scoped lang="scss">
@import '../style.scss';

.breadcrumb-nav {
  padding: 4px var(--oe-perf-padding) 4px;
  &:hover {
    cursor: pointer;
    color: var(--oe-perf-color-secondary);
  }
}
</style>
