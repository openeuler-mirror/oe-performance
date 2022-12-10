<template>
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
            <el-menu-item index="performanceCompare">基础性能</el-menu-item>
            <el-menu-item index="solutionCompare">解决方案</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="dataAccess">数据接入</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div class="breadcrumb-nav">面包屑/导航</div>
      <div class="sub-layout-content">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { sceneConfig } from '@/views/performance-baseline/config-file'
import { onMounted, ref } from 'vue'

const router = useRouter()
const route = useRoute()
const currentKey = ref('bigData')

const handleChangeScene = (index: string, indexPath: [subMenuIndex: string, menuItemIndex: string]) => {
  // 只有前两项才需要控制参数
  if (indexPath[0] === '1' || indexPath[0] === '2') {
    router.push({
      path: '/baseline/list',
      query: { ...route.query, scene: index }
    })
  } else {
    router.push({ name: index })
  }
  
}

onMounted(() => {
  if (route.query.scene) {
    currentKey.value = route.query.scene as string
  } else {
    currentKey.value = String(route.name)
  }
})

</script>
<style scoped lang="scss">
$header-height: 56px;
$breadcrumb-nav-height: 32px;

.el-main {
  padding: 0;
}
.sub-layout-content {
  min-height: calc(100vh - $header-height - $breadcrumb-nav-height);
  background: var(--oe-perf-bg-layout);
  padding: var(--oe-perf-padding);
}
</style>
