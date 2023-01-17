<template>
  <div class="oe-perf-login">
    <img class="logo-image" src="@/assets/logo.png">
    <img class="theme-image" src="@/assets/theme.png">
    <div class="login-container">
      <el-button class="login-btn" type="primary" @click="loginRequest">进入系统</el-button>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

import { useUserInfo } from '@/stores/userInfo'

const userInfoStore = useUserInfo()
const router = useRouter()

const loginRequest = () => {
  userInfoStore.simulateLogin()
    .then(() => {
      ElMessage.success('登录成功')
      router.push({ name: 'baseline-list' })
    })
}
</script>
  
<style lang="scss" scoped>
  .oe-perf-login {
    width: 100%;
    height: 100%;
    display: flex;
    background: url('@/assets/login-bg.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    .logo-image {
      position: absolute;
      width: 200px;
      top:2%;
      left:2%;
    }
    .theme-image {
      display: block;
      position: absolute;
      width: 60%;
      top: 15%;
      left: 50%;
      transform: translate(-50%);
    }
    .login-container {
      position: absolute;
      width: 300px;
      top: 75vh;
      left: 50%;
      margin-left: -150px;
      text-align: center;
      :deep(.el-tabs__header) {
        padding-left: 40px;
      }
      :deep(.el-tabs__nav-wrap:after) {
        display: none;
      }
      .login-btn {
        margin-top: 30px;
        width: 100%;
      }
    }
  }
</style>