<template>
  <div class="oe-perf-section">
    template1
  </div>
  <div class="oe-perf-section">
    template2
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  console.log(router)
})
</script>

<style>
</style>
