<template>
  <el-button type="primary" class="button" @click="handleExport(props.allColumn,props.selectedTableRows)">
    导出
  </el-button>
  <div class="export-modal">
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
        :data="modal.tableVals"
        stripe
        highlight-current-row
        @current-change="currentRow => handleCurrentChange(currentRow)"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(243,243,243)' }">
        <el-table-column fixed width="50">
          <template #default="scope">
            <el-radio
              v-model="modal.bindingRadio"
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
          v-for="(item) in modal.tableColumns"/>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="handleExportMultiple"
            :loading="modal.exportButtonLoading">
            导出
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Column } from '../config-file'
import { exportSingle, exportMultiple } from '@/views/performance-baseline/export-data'
import { tableColumnMap } from '@/views/performance-baseline/config_li.js'
import { invalidNumberSymbol } from '@/views/performance-baseline/utils.js'

interface Props {
  visible?: boolean,
  allColumn?: Column[],
  selectedTableRows: any[]
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  allColumn: () => <Column[]>[],
  selectedTableRows: () => <any[]>[]
})
const emit = defineEmits(['closeModal','openModal'])


const modal = reactive({
  currentTableRow:<any>undefined,
  bindingRadio:'',
  tableColumns:<any[]>[],
  tableVals:<any[]>[],
  exportButtonLoading:false
})

const handleExport = (allColumn:Column[], selectedTableRows:any[]) => {
  if (selectedTableRows.length === 0) {
    ElMessage({
      message: '请先选择要导出的数据',
      type: 'warning'
    })
  } else if (selectedTableRows.length === 1) {
    exportSingle(allColumn, selectedTableRows, tableColumnMap)
    emit('closeModal')
  } else {
    if (checkIfSameSuite(selectedTableRows)) {
      // 准备好弹窗内表格的内容
      const tableInfos:any[] = tableColumnMap[selectedTableRows[0]['suite']]
      tableInfos.forEach((tableInfo:any) => {  // 设置基准选择表格的列
        modal.tableColumns.push({
          prop: `performanceVal_${tableInfo['tableName']}`,
          label: `${tableInfo['tableName']}(性能值)`
        })
        tableInfo['column'].forEach((column:any) => {
          modal.tableColumns.push({
            prop: `${tableInfo['tableName']}(${column['label']})`,
            label: `${tableInfo['tableName']}(${column['label']})`
          })
        })
      })
      selectedTableRows.forEach((record:any) => {
        let rowData:{ [propName:string]: any } = {}
        tableInfos.forEach((tableInfo:any) => {
          // 有的数据中可能缺少某些表格的数据
          if (!record['tableDatas'][tableInfo['tableName']]){
            return
          }
          const performanceVal = record['tableDatas'][tableInfo['tableName']][0][`performanceVal_${tableInfo['tableName']}`]
          rowData[`performanceVal_${tableInfo['tableName']}`] = performanceVal
          tableInfo['column'].forEach((column:any) => {
            const val = record['tableDatas'][tableInfo['tableName']][0][column['prop']]
            rowData[`${tableInfo['tableName']}(${column['label']})`] = val
          })
        })
        modal.tableVals.push({
          submit_id: record['submit_id'],
          performanceVal: record['performanceVal'],
          ...rowData
        })
      })
      emit('openModal')
    }
  }
}
const handleExportMultiple = () => {
  if (modal.currentTableRow) {
    modal.exportButtonLoading = true
    exportMultiple(props.allColumn,props.selectedTableRows,tableColumnMap,modal.currentTableRow)
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
const checkIfSameSuite = (selectedTableRows:any[]) => {
  let suites = selectedTableRows.map<string>(record => record['suite'])
  suites = Array.from(new Set(suites))
  if (suites.length > 1) {
    ElMessage({
      message: '请选择相同测试套的数据',
      type: 'warning'
    })
    emit('closeModal')
    return false
  }
  return true
}
// 联动控制基准选择和radio
const handleCurrentChange = (val:any) => {
  if(val){
    modal.currentTableRow = val
    modal.bindingRadio = val['submit_id']
  }
}
const handleDialogClose = () => {
  modal.currentTableRow = undefined
  modal.bindingRadio = ''
  modal.tableColumns = []
  modal.tableVals = []
  modal.exportButtonLoading = false
  emit('closeModal')
}
const tableCellFormatter = (row:any, column:any, cellValue: number | undefined) => {
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
.button {
  min-width: 90px;
}
</style>
<style lang="scss">
.export-modal {
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