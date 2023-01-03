<template>
  <el-container>
    <el-aside width="250px">
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
  if (route.query.scence) {
    currentKey.value = route.query.scence as string
  } else if (route.path === '/baseline/list') {
    // 如果是性能基线页面，但是有没有设置场景值的话，跳转至第一个场景（一般登录第一次进来或者顶部导航切换是没有场景的）
    handleMenuClick('bigData', ['baseline-solution', 'bigData'])
  } else {
    currentKey.value = String(route.name || '')
  }

  getTestboxData()
})
</script>
<style scoped lang="scss">
@import '../style.scss'
</style>
