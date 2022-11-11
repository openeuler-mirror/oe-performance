<template>
  <div class="oe-perf-section">
    <test-component></test-component>
  </div>
  <div class="oe-perf-section">
    <test-case-vue></test-case-vue>
  </div>
</template>

<script setup lang="ts">
import testCaseVue from './performance-baseline/test-case.vue';
import TestComponent from './performance-baseline/test-component.vue'
</script>

<style>
</style>
