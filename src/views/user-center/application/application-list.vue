<template>
  <el-card shadow="always">
    <el-row :gutter="20">
      <span class="promit-font-style">查询条件:</span>
      <el-col :span="12">
        <el-input
          v-model="value"
          placeholder="搜索"
          class="input-with-select"
          :suffix-icon="Search"
          size="large"
        >
          <template #prepend>
            <el-select v-model="select" placeholder="申请单号" style="width: 115px" size="large">
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
            </el-select>
          </template>
        </el-input>
      </el-col>
      <span class="right-btn">
        <el-button type="primary" size="large" @click="centerDialogVisible = true">新建申请</el-button>
      </span>
    </el-row>
    <el-dialog
      v-model="centerDialogVisible"
      title="新建申请"
      width="30%"
      align-center
      class="dialog-with-body"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="测试场景：">
          <el-cascader v-model="form.region" placeholder="请选择测试场景" :options="options" @change="handleChange" />
        </el-form-item>
        <el-form-item label="上传文件：">
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
          >
            <el-button type="primary">Click to upload</el-button>
            <span class="btn-a-margin"><a href="#">下载模板</a></span>
            <template #tip>
              <div class="el-upload__tip">
                支持扩展名：.csv...
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="申请描述：">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            新建
          </el-button>
        </span>
      </template>
    </el-dialog>
    <application-table @pushView="intoView"></application-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox,UploadProps, UploadUserFile } from 'element-plus'
import { useRouter } from 'vue-router'
import  ApplicationTable  from '../components/application-table.vue'

const router = useRouter()

const select = ref('')
const value = ref('')
const centerDialogVisible = ref(false)
const form = reactive({
  region: '',
  description: ''
})

const handleChange = (value) => {
  console.log(value)
}

function intoView() {
  router.push({
    path: '/userCenter/application/applicationProgress'
  })
}
const fileList = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

const options = [
  {
    value: '解决方案',
    label: '解决方案',
    children: [
      {
        value: '解决方案',
        label: '解决方案'
      }
    ],
  },
  {
    value: '基础性能',
    label: '基础性能',
    children: [
      {
        value: 'CPU',
        label: 'CPU'
      },
      {
        value: '内存',
        label: '内存'
      },
      {
        value: '储存',
        label: '储存'
      },
      {
        value: '网络',
        label: '网路'
      }
    ],
  },
]
</script>

<style scoped lang="scss">
.input-with-select ::v-deep .el-input-group__prepend {
  background-color: var(--oe-perf-bg-section)!important;
}
.promit-font-style {
  display: flex;
  align-items: center;
}
.right-btn {
  display: block;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
}
.btn-a-margin {
  margin-left: var(--oe-perf-padding);
}
a {
  color: var(--oe-perf-color-secondary);
}
</style>
<style>
.dialog-with-body .el-dialog__body {
  border: 1px solid #dddddd!important;
}
</style>
