<script setup lang="ts">
import {onMounted, ref} from "vue";
import { ElOption, ElSelect,ElInput } from "element-plus";
import I18n from "src/utils/i18n";
const i18n = I18n();
const projectType=ref('all')
const investNumber=ref('all')
const isSend=ref('all')
const query=ref('')
const sendList=ref([
  {name:'All',key:'all'},
  {name:'已发币',key:'ok'},
  {name:'未发币',key:'no'},
])
const list=ref([
  {name:'All',key:'all'},
  {name:'第1',key:'1'},
  {name:'第2',key:'2'},
  {name:'第3',key:'3'},
  {name:'第4',key:'4'},
])
</script>
<template>
  <div class="flex items-center justify-between w-full flex-wrap">
    <div class="flex items-center flex-wrap">
      <div class="filter-item">
        <p>项目类型</p>
        <el-select v-model="projectType" size="small">
          <el-option v-for="item in list" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </div>
      <div class="filter-item">
        <p>投资轮次</p>
        <el-select v-model="investNumber" size="small">
          <el-option v-for="item in list" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </div>
      <div class="filter-item">
        <p>是否发币</p>
        <el-select v-model="isSend" size="small">
          <el-option v-for="item in sendList" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </div>
    </div>
    <div class="relative flex items-center search">
      <IconFont class="select-icon" size="16" type="icon-sousuo-da1"/>
      <el-input v-model="query" placeholder="Search" />
    </div>
  </div>
</template>
<style scoped lang="scss">
::v-deep(.el-input__inner) {
  border: 1px solid rgba(3, 54, 102, 0.06) !important;
  box-shadow: none;
  background: #fafbfc;
  height: 32px !important;
  padding-left: 12px !important;
  border-radius: 6px !important;
  @apply text-kd14px18px md:w-25 text-left  text-global-highTitle  flex items-center  text-kd14px18px;
}
.search{
  ::v-deep(.el-input__inner) {
    border: 1px solid rgba(3, 54, 102, 0.06) !important;
    box-shadow: none;
    background: #fafbfc;
    height: 32px !important;
    padding-left: 36px !important;
    border-radius: 6px !important;
    @apply text-kd14px18px w-50 text-left  text-global-highTitle  flex items-center  text-kd14px18px;
  }
  .select-icon{
    @apply absolute text-global-highTitle text-opacity-20 z-22 left-3;
  }
}
.filter-item{
  @apply flex items-center;
}
.filter-item:not(:first-child){
  @apply ml-4;
}
p{
  @apply whitespace-nowrap text-kd14px18px font-kdFang text-global-highTitle text-opacity-65 mr-4;
}
</style>