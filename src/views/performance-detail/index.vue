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
          <el-descriptions :column="1" border>
            <el-descriptions-item label="guid" class-name="col-value">
              <span>{{ state.detailInfo.guid }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="审核人">
              <span>{{ state.detailInfo.created_by }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="测试人">
              <span>{{ state.detailInfo.tested_by }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="task_belongs_type">
              <span>{{ state.detailInfo.task_belongs_type }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="task_belongs_id">
              <span>{{ state.detailInfo.task_belongs_id }}</span>
            </el-descriptions-item>
          </el-descriptions>
        </section>

        <!-- 硬件配置 -->
        <section class="hardware-configuration main-item">
          <div class="sub-title">硬件配置</div>
          <el-descriptions :column="2" border>
            <el-descriptions-item
              label="硬件ID"
              :span="2"
              class-name="col-value">
              <span>{{ state.detailInfo.product.product_id }}</span>
            </el-descriptions-item>

            <el-descriptions-item :span="2">
              <template #label>
                <span>服务器型号</span>
                <span>
                  <el-tooltip
                    effect="dark"
                    content="服务器型号"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
              </template>
              <span>{{ state.detailInfo.product.model }}</span>
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template #label>
               <div class="td-item" @click="handlerCollapse('cpu')">
                <span>处理器（CPU配置）</span>
                <span>
                  <el-tooltip
                    effect="dark"
                    content="CPU配置"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
                <span 
                class="arrowIcon" 
                v-if="state.detailInfo.product.cpu_detail !== null">
                  <el-icon v-show="cpuCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!cpuCollpase"><ArrowDownBold /></el-icon>
                </span>
               </div>
              </template>
              <span>{{ state.detailInfo.product.cpu_brief }}</span>
            </el-descriptions-item>
            <!-- CPU详情 -->
            <!-- #region -->
            <el-descriptions-item
              v-if="!cpuCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">CPU刷新频率（MHz）</span>
              </template>
              <span class="label">{{ 2500 }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!cpuCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">cpus</span>
              </template>
              <span class="label">{{ 80 }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!cpuCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">threads</span>
              </template>
              <span class="label">{{ 80 }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!cpuCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">series</span>
              </template>
              <span class="label">{{ 'NULL' }}</span>
            </el-descriptions-item>
            <!-- #endregion -->
            <el-descriptions-item :span="2">
              <template #label>
              <div class="td-item" @click="handlerCollapse('memory')">
                <span>内存配置</span>
                <span>
                  <el-tooltip
                    effect="dark"
                    content="内存配置"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
                
                <span 
                class="arrowIcon" 
                v-if="state.detailInfo.product.memory_detail !== null">
                  <el-icon v-show="memoryCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!memoryCollpase"><ArrowDownBold /></el-icon>
                </span>
              </div>
              </template>
              <span>{{ state.detailInfo.product.memory_brief }}</span>
            </el-descriptions-item>
            <!-- 内存配置详情 -->
            <!-- #region -->
            <el-descriptions-item
              v-if="!memoryCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">内存规格</span>
              </template>
              <span class="label">{{ '32G' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!memoryCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">内存型号</span>
              </template>
              <span class="label">{{ 'AMD2134' }}</span>
            </el-descriptions-item>
            <!-- #endregion -->

            <el-descriptions-item :span="2">
              <template #label>
               <div class="td-item" @click="handlerCollapse('disk')">
                <span>硬盘配置</span>
                <span>
                  <el-tooltip
                    effect="dark"
                    content="硬盘配置"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
                <span 
                class="arrowIcon" 
                v-if="state.detailInfo.product.disk_detail !== null">
                  <el-icon v-show="diskCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!diskCollpase"><ArrowDownBold /></el-icon>
                </span>
               </div>
              </template>
              <span>{{ state.detailInfo.product.disk_brief }}</span>
            </el-descriptions-item>
            <!-- 硬盘配置详情 -->
            <!-- #region -->
            <el-descriptions-item
              v-if="!diskCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">硬盘规格</span>
              </template>
              <span class="label">{{ '14T' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!diskCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">硬盘型号</span>
              </template>
              <span class="label">{{ 'WJ3425235' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!diskCollpase"
              :span="2"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">RAID卡</span>
              </template>
              <span class="label">{{ 'RS0820P' }}</span>
            </el-descriptions-item>
            <!-- #endregion -->

            <el-descriptions-item :span="2">
              <template #label>
                <span>{{ '网卡' }}</span>
                <span 
                class="arrowIcon" 
                @click="handlerCollapse('nic')"
                v-if="state.detailInfo.product.nic_detail !== null">
                  <el-icon v-show="nicCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!nicCollpase"><ArrowDownBold /></el-icon>
                </span>
              </template>
              <span>{{ state.detailInfo.product.nic_brief }}</span>
            </el-descriptions-item>

            <el-descriptions-item :span="2">
              <template #label>
                <span>{{ '电源' }}</span>
                <span 
                class="arrowIcon" 
                @click="handlerCollapse('psu')"
                v-if="state.detailInfo.product.psu_detail !== null">
                  <el-icon v-show="psuCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!psuCollpase"><ArrowDownBold /></el-icon>
                </span>
              </template>
              <span>{{ state.detailInfo.product.psu_brief }}</span>
            </el-descriptions-item>

            <el-descriptions-item :span="2">
              <template #label>
                <span>{{ '单板' }}</span>
                <span 
                class="arrowIcon" 
                @click="handlerCollapse('board')"
                v-if="state.detailInfo.product.board_detail !== null">
                  <el-icon v-show="boardCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!boardCollpase"><ArrowDownBold /></el-icon>
                </span>
              </template>
              <span>{{ state.detailInfo.product.board_brief }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="BMC版本" :span="2">
              <span>{{ state.detailInfo.product.bmc_version }}</span>
            </el-descriptions-item>

            <el-descriptions-item :span="2">
              <template #label>
              <div class="td-item" @click="handlerCollapse('bios')">
                <span>BIOS配置</span>
                <span>
                  <el-tooltip
                    effect="dark"
                    content="BIOS配置"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
                <span 
                class="arrowIcon" 
                v-if="state.detailInfo.product.bios_detail !== null">
                  <el-icon v-show="biosCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!biosCollpase"><ArrowDownBold /></el-icon>
                </span>
              </div>
              </template>
            </el-descriptions-item>
            <!-- BIOS配置详情 -->
            <!-- #region -->
            <el-descriptions-item
              v-if="!biosCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">BIOS版本</span>
              </template>
              <span class="label">{{ 'lnsydcH2003.72.27(V1.21)' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!biosCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">NUMA</span>
              </template>
              <span class="label">{{ 'Enable' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!biosCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">Power</span>
              </template>
              <span class="label">{{ 'Custom' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!biosCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">Custom Refresh</span>
              </template>
              <span class="label">{{ 'Disabled' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!biosCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">Hardware Prefetcher</span>
              </template>
              <span class="label">{{ 'Enable' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!biosCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">Adjacent Cache Prefetch</span>
              </template>
              <span class="label">{{ 'Enable' }}</span>
            </el-descriptions-item>
            <!-- #endregion -->
          </el-descriptions>
        </section>

        <!-- 软件配置 -->
        <section class="software-configuration main-item">
          <div class="sub-title">软件配置</div>
          <el-descriptions :column="2" border>
            <el-descriptions-item
              label="操作系统版本"
              :span="2"
              class-name="col-value">
              <template #label>
               <div class="td-item" @click="handlerCollapse('os')">
                <span>操作系统版本</span>
                <span>
                  <el-tooltip
                    effect="dark"
                    content="操作系统"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
                <span class="arrowIcon">
                  <el-icon v-show="osCollpase"><ArrowRightBold /></el-icon>
                  <el-icon v-show="!osCollpase"><ArrowDownBold /></el-icon>
                </span>
               </div>
              </template>
              <span>{{ state.detailInfo.os.os_release }}</span>
            </el-descriptions-item>
            <!-- 软件配置详情 -->
            <!-- #region -->
            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">系统内核</span>
              </template>
              <span class="label">{{ 'kernel-4.19.91-23.4.an8' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">编译器版本</span>
              </template>
              <span class="label">{{ 'V3.4.30' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">GLIBC版本</span>
              </template>
              <span class="label">{{ '2.28' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">JDK版本</span>
              </template>
              <span class="label">{{ '23.43.56' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">内核参数</span>
              </template>
              <span class="label">{{ '80' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">NUMA</span>
              </template>
              <span class="label">{{ 'NULL' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">命令行</span>
              </template>
              <span class="label">{{ '80' }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">文件系统</span>
              </template>
              <span class="label">{{ 'ext4' }}</span>
            </el-descriptions-item>
            <!-- #endregion -->
          </el-descriptions>
        </section>

        <!-- 用例信息 -->
        <section class="use-case-info main-item">
          <div class="sub-title">用例信息</div>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="case result id">
              <span>{{ state.detailInfo.case_result.case_result_id }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="selinux">
              <span>{{ state.detailInfo.case_result.selinux }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="result publish type">
              <span>{{
                state.detailInfo.case_result.result_publish_type
              }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="batch_uid">
              <span>{{ state.detailInfo.case_result.batch_uid }}</span>
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <span>数据来源</span>
                <span>
                  <el-tooltip
                    effect="dark"
                    content="数据来源"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
              </template>
              <span>{{ state.detailInfo.case_result.source }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="操作系统页表大小">
              <span>{{ state.detailInfo.case_result.os_pagesize }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="测试工具-版本">
              <span>{{ state.detailInfo.case_result.tool_version }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="CMC版本号">
              <span>{{ state.detailInfo.case_result.cmc_version }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="配置文件">
              <span>{{ state.detailInfo.case_result.config_files }}</span>
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <span>测试用例名称</span>
                <span>
                  <el-tooltip
                    effect="dark"
                    content="测试用例名称"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
              </template>
              <span>{{ state.detailInfo.case_result.testcase_name }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="case result id">
              <router-link
                class="work-load-detail"
                :to="{ name:'baseline-workloadDetail' }"
                ><span>查看详情</span>
              </router-link>
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <span>性能数据</span>
                <span>
                  <el-tooltip
                    effect="dark"
                    content="性能数据"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
              </template>
              <span>{{ state.detailInfo.case_result.performance_data }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="单位(描述)">
              <span>{{ state.detailInfo.case_result.unit }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="指标">
              <span>{{ state.detailInfo.case_result.metrics }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="flow">
              <span>{{ state.detailInfo.case_result.flow }}</span>
            </el-descriptions-item>
          </el-descriptions>
        </section>
        <!-- 底部信息 -->
        <section class="bottom-info main-item">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="publish type">
              <span>{{ state.detailInfo.publish_type }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="数据状态">
              <span>{{ state.detailInfo.public_state }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="create date">
              <span>{{ state.detailInfo.create_date }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="secret level">
              <span>{{ state.detailInfo.secret_level }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="system info">
              <span>{{ state.detailInfo.system_info }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="micro file">
              <span>{{ state.detailInfo.micro_file }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="macro file">
              <span>{{ state.detailInfo.macro_file }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="power file">
              <span>{{ state.detailInfo.power_file }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="container file">
              <span>{{ state.detailInfo.container_file }}</span>
            </el-descriptions-item>
          </el-descriptions>
        </section>
      </div></el-card
    >
    <!--<WorkloadTableSection :groupData="detailData.groupData" :suite="detailData.suite"></WorkloadTableSection>-->
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import WorkloadTableSection from './workload-table-section.vue'
import { BaselineDetail } from './interface'

import { usePerformanceData } from '@/stores/performanceData'

import { getDetail } from '@/api/detail'

const router = useRouter()
const { performanceData } = usePerformanceData()

const detailData = ref({})

let state = reactive({
  detailInfo: {} as BaselineDetail
})

let loading = ref(false)
let cpuCollpase = ref(true)
let memoryCollpase = ref(true)
let diskCollpase = ref(true)
let nicCollpase = ref(true)
let psuCollpase = ref(true)
let boardCollpase = ref(true)
let biosCollpase = ref(true)
let osCollpase = ref(true)

const handlerCollapse = (flag: string) => {
  switch (flag) {
  case 'cpu':
    cpuCollpase.value = !cpuCollpase.value
    break
  case 'memory':
    memoryCollpase.value = !memoryCollpase.value
    break
  case 'disk':
    diskCollpase.value = !diskCollpase.value
    break
  case 'nic':
    nicCollpase.value = !nicCollpase.value
    break
  case 'psu':
    psuCollpase.value = !psuCollpase.value
    break
  case 'board':
    boardCollpase.value = !boardCollpase.value
    break
  case 'bios':
    biosCollpase.value = !biosCollpase.value
    break
  case 'os':
    osCollpase.value = !osCollpase.value
    break
  }
}

onMounted(async () => {
  // todo: 当获取不到Detail时（用户直接通过submit_id进入详情页），需要根据submit_id获取一下jobs并组织。
  detailData.value = performanceData[router.currentRoute.value.params.submit_id]
  console.log('datailData', detailData.value) // 测试是否能拿到数据
  // 
  loading.value = true
  // todo: 请替换成真实数据
  let res = await getDetail(10)
  const { code, results } = res.data
  if (code === 200) {
    console.log(results[0])
    state.detailInfo = results[0]
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
  }
  /* 主体信息 */
  .main-info {
    /* 主体item */
    .main-item {
      padding-top: var(--oe-perf-padding);
      padding-bottom: var(--oe-perf-padding);
      overflow: hidden;
      .td-item{
        cursor: pointer;
      }

      :deep(.el-descriptions__cell) {
        padding: var(--oe-perf-padding);
        background-color: #fff;
        &:nth-child(2n - 1){
          border-left: none;
        }
        &:nth-child(2n){
          border-right: none;
        }
      }

      :deep(.el-descriptions__label) {
        width: 20%;
      }

      :deep(.el-descriptions__content) {
        width: 30%;
      }

      :deep(.sub-item) {
        background-color: #FCF9FC;
        .label {
          padding-left: var(--oe-perf-padding);
        }
      }
      :deep(.col-value) {
        width: 80%;
      }

      .sub-title {
        padding: var(--oe-perf-padding);
        background-color: #F3F3F5;
      }
      .arrowIcon {
        float: right;
      }
      .icon {
        margin-left: 5px;
      }
    }
    .use-case-info {
      .work-load-detail {
        text-decoration: none;
        color: var(--oe-perf-color-primary);
      }
    }
  }
}
</style>