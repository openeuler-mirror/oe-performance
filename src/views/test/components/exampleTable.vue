<template>
  <el-row>
    <div class="demo-collapse">
    <el-collapse v-model="activeNames" @change="handleChange">
      单核：
      <el-collapse-item title="hackbench" name="1">
        <template #empty>
          <el-empty description="description" />
        </template>
        <div>
          nr_task=100%,mode=process,ipc=pipe,datasize=100,loop=30000
        </div>
      </el-collapse-item>
      <el-collapse-item title="hackbench" name="2">
        <div>
          nr_task=100%,mode=process,ipc=pipe,datasize=100,loop=30000
        </div>
      </el-collapse-item>
      多核：
      <el-collapse-item title="Efficiency" name="3">
        <div>
          Simplify the process: keep operating process simple and intuitive;
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
  </el-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue'



const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
  