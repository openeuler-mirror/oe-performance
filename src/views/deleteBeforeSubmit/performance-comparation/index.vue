<template>
  <div class="comparation-basic-performance">
    <el-card shadow="hover" header="基础性能" style="margin-bottom: 20px">
      <div v-loading="componentVisible">
        <div style="margin-bottom: 10px;">请选择OS基准:</div>
        <div style="position: relative;">
          <el-radio-group v-model="selectedOSBase" class="radio-group">
            <el-radio
              :label="`${item['os_release']}${item['version_feature']}`"
              v-for="item in tableData"
              :key="`${item['os_release']}${item['version_feature']}`"
            >
              {{ `${item['os_release']} [${item['version_feature']}]` }}
            </el-radio>
          </el-radio-group>
          <span class="base-bottom-decoration" v-if="baseDecorationVisible">已设为基准</span>
        </div>
        <div style="display:flex;justify-content:end">
          <el-button type="primary" @click="handleCompare">对比</el-button>
        </div>
      </div>
    </el-card>
    <el-card shadow="hover" style="margin-bottom: 20px; padding: 10px;">
      <div class="header-info">
        <div class="decorate-bar"></div>
        <span class="bar-title">技术规格</span>
      </div>
      <el-table :data="tableData" border style="width: 100%" v-loading="componentVisible">
        <el-table-column prop="model" label="CPU型号" align="center"/>
        <el-table-column prop="os_release" label="操作系统" align="center"/>
        <el-table-column prop="os_kernel" label="内核版本" align="center"/>
        <el-table-column prop="selinux" label="selinux" align="center"/>
        <el-table-column prop="os_pagesize" label="页表大小" align="center"/>
        <el-table-column prop="compiler_version" label="GCC编译器版本" align="center"/>
        <el-table-column prop="glibc_version" label="glibc版本" align="center"/>
        <el-table-column prop="file_system" label="文件系统" align="center"/>
      </el-table>
      <div class="header-info">
        <div class="decorate-bar"></div>
        <span class="bar-title">总比</span>
      </div>
      <el-table :data="tableData2" border style="width: 100%" v-loading="componentVisible">
        <el-table-column prop="core" label="" width="120" align="center"/>
        <el-table-column prop="item1" label="22.03(LTS-Next)"/>
        <el-table-column prop="item2" label="AnolisOS-8.4"/>
        <el-table-column prop="vs" label="22.03(LTS-Next) vs AnolisOS-8.4"/>
      </el-table>  
    </el-card>
    <el-card shadow="hover" header="图表展示" style="margin-bottom: 20px">
      <compare-chart/>
    </el-card>
    <div class="modal">
      <el-dialog :model-value="modalVisible" width="35%" >
        <template #header>
          请选择OS基准
        </template>
        <el-radio-group v-model="selectedOSBase">
          <div><el-radio label="1" size="large">22.03(LTS-Next)</el-radio></div>
          <div><el-radio label="2" size="large">22.03(LTS-Next)</el-radio></div>
        </el-radio-group>      
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="modalVisible = false">取消</el-button>
            <el-button type="primary" @click="modalVisible = false">确定</el-button>
          </span>
        </template>    
      </el-dialog>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import CompareChart from './components/compare-chart.vue'
import { usePerformanceData } from '@/stores/performanceData'
import { getDetail } from '@/api/detail'

const performanceStore= usePerformanceData()

let componentVisible = ref(false)
let modalVisible = ref(false)
let baseDecorationVisible = ref(false)
let selectedOSBase = ref('')
let tableData:any[] = reactive([])
let tableData2 = reactive([
  {
    core: '多核',
    item1: 13020.83,
    item2: 13491.08,
    vs: '-3.49%'
  },
  {
    core: '单核',
    item1: 1942.41,
    item2: 1884.2,
    vs: '3.09%'
  }
])

onMounted(() => {
  // 获取store中的输入数据，并赋值给一个新变量
  // 如果这里拿不到store中的数据, 应跳转回表格页
  console.log(performanceStore.comparationList)
 
  componentVisible.value = true
  // todo:后续接入真实数据
  getDetail(3)
    .then(res => {
      res.data.results.forEach((item:any) => {
        const obj = Object.assign(item['os'], item['case_result'], item['product'])
        tableData.push(obj)
      })
      componentVisible.value = false
    })
})

const handleCompare = () => {
  const index = tableData.findIndex(item => {
    return `${item['os_release']}${item['version_feature']}` === selectedOSBase.value
  })
  if (index !== -1) {
    tableData.splice(0,0,tableData[index])
    tableData.splice(index + 1,1)
    baseDecorationVisible.value = true
  } else if (index === -1) {
    ElMessage({
      message: '请先选择要设置的基准',
      type: 'warning'
    })
  }
}
</script>
  
<style lang="scss" scoped>
.header-info {
  display: flex;
  margin-bottom: 15px;
  .decorate-bar {
    width: 3px;
    background-color: #58aeff;
    margin-right: 3px;
  }
  .bar-title {
    line-height: 24px;
    font-size: 17px;
    font-weight: 500;
  }
}
.el-table {
  margin-bottom: 20px;
  :deep(th.el-table__cell) {
    color: #616161;
    font-weight: 700;
    background-color: #fafafa;
  }
}
.modal {
  .el-radio-group {
    display: block;
  }
  :deep(.el-dialog__body) {
    padding-left: 30px;
    padding-right: 30px;
  }
}
.radio-group {
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  label {
    margin-bottom: 10px;
  }
  :deep(.el-radio__input.is-checked .el-radio__inner) {
    border-color:#002fa1;
    background:#002fa1;
  }
  :deep(.el-radio__input.is-checked+.el-radio__label) {
    color:#606266;
  }
}
.base-bottom-decoration {
  position:absolute;
  top:28px;
  left: 20px;
  font-size: 13px;
  color: #002fa8;
}
</style>
