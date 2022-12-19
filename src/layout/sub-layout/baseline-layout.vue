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
      <div class="breadcrumb-nav" @click="router.go(-1)">&lt;&lt;返回</div>
      <div class="sub-layout-content">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTestboxStore } from '@/stores/performanceData'
import { sceneConfig } from '@/views/performance-baseline/config-file'

import { getTestBoxes } from '@/api/performance'

const testboxStore = useTestboxStore()

const router = useRouter()
const route = useRoute()
const currentKey = ref('bigData')

const handleChangeScene = (
  index: string,
  indexPath: [subMenuIndex: string, menuItemIndex: string]
) => {
  console.log(indexPath)
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

// 获取主机列表和信息
const getTestboxData = () => {
  getTestBoxes().then(res => {
    const testboxListRaw = res.data.hits.hits.map(
      (rawItem: any) => rawItem._source
    )
    testboxStore.setTestboxData(testboxListRaw)
    console.log('baseline-layout: ', testboxStore.testboxMap)
  })
}

onMounted(() => {
  if (route.query.scene) {
    currentKey.value = route.query.scene as string
  } else {
    handleChangeScene('bigData', ['1', 'bigData'])
  }

  getTestboxData()
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
