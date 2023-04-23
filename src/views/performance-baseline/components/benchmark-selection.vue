<template>
  <div class="benchmark-selection-dialog">
    <el-dialog
      :model-value="props.visible"
      class="export-dialog"
      width="70%"
      @close="handleDialogClose">
      <template #header>
        <div class="export-dialog-header">
          <h3>选择基准</h3>
          <p>请选择一条作为基准,其他记录将与之进行比较</p>
        </div>
      </template>
      <el-table
        :data="props.tableDatas"
        stripe
        highlight-current-row
        @current-change="currentRow => handleCurrentChange(currentRow)"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(243,243,243)' }">
        <el-table-column fixed width="50">
          <template #default="scope">
            <el-radio
              v-model="theSelected"
              :label="scope.row.submit_id"
            />
          </template>
        </el-table-column>
        <el-table-column fixed prop="submit_id" label="提交编号" width="200" show-overflow-tooltip/>
        <el-table-column
          min-width="100"
          label="总性能值"
          prop="performanceVal"
        >
          <template #default="scope">
            <div class="important-value">{{ perfValformatter(scope.row.performanceVal) }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :prop="item['prop']"
          :label="item['label']"
          :key="item['prop']"
          min-width="160"
          :formatter="tableCellFormatter"
          v-for="(item) in props.tableColumns"/>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleExportMultiple" :loading="exportButtonLoading">导出</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { Column } from '../config-file'
import { exportMultiple } from '@/views/performance-baseline/export-data'
import { tableColumnMap } from '@/views/performance-baseline/config_li.js'
import { invalidNumberSymbol } from '@/views/performance-baseline/utils.js'

interface Props {
  visible?: boolean,
  tableDatas?: any[],
  tableColumns?: any[],
  allColumn?: Column[],
  selectedTableRows: any[]
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  tableDatas:() => <any[]>[],
  tableColumns: () => <any[]>[],
  allColumn: () => <Column[]>[],
  selectedTableRows: () => <any[]>[]
})
const emit = defineEmits(['closeDialog'])

const exportButtonLoading = ref(false)
const currentRow = ref()
const theSelected = ref<string>()

const handleDialogClose = () => {
  exportButtonLoading.value = false
  theSelected.value = ''
  currentRow.value = undefined
  emit('closeDialog')
}
const handleExportMultiple = () => {
  if (currentRow.value) {
    exportButtonLoading.value = true
    exportMultiple(props.allColumn,props.selectedTableRows,tableColumnMap,currentRow.value)
    handleDialogClose()
    ElMessage({
      message: '导出成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: '请先选择一条记录作为基准',
      type: 'warning'
    })
  }
}
// 联动控制基准选择和radio
const handleCurrentChange = (val:any) => {
  if(val){
    currentRow.value = val
    theSelected.value = val['submit_id']
  }
}
const tableCellFormatter = (row, column, cellValue) => {
  if (cellValue === undefined || cellValue === invalidNumberSymbol) {
    return '暂无数据'
  }
  return cellValue
}
const perfValformatter = (cellValue: number) => {
  if (cellValue === undefined || cellValue === invalidNumberSymbol) {
    return '暂无数据'
  }
  return cellValue
}
</script>

<style scoped lang="scss">
.important-value {
  color: var(--oe-perf-color-primary);
}
</style>
<style lang="scss">
.export-dialog {
  .el-dialog__body {
    padding-top: 8px;
  }
  &-header {
    display: flex;
    align-items: baseline;
    line-height: 32px;
    h3 {
      font-size: 20px;
    }
    p {
      margin-left: 8px;
      font-size: 12px;
    }
  }
  .el-radio__label {
    display: none;
  }
  tbody .el-table__row {
    cursor: pointer;
  }
}
</style>