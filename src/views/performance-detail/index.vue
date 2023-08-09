<template>
  <div>
    <el-card class="baseline-detail" v-loading="loading">
      <div class="main-title">
        <span>提交详情</span>
      </div>
      <!--不应该是没有数据时，用某个属性来隐藏全部数据内容，这种写法是不合适的-->
      <!--请在具体展示字段或者取值时去判空-->
      <div class="main-info">
        <!-- 结果信息 -->
        <section class="result-info main-item">
          <div class="sub-title">提交信息</div>
          <el-descriptions :column="1" border>
            <!--目前不确定写参数是否需要显示
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
            -->
            <el-descriptions-item label="提交 id" class-name="col-value">
              <span>{{ detailData.submit_id }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="测试套" class-name="col-value">
              <span>{{ detailData.suite }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="提交人" class-name="col-value">
              <span>{{ detailData.subqueue }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="提交时间" class-name="col-value">
              <span>{{ detailData.submit_time }}</span>
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
              <span>{{ detailData.testbox }}</span>
            </el-descriptions-item>

            <!-- 服务器型号 -->
            <el-descriptions-item :span="4">
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
              <span>{{ detailData.model_name }}</span>
            </el-descriptions-item>

            <!-- 处理器（CPU配置） -->
            <el-descriptions-item :span="4">
              <template #label>
                <!-- 根据展开项是否为空添加手型交互 -->
                <div class="control-label" @click="handlerCollapse('cpu')">
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
                  <span class="arrowIcon" v-if="true">
                    <el-icon v-show="cpuCollpase"><ArrowDownBold /></el-icon>
                    <el-icon v-show="!cpuCollpase"><ArrowUpBold /></el-icon>
                  </span>
                </div>
              </template>
              <!-- <span>{{ state.detailInfo.product.cpu_brief }}</span> -->
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
              <span class="label">{{
                detailData?.device?.cpu?.cpu_max_mhz
              }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!cpuCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">threads</span>
              </template>
              <span class="label">{{
                detailData?.device?.cpu?.nr_thread_per_core
              }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!cpuCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">series</span>
              </template>
              <span class="label">{{}}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!cpuCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">cpu数</span>
              </template>
              <span class="label">{{ detailData.nr_cpu }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!cpuCollpase"
              label-class-name="sub-item"
              class-name="sub-item"
              :span="2">
              <template #label>
                <span class="label">核数</span>
              </template>
              <span class="label">{{ detailData.nr_node }}</span>
            </el-descriptions-item>
            <!-- #endregion -->

            <!-- 内存配置 -->
            <el-descriptions-item :span="2">
              <template #label>
                <div @click="handlerCollapse('memory')">
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
                    v-if="typeof detailData.memory !== 'string'">
                    <el-icon v-show="memoryCollpase"><ArrowDownBold /></el-icon>
                    <el-icon v-show="!memoryCollpase"><ArrowUpBold /></el-icon>
                  </span>
                </div>
              </template>
              <span v-if="typeof detailData.memory === 'string'" class="label">
                {{ detailData.memory }}
              </span>
            </el-descriptions-item>
            <!-- 内存配置详情 -->
            <!-- #region -->
            <template v-if="!memoryCollpase">
              <el-descriptions-item
                label-class-name="sub-item"
                class-name="sub-item">
                <template #label>
                  <span class="label">内存规格</span>
                </template>
                <span class="label">{{ '32G' }}</span>
              </el-descriptions-item>
              <el-descriptions-item
                label-class-name="sub-item"
                class-name="sub-item">
                <template #label>
                  <span class="label">内存型号</span>
                </template>
                <span class="label">{{ 'AMD2134' }}</span>
              </el-descriptions-item>
            </template>
            <!-- #endregion -->

            <!-- 硬盘配置 -->
            <el-descriptions-item :span="2">
              <template #label>
                <div @click="handlerCollapse('disk')">
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
                  <span class="arrowIcon" v-if="false">
                    <el-icon v-show="diskCollpase"><ArrowDownBold /></el-icon>
                    <el-icon v-show="!diskCollpase"><ArrowUpBold /></el-icon>
                  </span>
                </div>
              </template>
              <!-- <span>{{ state.detailInfo.product.disk_brief }}</span> -->
            </el-descriptions-item>
            <!-- 硬盘配置详情 -->
            <!-- #region -->
            <!-- <el-descriptions-item
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
            </el-descriptions-item> -->
            <!-- #endregion -->

            <!-- 网卡 -->
            <el-descriptions-item :span="2">
              <template #label>
                <div @click="handlerCollapse('nic')">
                  <span>{{ '网卡' }}</span>
                  <span class="arrowIcon" v-if="false">
                    <el-icon v-show="nicCollpase"><ArrowDownBold /></el-icon>
                    <el-icon v-show="!nicCollpase"><ArrowUpBold /></el-icon>
                  </span>
                </div>
              </template>
              <!-- <span>{{ state.detailInfo.product.nic_brief }}</span> -->
            </el-descriptions-item>

            <!-- 电源 -->
            <el-descriptions-item :span="2">
              <template #label>
                <div @click="handlerCollapse('psu')">
                  <span>{{ '电源' }}</span>
                  <span class="arrowIcon" v-if="false">
                    <el-icon v-show="psuCollpase"><ArrowDownBold /></el-icon>
                    <el-icon v-show="!psuCollpase"><ArrowUpBold /></el-icon>
                  </span>
                </div>
              </template>
              <!-- <span>{{ state.detailInfo.product.psu_brief }}</span> -->
            </el-descriptions-item>

            <!-- 单板 -->
            <el-descriptions-item :span="2">
              <template #label>
                <div @click="handlerCollapse('board')">
                  <span>{{ '单板' }}</span>
                  <span class="arrowIcon" v-if="false">
                    <el-icon v-show="boardCollpase"><ArrowDownBold /></el-icon>
                    <el-icon v-show="!boardCollpase"><ArrowUpBold /></el-icon>
                  </span>
                </div>
              </template>
              <!-- <span>{{ state.detailInfo.product.board_brief }}</span> -->
            </el-descriptions-item>

            <!-- BMC版本 -->
            <el-descriptions-item label="BMC版本" :span="2">
              <!-- <span>{{ state.detailInfo.product.bmc_version }}</span> -->
            </el-descriptions-item>

            <!-- BIOS配置 -->
            <el-descriptions-item :span="2">
              <template #label>
                <div class="control-label" @click="handlerCollapse('bios')">
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
                  <span v-if="detailData?.device?.bios" class="arrowIcon">
                    <el-icon v-show="biosCollpase"><ArrowDownBold /></el-icon>
                    <el-icon v-show="!biosCollpase"><ArrowUpBold /></el-icon>
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
              <span class="label">{{ detailData?.device?.bios?.version }}</span>
            </el-descriptions-item>
            <el-descriptions-item
              v-if="!biosCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">发布日期</span>
              </template>
              <span class="label">{{
                detailData?.device?.bios?.release_date
              }}</span>
            </el-descriptions-item>
            <el-descriptions-item
              v-if="!biosCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">厂商</span>
              </template>
              <span class="label">{{ detailData?.device?.bios?.vendor }}</span>
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
                <div class="control-label" @click="handlerCollapse('os')">
                  <span>操作系统</span>
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
                    <el-icon v-show="osCollpase"><ArrowDownBold /></el-icon>
                    <el-icon v-show="!osCollpase"><ArrowUpBold /></el-icon>
                  </span>
                </div>
              </template>
              <!-- <span>{{ state.detailInfo.os.os_release }}</span> -->
              <span>{{ detailData.os }}</span>
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
              <span class="label">{{ detailData.kernel_version }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">编译器版本</span>
              </template>
              <span class="label">{{}}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">GLIBC版本</span>
              </template>
              <span class="label">{{}}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">JDK版本</span>
              </template>
              <span class="label">{{}}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">内核参数</span>
              </template>
              <span class="label">{{}}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">NUMA</span>
              </template>
              <span class="label">{{}}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">命令行</span>
              </template>
              <span class="label">{{}}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">文件系统</span>
              </template>
              <span class="label">{{}}</span>
            </el-descriptions-item>
            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">系统架构</span>
              </template>
              <span class="label">{{ detailData.os_arch }}</span>
            </el-descriptions-item>

            <el-descriptions-item
              v-if="!osCollpase"
              label-class-name="sub-item"
              class-name="sub-item">
              <template #label>
                <span class="label">版本</span>
              </template>
              <span class="label">{{ detailData.os_version }}</span>
            </el-descriptions-item>
            <!-- #endregion -->
          </el-descriptions>
        </section>

        <!-- 用例信息 -->
        <section class="use-case-info main-item">
          <div class="sub-title">用例信息</div>
          <el-descriptions :column="2" border>
            <!--
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
            -->
            <el-descriptions-item
              label="workload"
              :span="2"
              class-name="col-value">
              <router-link
                class="work-load-detail"
                :to="{ name: 'baseline-workloadDetail' }"
                ><span>查看详情</span>
              </router-link>
            </el-descriptions-item>

            <el-descriptions-item :span="2" class-name="col-value">
              <template #label>
                <span>总体几何平均值</span>
                <span>
                  <el-tooltip
                    effect="dark"
                    content="取所有测试结果几何平均值的几何平均值"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </span>
              </template>
              <span
                v-if="detailData.suite !== 'lmbench'"
                class="important-value">
                {{ performanceValFormatter({}, {}, detailData.performanceVal) }}
              </span>
              <template v-else>
                <p>
                  <span>Bandwidth几何平均值：</span>
                  <span class="important-value">
                    {{
                      performanceValFormatter(
                        {},
                        {},
                        detailData.performanceVal_local_bandwidths
                      )
                    }}
                  </span>
                </p>
                <p>
                  <span>Latency几何平均值：</span>
                  <span class="important-value">
                    {{
                      performanceValFormatter({}, {}, detailData.performanceVal)
                    }}
                  </span>
                </p>
              </template>
            </el-descriptions-item>
            <!--
            <el-descriptions-item label="单位(描述)">
              <span>{{ state.detailInfo.case_result.unit }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="指标">
              <span>{{ state.detailInfo.case_result.metrics }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="flow">
              <span>{{ state.detailInfo.case_result.flow }}</span>
            </el-descriptions-item>
            -->
          </el-descriptions>
        </section>

        <!-- 底部信息 -->
        <!--
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
        -->
      </div>
    </el-card>
    <!--<WorkloadTableSection :groupData="detailData.groupData" :suite="detailData.suite"></WorkloadTableSection>-->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { usePerformanceData, useTestboxStore } from '@/stores/performanceData'
import { DataObject, getPerformanceData, getTestBoxes } from '@/api/performance'

import {
  combineJobs,
  invalidNumberSymbol
} from '@/views/performance-baseline/utils.js'

const router = useRouter()
const { performanceData, setPerformanceData } = usePerformanceData()
const testboxStore = useTestboxStore()

const detailData = ref<DataObject>({})

let loading = ref(false)
let cpuCollpase = ref(true)
let memoryCollpase = ref(true)
let diskCollpase = ref(true)
let nicCollpase = ref(true)
let psuCollpase = ref(true)
let boardCollpase = ref(true)
let biosCollpase = ref(true)
let osCollpase = ref(true)
const collapseMap = {
  cpu: cpuCollpase,
  memory: memoryCollpase,
  disk: diskCollpase,
  nic: nicCollpase,
  psu: psuCollpase,
  board: boardCollpase,
  bios: biosCollpase,
  os: osCollpase
}
const handlerCollapse = (flag: string) => {
  let collapseItem = collapseMap[flag as keyof typeof collapseMap]
  collapseItem.value = !collapseItem.value
}

const getJobData = (submitId: string) => {
  loading.value = true
  getPerformanceData({
    index: 'jobs',
    query: {
      size: 10000,
      // prettier-ignore
      _source: ['suite', 'id', 'submit_id', 'group_id', 'tags', 'os', 'os_version', 'osv', 'arch', 'kernel',
        'testbox', 'tbox_group', 'pp', 'stats', 'job_state', 'job_stage', 'job_health', 'time', 'start_time', 'end_time', 'submit_time'
      ],
      query: {
        term: {
          submit_id: submitId
        }
      }
    }
  })
    .then(res => {
      const resultObj = combineJobs(res.data.hits.hits) // 工具函数，合并job数据为一个submitId数据
      setDeviceInfoToObj(resultObj)
      setPerformanceData(submitId, resultObj) // save submit data to store
      detailData.value = resultObj
    })
    .catch(err => {
      ElMessage({
        message: err.message,
        type: 'error'
      })
      console.warn(err)
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  // todo: 当获取不到Detail时（用户直接通过submit_id进入详情页），需要根据submit_id获取一下jobs并组织。
  const submitId = router.currentRoute.value.params.submit_id as string
  if (performanceData[submitId]) {
    detailData.value = performanceData[submitId]
  } else {
    loading.value = true
    getTestBoxes().then(testboxRes => {
      let testboxList: DataObject[] = []
      testboxList = testboxRes.data.hits.hits.map((item: DataObject) => {
        return {
          testboxId: item._id,
          ...item._source
        }
      })
      testboxStore.setTestboxData(testboxList)
      getJobData(submitId)
    })
  }
})

// 重复
const setDeviceInfoToObj = (resultObj: DataObject) => {
  const testbox = testboxStore.testboxMap[resultObj.testbox] || {}
  resultObj.device = testbox.device || {}
}

// 重复
const performanceValFormatter = (row: any, column: any, cellValue: number) => {
  if (cellValue === undefined || cellValue === invalidNumberSymbol) {
    return '暂无数据'
  }
  return cellValue
}
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
      padding-top: var(--oe-perf-padding-small);
      padding-bottom: var(--oe-perf-padding-small);
      overflow: hidden;
      .control-label {
        cursor: pointer;
      }

      :deep(.el-descriptions__cell) {
        padding: var(--oe-perf-padding-small);
        background-color: #fff;
        &:nth-child(4n - 3) {
          border-left: none;
        }
        &:nth-child(2n) {
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
        background-color: #fcf9fc;
        .label {
          padding-left: var(--oe-perf-padding-small);
        }
      }
      :deep(.col-value) {
        width: 80%;
      }

      .sub-title {
        padding: var(--oe-perf-padding-small);
        background-color: #f3f3f5;
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
  .important-value {
    color: var(--oe-perf-color-primary);
  }
}
</style>
