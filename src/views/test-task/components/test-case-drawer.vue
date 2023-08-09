<template>
  <el-drawer
    v-model="drawer"
    :direction="direction"
    :before-close="handleClose"
    width="500">
    <template #title>
      <h4>用例列表</h4>
    </template>
    <template #default>
      <div>
        <el-input
          v-model="searchInput"
          placeholder="请选择"
          multiple
          class="input-with-select">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[1, 1.1, 2, 2.1]"
        :props="defaultProps"
        ref="tree"
        @check="handleCheckChange" />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref, toRaw, defineEmits, computed } from 'vue'
import type { ElTree } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

const props = defineProps({
  drawer: Boolean
})

const drawer = computed({
  get: () => props.drawer,
  set: () => emit('changeDrawer')
})

const direction = ref<'ltr' | 'rtl' | 'ttb' | 'btt' | undefined>('ltr')

const searchInput = ref('')
const defaultProps = {
  children: 'children',
  label: 'label'
}
const tree = ref<InstanceType<typeof ElTree>>()
// 获取选择的数据
const selectedExample = ref<TestTask.CaseDrawerData>()

function handleCheckChange() {
  const exampleArr = tree.value!.getCheckedNodes()
  for (const key in exampleArr) {
    exampleArr[key] = toRaw(exampleArr[key])
  }
  selectedExample.value = exampleArr as TestTask.CaseDrawerData
}

const data: TestTask.CaseDrawerData = [
  {
    id: 1,
    label: '单核',
    children: [
      {
        id: 1.1,
        label: 'hackbench',
        children: [
          {
            id: 1.2,
            label: 'nr_task=100%,mode=process,ipc=pipe,datasize=100,loop=30000'
          },
          {
            id: 1.3,
            label: 'nr_task=50%,mode=process,ipc=pipe,datasize=100,loop=30000'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '多核',
    children: [
      {
        id: 2.1,
        label: 'unixbench',
        children: [
          {
            id: 2.2,
            label: 'test=shell_er_task=l_iterations=30'
          },
          {
            id: 2.3,
            label: 'test=shell_er_task=l_iterations=40'
          }
        ]
      }
    ]
  }
]

const emit = defineEmits(['changeDrawer', 'selectedExample'])
function confirmClick() {
  emit('changeDrawer')
  emit('selectedExample', { selectedExample: selectedExample })
}
function cancelClick() {
  emit('changeDrawer')
}
function handleClose() {
  emit('changeDrawer')
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
