<template>
  <div class="oe-checkbox-group">
    <el-checkbox
      class="checkbox-all"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
      >All</el-checkbox
    >
    <div class="checkbox-options-contanier">
      <el-checkbox-group
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
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { computed, watch } from 'vue'
import { isArrayTheSame_l1 } from '@/utils/utils'
  
const props = withDefaults(
  defineProps<{
    modelValue: string[],
    options: string[]
  }>(),
  {
    modelValue: () => [],
    options: () => []
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
    if (curv.length < prev.length) {
      checkedValues.value = props.modelValue.filter(suite => props.options.indexOf(suite) > -1)
    } else if (curv.length > prev.length) {
      checkedValues.value = curv
    }
  }
)
</script>

<stlye lang="scss">
  .oe-checkbox-group {
    display: inline-flex;
  }
</stlye>