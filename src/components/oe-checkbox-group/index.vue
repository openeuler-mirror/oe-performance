<template>
  <div class="oe-checkbox-group">
    <el-checkbox
      class="checkbox-all"
      v-if="options.length > 1"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
      >All</el-checkbox
    >
    <div class="checkbox-options-contanier">
      <el-checkbox-group
        v-if="options.length > 1"
        v-model="checkedValues"
        @change="handleCheckedItemChange"
      >
        <el-checkbox
          class="checkbox-options-item"
          v-for="item in options"
          :key="item"
          :label="item">
          {{item}}
        </el-checkbox>
      </el-checkbox-group>
      <div v-else>{{ options[0] }}</div>
    </div>
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
const handleCheckedItemChange = (value: string[]) => {
  // const checkedCount = value.length
  // checkAll.value = checkedCount === props.options.length

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
  }
</stlye>