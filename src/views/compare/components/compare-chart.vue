<template>
  <div ref="chartContainer" style="width: 100%; height: 400px"></div>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Chart from '../utils/chart'
export default defineComponent({
  setup () {
    const chartContainer = ref<any>(null)

    onMounted(() => {
      Chart(chartContainer.value)
    })

    return { chartContainer }
  }
})
</script>
  
<style lang="scss" scoped>
</style>
