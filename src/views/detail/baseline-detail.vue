<template>
  <div>
    <div
      v-show="loading"
      class="loading-box"
      v-loading="loading"
      element-loading-text="加载中..."></div>
    <el-card class="baseline-detail" v-show="!loading">
      <div class="main-title">
        <span>unixbench信息总览 >> UUID: test324802348</span>
      </div>
      <div class="main-info" v-if="state.detailInfo.product !== undefined">
        <!-- 结果信息 -->
        <section class="result-info main-item">
          <div class="sub-title">结果信息</div>
          <el-table
            :show-header="false"
            :data="resultTable"
            border
            :cell-style="columnStyle"
            >
            <el-table-column width="250" prop="name"></el-table-column>
            <el-table-column prop="value"></el-table-column>
          </el-table>
        </section>

        <!-- 硬件配置 -->
        <section class="hardware-configuration main-item">
          <div class="sub-title">硬件配置</div>
          <el-table
            :show-header="false"
            :data="hardwareTable"
            border
            :cell-style="columnStyle"
            :row-style="rowStyle"
            :span-method="spanMethod"
            >

            <el-table-column width="250" prop="name">
              <template #default="props">
                <div :class="{ detailInfo: props.row.isDetail }">
                <span >{{
                  props.row.leftName
                }}</span>
                <span
                  class="tool-tip"
                  v-if="props.row.leftIconInfo !== undefined">
                  <el-tooltip
                    effect="dark"
                    :content="props.row.leftIconInfo"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
                <span
                  class="arrowIcon"
                  @click="handlerCollapse(props.row.collapse)"
                  v-if="props.row.collapse === 1">
                  <el-icon v-show="cpuCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!cpuCollpase"><ArrowDownBold /></el-icon>
                </span>
                <span
                  class="arrowIcon"
                  @click="handlerCollapse(props.row.collapse)"
                  v-if="props.row.collapse === 2">
                  <el-icon v-show="memoryCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!memoryCollpase"><ArrowDownBold /></el-icon>
                </span>
                <span
                  class="arrowIcon"
                  @click="handlerCollapse(props.row.collapse)"
                  v-if="props.row.collapse === 3">
                  <el-icon v-show="diskCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!diskCollpase"><ArrowDownBold /></el-icon>
                </span>
                <span
                  class="arrowIcon"
                  @click="handlerCollapse(props.row.collapse)"
                  v-if="props.row.collapse === 4">
                  <el-icon v-show="nicCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!nicCollpase"><ArrowDownBold /></el-icon>
                </span>
                <span
                  class="arrowIcon"
                  @click="handlerCollapse(props.row.collapse)"
                  v-if="props.row.collapse === 5">
                  <el-icon v-show="psuCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!psuCollpase"><ArrowDownBold /></el-icon>
                </span>
                <span
                  class="arrowIcon"
                  @click="handlerCollapse(props.row.collapse)"
                  v-if="props.row.collapse === 6">
                  <el-icon v-show="boardCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!boardCollpase"><ArrowDownBold /></el-icon>
                </span>
                <span
                  class="arrowIcon"
                  @click="handlerCollapse(props.row.collapse)"
                  v-if="props.row.collapse === 7">
                  <el-icon v-show="biosCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!biosCollpase"><ArrowDownBold /></el-icon>
                </span>
                <span
                  class="arrowIcon"
                  @click="handlerCollapse(props.row.collapse)"
                  v-if="props.row.collapse === 8">
                  <el-icon v-show="osCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!osCollpase"><ArrowDownBold /></el-icon>
                </span>
              </div>
              </template>
            </el-table-column>
            <el-table-column prop="leftValue">
            </el-table-column>
            <!-- 展开的table -->
            <el-table-column prop="rightName">
              <template #default="props">
                <div :class="{ detailInfo: props.row.isDetail }">
                <span>
                  {{ props.row.rightName }}
                </span>
                </div>
              </template>
            </el-table-column>
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
            :row-style="rowStyle"
            :span-method="spanMethod"
            style="width: 100%">
            <el-table-column width="250" prop="name">
              <template #default="props">
                <span :class="{ detailInfo: props.row.isDetail }">{{ props.row.leftName }}</span>
                <span class="tool-tip" v-if="props.row.leftIconInfo !== undefined">
                  <el-tooltip
                    effect="dark"
                    :content="props.row.leftIconInfo"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
                <span
                  class="arrowIcon"
                  @click="handlerCollapse(props.row.collapse)"
                  v-if="props.row.collapse !== undefined">
                  <el-icon v-show="osCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!osCollpase"><ArrowDownBold /></el-icon>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="leftValue"></el-table-column>
            <el-table-column prop="rightName">
              <template #default="props">
                <span class="detailTitle">{{ props.row.rightName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="rightValue"></el-table-column>
          </el-table>
        </section>

        <!-- 用例信息 -->
        <section class="use-case-info main-item">
          <div class="sub-title">用例信息</div>
          <el-table
            :show-header="false"
            :data="useCaseTable"
            border
            :cell-style="columnStyle"
            style="width: 100%">
            <el-table-column width="250" prop="leftName">
              <template #default="props">
                <span>{{ props.row.leftName }}</span>
                <span
                  class="tool-tip"
                  v-if="props.row.leftIconInfo !== undefined">
                  <el-tooltip
                    effect="dark"
                    :content="props.row.leftIconInfo"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="leftValue">
              <template #default="props">
                <div v-if="props.row.leftAttribute === ''">
                  <router-link
                    class="work-load-detail"
                    to="/normalBaseline/workLoadDetail"
                    ><span>查看详情</span></router-link
                  >
                </div>
                <div v-else>
                  <span>{{ props.row.leftValue }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="250" prop="rightName">
              <template #default="props">
                <span>{{ props.row.rightName }}</span>
                <span
                  class="tool-tip"
                  v-if="props.row.rightIconInfo !== undefined">
                  <el-tooltip
                    effect="dark"
                    :content="props.row.rightIconInfo"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="rightValue"></el-table-column>
          </el-table>
        </section>
        <!-- 底部信息 -->
        <section class="bottom-info main-item">
          <el-table
            :show-header="false"
            :data="bottomTable"
            border
            :cell-style="columnStyle"
            style="width: 100%">
            <el-table-column width="250" prop="leftName"></el-table-column>
            <el-table-column prop="leftValue"> </el-table-column>
            <el-table-column width="250" prop="rightName"></el-table-column>
            <el-table-column prop="rightValue"></el-table-column>
          </el-table>
        </section></div
    ></el-card>
  </div>
</template>

<script setup lang="ts">
import { getDetail } from '@/api/detail'
import { onMounted, reactive, ref } from 'vue'
import { BaselineDetail, tableInfo } from './interface'
let state = reactive({
  detailInfo: {} as BaselineDetail
})
const columnStyle = ({ columnIndex = 0 }) => {
  if (columnIndex === 0 || columnIndex === 2) {
    return { 'font-weight': 'bold', padding: 'var(--oe-perf-padding)' }
  } else {
    return ''
  }
}
const rowStyle = ({ row: { isDetail=false } }) => {
  if (isDetail) {
    return { 'background-color': 'var(--oe-perf-bg-layout)'}
  } else {
    return ''
  }
}

const spanMethod = ({ row: { rightAttribute = undefined }, columnIndex = 0 }) => {
  if(rightAttribute === undefined && columnIndex === 1){
    return{
      rowspan: 1,
      colspan: 3 
    }
  }

}
let loading = ref(false)

let cpuCollpase = ref(true)
let memoryCollpase = ref(true)
let diskCollpase = ref(true)
let nicCollpase = ref(true)
let psuCollpase = ref(true)
let boardCollpase = ref(true)
let biosCollpase = ref(true)
let osCollpase = ref(true)

// CPU详情数据
let cpuDetailData = [
  {
    id: 4,
    leftAttribute: 'threads',
    leftName: 'threads',
    leftValue: '80',
    rightAttribute: 'series',
    rightName: 'series',
    rightValue: 'NULL',
    isDetail: true
  },
  {
    id: 5,
    leftAttribute: 'cpu_refresh_rate',
    leftName: 'CPU刷新频率（MHz）',
    leftValue: '2500',
    rightAttribute: 'cpus',
    rightName: 'cpus',
    rightValue: '80',
    isDetail: true
  }
]
// 内存详情数据
let memoryDetailData = [
  {
    id: 7,
    leftAttribute: 'memory_size',
    leftName: '内存规格',
    leftValue: '32G',
    rightAttribute: 'memory_model',
    rightName: '内存型号',
    rightValue: 'AMD2134',
    isDetail: true
  }
]
// 硬盘详情数据
let diskDetailData = [
  {
    id: 9,
    leftAttribute: 'raid',
    leftName: 'RAID卡',
    leftValue: 'RS0820P',
    isDetail: true
  },
  {
    id: 10,
    leftAttribute: 'disk_size',
    leftName: '硬盘规格',
    leftValue: '14T',
    rightAttribute: 'disk_model',
    rightName: '硬盘型号',
    rightValue: 'WJ3425235',
    isDetail: true
  }
]

// BIOS详情数据
let biosDetailData = [
  {
    id: 16,
    leftAttribute: 'hardware_prefetcher',
    leftName: 'Hardware Prefetcher',
    leftValue: 'Enable',
    rightAttribute: 'adjacent_cache_prefetch',
    rightName: 'Adjacent Cache Prefetch',
    rightValue: 'Enable',
    isDetail: true
  },
  {
    id: 17,
    leftAttribute: 'power',
    leftName: 'Power',
    leftValue: 'Custom',
    rightAttribute: 'custom_refresh',
    rightName: 'Custom Refresh',
    rightValue: 'Disabled',
    isDetail: true
  },
  {
    id: 18,
    leftAttribute: 'bios_version',
    leftName: 'BIOS版本',
    leftValue: 'lnsydcH2003.72.27(V1.21)',
    rightAttribute: 'numa',
    rightName: 'NUMA',
    rightValue: 'Enable',
    isDetail: true
  }
]

// os详情数据
let osDetailData = [
  {
    id: 16,
    leftAttribute: 'hardware_prefetcher',
    leftName: 'Hardware Prefetcher',
    leftValue: 'Enable',
    rightAttribute: 'adjacent_cache_prefetch',
    rightName: 'Adjacent Cache Prefetch',
    rightValue: 'Enable',
    isDetail: true
  },
  {
    id: 17,
    leftAttribute: 'power',
    leftName: 'Power',
    leftValue: 'Custom',
    rightAttribute: 'custom_refresh',
    rightName: 'Custom Refresh',
    rightValue: 'Disabled',
    isDetail: true
  },
  {
    id: 18,
    leftAttribute: 'bios_version',
    leftName: 'BIOS版本',
    leftValue: 'lnsydcH2003.72.27(V1.21)',
    rightAttribute: 'numa',
    rightName: 'NUMA',
    rightValue: 'Enable',
    isDetail: true
  }
]

// 结果信息表格数据
let resultTable = ref([
  {
    attribute: 'guid',
    value: '',
    name: 'guid'
  },
  {
    attribute: 'created_by',
    value: '',
    name: '审核人'
  },
  {
    attribute: 'tested_by',
    value: '',
    name: '测试人'
  },
  {
    attribute: 'task_belongs_type',
    value: '',
    name: 'task_belongs_type'
  },
  {
    attribute: 'task_belongs_id',
    value: '',
    name: 'task_belongs_id'
  }
])

// 硬件配置表格数据
let hardwareTable = ref([
  {
    id: 1,
    leftAttribute: 'product_id',
    leftValue: '',
    leftName: '硬件ID'
  },
  {
    id: 2,
    leftAttribute: 'model',
    leftValue: '',
    leftName: '服务器型号',
    leftIconInfo: '服务器型号'
  },
  {
    id: 3,
    leftAttribute: 'cpu_brief',
    leftValue: '',
    leftName: '处理器（CPU配置）',
    leftIconInfo: 'CPU配置',
    collapse: 1
  },
  {
    id: 6,
    leftAttribute: 'memory_brief',
    leftValue: '',
    leftName: '内存配置',
    leftIconInfo: '内存配置',
    collapse: 2
  },
  {
    id: 8,
    leftAttribute: 'disk_brief',
    leftValue: '',
    leftName: '硬盘配置',
    leftIconInfo: '硬盘配置',
    collapse: 3
  },
  {
    id: 11,
    leftAttribute: 'nic_brief',
    leftValue: '',
    leftName: '网卡',
    collapse: 4
  },
  {
    id: 12,
    leftAttribute: 'psu_brief',
    leftValue: '',
    leftName: '电源',
    collapse: 5
  },
  {
    id: 13,
    leftAttribute: 'board_brief',
    leftValue: '',
    leftName: '单板',
    collapse: 6
  },
  {
    id: 14,
    leftAttribute: 'bmc_version',
    leftValue: '',
    leftName: 'BMC版本'
  },
  {
    id: 15,
    leftAttribute: '',
    leftValue: '',
    leftName: 'BIOS配置',
    leftIconInfo: 'BIOS配置',
    collapse: 7
  }
])

// 软件配置表格数据
let softwareTable = ref([
  {
    id:1,
    leftAttribute: 'os_release',
    leftValue: '',
    leftName: '操作系统版本',
    leftIconInfo: '操作系统',
    collapse: 8
  }
])

// 用例信息表格数据
let useCaseTable = ref([
  {
    leftAttribute: 'case_result_id',
    leftName: 'case result id',
    leftValue: '',
    rightAttribute: 'selinux',
    rightName: 'selinux',
    rightValue: ''
  },
  {
    leftAttribute: 'result_publish_type',
    leftName: 'result publish type',
    leftValue: '',
    rightAttribute: 'batch_uid',
    rightName: 'batch_uid',
    rightValue: ''
  },
  {
    leftAttribute: 'source',
    leftName: '数据来源',
    leftIconInfo: '数据来源',
    leftValue: '',
    rightAttribute: 'os_pagesize',
    rightName: '操作系统页表大小',
    rightValue: ''
  },
  {
    leftAttribute: 'tool_version',
    leftName: '测试工具-版本',
    leftValue: '',
    rightAttribute: 'cmc_version',
    rightName: 'CMC版本号',
    rightValue: ''
  },
  {
    leftAttribute: 'config_files',
    leftName: '配置文件',
    leftValue: '',
    rightAttribute: 'testcase_name',
    rightName: '测试用例名称',
    rightValue: '',
    rightIconInfo: '测试用例名称'
  },
  {
    leftAttribute: '',
    leftName: 'Workload性能值',
    leftValue: '',
    rightAttribute: 'performance_data',
    rightName: '性能数据',
    rightValue: '',
    rightIconInfo: '性能数据'
  },
  {
    leftAttribute: 'unit',
    leftName: '单位(描述)',
    leftValue: '',
    rightAttribute: 'metrics',
    rightName: '指标',
    rightValue: ''
  },
  {
    leftAttribute: 'flow',
    leftName: 'flow',
    leftValue: ''
  }
])

// 底部信息表格数据
let bottomTable = ref([
  {
    leftAttribute: 'publish_type',
    leftName: 'publish type',
    leftValue: '',
    rightAttribute: 'public_state',
    rightName: '数据状态',
    rightValue: ''
  },
  {
    leftAttribute: 'create_date',
    leftName: 'create date',
    leftValue: '',
    rightAttribute: 'secret_level',
    rightName: 'secret level',
    rightValue: ''
  },
  {
    leftAttribute: 'system_info',
    leftName: 'system info',
    leftValue: '',
    rightAttribute: 'micro_file',
    rightName: 'micro file',
    rightValue: ''
  },
  {
    leftAttribute: 'macro_file',
    leftName: 'macro file',
    leftValue: '',
    rightAttribute: 'power_file',
    rightName: 'power file',
    rightValue: ''
  },
  {
    leftAttribute: 'container_file',
    leftName: 'container file',
    leftValue: ''
  }
])

// 折叠信息
const collapseInfo = (id:number, step: number, tableData: Array<tableInfo>, 
  detailData: Array<tableInfo>,collapseType: Boolean) => {
  let idx = -1
  tableData.forEach((item, index) => {
    if (item.id === id) idx = index
  })
  if (collapseType) {
    const newData = [...detailData]
    newData.forEach(item => {
      tableData.splice(idx + 1, 0, item)
    })
  } else {
    tableData.splice(idx + 1, step)
  }
  collapseType = !collapseType

}

const handlerCollapse = (flag: number) => {
  switch (flag) {
  case 1:
    collapseInfo(3, 2, hardwareTable.value, cpuDetailData, cpuCollpase.value)
    cpuCollpase.value = ! cpuCollpase.value
    break
  case 2:
    collapseInfo(6, 1, hardwareTable.value, memoryDetailData, memoryCollpase.value)
    memoryCollpase.value = ! memoryCollpase.value
    break
  case 3:
    collapseInfo(8, 2, hardwareTable.value, diskDetailData, diskCollpase.value)
    diskCollpase.value = !diskCollpase.value
    break
  case 4:
    nicCollpase.value = !nicCollpase.value
    break
  case 5:
    psuCollpase.value = !psuCollpase.value
    break
  case 6:
    boardCollpase.value = !boardCollpase.value
    break
  case 7:
    collapseInfo(15, 3, hardwareTable.value, biosDetailData, biosCollpase.value)
    biosCollpase.value = !biosCollpase.value
    break
  case 8:
    collapseInfo(1, 4, softwareTable.value, osDetailData, osCollpase.value)
    osCollpase.value = !osCollpase.value
    break
  }
}
onMounted(async () => {
  loading.value = true
  let res = await getDetail(10)
  const { code, results } = res.data
  if (code === 200) {
    state.detailInfo = results[0]
    const { detailInfo } = state
    // 初始化结果信息表格
    resultTable.value.forEach(item => {
      const { attribute } = item
      item.value = detailInfo[attribute as keyof typeof detailInfo] as string
    })
    // 初始化硬件信息表格
    hardwareTable.value.forEach(item => {
      const attribute = item.leftAttribute
      const { product } = detailInfo
      item.leftValue = product[attribute as keyof typeof product] as string
    })
    // 初始化软件信息表格
    softwareTable.value.forEach(item => {
      const attribute = item.leftAttribute
      const { os } = detailInfo
      item.leftValue = os[attribute as keyof typeof os] as string
    })
    // 初始化底部信息表格
    bottomTable.value.forEach(item => {
      const { leftAttribute } = item
      const { rightAttribute } = item
      item.leftValue = detailInfo[
        leftAttribute as keyof typeof detailInfo
      ] as string
      item.rightValue = detailInfo[
        rightAttribute as keyof typeof detailInfo
      ] as string
    })
    // 初始化用例信息表格
    useCaseTable.value.forEach(item => {
      const { leftAttribute } = item
      const { rightAttribute } = item
      const { case_result } = detailInfo
      item.leftValue = case_result[
        leftAttribute as keyof typeof case_result
      ] as string
      item.rightValue = case_result[
        rightAttribute as keyof typeof case_result
      ] as string
    })
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.loading-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
}
.baseline-detail {
  /* 顶部标题 */
  .main-title {
    font-size: var(--oe-perf-font-size-header);
    padding-bottom: var(--oe-perf-padding);
  }
  /* 主体信息 */
  .main-info {
    /* 主体item */
    .main-item {
      padding-top: var(--oe-perf-padding);
      padding-bottom: var(--oe-perf-padding);
      overflow: hidden;
      .sub-title {
        padding: var(--oe-perf-padding);
        background-color: var(--oe-perf-bg-layout);
      }
      .detailInfo {
        margin-left: 20px;
      }
      .arrowIcon {
        float: right;
      }

      .item-title {
        font-weight: bold;
      }
      .icon {
        margin-left: 5px;
      }
      .item-detail {
        background-color: var(--oe-perf-bg-layout);
        padding-left: 40px;
        .item-title {
          font-weight: normal;
        }
      }
      .bottom-item {
        border-left: none;
        padding: var(--oe-perf-padding);
        .item-title {
          font-weight: bold;
        }
      }
    }
    .use-case-info {
      .work-load-detail {
        text-decoration: none;
        color: var(--oe-perf-color-secondary);
      }
    }
  }
}
</style>