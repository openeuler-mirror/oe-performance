<template>
  <el-card shadow="always">
    <h4>审批操作</h4>
    <p>申请单号：{{ requestCode }}</p>
    <div class="time-line">
      <div class="item item-first item-accomplished">
        <el-descriptions column="4">
          <el-descriptions-item><span class="item-message">提交申请</span></el-descriptions-item>
          <el-descriptions-item><span class="item-message">{{ username }}</span></el-descriptions-item>
          <el-descriptions-item><span class="item-message">{{ time }}</span></el-descriptions-item>
          <el-descriptions-item><span class="item-message">申请描述：{{ mes }}</span></el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="item item-second item-index">
        <el-descriptions column="4">
          <el-descriptions-item>
            <span class="item-message item-bold-message">{{ approvalState }}</span>
          </el-descriptions-item>
          <el-descriptions-item><span class="item-message">我</span></el-descriptions-item>
          <el-descriptions-item>
            <span class="item-message item-index-message">{{ approvalState }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <span class="item-message">申请意见：{{ approvalMes }}</span>
          </el-descriptions-item>
        </el-descriptions>
        <div>
          <div class="item-hr">
            <span class="item-left-hr"></span>
            <el-icon size="16"><Edit /></el-icon>
            我的审核意见
          </div>
          <div class="item-form">
            <el-form :model="form" :rules="rules" label-width="120px">
              <el-form-item label="审核结果：">
                <el-radio-group v-model="form.agree">
                  <el-radio label="同意" />
                  <el-radio label="不同意" />
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="opinion" label="审核意见：">
                <el-input v-model="form.opinion" type="textarea" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="item item-third item-end">
        <el-descriptions column="1">
          <el-descriptions-item>
            <span class="item-message">审核完成</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import type { FormRules } from 'element-plus'

const requestCode = ref('TEST294063053045')
const username = ref('Jay.Liu')
const time = ref('2022-10-01 12:00')
const mes = ref('上传最新测试数据')
const approvalState = ref('审核中')
const approvalMes = ref('暂无')
const form = reactive({
  agree: '',
  opinion: ''
})
const rules = reactive<FormRules>({
  opinion: [{ required: true, message: '请输入审核意见', trigger: 'blur' }]
})
const onSubmit = () => {
  console.log('submit!')
}
</script>

<style scoped lang="scss">
$margin-size: calc(var(--oe-perf-padding) + var(--oe-perf-approval-icon-size));
$margin-icon-line: 5px;

h4 {
  font-size: var(--oe-perf-font-size-header);
}
p {
  font-size: var(--oe-perf-font-size-body);
}
h4, p {
  margin-bottom: var(--oe-perf-padding);
}
.time-line {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.item {
  box-sizing: border-box;
  margin-left: $margin-size; /*用左边margin显示时间线*/
  width: calc(100% - $margin-size); /*因为左边部分用于显示时间线，所以右边部分减去30px*/
  height: auto; /*高度由内容决定*/
  position: relative;
  margin-bottom: $margin-size;
}
.item::before {
  content: "";
  display: flex;
  justify-content: center;
  align-items:center;
  box-sizing: border-box;
  width: var(--oe-perf-approval-icon-size);
  height: var(--oe-perf-approval-icon-size);
  color: var(--oe-perf-approval-normal-color);
  border: 2px solid var(--oe-perf-approval-normal-color);
  border-radius: 100%;
  position: absolute;
  left: calc(0px - $margin-size);
  z-index: 1;
}
.item::after {
  content: "";
  width: 2px;
  height: calc(100% + var(--oe-perf-padding) - $margin-icon-line * 2);
  background-color: var(--oe-perf-approval-normal-color);
  position: absolute;
  top: calc(var(--oe-perf-approval-icon-size) + $margin-icon-line);
  left: calc(0px - var(--oe-perf-approval-icon-size) / 2 - var(--oe-perf-padding));
  z-index: 0;
}
.item-first::before {
  content: "1";
}
.item-second::before {
  content: "2";
}
.item-third::before {
  content: "3";
}
.item-accomplished::before {
  content: "✓";
  border: 2px solid var(--oe-perf-color-secondary);
  color: var(--oe-perf-color-secondary);
}
.item-accomplished::after {
  background-color: var(--oe-perf-color-secondary);
}
.item-index::before {
  background-color: var(--oe-perf-color-secondary);
  border: 0;
  color: var(--oe-perf-font-color);
}
.item-end::after {
  content: "";
  width: 0;
  height: 0;
}
.item-message {
  color: var(--oe-perf-approval-normal-color);
  font-size: var(--oe-perf-font-size-body);
  float: left;
  text-align: left;
}
.item-message::after {
  content: "";
  clear: both;
  height:0;
  line-height:0;
  display:block;
  visibility:hidden;
}
.item-bold-message {
  color: #000000;
}
.item-index-message {
  color: var(--oe-perf-color-secondary);
}
.item-hr {
  border-bottom: 1px solid #ee8746;
  border-left: 2px solid var(--oe-perf-approval-normal-color);
  color: #ee8746;
  font-size: var(--oe-perf-font-size-body);
  font-weight: bold;
  padding: $margin-icon-line;
  box-sizing: border-box;
  position: relative;
}
.item-left-hr {
  position: absolute;
  left: -3px;
  bottom: -3px;
  width: 6px;
  height: 3px;
  background-color: #ffffff;
}
.item-form {
  background-color: var(--oe-perf-bg-layout);
  margin-top: $margin-icon-line;
  padding: $margin-icon-line $margin-size;
}
</style>
