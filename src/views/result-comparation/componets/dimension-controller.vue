<template>
  <div class="dimension-controller">
    <div class="main-label">对比维度</div>
    <div class="dimension-controller-inner">
      <el-row>
        <el-radio-group class="controller-item" v-model="dimension">
          <el-radio-button
            v-for="(label,idx) in (Object.keys(filterOptions))"
            :label="label"
            :key="`${label}${idx}`"/>
        </el-radio-group>
        <el-select
          class="controller-item"
          v-model="filterList"
          placeholder="请先搜索数据"
          multiple
          collapse-tags
          collapse-tags-tooltip
          clearable
        >
          <el-option
            class="controller-item"
            v-for="item in (filterOptions[dimension] || {})"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-button type="primary" @click="handleFiltering">对比</el-button>
      </el-row>
      <el-row
        v-for="(dim,idx) in (Object.keys(filterOptions))"
        :key="`${dim}${idx}`"
        class="dimension-row"
      >
        <span class="checkbox-group-label">{{ dim }}：</span>
        <oe-checkbox-group
          class="checkbox-group-component"
          :options="Array.from(filterOptions[dim])"
        />
      </el-row>
      <el-row>
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

const dimension = ref('osv')

const filterOptions = ref(props.optionsData)
const filterList = ref([])

const suiteSelection = ref(props.suiteFilter)

const handleFiltering = () => {
  emit('filtering', dimension.value, filterList.value)
}

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
    width: 90%;
    .controller-item:not(:last-child) {
      margin-right: 8px;
    }
  }

  .dimension-row {
    padding: 16px 0;
    border-bottom: 1px solid #efefef;
  }

  .checkbox-group-label {
    display: inline-block;
    line-height: 32px;
    min-width: 70px;
    max-width: 70px;
    text-align: right;
    margin-right: 8px;
  }
  .checkbox-group-component {
    width: 90%;
  }
}
</style>