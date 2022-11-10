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
        <el-card shadow="never" :body-style="cardStyle">
          <!-- 结果信息 -->
          <div class="result-info main-item">
            <div class="sub-title">结果信息</div>
            <!-- guid -->
            <el-row class="item">
              <el-col :span="6">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">guid</span>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.guid }}</span>
                </el-card>
              </el-col>
            </el-row>
            <!-- 审核人 -->
            <el-row class="item">
              <el-col :span="6">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">审核人</span>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.created_by }}</span>
                </el-card>
              </el-col>
            </el-row>
            <!-- 测试人 -->
            <el-row class="item">
              <el-col :span="6">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">测试人</span>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.tested_by }}</span>
                </el-card>
              </el-col>
            </el-row>
            <!-- task_belongs_type -->
            <el-row class="item">
              <el-col :span="6">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">task_belongs_type</span>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.task_belongs_type }}</span>
                </el-card>
              </el-col>
            </el-row>
            <!-- task_belongs_id -->
            <el-row class="item">
              <el-col :span="6">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">task_belongs_id</span>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.task_belongs_id }}</span>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <!-- 硬件配置 -->
          <div class="hardware-configuration main-item">
            <div class="sub-title">硬件配置</div>
            <!-- 硬件ID -->
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">硬件ID</span>
                </el-card>
              </el-col>
              <el-col :span="19">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.product.product_id }}</span>
                </el-card>
              </el-col>
            </el-row>
            <!-- 服务器型号 -->
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">服务器型号</span>
                  <el-tooltip
                    effect="dark"
                    content="服务器型号"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </el-card>
              </el-col>
              <el-col :span="19">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.product.model }}</span>
                </el-card>
              </el-col>
            </el-row>
            <!-- 处理器（CPU配置） -->
            <!-- <el-row class="item processor-item">
              <el-col :span="6">
                <el-card
                  class="sub-item processor"
                  shadow="never"
                  :body-style="cardStyle">
                  <div class="collapse">
                    <el-collapse>
                      <el-collapse-item class="collapse-item">
                        <template #title>
                          <span class="item-title">处理器（CPU配置）</span>
                          <el-tooltip
                            class="icon"
                            effect="dark"
                            content="处理器（CPU配置）"
                            placement="top-start">
                            <span
                              ><el-icon color="var(--oe-perf-color-secondary)"
                                ><InfoFilled /></el-icon></span
                          ></el-tooltip>
                        </template>
                        <el-card
                          class="sub-item collapse-card"
                          shadow="never"
                          :body-style="cardStyle">
                          asdas</el-card
                        >
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>2*Intel6248</span>
                </el-card>
              </el-col>
            </el-row> -->
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">处理器（CPU配置）</span>
                  <el-tooltip
                    class="icon"
                    effect="dark"
                    content="处理器（CPU配置）"
                    placement="top-start">
                    <span
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                  <div class="arrowIcon" @click="handlerCollapse(1)">
                    <el-icon v-show="cpuCollpase"><ArrowRightBold /></el-icon>
                    <el-icon v-show="!cpuCollpase"><ArrowDownBold /></el-icon>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="19">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.product.cpu_brief }}</span>
                </el-card>
              </el-col>
            </el-row>

            <div class="cpu-detail" v-show="!cpuCollpase">
              <el-row class="item">
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">CPU刷新频率(MHz)</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>2500</span>
                  </el-card>
                </el-col>
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">cups</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>80</span>
                  </el-card>
                </el-col>
              </el-row>
              <el-row class="item">
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">threads</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>80</span>
                  </el-card>
                </el-col>
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">series</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>NULL</span>
                  </el-card>
                </el-col>
              </el-row>
            </div>

            <!-- 内存配置 -->
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">内存配置</span>
                  <el-tooltip
                    effect="dark"
                    content="内存配置"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                  <div class="arrowIcon" @click="handlerCollapse(2)">
                    <el-icon v-show="memoryCollpase"
                      ><ArrowRightBold
                    /></el-icon>
                    <el-icon v-show="!memoryCollpase"
                      ><ArrowDownBold
                    /></el-icon>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="19">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.product.memory_brief }}</span>
                </el-card>
              </el-col>
            </el-row>

            <div class="memory-detail" v-show="!memoryCollpase">
              <el-row class="item">
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">内存规格</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>32G</span>
                  </el-card>
                </el-col>
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">内存型号</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>AMD2134</span>
                  </el-card>
                </el-col>
              </el-row>
            </div>

            <!-- 硬盘配置 -->
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">硬盘配置</span>
                  <el-tooltip
                    effect="dark"
                    content="硬盘配置"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                  <div class="arrowIcon" @click="handlerCollapse(3)">
                    <el-icon v-show="diskCollpase"><ArrowRightBold /></el-icon>
                    <el-icon v-show="!diskCollpase"><ArrowDownBold /></el-icon>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="19">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>11</span>
                </el-card>
              </el-col>
            </el-row>

            <div class="memory-detail" v-show="!diskCollpase">
              <el-row class="item">
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">硬盘规格</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>14T</span>
                  </el-card>
                </el-col>
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">硬盘型号</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>WJ3425235</span>
                  </el-card>
                </el-col>
              </el-row>
              <el-row class="item">
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">RAID卡</span>
                  </el-card>
                </el-col>
                <el-col :span="19">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>RS0820P</span>
                  </el-card>
                </el-col>
              </el-row>
            </div>

            <!-- 网卡 -->
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">网卡（待开发）</span>
                  <div class="arrowIcon" @click="handlerCollapse(4)">
                    <el-icon v-show="nicCollpase"><ArrowRightBold /></el-icon>
                    <el-icon v-show="!nicCollpase"><ArrowDownBold /></el-icon>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="19">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.product.nic_brief }}</span>
                </el-card>
              </el-col>
            </el-row>
            <!-- 电源 -->
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">电源（待开发）</span>
                  <div class="arrowIcon" @click="handlerCollapse(5)">
                    <el-icon v-show="psuCollpase"><ArrowRightBold /></el-icon>
                    <el-icon v-show="!psuCollpase"><ArrowDownBold /></el-icon>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="19">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.product.psu_brief }}</span>
                </el-card>
              </el-col>
            </el-row>
            <!-- 单板 -->
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">单板（待开发）</span>
                  <div class="arrowIcon" @click="handlerCollapse(6)">
                    <el-icon v-show="boardCollpase"><ArrowRightBold /></el-icon>
                    <el-icon v-show="!boardCollpase"><ArrowDownBold /></el-icon>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="19">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.product.board_brief }}</span>
                </el-card>
              </el-col>
            </el-row>
            <!-- BMC版本 -->
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">BMC版本</span>
                </el-card>
              </el-col>
              <el-col :span="19">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.product.bmc_version }}</span>
                </el-card>
              </el-col>
            </el-row>
            <!-- BIOS配置 -->
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">BIOS配置</span>
                  <div class="arrowIcon" @click="handlerCollapse(7)">
                    <el-icon v-show="biosCollpase"><ArrowRightBold /></el-icon>
                    <el-icon v-show="!biosCollpase"><ArrowDownBold /></el-icon>
                  </div>
                  <el-tooltip
                    effect="dark"
                    content="BIOS配置"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </el-card>
              </el-col>
              <!-- <el-col :span="6">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span></span>
                </el-card>
              </el-col> -->
            </el-row>

            <div class="bios-detail" v-show="!biosCollpase">
              <el-row class="item">
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">BIOS版本</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>InsydcH2003.72.27 (V1.21)</span>
                  </el-card>
                </el-col>
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">NUMA</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>Enable</span>
                  </el-card>
                </el-col>
              </el-row>

              <el-row class="item">
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">Power</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>Custom</span>
                  </el-card>
                </el-col>
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">Custom Refresh</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>Disabled</span>
                  </el-card>
                </el-col>
              </el-row>

              <el-row class="item">
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">Hardware Prefetcher</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>Enable</span>
                  </el-card>
                </el-col>
                <el-col :span="5">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span class="item-title">Adjacent</span>
                  </el-card>
                </el-col>
                <el-col :span="7">
                  <el-card
                    class="sub-item item-detail"
                    shadow="never"
                    :body-style="cardStyle">
                    <span>Enable</span>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- 软件配置 -->
          <div class="software-info main-item">
            <div class="sub-title">软件配置</div>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">操作系统版本</span>
                  <el-tooltip
                    effect="dark"
                    content="操作系统版本"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                  <div class="arrowIcon" @click="handlerCollapse(8)">
                    <el-icon v-show="osCollpase"><ArrowRightBold /></el-icon>
                    <el-icon v-show="!osCollpase"><ArrowDownBold /></el-icon>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="19">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.os.os_release }}</span>
                </el-card>
              </el-col>
            </el-row>

            <el-row class="item">
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
                  <span>{{ state.detailInfo.os.os_kernel }}</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">编译器版本</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.os.compiler_version }}</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">GLIBC版本</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.os.glibc_version }}</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">JDK版本</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.os.jdk_version }}</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">内核参数</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.os.kernel_parameters }}</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">NUMA</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.os.numa }}</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">命令行</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.os.cmdline }}</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">文件系统</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.os.file_system }}</span>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <!-- 用例信息 -->
          <div class="use-case-info main-item">
            <div class="sub-title">用例信息</div>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">case result id</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.case_result.case_result_id }}</span>
                </el-card>
              </el-col>
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
                  <span>{{ state.detailInfo.case_result.selinux }}</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
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
                  <span>{{
                    state.detailInfo.case_result.result_publish_type
                  }}</span>
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
                  <span>{{ state.detailInfo.case_result.batch_uid }}</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">数据来源</span>
                  <el-tooltip
                    effect="dark"
                    content="数据来源"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.case_result.source }}</span>
                </el-card>
              </el-col>
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
                  <span>{{ state.detailInfo.case_result.os_pagesize }}</span>
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
                  <span>{{ state.detailInfo.case_result.tool_version }}</span>
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
                  <span>{{ state.detailInfo.case_result.cmc_version }}</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">配置文件</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.case_result.config_files }}</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">测试用例名称</span>
                  <el-tooltip
                    effect="dark"
                    content="测试用例名称"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.case_result.testcase_name }}</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">Workload性能值</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <router-link
                    class="work-load-detail"
                    to="/normalBaseline/workLoadDetail"
                    ><span>查看详情</span></router-link
                  >
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">性能数据</span>
                  <el-tooltip
                    effect="dark"
                    content="性能数据"
                    placement="top-start">
                    <span class="icon"
                      ><el-icon color="var(--oe-perf-color-secondary)"
                        ><InfoFilled /></el-icon></span
                  ></el-tooltip>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{
                    state.detailInfo.case_result.performance_data
                  }}</span>
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
                  <span>{{ state.detailInfo.case_result.unit }}</span>
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
                  <span>{{ state.detailInfo.case_result.metrics }}</span>
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
              <el-col :span="19">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.case_result.flow }}</span>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <!-- 底部 -->
          <div class="bottom-info main-item">
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="bottom-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">publish type</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="bottom-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.publish_type }}</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="bottom-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">数据状态</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="bottom-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.public_state }}</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">create date</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.create_date }}</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">secret level</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.secret_level }}</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">system info</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.system_info }}</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">micro file</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.micro_file }}</span>
                </el-card>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">macro file</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.macro_file }}</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">power file</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.power_file }}</span>
                </el-card>
              </el-col>
              <el-col :span="5">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span class="item-title">power file</span>
                </el-card>
              </el-col>
              <el-col :span="7">
                <el-card
                  class="sub-item"
                  shadow="never"
                  :body-style="cardStyle">
                  <span>{{ state.detailInfo.power_file }}</span>
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
import { getDetail } from '@/api/detail'
import { onMounted, reactive, ref } from 'vue'
import { BaselineDetail } from './interface'
const cardStyle = { padding: '0' }
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

const handlerCollapse = (flag: number) => {
  console.log(flag)

  switch (flag) {
  case 1:
    cpuCollpase.value = !cpuCollpase.value
    break
  case 2:
    memoryCollpase.value = !memoryCollpase.value
    break
  case 3:
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
    biosCollpase.value = !biosCollpase.value
    break
  case 8:
    osCollpase.value = !osCollpase.value
    break
  }
}

onMounted(async () => {
  loading.value = true
  let res = await getDetail(10)

  console.log(res.data)
  const { code, results } = res.data
  if (code === 200) {
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
    padding-bottom: var(--oe-perf-padding);
  }
  /* 主体信息 */
  .main-info {
    /* 主体item */
    .main-item {
      margin-bottom: 50px;
      .sub-title {
        padding: var(--oe-perf-padding);
        background-color: var(--oe-perf-bg-layout);
      }
      .item {
        border-bottom: 1px solid var(--oe-perf-bg-layout);
        .sub-item {
          padding: var(--oe-perf-padding);
          border-top: none;
          border-left: none;
          overflow: hidden;

          .arrowIcon {
            float: right;
          }
          .work-load-detail {
            text-decoration: none;
            color: var(--oe-perf-color-secondary);
          }
          .item-title {
            font-weight: bold;
          }
          .icon {
            margin-left: 5px;
          }
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
          .work-load-detail {
            text-decoration: none;
            color: var(--oe-perf-color-secondary);
          }
          .item-title {
            font-weight: bold;
          }
        }
      }
    }
    .hardware-configuration {
      .item {
        .processor {
          padding: 0;
          .collapse {
            .collapse-item {
              padding: var(--oe-perf-padding);
            }
            /* 去除折叠面板自带的下边框 */
            .collapse-item :deep {
              .el-collapse-item__header {
                border: none;
                font-size: var(--oe-perf-font-size-header);
                height: 21px;
              }
            }
          }
        }
      }
    }
  }
}
</style>