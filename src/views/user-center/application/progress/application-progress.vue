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
            class="item-message"
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
            <span class="item-message">审批意见：暂无</span>
          </el-col>
        </el-row>
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
            :class="{ 'item-bold-message': indexNum === 3}"
            >
              审核完成
            </span>
          </el-col>
        </el-row>
      </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const indexNum = ref(1)

const route = useRoute()
const data = reactive({
  data:{}
})
function judgeProgress(type: string) {
  let progress = {
    '未提交': () => { return 1 },
    '审批中': () => { return 2 },
    'default': () => { return 3 }
  }
  return (progress[type] || progress['default'])()
}
onMounted(() => {
  data.data = route.query
  indexNum.value = judgeProgress(data.data.progress)
})
</script>

<style scoped lang="scss">
@import "@/views/user-center/public/styles/index.scss";

</style>
