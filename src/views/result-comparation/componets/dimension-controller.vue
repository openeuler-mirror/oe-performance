<template>
  <div class="dimension-controller">
    <div class="dimension-controller-inner">
      <el-row
        v-for="(dim,idx) in (Object.keys(filterOptions))"
        :key="`${dim}${idx}`"
        :class="{
          'dimension-row': true,
          'dimension-checked': checkedDimension === dim,
          'button-item': true
        }"
      >
        <div class="checkbox-group-label">
          <span
            v-if="isChangeDimensionClickValid(dim)"
            class="dimension-label__controller"
            @click="dimensionChecked(dim)">
            {{ getDimensionLabel(dim) }}：
          </span>
          <el-tooltip
            v-else-if="Array.from(filterOptions[dim]).length > 1"
            content="请至少选择一个参数值"
            placement="bottom"
            effect="light"
            >
            <span class="dimension-label__controller">{{ getDimensionLabel(dim) }}：</span>
          </el-tooltip>
          <span v-else class="dimension-label">{{ getDimensionLabel(dim) }}：</span>
        </div>
        <oe-checkbox-group
          v-model="checkedListByDimension[dim]"
          class="checkbox-group-component"
          :options="Array.from(filterOptions[dim])"
          @change="val => dimensionOptionChecked(dim, val)"
        />
      </el-row>
      <el-row class="dimension-row">
        <span class="checkbox-group-label">测试套：</span>
        <oe-checkbox-group
          class="checkbox-group-component"
          v-model="suiteSelection"
          :options="suiteFilter"
          @change="handleSuiteFiltering"
          :check-all-when-options-changed="true"
        />
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OeCheckboxGroup from '@/components/oe-checkbox-group/index.vue'

import { getDimensionLabel } from '../utils/tjobCompute'

interface OptionData {
  // osv: ['openEuler', 'centos']
  [key:string]: Array<string|undefined> | undefined | null
}

const props = withDefaults(
  defineProps<{
    optionsData: OptionData
    suiteFilter: string[]
  }>(),
  {
    optionsData: () => { return {} },
    suiteFilter: () => []
  }
)

const emit = defineEmits<{
  (event: 'filtering', dimension: string, filterArr: Array<string>): void
  (event: 'suiteFiltering', filterArr: Array<string>): void
}>()

const filterOptions = ref(props.optionsData)

const checkedListByDimension = ref({})

const checkedDimension = ref('osv')

const suiteSelection = ref(props.suiteFilter)

/**
 * 当重新搜索后，可能会导致可选的测试套option变化。测试套option的变化需要suite的checkboxgroup更新选中数据
 * 更新选中数据后可能会导致图标的echarts重绘。此时若上一个echarts实例还未绘制完就触发重绘会导致报错。
 * 此处为数据更新给一个延迟，避免echarts重绘。
 */
const handleSuiteFiltering = (val:string[]) => {
  setTimeout(() => {
    emit('suiteFiltering', val)
  }, 100);
}

const isChangeDimensionClickValid = (dim) => {
  const checkList = checkedListByDimension.value[dim] || []
  return Array.from(filterOptions.value[dim]).length > 1 && checkList.length > 0
}

const dimensionChecked = (dim) => {
  if (checkedDimension.value === dim) return
  const checkList = checkedListByDimension.value[dim] || []
  if (isChangeDimensionClickValid(dim)) {
    checkedDimension.value = dim
    setTimeout(() => {
      emit('filtering', dim, checkList)
    },100)
  }
}

/**
 * 选择维度后，更新图标的维度和过滤信息
 * @param dim 维度，string
 * @param val 当前维度的过滤值，string[]
 */
const dimensionOptionChecked = (dim, val) => {
  if (val && val.length > 0) {
    checkedDimension.value = dim
    setTimeout(() => {
      emit('filtering', dim, val)
    },100)
  }
}

const checkedListInit = () => {
  // 初始化各个维度的数据结构
  Object.keys(props.optionsData).forEach(suite => {
    // 初始化后，所有维度默认选择第一个元素
    const initChecked = Array.from(props.optionsData[suite])[0]
    initChecked && (checkedListByDimension.value[suite] = [initChecked])
  })
}

defineExpose({
  checkedListInit
})

</script>
<style scoped lang="scss">
.dimension-controller {
  display: flex;
  margin: 12px 0 24px 0;
  .main-label {
    line-height: 32px;
    margin-right: 10px;
    max-width: 80px;
    min-width: 80px;
  }
  &-inner {
    width: 100%;
    .controller-item:not(:last-child) {
      margin-right: 8px;
    }
  }

  .dimension-row {
    padding: 16px 0 16px 16px;
    border-bottom: 1px solid #efefef;
    border-left: 2px solid transparent;
    &.dimension-checked {
      border-left: 2px solid var(--oe-perf-color-primary);
    }

    &.button-item {
      :deep(.el-checkbox__label) {
        padding: 4px 8px;
        margin-left: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
        &:hover {
          border-color: var(--oe-perf-color-primary);
        }
      }
      :deep(.el-checkbox.is-checked) {
        .el-checkbox__label {
          background-color: var(--oe-perf-color-primary);
          color: #fff;
          border-color: var(--oe-perf-color-primary);
        }
      }
    }
  }

  .checkbox-group-label {
    display: inline-block;
    line-height: 32px;
    width:190px;
    text-align: right;
    margin-right: 8px;
    .dimension-label {
      cursor: default;
      &__controller {
        cursor: pointer;
        &:hover {
          color: var(--oe-perf-color-primary);
        }
      }
    }
  }
  .checkbox-group-component {
    flex: 1;
    width: 50%;
  }
}
</style>