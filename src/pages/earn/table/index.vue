<script lang="ts" setup>
import safeGet from "@fengqiaogang/safe-get";

import { ElTable, ElTableColumn, ElInput, ElPopover } from "element-plus";
import Filter from "../fiflter/block.vue"
import {addAddrees, removeAddrees, isFollow} from "src/logic/earn/index"
import {rowClass, headerCellClass, cellClass, getTitleCnEn, getTitleDes} from "./data";
import { reactive, ref } from "vue";
const api =new API()
import Content from "./content/index.vue";
import document from "src/plugins/browser/document";
import API from "src/api";
import {chainName} from "src/logic/earn";
import {headerList} from "./data"
import {createRef} from "src/utils/ssr/ref";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    default: '',
  },
  isMore: {
    type: Boolean,
    default: true,
  },
});
const tabList = createRef("API.Earn.tableTab", []);
const param=reactive({
  chain:chainName.value,
  type:props.type,
  pageNo: 0,
  pageSize:10,
  sortField:'',
  sortType:'',
  value:"",
  returnRate:"",
  flipRate:"",
})
const height = document.body.clientWidth > 375 ? 60 : 50;
const list=ref([])
const resNumber=ref(param.pageSize)
// const headerList=ref([])
const key = ref<number>(0);

const isLoad = ref(true);
// 排序
const sort = async () => {
  if (!param.sortType) {
    param.sortField = "";
  }
  key.value++;
  await getData(true)
};
const moreData=async ()=>{
  param.pageNo++
  await getData()
}
const getData=async (clear?:boolean)=>{
  isLoad.value=true
  if (clear) {
    param.pageNo = 0;
    list.value = [];
  }
  const res:any=await api.earn.getTableList(param)
  // headerList.value=safeGet(res,'header')
  list.value=list.value.concat(safeGet(res,'body.items'));
  resNumber.value=safeGet(res,'body.items.length')
  isLoad.value=false
}
//首次加载
const tabSubmit =async (data:any)=>{
  param.type=data['type']
  await getData(true)
}
const changeValue=async ()=>{
  await getData(true)
}
const followKey=ref(0)
const add = (address:string) => {
  addAddrees(address)
  followKey.value++
}
const remove = (address:string) => {
  removeAddrees(address)
  followKey.value++
}

</script>
<template>
  <div class="text-global-white">
    <div class="flex items-center justify-between mb-4">
      <Filter :data="tabList" @submit="tabSubmit"/>
      <div class="flex items-center">
        <div class="filter-value mr-2">
          <div>
            <span class="mr-2">Value</span><span :class="param.value?'has-value':'no-value'">>=</span>
          </div>
          <el-input v-model="param.value" @change="changeValue" placeholder="0" autocomplete="off"  type="number"/>
        </div>
        <div class="filter-value mr-2">
          <div>
            <span class="mr-2">Return</span><span :class="param.returnRate?'has-value':'no-value'">>=</span>
          </div>
          <el-input v-model="param.returnRate" @change="changeValue" placeholder="0" autocomplete="off"  type="number"/>
        </div>
        <div class="filter-value">
          <div>
            <span class="mr-2">FlipRate</span><span :class="param.flipRate?'has-value':'no-value'">>=</span>
          </div>
          <el-input v-model="param.flipRate" @change="changeValue" placeholder="0" autocomplete="off"  type="number"/>
        </div>
      </div>
    </div>

    <UiLoading v-if="isLoad" class="fixed left-0 right-0 top-0 bottom-0" />
    <div class="showX min-h-100 text-global-white relative" :key="key">
      <el-table v-if="list.length>0" :data="list" class="w-full table-fixed huiClass" :row-style="rowClass" :header-cell-style="headerCellClass" :cell-style="cellClass">
        <el-table-column class-name="lie" fixed :width="50">
          <template #header>
            <div class="header-name items-center flex h-full">#</div>
          </template>
          <template #default="scope">
                  <span class="text-kd14px16px text-number text-global-highTitle whitespace-nowrap">
                    <span>{{ scope.$index + 1 }}</span>
                    <!--隐藏一个链接，用作 seo-->
                    <v-router class="hidden">{{ scope.row.name }}</v-router>
                  </span>
          </template>
        </el-table-column>
        <template v-for="(header, index) in headerList" :key="index">
          <el-table-column :fixed="index === 0" :width="header.width ? header.width : 150">
            <template #header>
              <div class="relative h-full flex items-center" :class="{ 'justify-center': header.center }">
                <ui-sort class="header-name fit" :active="header.active" :sort="header.sort" :sort-data="param" :key-name="header.sortField" :field="header.title" :name="getTitleCnEn(header)" @change="sort" />
                <el-popover :disabled="!getTitleDes(header)" placement="top" trigger="hover">
                  <div>{{ getTitleDes(header) }}</div>
                  <template #reference>
                    <div v-if="getTitleDes(header)" class="h-full flex items-center hand">
                      <IconFont class="text-global-highTitle text-opacity-35 ml-1" type="icon-info" size="16" />
                    </div>
                  </template>
                </el-popover>
              </div>
            </template>
            <template #default="scope">
              <div>
                <Content :center="header.center" :width="header.width" :fields="header.fields" :type="header.type" :data="scope.row" />
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column class-name="lie">
          <template #header>
            <div class="header-name items-center flex h-full">Tool</div>
          </template>
          <template #default="scope">
            <!--          scope.row.name-->
            <div class="flex items-center" :key="followKey">
              <div class="copy mr-1 whitespace-nowrap">Copy Trading</div>
              <div v-if="!isFollow(scope.row.addressName)" class="follow" @click="add(scope.row.addressName)">Follow</div>
              <div v-else class="following whitespace-nowrap" @click="remove(scope.row.addressName)">Following</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="resNumber >= param.pageSize" class="more mt-12" @click="moreData">View More</div>
  </div>
</template>
<style lang="scss" scoped>
::v-deep(input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button){
  -webkit-appearance: none;
  margin: 0;
}
::v-deep(.el-select) {
  --el-select-input-focus-border-color: transparent;
}
.no-value{
  @apply text-kd14px22px text-global-hui04;
}
.has-value{
  @apply text-kd14px22px text-global-hui01;
}
.filter-value{
  font-family: huawei-medium;
  @apply px-3 h-8 text-kd14px22px bg-global-hui06 flex items-center text-global-hui01 rounded-kd4px;
}
::v-deep(.el-input__inner) {
  font-family: huawei-medium;
  border:1px solid #ffffff00;
  padding-left:6px !important;
  padding-right:0px !important;
  @apply h-5.5 w-12 bg-global-hui06  text-kd14px22px text-global-hui01;;
}
::v-deep(input::-webkit-input-placeholder) {
  color:#697177 !important;
  font-size: 14px !important;
  line-height: 22px !important;
}

::v-deep(input::-ms-input-placeholder) {
  color:#697177 !important;
  font-size: 14px !important;
  line-height: 22px !important;
}
.more{
  @apply text-kd16px24px text-global-hui01 bg-global-hui06 w-max mx-auto cursor-pointer;
  @apply flex items-center px-12.375 h-10 rounded-kd6px justify-center;
}
.copy{
  font-family: huawei-medium;
  @apply h-6 px-1.5 flex flex-nowrap items-center bg-global-lan04 rounded-kd4px text-global-hui01 text-kd12px16px cursor-pointer;
}
.follow{
  font-family: huawei-medium;
  @apply h-6 px-1.5 flex flex-nowrap border-1 border-global-hui06 items-center bg-global-hui06 rounded-kd4px text-global-hui01 text-kd12px16px cursor-pointer;
}
.following{
  font-family: huawei-medium;
  @apply h-6 px-1.5 flex flex-nowrap border-1 border-global-hui06 items-center rounded-kd4px text-global-hui01 text-kd12px16px cursor-pointer;
}
.fit {
  width: fit-content !important;
}

::v-deep(.el-table__fixed-left) {
  height: 100% !important;
}

::v-deep(.el-table__fixed) {
  height: 100% !important;
}

::v-deep(.el-popover.el-popper) {
  min-width: fit-content !important;
  width: fit-content !important;
  padding: 0px 0px 0px 0px !important;
  border-radius: 100px;
  word-break: break-word;
  max-width: 400px;
  transform: translate(100%, 100%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.search {
  ::v-deep(.el-input__inner) {
    border: none !important;
    background: #fafbfc;
    height: 34px !important;
    padding-left: 35px !important;
    border-radius: 6px !important;
    @apply text-kd14px18px md:w-50 text-left  text-global-highTitle  flex items-center  text-kd14px18px;
  }
}

::v-deep(.cell) {
  height: 100%;
}

::v-deep(.el-scrollbar) {
  --el-scrollbar-bg-color: rgba(0, 0, 0, 0.2) !important;
  --el-scrollbar-hover-bg-color: rgba(0, 0, 0, 0.2) !important;
}
.header-name {
  @apply text-kd12px16px font-medium text-global-highTitle;
}
::v-deep(.el-table__body) {
  border: 1px solid white !important;
  position: relative !important;
  z-index: 99999 !important;
}
::v-deep(.el-table__row) {
  position: relative !important;
  z-index: 99999 !important;
}
.huiClass {
  ::v-deep(tbody tr td) {
    background-color: #000000 !important;
  }
  ::v-deep(.el-table__body tr:hover > td){
    background-color: #16181A !important;
  }
  ::v-deep(.el-table__body) {
    border: 0px solid #000000 !important;
    border-bottom: 1px solid #000000 !important;
  }
}
</style>
