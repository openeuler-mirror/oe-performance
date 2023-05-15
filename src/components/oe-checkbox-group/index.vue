<template>
  <div class="oe-checkbox-group">
    <div v-if="options.length === 0" class="plain-text">暂无数据</div>
    <template v-else>
      <template v-if="options.length > 1">
        <el-checkbox
          class="checkbox-all"
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >All</el-checkbox
        >
        <div class="checkbox-options-contanier">
          <el-scrollbar max-height="128px">
            <el-checkbox-group
              v-model="checkedValues"
            >
              <el-checkbox
                class="checkbox-options-item"
                v-for="item in options"
                :key="item"
                :label="item">
                {{item}}
              </el-checkbox>
            </el-checkbox-group>
          </el-scrollbar>
        </div>
      </template>
      <div class="plain-text" v-else>
        <el-scrollbar max-height="128px">
          {{ options[0] }}
        </el-scrollbar>
      </div>
    </template>
  </div>
</template>
  
<script lang="ts" setup>
import { computed, watch } from 'vue'
import { isArrayTheSame_l1 } from '@/utils/utils'
  
const props = withDefaults(
  defineProps<{
    modelValue: string[],
    options: string[],
    checkAllWhenOptionsChanged?: boolean // 当options变化时，是否自动全选。为false时，options变化后选择的值不变
  }>(),
  {
    modelValue: () => [],
    options: () => [],
    checkAllWhenOptionsChanged: false
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', val: string[]): void
  (e: 'change', val: string[]): void
}>()

const checkedValues = computed({
  get: () => props.modelValue,
  set: val => {
    checkedValueChange(val)
  }
})

const isIndeterminate = computed(() => {
  return checkedValues.value.length > 0 && checkedValues.value.length !== props.options.length
})

const checkAll = computed({
  get: () => checkedValues.value.length > 0 && checkedValues.value.length === props.options.length,
  set: val => val
})

const handleCheckAllChange = (val: boolean) => {
  checkedValues.value = val ? props.options : []
}

const checkedValueChange = (value: string[]) => {
  emits('update:modelValue', value)
  emits('change', value)
}

watch(
  () => props.options,
  (curv, prev) => {
    if (isArrayTheSame_l1(prev, curv)) return
    props.checkAllWhenOptionsChanged && (checkedValues.value = curv)
  }
)
</script>

<stlye lang="scss">
  .oe-checkbox-group {
    display: inline-flex;
    .checkbox-all {
      margin-right: 16px;
    }

    .plain-text {
      line-height: 32px;
      color: #333;
      width: 100%;
    }

    .checkbox-options-contanier {
      width: calc(100% - 72px);
    }
  }
</stlye>