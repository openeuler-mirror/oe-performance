<template>
  <div>
    <div>
      <el-row :gutter="25">
        <el-col :span="2"><span class="general-font-style">测试组件:</span></el-col>
        <el-col :span="8">
          <span class="general-btn index-btn first-btn">Spark</span>
          <span class="general-btn">Hice</span>
          <span class="general-btn last-btn">Hbase</span>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="2"><span class="general-font-style">筛选内容:</span></el-col>
        <el-col :span="6">
          <el-row :gutter="8">
            <el-col :span="8" class="general-font-style"><span>测试模型版本:</span></el-col>
            <el-col :span="16">
              <el-cascader
              placeholder="请选择测试模型版本" v-model="value" :options="options"
              @change="hChange" clearable/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row :gutter="8">
            <el-col :span="8" class="general-font-style"><span>服务器型号:</span></el-col>
            <el-col :span="16">
              <el-cascader
              placeholder="请选择服务器型号" v-model="value" :options="options"
              @change="hChange" clearable/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row :gutter="8">
            <el-col :span="8" class="general-font-style"><span>CPU配置:</span></el-col>
            <el-col :span="16">
              <el-cascader
              placeholder="请选择CPU配置" v-model="value" :options="options"
              @change="hChange" clearable/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row :gutter="8">
            <el-col :span="8" class="general-font-style"><span>内存配置:</span></el-col>
              <el-col :span="16">
                <el-cascader
                placeholder="请选择内存配置" v-model="value" :options="options"
                @change="hChange" clearable/>
              </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="2"></el-col>
        <el-col :span="6">
          <el-row :gutter="8">
            <el-col :span="8" class="general-font-style"><span>硬件配置:</span></el-col>
            <el-col :span="16">
              <el-cascader
              placeholder="请选择硬件配置" v-model="value" :options="options"
              @change="hChange" clearable/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row :gutter="8">
            <el-col :span="8" class="general-font-style"><span>Raid卡:</span></el-col>
            <el-col :span="16">
              <el-cascader
              placeholder="请选择Raid卡" v-model="value" :options="options"
              @change="hChange" clearable/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row :gutter="8">
            <el-col :span="8" class="general-font-style"><span>组网配置:</span></el-col>
            <el-col :span="16">
              <el-cascader
              placeholder="请选择组网配置" v-model="value" :options="options"
              @change="hChange" clearable/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row :gutter="8">
            <el-col :span="8" class="general-font-style"><span>测试用例:</span></el-col>
            <el-col :span="16">
              <el-cascader
              placeholder="请选择测试用例" v-model="value" :options="options"
              @change="hChange" clearable/>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="2"></el-col>
        <el-col :span="6">
          <el-row :gutter="8">
            <el-col :span="8" class="general-font-style"><span>测试工具版本:</span></el-col>
            <el-col :span="16">
              <el-cascader
              placeholder="请选择测试工具版本" v-model="value" :options="options"
              @change="hChange" clearable/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row :gutter="8">
            <el-col :span="8" class="general-font-style"><span>操作系统:</span></el-col>
            <el-col :span="16">
              <el-cascader
              placeholder="请选择操作系统" v-model="value" :options="options"
              @change="hChange" clearable/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row :gutter="8">
            <el-col :span="8" class="general-font-style"><span>数据来源:</span></el-col>
            <el-col :span="16">
              <el-cascader
              placeholder="请选择数据来源" v-model="value" :options="options"
              @change="hChange" clearable/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5"></el-col>
      </el-row>
      <el-row :gutter="20" justify="center">
        <el-col :span="2"><el-button size="large">重置</el-button></el-col>
        <el-col :span="2"><el-button size="large" type="primary">搜索</el-button></el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])

const hChange = (value) => {
  console.log(value)
}

const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          }
        ]
      }
    ]
  }
]
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.general-btn {
    padding: 5px 8%;
    border: 1px solid var(--oe-perf-normal-border-color);
    color: #7c7c7c;
    user-select: none;
    cursor: pointer;
}
.index-btn {
    color: #25b3f2;
    border-color: #25b3f2;
}
.first-btn {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.last-btn {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.general-font-style {
    text-align: right;
    font-size: 14px;
    // align-self: flex-end;
}
</style>
