<template>
  <div>
    <el-card class="baseline-detail">
      <div class="main-title">
        <span>unixbench信息总览 >> UUID: test324802348</span>
        <span class="work-load-title">Workload性能值详情</span>
      </div>
      <div class="main-info">
        <el-card shadow="never" :body-style="cardStyle">
          <div class="top-title">
            <div class="case-info">
              用例信息 <span class="title-value">多核</span>
            </div>
            <div class="performance-value">
              性能值 <span class="title-value">13491.08</span>
            </div>
          </div>
          <div class="main-item">
            <div class="sub-title">用例信息</div>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">selinux</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>disabled</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">result publish type</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>performance_baseline_data</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">source</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>openEuler</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">batch_uid</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>2022-09-22 09:13:12.045408_027</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">操作系统页表大小</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>4K</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">CMC版本号</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>NULL</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">测试工具-版本</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>5.13</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">配置文件及测试报告</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>NULL</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">测试模型</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>NULL</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">并发量</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>多核</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">单位(描述)</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>NULL</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">指标</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>NULL</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">flow</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>AF20220922536756</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">测试人</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>zWX5324242</span>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <!-- 硬件配置 -->
          <div class="main-item">
            <div class="sub-title">硬件配置</div>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">服务器型号</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>Intel-2288H V5</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">BMC版本</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>5.06(U4262)</span>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <!-- 软件配置 -->
          <div class="main-item software-info">
            <div class="sub-title">软件配置</div>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">操作系统</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>Anolisos-8.4</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">系统内核</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>kernel-4.19.91-23.4.an8</span>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue'

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
      .item {
        border-bottom: 1px solid var(--oe-perf-bg-layout);
        .sub-item {
          padding: var(--oe-perf-padding);
          border-top: none;
          border-left: none;
          .item-title {
            font-weight: bold;
          }
          .icon {
            margin-left: 5px;
          }
        }
      }
    }

    .software-info {
      margin-bottom: 0;
      .sub-item {
        border-bottom: none;
      }
    }
  }
}
</style>