<template>
  <el-card shadow="always">
    <h2>{{resultName}}</h2>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-row>
          <el-col :span="8">创建人</el-col>
          <el-col :span="8">创建时间</el-col>
          <el-col :span="8">完成时间</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">所属项目</el-col>
          <el-col :span="8">测试几线</el-col>
          <el-col :span="8">产品版本</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">Job标签 -</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">备注 -</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <TaskDoughnut/>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <!-- ="props" -->
        <template #default>
          <div m="4" class="expand-table">
            <el-table :data="tableData">
              <el-table-column type="expand">
                <template #default>
                  <div m="2" class="expand-table">
                    <el-table :data="tableData">
                      <el-table-column prop="suite" width="430">
                        <template #header>
                          Test Case
                          <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="Top Center prompts info"
                            placement="top">
                            <el-icon style="float: right;"><Search /></el-icon>
                          </el-tooltip>
                        </template>
                      </el-table-column>
                      <el-table-column prop="result" width="100">
                        <template #header>
                          测试结果
                          <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="Top Center prompts info"
                            placement="top">
                            <el-icon><QuestionFilled /></el-icon>
                          </el-tooltip>
                        </template>
                        <template #default="scope">
                          <div style="color: #43BB57;" v-if="scope.row.result=='suceesful'">
                             Pass
                          </div>
                          <div style="color: #F95858;" v-if="scope.row.result=='failing'">
                            No Pass
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="suite" />
              <el-table-column prop="type" />
              <el-table-column prop="result">
                <template #default="scope">
                  <el-icon color="rgba(67, 187, 87, 1)" v-if="scope.row.result=='suceesful'" size="20px">
                    <Select/>
                  </el-icon>
                  <el-icon color="rgba(249, 88, 88, 1)" v-if="scope.row.result=='failing'" size="20px">
                    <CircleCloseFilled />
                  </el-icon>
                </template>
              </el-table-column>
              <el-table-column prop="count" width="230"/>
              <el-table-column prop="startTime" />
              <el-table-column prop="startTime" />
              <el-table-column width="15" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Test Suite" prop="suite" />
      <el-table-column label="测试类型" prop="type" />
      <el-table-column label="结果" prop="result">
        <template #default="scope">
          <el-icon color="rgba(67, 187, 87, 1)" v-if="scope.row.result=='suceesful'" size="20px">
            <Select/>
          </el-icon>
          <el-icon color="rgba(249, 88, 88, 1)" v-if="scope.row.result=='failing'" size="20px">
            <CircleCloseFilled />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column label="总计/通过/失败/跳过" prop="count" width="250">
        <template #default="scope">
          <span class="test-result" style="background-color: #002FA7;">{{scope.row.count.substring(0,4)}}</span>
          <span class="test-result" style="background-color: #43BB57;">{{scope.row.count.substring(4,2)}}</span>
          <span class="test-result" style="background-color: #F95858;">{{scope.row.count.substring(0,4)}}</span>
          <span class="test-result" style="background-color: #FFA634;">{{scope.row.count.substring(0,4)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop="startTime" />
      <el-table-column label="结束时间" prop="startTime" />
    </el-table>
  </el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Result } from './interface'
import TaskDoughnut from './components/task-doughnut.vue';
const resultName = ref('#29206 w3pGT1xdmCorhS099')




const tableData: Result[] = [
  {
    suite: '单核',
    type: '功能测试',
    result: 'suceesful',
    count: '2333/1951/10/383',
    startTime: '2022-10-27 11:04:24',
    endTime: '2022-10-27 14:20:17'
  }
]

</script>
<style lang="scss" scoped>
h2 {
    margin-bottom: 30px;
}
.el-row {
  margin-bottom: 20px;
}
.expand-table {
    margin-left: 15px;
}

.test-result {
  display: block;
  text-align: center;
  float: left;
  width: 50px;
  color: white;
  border-radius: 10px;
  margin-right: 5px;
}
</style>