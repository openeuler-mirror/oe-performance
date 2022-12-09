<template>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <span>测试用例配置</span>
      </div>
    </template>
    <el-row>
        测试组件：
      <el-radio-group
      v-model="radioModule"
      @change="selectRadio">
        <el-radio-button label="unixbench">unixbench</el-radio-button>
        <el-radio-button label="specpu2006">specpu2006</el-radio-button>
        <el-radio-button label="specpu2017">specpu2017</el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row>
        选择用例：<el-button type="primary" @click="drawer = true">选择用例</el-button>
        <exampleDrawer
        :drawer="drawer"
        @changeDrawer="closeDrawer"
        @selectedExample="selectedExample"></exampleDrawer>
    </el-row>
    <el-row style="margin-left: 20px;">
        <el-table :data="state.selectedExample" style="width: 100%;" border="true" v-if="tableEmpty">
          <template #empty>
              <el-empty description="请先选择用例" image-size="70" style="line-height: 0px;"/>
          </template>
        </el-table>
      <div class="demo-collapse" v-if="state.selectedExample" style="width: 100%;">
        <el-collapse v-model="activeNames">
          单核:
          <el-collapse-item title="hackbench" name="1">
            <div v-for="(item, index) in state.selectedExample" :key="index">
              {{item}}
            </div>
          </el-collapse-item>
          多核:
          <el-collapse-item title="hackbench" name="2">
            <div v-for="(item, index) in state.selectedExample" :key="index">
              {{item}}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-row>
  </el-card>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <span>软件配置</span>
      </div>
    </template>
    <el-row>
        镜像类型：
      <el-radio-group v-model="radioMirror" @change="selectRadio">
        <el-radio-button label="公共镜像">公共镜像</el-radio-button>
        <el-radio-button label="市场镜像">市场镜像</el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row>
      <span style="margin-right: 15px;">选择OS镜像版本:</span>
      <el-cascader v-model="selectedVersion" :options="imageVersion" clearable style="200%"/>
    </el-row>
  </el-card>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <div>CPU类型</div>
      </div>
    </template>
      <el-row>
        <span style="margin-right: 20px;">CPU架构:</span>
        <el-radio-group v-model="radioFramework" @change="selectRadio">
          <el-radio-button label="x86">x86</el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row>
        <span style="margin-right: 20px;">CPU规格:</span>
        <el-radio-group v-model="radioSpecification" @change="selectRadio">
          <el-radio-button label="通用计算增强型">通用计算增强型</el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row>
        <el-radio-group v-model="specification1" @change="selectRadio" style="margin-left: 87px;">
          <el-radio-button label="C6">C6</el-radio-button>
          <el-radio-button label="C6s">C6s</el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row>
        <el-radio-group v-model="specification2" @change="selectRadio" style="margin-left: 87px;">
          <el-radio-button label="2核">2核</el-radio-button>
          <el-radio-button label="4核">4核</el-radio-button>
          <el-radio-button label="8核">8核</el-radio-button>
          <el-radio-button label="16核">16核</el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row>
        <el-radio-group v-model="specification3" @change="selectRadio" style="margin-left: 87px;">
          <el-radio-button label="32G">32G</el-radio-button>
        </el-radio-group>
      </el-row>
  </el-card>
  <el-card shadow="always" style="margin-bottom: 20px;">
    <div style="margin-left: 40%;">
      <el-button style="margin-right: 40px;">取消</el-button>
      <el-button type="primary" @click="submitTest">提交</el-button>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import exampleDrawer from './components/test-case-drawer.vue'

const radioModule = ref('unixbench')

// 选择用例
const tableEmpty = ref(true)

const drawer = ref(false)
const state = ref([] as any);
const selectedExample = (selectedExample: any) => {
  state.value = selectedExample
  console.log('获取到了选择了的测试用例', state.value);
  tableEmpty.value = false
}

const radioMirror = ref('公共镜像')
const selectRadio = (label: any) => {
  console.log(label, '切换任务类型的处理')
}

const selectedVersion = ref('')



const closeDrawer = () => {
  drawer.value = false
}

const activeNames = ref(['1'])





const imageVersion = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines'
      },
      {
        value: 'navigation',
        label: 'Navigation'
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic'
      },
      {
        value: 'form',
        label: 'Form',
      },
      {
        value: 'data',
        label: 'Data',
      },
      {
        value: 'notice',
        label: 'Notice'
      },
      {
        value: 'navigation',
        label: 'Navigation',
      },
      {
        value: 'others',
        label: 'Others',
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]
const radioFramework = ref('x86')
const radioSpecification = ref('通用计算增强型')
const specification1 = ref('C6')
const specification2 = ref('8核')
const specification3 = ref('32G')


function submitTest() {
  const test = {
    radioModule: radioModule,
    testExample: state.value,
    radioMirror: radioMirror,
    imageVersion: selectedVersion,
    radioFramework:radioFramework,
    radioSpecification:radioSpecification,
    specification1:specification1,
    specification2:specification2,
    specification3:specification3,
  }
  console.log(test);
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-card {
  margin-bottom: 6px;
}
</style>
