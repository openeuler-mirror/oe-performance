<template>
    <el-drawer v-model="drawer" :direction="direction">
    <template #title>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
sdaaaa
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElMessageBox } from 'element-plus'


const props = defineProps({
  drawer: Boolean
})
const drawer = ref(props.drawer)

const emit = defineEmits(['changeDrawer'])

const sendDrawer = () => {
  emit('changeDrawer', false)
}
watch(props,(newValue,oldValue)=>{
  sendDrawer()
  console.log('sum变化了',newValue,oldValue)
},{immediate:true})

const direction = ref('rtl')

function confirmClick() {
  ElMessageBox.confirm('Are you confirm to chose?')
    .then(() => {
      sendDrawer()
    })
    .catch(() => {
      // catch error
    })
}
function cancelClick() {
  sendDrawer()
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>