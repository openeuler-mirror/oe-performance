<template>
  <div class="performance-baseline-test-subassembly">
    <el-row :gutter="25">
      <el-col :span="2"
        ><span class="general-font-style">测试组件:</span></el-col
      >
      <el-col :span="22">
        <el-radio-group v-model="selectedSuite" class="ml-4">
          <el-radio-button label="unixbench" />
          <el-radio-button label="lmbench" />
          <el-radio-button label="iperf" />
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="25">
      <el-col :span="2"
        ><span class="general-font-style">筛选内容:</span></el-col
      >
      <el-col :span="6">
        <el-row :gutter="8">
          <el-col :span="8" class="general-font-style"
            ><span>测试模型版本:</span></el-col
          >
          <el-col :span="16">
            <el-cascader
              placeholder="请选择测试模型版本"
              v-model="value"
              :options="options"
              @change="hChange"
              clearable />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row :gutter="8">
          <el-col :span="8" class="general-font-style"
            ><span>服务器型号:</span></el-col
          >
          <el-col :span="16">
            <el-select
              placeholder="请选择服务器型号"
              v-model="searchParams.testbox"
              clearable
              filterable
            >
              <el-option
                v-for="item in searchParamsOptions.testboxList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row :gutter="8">
          <el-col :span="8" class="general-font-style"
            ><span>CPU配置:</span></el-col
          >
          <el-col :span="16">
            <el-select
              placeholder="请选择CPU配置"
              v-model="searchParams.nr_cpu"
              clearable
              filterable
            >
              <el-option
                v-for="item in searchParamsOptions.cpuList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row :gutter="8">
          <el-col :span="8" class="general-font-style"
            ><span>内存配置:</span></el-col
          >
          <el-col :span="16">
            <el-select
              placeholder="请选择内存配置"
              v-model="searchParams.memory"
              clearable
              filterable
            >
              <el-option
                v-for="item in searchParamsOptions.memoryList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="25">
      <el-col :span="2"></el-col>
      <el-col :span="6">
        <el-row :gutter="8">
          <el-col :span="8" class="general-font-style"
            ><span>硬盘配置:</span></el-col
          >
          <el-col :span="16">
            <el-cascader
              placeholder="请选择硬件配置"
              v-model="value"
              :options="options"
              @change="hChange"
              clearable />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row :gutter="8">
          <el-col :span="8" class="general-font-style"
            ><span>Raid卡:</span></el-col
          >
          <el-col :span="16">
            <el-cascader
              placeholder="请选择Raid卡"
              v-model="value"
              :options="options"
              @change="hChange"
              clearable />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row :gutter="8">
          <el-col :span="8" class="general-font-style"
            ><span>组网配置:</span></el-col
          >
          <el-col :span="16">
            <el-cascader
              placeholder="请选择组网配置"
              v-model="value"
              :options="options"
              @change="hChange"
              clearable />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row :gutter="8">
          <el-col :span="8" class="general-font-style"
            ><span>测试用例:</span></el-col
          >
          <el-col :span="16">
            <el-cascader
              placeholder="请选择测试用例"
              v-model="value"
              :options="options"
              @change="hChange"
              clearable />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="25">
      <el-col :span="2"></el-col>
      <el-col :span="6">
        <el-row :gutter="8">
          <el-col :span="8" class="general-font-style"
            ><span>测试工具版本:</span></el-col
          >
          <el-col :span="16">
            <el-cascader
              placeholder="请选择测试工具版本"
              v-model="value"
              :options="options"
              @change="hChange"
              clearable />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row :gutter="8">
          <el-col :span="8" class="general-font-style"
            ><span>操作系统:</span></el-col
          >
          <el-col :span="16">
            <el-cascader
              placeholder="请选择操作系统"
              v-model="value"
              :options="options"
              @change="hChange"
              clearable />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row :gutter="8">
          <el-col :span="8" class="general-font-style"
            ><span>数据来源:</span></el-col
          >
          <el-col :span="16">
            <el-cascader
              placeholder="请选择数据来源"
              v-model="value"
              :options="options"
              @change="hChange"
              clearable />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5"></el-col>
    </el-row>
    <el-row :gutter="20" justify="center">
      <el-col :span="2"><el-button>重置</el-button></el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          @click="handleSearch"
          :disabled="performanceStore.loadingStatus.searchLoading"
          >
          搜索
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { usePerformanceData } from '@/stores/performanceData'

import { getSearchParams } from '@/api/performance'

const selectedSuite = ref('unixbench')
const value = ref([])
const performanceStore = usePerformanceData()

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
            label: 'Consistency'
          }
        ]
      }
    ]
  }
]

const searchParamsOptions = reactive({
  testboxList: [], // 服务器型号
  cpuList: [], // cpu配置
  memoryList: [], // 内存配置
})

const searchParams = reactive({
  testbox: '',
  nr_cpu: '',
  memory: ''
})

const hChange = (value: any) => {
  console.log(value)
}

const emit = defineEmits<{
  // 在此处收集查询菜单中的查询条件，整理后去请求全量的submit_id列表
  // 如果用户选择了机器配置类的条件，则需要先根据机器配置去获取对应的主机列表。
  // 然后通过主机列表和其他条件去查询submit_id列表
  (event: 'search', params:searchParams): void
}>()

const handleSearch = () => {
  emit('search', { ...searchParams, suite: selectedSuite.value})
}

// 获取搜索条件
const getRawSearchParams = () => {
  getSearchParams({
    index: 'jobs',
    query: {
      size: 0,
      _source: ['submit_id', 'suite'],
      query: {
        bool: {
          must: [
            {match: {suite: selectedSuite.value}},
            {exists: {field: 'submit_id'}}
          ]
        }
      },
      aggs: {
        uid_aggs: {
          terms: {
            field: 'submit_id',
            size: 10000,
          },
          aggs: {
            my_top_hits: {
              top_hits: {
                _source: {
                  includes: ['suite', 'submit_id', 'os', 'os_version', 'nr_cpu', 'memory', 'testbox', 'kernel_version', 'nr_node', 'job_stage', 'job_health']
                },
                size: 1 // 查询配置是通用配置，只取其中的第一个job的数据做处理
              }
            }
          }
        }
      }
    }
  }).then((res) => {
    const rawData = res.data.aggregations.uid_aggs.buckets.map(sub_item => sub_item.my_top_hits.hits.hits[0]._source)
    console.log('粗粒度筛选数据: ', rawData)
    generateSearchParams(rawData)
  })
}

const generateSearchParams = (testResultCommonParamsList: any) => {
  testResultCommonParamsList.forEach(item => {
    if (item.testbox && searchParamsOptions.testboxList.indexOf(item.testbox) === -1) {
      searchParamsOptions.testboxList.push(item.testbox)
    }
    if (item.nr_cpu && searchParamsOptions.cpuList.indexOf(item.nr_cpu) === -1) {
      searchParamsOptions.cpuList.push(item.nr_cpu)
    }
    if (item.memory && searchParamsOptions.memoryList.indexOf(item.memory) === -1) {
      searchParamsOptions.memoryList.push(item.memory)
    }
  })
  console.log('筛选数据: ', searchParamsOptions)
}

onMounted(() => {
  getRawSearchParams()
})

</script>

<style scoped lang="scss">
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
