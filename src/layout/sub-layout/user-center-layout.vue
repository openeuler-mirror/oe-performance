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
