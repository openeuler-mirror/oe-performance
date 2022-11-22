<template>
  <div class="performance-baseline-test-table">
    <div class="handle-pannel">
      <div>
        <el-button>数据状态变更</el-button>
        <el-button type="primary" class="button" :disabled="contrastDisable"
          >对比</el-button
        >
        <el-button type="primary" class="button">导出</el-button>
      </div>
      <el-input
        v-model="input"
        placeholder="请输入搜索内容"
        clearable
        class="input-with-select">
        <template #prepend>
          <el-select
            clearable
            v-model="selectedOption"
            placeholder="搜索条件"
            class="select">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="handleSearch(selectedOption)" />
        </template>
      </el-input>
      <div>
        <el-button
          :icon="RefreshLeft"
          :loading="reFreshLodaing"
          class="button"
          @click="handleReFresh"
          >刷新</el-button
        >
        <el-popover placement="bottom" :width="400" trigger="click">
          <template #reference>
            <el-button :icon="Setting" type="primary" class="button"
              >设置</el-button
            >
          </template>
          <div>
            <el-checkbox
              v-model="checkAllColumn"
              :indeterminate="isIndeterminate"
              @change="handlecheckAllColumn"
              >全选</el-checkbox
            >
            <el-checkbox-group
              v-model="tableColumn"
              @change="handleCheckedTableCloumn">
              <el-checkbox
                v-for="item in allColumn"
                :label="item"
                :key="item"
                >{{ item.label }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </el-popover>
        <el-dropdown trigger="click">
          <el-button-group>
            <el-button type="primary" class="more-button">更多</el-button>
            <el-button
              type="primary"
              :icon="MoreFilled"
              class="more-icon-button"></el-button>
          </el-button-group>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>上传</el-dropdown-item>
              <el-dropdown-item>下载模板</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="tips">
      <el-icon><WarningFilled color="rgb(16,142,233)" /></el-icon>
      <span> 已选择{{ selectedCase }}项 </span>
      <el-divider direction="vertical" />
      <span
        >数据所用"测试用例名称"一致可以进行对比操作(最多勾选5条)，可以导出当前所选数据。</span
      >
    </div>
    <el-table
      :data="tableData"
      row-key="guid"
      :header-cell-style="{ background: 'rgb(243,243,243)' }">
      <el-table-column fixed="left" width="150">
        <template #header>
          <el-checkbox v-model="checkAllItems" @change="handleCheckedAllItems">
            数据来源
          </el-checkbox>
        </template>
        <template #default="scope">
          <el-checkbox
            v-model="scope.row.check"
            @change="handleCheckedItem(scope)">
            {{ scope.row.dataSource }}
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in tableColumn"
        :prop="item.prop"
        :label="item.label"
        :key="index"
        width="150">
      </el-table-column>
      <el-table-column prop="detail" label="详细数据" fixed="right">
        <template #default>
          <el-button link="" type="primary">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref, toRaw, watchEffect } from 'vue'
import {
  Search,
  Setting,
  RefreshLeft,
  MoreFilled,
  WarningFilled
} from '@element-plus/icons-vue'
import { allColumns } from '../test-data'
import { ElMessage } from 'element-plus'
export interface Column {
  label: string
  prop: string
}
export interface TableItem {
  [key: string]: any
}
const props = defineProps({
  dataList: {
    type: Array as PropType<any[]>,
    default: () => []
  }
})

const input = ref('')

const contrastDisable = ref(true)
const reFreshLodaing = ref(false)

const selectedOption = ref('')
const selectOptions = [
  {
    label: '测试用例',
    value: 'guid'
  },
  {
    label: '任务名称',
    value: 'missionName'
  },
  {
    label: '测试人',
    value: 'tested_by'
  }
]

const selectedCase = ref(0)
const tableData = ref<TableItem[]>([])
let copy: TableItem[] = []

const allColumn = allColumns()
const tableColumn = ref(allColumn)
const checkAllColumn = ref(true)

let selectedContrastList: TableItem[] = []

const isIndeterminate = ref(true)
const checkAllItems = ref(false)

const currentPage = ref(1)
const pageSize = ref(1)
const pageSizes = ref([] as number[])
const total = ref(1)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

onMounted(() => {
  total.value = Math.ceil(props.dataList.length / 5)
  for (let i = 0; total.value > i * 10; i++) {
    pageSizes.value.push((i + 1) * 10)
  }
  console.log(pageSizes.value)
  handleTableData(1)
})

const handleTableData = (page: number) => {
  let start = (page - 1) * 5
  let end =
    props.dataList.length <= start + 5 ? props.dataList.length : start + 5
  const temp = []
  for (let i = start; i < end; i++) {
    temp.push(flattenObj(props.dataList[i]))
  }
  tableData.value = temp
  copy = JSON.parse(JSON.stringify(tableData.value))
}

const flattenObj = (ob: any) => {
  let result = <TableItem>{}
  for (const i in ob) {
    if (typeof ob[i] === 'object' && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i])
      for (const j in temp) {
        result[`${i}_${j}`] = temp[j]
      }
    } else {
      result[i] = ob[i]
    }
  }
  return result
}

const handlecheckAllColumn = (val: boolean) => {
  tableColumn.value = val ? allColumn : []
  isIndeterminate.value = false
}

const handleCheckedTableCloumn = (value: object[]) => {
  const checkedCount = value.length
  checkAllColumn.value = checkedCount === allColumn.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allColumn.length
}

const handleCheckedAllItems = (val: boolean) => {
  tableData.value.forEach((element: any) => {
    element.check = val
  })
  if (val) {
    copy.forEach((element: any) => {
      selectedContrastList.push(element)
    })
  } else {
    selectedContrastList = []
  }
}

const handleCheckedItem = (value: any) => {
  const index = selectedContrastList.findIndex(
    item => item.index === value.row.index
  )
  if (index === -1) {
    selectedContrastList.push(toRaw(value.row))
  } else {
    selectedContrastList.splice(index, 1)
  }
  checkAllItems.value = selectedContrastList.length === copy.length
}

const handleSearch = (key: any) => {
  console.log(copy)
  if (selectedOption.value === '') {
    ElMessage('请选择搜索条件！')
  } else if (input.value === '') {
    ElMessage('请输入搜索内容！')
  } else {
    tableData.value = copy.filter(item => item[key] === input.value)
  }
  console.log(tableData.value)
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  handleTableData(val)
}

const handleReFresh = () => {
  reFreshLodaing.value = !reFreshLodaing.value
}

watchEffect(() => {
  if (input.value === '') {
    tableData.value = copy
  }
})
</script>

<style scoped lang="scss">
.handle-pannel {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .button {
    min-width: 90px;
  }
  .more-button {
    margin-left: 12px;
    min-width: 70px;
  }
  .more-icon-button {
    margin-left: 3px;
    max-width: 30px;
  }
  .input-with-select {
    min-width: 200px;
    width: 35%;
    max-height: 32px;
  }
  .select {
    width: 100px;
  }
}
.tips {
  display: flex;
  align-items: center;
  background-color: rgb(230, 247, 255);
  border: 1px solid rgb(195, 232, 255);
  padding: 8px 10px;
  border-radius: 3px;
  margin: 8px 0;

  span {
    margin-left: 12px;
    font-size: 14px;
    text-align: center;
  }
}
.pagination {
  margin-top: 30px;
}
</style>
