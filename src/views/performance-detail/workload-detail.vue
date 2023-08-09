<template>
  <div>
    <el-card class="baseline-detail">
      <div class="main-title">
        <h3 class="work-load-title">Workload性能值详情</h3>
        <h4>
          测试套：{{ performanceDataStroe?.performanceData[submitId]?.suite }}
        </h4>
        <p
          v-if="
            performanceDataStroe?.performanceData[submitId]?.suite !== 'lmbench'
          ">
          总体几何平均值：
          {{
            performanceValFormatter(
              {},
              {},
              performanceDataStroe?.performanceData[submitId]?.performanceVal
            )
          }}
        </p>
        <template v-else>
          <p>
            Bandwidth结果几何平均值：
            {{
              performanceValFormatter(
                {},
                {},
                performanceDataStroe?.performanceData[submitId]
                  ?.performanceVal_local_bandwidths
              )
            }}
          </p>
          Latency结果几何平均值：
          {{
            performanceValFormatter(
              {},
              {},
              performanceDataStroe?.performanceData[submitId]?.performanceVal
            )
          }}
        </template>
      </div>
      <div class="main-info">
        <div class="use-case-info main-item">
          <workloadTableSection />
          <!-- 用例信息 -->
          <!-- <section class="test-case main-item">
            <div class="sub-title">用例信息</div>
            <el-descriptions :column="2" border>
              <el-descriptions-item label="selinux">
                <span>disabled</span>
              </el-descriptions-item>

              <el-descriptions-item label="result_publish_ty">
                <span>performance_baseline_data</span>
              </el-descriptions-item>

              <el-descriptions-item label="source">
                <span>openEuler</span>
              </el-descriptions-item>

              <el-descriptions-item label="batch_uid">
                <span>2022-09-2209:13:12.045408_027</span>
              </el-descriptions-item>

              <el-descriptions-item label="操作系统页表大小">
                <span>4K</span>
              </el-descriptions-item>

              <el-descriptions-item label="CMC版本号">
                <span>NULL</span>
              </el-descriptions-item>

              <el-descriptions-item label="测试工具-版本">
                <span>5.13</span>
              </el-descriptions-item>

              <el-descriptions-item label="配置文件及测试报告">
                <span>NULL</span>
              </el-descriptions-item>

              <el-descriptions-item label="测试模型">
                <span>NULL</span>
              </el-descriptions-item>

              <el-descriptions-item label="并发量">
                <span>多核</span>
              </el-descriptions-item>

              <el-descriptions-item label="单位(描述)">
                <span>NULL</span>
              </el-descriptions-item>

              <el-descriptions-item label="指标">
                <span>NULL</span>
              </el-descriptions-item>

              <el-descriptions-item label="flow">
                <span>AF20220922536756</span>
              </el-descriptions-item>

              <el-descriptions-item label="测试人">
                <span>zWX5324242</span>
              </el-descriptions-item>
            </el-descriptions>
          </section> -->
          <!-- 硬件配置 -->
          <!-- <section class="hardware-configuration main-item">
            <div class="sub-title">硬件配置</div>
            <el-descriptions :column="2" size="default" border>
              <el-descriptions-item label="服务器型号">
                <span>Intel-2288H V5</span>
              </el-descriptions-item>

              <el-descriptions-item label="BMC版本">
                <span>5.06(U4262)</span>
              </el-descriptions-item>
            </el-descriptions>
          </section> -->
          <!-- 软件配置 -->
          <!-- <section class="software-configuration main-item">
            <div class="sub-title">软件配置</div>
            <el-descriptions :column="2" border>
              <el-descriptions-item label="操作系统">
                <span>Anolisos-8.4</span>
              </el-descriptions-item>

              <el-descriptions-item label="系统内核">
                <span>kernel-4.19.91-23.4.an8</span>
              </el-descriptions-item>
            </el-descriptions>
          </section> -->
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePerformanceData } from '@/stores/performanceData'
import { invalidNumberSymbol } from '@/views/performance-baseline/utils'
import workloadTableSection from './workload-table-section.vue'

const router = useRouter()
const performanceDataStroe = usePerformanceData()

const submitId = router.currentRoute.value.params.submit_id as string

// 重复
const performanceValFormatter = (row: any, column: any, cellValue: number) => {
  if (cellValue === undefined || cellValue === invalidNumberSymbol) {
    return '暂无数据'
  }
  return cellValue
}
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
      font-size: var(--oe-perf-font-size-head);
      margin-top: 20px;
      margin-bottom: 20px;
      padding-left: 2px;
      font-weight: bold;
    }
    .top-title {
      width: 100%;
      /* padding: var(--oe-perf-padding); */
      display: flex;
      .title-value {
        color: var(--oe-perf-color-primary);
      }
      .case-info {
        margin-right: 70px;
      }
    }
  }
  /* 主体信息 */
  .main-info {
    width: 100%;
    /* 主体item */
    .main-item {
      margin-bottom: 50px;
      :deep(.el-descriptions__cell) {
        padding: var(--oe-perf-padding);
        background-color: #fff;
        &:nth-child(2n - 1) {
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
      .sub-title {
        padding: var(--oe-perf-padding);
        background-color: #f3f3f5;
        font-weight: bold;
        font-size: var(--oe-perf-font-size-display);
      }
    }
  }
}
</style>
