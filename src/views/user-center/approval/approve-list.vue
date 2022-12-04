<template>
  <el-card shadow="always">
    <el-row :gutter="20">
      <span class="promit-font-style">查询条件:</span>
      <el-col :span="12">
        <el-input
          v-model="value"
          placeholder="搜索"
          class="input-with-select"
          :suffix-icon="Search"
          size="large"
          @input="inputValue"
        >
          <template #prepend>
            <el-select
            v-model="select"
            placeholder="申请单号"
            style="width: 115px"
            size="large"
            @change="changeSelect"
            >
              <el-option
                v-for="item in tableData.data"
                :key="item.requestCode"
                :label="item.requestCode"
                :value="item.requestCode"
              />
            </el-select>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <application-table
      :tableData="propsData.data"
      @pushView="intoView"
      ></application-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue'
import { getApplicationList } from '@/api/center/index.ts'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import  ApplicationTable  from '../components/application-table.vue'

const router = useRouter()

const hashData = new Map()

const select = ref('')
const value = ref('')
const tableData = reactive({
  data: []
})
const propsData = reactive({
  data: []
})

function inputValue() {
  let v = value.value
  select.value = ''
  if(v) {
    propsData.data = []
    for (let [key, val] of hashData) {
      if(key.indexOf(v) !== -1) {
        propsData.data.push(tableData.data[val])
      }
    }
  } else propsData.data = tableData.data
}
function changeSelect() {
  propsData.data = [tableData.data[hashData.get(select.value)]]
}

function intoView(query) {
  router.push({
    path: '/userCenter/approval/approvalprogress',
    query
  })
}
onMounted(() => {
  getApplicationList()
    .then((data) => {
      tableData.data = data.data.data
      propsData.data = data.data.data
      tableData.data.forEach((item, index) => {
        hashData.set(item.requestCode, index)
      })
    })
})
</script>

<style scoped lang="scss">
.input-with-select ::v-deep .el-input-group__prepend {
  background-color: var(--oe-perf-bg-section);
}
.promit-font-style {
  display: flex;
  align-items: center;
}
.right-btn {
  display: block;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
}
</style>
