<template>
  <el-card shadow="always">
    <h4>审批操作</h4>
    <p>申请单号：{{ data.data.requestCode }}</p>
    <div class="time-line">
      <div
      class="item item-first"
      :class="{'item-index': indexNum === 1, 'item-accomplished': indexNum > 1}"
      >
        <el-row :gutter="20">
          <el-col :span="3">
            <span
            class="item-message"
            :class="{ 'item-bold-message': indexNum === 1}"
            >
              提交申请
            </span>
          </el-col>
          <el-col :span="3"><span class="item-message">{{ data.data.submitter }}</span></el-col>
          <el-col :span="6"><span class="item-message">{{ data.data.date }}</span></el-col>
          <el-col :span="12"><span class="item-message">申请描述：{{ data.data.describe }}</span></el-col>
        </el-row>
      </div>
      <div
      class="item item-second"
      :class="{'item-index': indexNum === 2, 'item-accomplished': indexNum > 2}"
      >
        <el-row :gutter="20">
          <el-col :span="3">
            <span
            class="item-message item-margin"
            :class="{ 'item-bold-message': indexNum === 2 }"
            >
              审核中
            </span>
          </el-col>
          <el-col :span="3">
            <span class="item-message">{{ data.data.approver }}</span>
          </el-col>
          <el-col :span="6">
            <span class="item-message item-index-message">{{ data.data.progress }}</span>
          </el-col>
          <el-col :span="12">
            <span class="item-message">审批意见：{{ approvalMes }}</span>
          </el-col>
        </el-row>
        <div v-if="indexNum === 2 && judgePath">
          <div class="item-hr">
            <el-icon size="16"><Document /></el-icon>
            <span class="item-txt">我的审核意见</span>
          </div>
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
      <div
      class="item item-third item-end"
      :class="{'item-accomplished': indexNum === 3}"
      >
        <el-row :gutter="20">
          <el-col :span="3">
            <span
            class="item-message"
            :class="{ 'item-bold-message': indexNum === 3 }"
            >
              审核完成
            </span>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { FormRules } from 'element-plus'
import { useRoute } from 'vue-router'
const indexNum = ref(1)

const route = useRoute()
const judgePath = ref(false)
const approvalMes = ref('暂无')
const form = reactive({
  agree: '',
  opinion: ''
})
const rules = reactive<FormRules>({
  opinion: [{ required: true, message: '请输入审核意见', trigger: 'blur' }]
})
const data = reactive({
  data:{}
})
const onSubmit = () => {
  console.log('submit!')
}

function judgeProgress(type: string) {
  let progress = {
    // '未提交': () => { return 1 },
    '待审批': () => { return 2 },
    'default': () => { return 3 }
  }
  return (progress[type] || progress['default'])()
}
onMounted(() => {
  if(route.meta.title === 'applicationProgress')
    judgePath.value = false
  else judgePath.value = true
  data.data = route.query
  indexNum.value = judgeProgress(data.data.progress)
})
</script>

<style scoped lang="scss">
@import "@/views/user-center/public/styles/index.scss";

</style>
<style lang="scss">
.item-hr .item-txt {
  font-size: var(--oe-perf-font-size-caption)!important;
}
</style>
