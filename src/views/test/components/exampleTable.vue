<template>
  <el-row>
    <el-table :data="tableData" :border="parentBorder" style="width: 100%">
      <template #empty>
        <p>请先选择用例</p>
      </template>
      <el-table-column type="expand">
        <template #default="props">
          <div m="4">
            <p m="t-0 b-2">State: {{ props.row.state }}</p>
            <p m="t-0 b-2">City: {{ props.row.city }}</p>
            <p m="t-0 b-2">Address: {{ props.row.address }}</p>
            <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
            <h3>Family</h3>
            <el-table :data="props.row.family" :border="childBorder">
              <el-table-column label="Name" prop="name" />
              <el-table-column label="State" prop="state" />
              <el-table-column label="City" prop="city" />
              <el-table-column label="Address" prop="address" />
              <el-table-column label="Zip" prop="zip" />
            </el-table>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Result } from '../interface'


const tableData: Result[] = []
const parentBorder = ref(false)
const childBorder = ref(false)
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
  