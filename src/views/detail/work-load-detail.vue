<template>
  <div>
    <el-card class="baseline-detail">
      <div class="main-title">
        <span>unixbench信息总览 >> UUID: test324802348</span>
        <span class="work-load-title">Workload性能值详情</span>
      </div>
      <div class="main-info">
        <el-card shadow="never" :body-style="cardStyle" class="use-case-info main-item">
          <div class="top-title">
            <div class="case-info">
              用例信息 <span class="title-value">多核</span>
            </div>
            <div class="performance-value">
              性能值 <span class="title-value">13491.08</span>
            </div>
          </div>
          <section>
            <div class="sub-title">用例信息</div>
            <el-table
              :show-header="false"
              :data="useCaseTable"
              border
              :cell-style="columnStyle"
              style="width: 100%">
              <el-table-column width="250" prop="leftName"></el-table-column>
              <el-table-column prop="leftValue"> </el-table-column>
              <el-table-column width="250" prop="rightName"></el-table-column>
              <el-table-column prop="rightValue"></el-table-column>
            </el-table>
          </section>
        </el-card>

          <!-- 硬件配置 -->
          <section class="hardware-configuration main-item">
            <div class="sub-title">硬件配置</div>
            <el-table
              :show-header="false"
              :data="hardwareTable"
              border
              :cell-style="columnStyle"
              style="width: 100%">
              <el-table-column width="250" prop="leftName"></el-table-column>
              <el-table-column prop="leftValue"> </el-table-column>
              <el-table-column width="250" prop="rightName"></el-table-column>
              <el-table-column prop="rightValue"></el-table-column>
            </el-table>
          </section>
          <!-- 软件配置 -->
          <section class="software-configuration main-item">
            <div class="sub-title">软件配置</div>
            <el-table
              :show-header="false"
              :data="softwareTable"
              border
              :cell-style="columnStyle"
              style="width: 100%">
              <el-table-column
                width="250"
                prop="leftName"
                class="item-title"></el-table-column>
              <el-table-column prop="leftValue"> </el-table-column>
              <el-table-column width="250" prop="rightName"></el-table-column>
              <el-table-column prop="rightValue"></el-table-column>
            </el-table>
          </section>
      </div>
    </el-card>
  </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const columnStyle = ({ columnIndex = 0 }) => {
  console.log(columnIndex)

  if (columnIndex === 0 || columnIndex === 2) {
    return { 'font-weight': 'bold', 'padding': 'var(--oe-perf-padding)' }
  } else {
    return ''
  }
}

// 用例信息表格数据
let useCaseTable = ref([
  {
    leftAttribute: 'selinux',
    leftName: 'selinux',
    leftValue: 'disabled',
    rightAttribute: 'result_publish_type',
    rightName: 'result_publish_type',
    rightValue: 'performance_baseline_data'
  },
  {
    leftAttribute: 'source',
    leftName: 'source',
    leftValue: 'openEuler',
    rightAttribute: 'batch_uid',
    rightName: 'batch_uid',
    rightValue: '2022-09-2209:13:12.045408_027'
  },
  {
    leftAttribute: 'os_pagesize',
    leftName: '操作系统页表大小',
    leftValue: '4K',
    rightAttribute: 'cmc_version',
    rightName: 'CMC版本号',
    rightValue: 'NULL'
  },
  {
    leftAttribute: 'tool_version',
    leftName: '测试工具-版本',
    leftValue: '5.13',
    rightAttribute: 'config_files',
    rightName: '配置文件及测试报告',
    rightValue: 'NULL'
  },
  {
    leftAttribute: 'test_model',
    leftName: '测试模型',
    leftValue: 'NULL',
    rightAttribute: 'concurrency',
    rightName: '并发量',
    rightValue: '多核'
  },
  {
    leftAttribute: 'unit',
    leftName: '单位(描述)',
    leftValue: 'NULL',
    rightAttribute: 'metrics',
    rightName: '指标',
    rightValue: 'NULL'
  },
  {
    leftAttribute: 'flow',
    leftName: 'flow',
    leftValue: 'AF20220922536756',
    rightAttribute: 'test_by',
    rightName: '测试人',
    rightValue: 'zWX5324242'
  }
])

// 硬件信息表格数据
let hardwareTable = ref([
  {
    leftAttribute: 'server_model',
    leftName: '服务器型号',
    leftValue: 'Intel-2288H V5',
    rightAttribute: 'bmc_version',
    rightName: 'BMC版本',
    rightValue: '5.06(U4262)'
  }
])

// 软件信息表格数据
let softwareTable = ref([
  {
    leftAttribute: 'os_release',
    leftName: '操作系统',
    leftValue: 'Anolisos-8.4',
    rightAttribute: 'os_kernel',
    rightName: '系统内核',
    rightValue: 'kernel-4.19.91-23.4.an8'
  }
])

const cardStyle = { padding: '0' }

onMounted(() => {})
</script>
  
<style lang="scss" scoped>
.baseline-detail {
  /* 顶部标题 */
  .main-title {
    font-size: var(--oe-perf-font-size-header);
    padding-bottom: var(--oe-perf-padding);
    display: flex;
    flex-direction: column;
    .work-load-title {
      margin-top: 20px;
      padding-left: 2px;
      font-weight: bold;
      border-left: 2px solid var(--oe-perf-color-secondary);
    }
  }
  /* 主体信息 */
  .main-info {
    /* 主体item */
    .top-title {
      padding: var(--oe-perf-padding);
      display: flex;
      .title-value {
        color: #ff70b8;
      }
      .case-info {
        margin-right: 40px;
      }
    }
    .main-item {
      margin-bottom: 50px;
      .sub-title {
        padding: var(--oe-perf-padding);
        background-color: var(--oe-perf-bg-layout);
        font-weight: bold;
        font-size: var(--oe-perf-font-size-display);
      }
      .item-title {
        font-weight: bold;
      }
    }
  }
}
</style>