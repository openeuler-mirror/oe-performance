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
          @input="inputValue"
        >
          <template #prepend>
            <el-select
              v-if="JSON.stringify(tableData.data) !== '{}'"
              v-model="select"
              placeholder="申请单号"
              style="width: 115px" size="large"
              @change="changeSelect"  
            >
              <el-option
                v-for="item in tableData.data"
                :key="item.requestCode"
                :label="item.requestCode"
                :value="item.requestCode"
              />
            </el-select>
          </template>
        </el-input>
      </el-col>
      <span class="right-btn">
        <el-button type="primary" size="large" @click="centerDialogVisible = true">新建申请</el-button>
      </span>
    </el-row>
    <el-drawer
    v-model="centerDialogVisible"
    direction="rtl"
    size="50%"
    >
      <template #header>
        <span class="el-drawer-header">新建申请</span>
      </template>
      <div class="el-drawer-form">
        <el-form :model="form">
          <el-form-item label="测试场景：">
            <el-cascader
            class="my-el-cascader"
            v-model="form.region" placeholder="请选择测试场景" :options="options" @change="handleChange" />
          </el-form-item>
          <el-form-item label="上传文件：">
            <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              multiple
              :limit="1"
              :http-request="handleUpload"
            >
              <div class="upload-btn">
                <el-icon size="16"><Upload /></el-icon>
                <span class="upload-txt">上传文件</span>
              </div>
              <!-- <el-button type="primary">上传文件</el-button> -->
              <template #tip>
              <span class="btn-a-margin"><a @click.stop="download">下载模板</a></span>
                <div class="el-upload__tip">
                  支持扩展名：.xlsx...
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="申请描述：">
            <el-input
            v-model="form.description"
            type="textarea"
            maxlength="100"
            placeholder="（可选）请输入描述，不超过100个字符"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>   
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            新建
          </el-button>
        </span>
      </template>
    </el-drawer>
    <application-table
      v-if="JSON.stringify(propsData.data) !== '[]'"
      :tableData="propsData.data"
      @pushView="intoView"
    ></application-table>
    <el-empty v-else description="no data" />
  </el-card>
</template>

<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue'
import { getApplicationList } from '@/api/center/index.ts'
import { Search } from '@element-plus/icons-vue'
import { UploadUserFile } from 'element-plus'
import { useRouter } from 'vue-router'
import  ApplicationTable  from '../components/application-table.vue'

const router = useRouter()

const hashData = new Map()

const select = ref('')
const value = ref('')
const centerDialogVisible = ref(false)

const form = reactive({
  region: '',
  description: ''
})
const data = reactive({
  data: {}
})
const tableData = reactive({
  data: []
})
const propsData = reactive({
  data: []
})

function inputValue() {
  let v = value.value
  select.value = ''
  if(v) {
    propsData.data = []
    for (let [key, val] of hashData) {
      if(key.indexOf(v) !== -1) {
        propsData.data.push(tableData.data[val])
      }
    }
  } else propsData.data = tableData.data
}
function changeSelect() {
  propsData.data = [tableData.data[hashData.get(select.value)]]
}

function intoView(query) {
  router.push({
    path: '/userCenter/application/applicationProgress',
    query
  })
}

const fileList = ref<UploadUserFile[]>([])

const handleChange = (value) => {
  console.log(value)
}
const handleUpload = (uploadFiles) => {
  const fileReader = new FileReader();
  fileReader.readAsText(uploadFiles.file);
  fileReader.onload = function() {
    data.data = {}
    let content = this.result.toString().split('\r\n').filter(item => item !== '').map(item => item.split('\t'));
    for(let i = 0; i < content[0].length; i++) {
      try {
        let dt = content[1][i].replace(/""/g, '"')
        if(content[1][i][0] === '"') data.data[content[0][i]] = JSON.parse(dt.slice(1,-1))
        else data.data[content[0][i]] = JSON.parse(dt)
      } catch (e) {
        data.data[content[0][i]] = content[1][i]
      }
    }
    console.log(data.data)
  }
}

function download() {
  // values可以从后端获取数据
  let values = ['aaa','bbb','ccc','ddd','eee']
  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  let str = ''
  // 增加\t为了不让表格显示科学计数法或者其他格式
  for (let i = 0; i < values.length; i++) {
    str += `${values[i]},`
  }
  // 一个回车（'\n'）表示一行数据
  str += '\n'
  // encodeURIComponent解决中文乱码
  let url = `data:text/csv;charset=utf-8,\ufeff${encodeURIComponent(str)}`
  // 通过创建a标签实现
  let link = document.createElement('a')
  link.href = url
  // 对下载的文件命名
  link.download = 'template.xlsx'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  getApplicationList()
    .then((data) => {
      tableData.data = data.data.data
      propsData.data = data.data.data
      tableData.data.forEach((item, index) => {
        hashData.set(item.requestCode, index)
      })
    })
})

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
  margin-left: 16px;
}
a {
  color: #002FA7;
  cursor: pointer;
}
a:active {
  color: var(--oe-perf-color-secondary);
}
.el-drawer-header {
  display: block;
  padding: 12px 17px;
  color: #333333;
  font-size: 20px;
  width: 100%;
  border-bottom: 2px solid #E2E2E2;
}
.el-drawer-form {
  margin-top: 0;
  padding: calc(30px - var(--el-drawer-padding-primary)) 35px;
}
.upload-btn {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  line-height: 22px;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid rgba(0,0,0,0.15);
  font-size: 16px;
}
.upload-txt {
  font-size: 14px !important;
}
</style>
<style>
.my-el-cascader {
  width: 100%!important;
}
.el-drawer__header {
  margin-bottom: 0px;
}
</style>
