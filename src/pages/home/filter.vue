<script setup lang="ts">
import { ref,PropType} from 'vue'
import {useRoute, useRouter} from "vue-router";
import I18n from '~/utils/i18n/index'
import { ElSelect, ElOption, ElInput} from 'element-plus';
import {getParam} from "~/utils/router";
import {filterModel} from "~/types/home";
import * as R from 'ramda'
import {config as routerConfig} from "~/router/config";
const props = defineProps({
  filters: {
    type: Object as any,
    default: () => {},
  },
  info:Object
})
const route=useRoute()
const query = getParam<object>();
const i18n = I18n();
const chainData:any = ref([])
const categoryData:any=ref([])
//重组数据
const mergeData=(key:string,data:any)=>{
  props?.filters[key]?.options.forEach((item:string)=>{
    const param:any={...query}
    param[key]=item
    data.value.push({
      name:item,
      href: {
        path: routerConfig.homeDetail,
        query: param
      }
    })
  })
}
mergeData('chain',chainData)
mergeData('category',categoryData)

const onChangeView = function (data: object) {
  // console.log('加载内容',data)
}
const projectType=ref('all')
const search=ref('')
const projectTypeList=[
  {name:'All',value:'all'},
  {name:'ETH',value:'eth'},
  {name:'BSC',value:'bsc'},
]
const change=(data:any)=>{
  console.log(data)
}
</script>
<template>
  <div>
    <div class="flex items-center">
      <div class="text-kd14px18px text-global-highTitle text-opacity-65 font-kdFang whitespace-nowrap mr-4">项目类型</div>
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center w-full">
          <div class="is-tab border-1">
            <ui-tab :list="chainData" :split="4" active-name="name" @change="onChangeView"></ui-tab>
          </div>
          <IconFont class="text-global-highTitle text-opacity-10 mx-4 relative top-0.5  h-full" type="icon-gang"/>
          <div class="flex items-center">
            <span class="mr-4 text-kd14px18px text-global-highTitle text-opacity-65">公链</span>
            <client-only class="flex items-center justify-between">
              <el-select @change="change" class="projectMining  flex-1 select"  :popper-append-to-body="false" v-model="projectType" size="small">
                <el-option v-for="item in chainData" :label="item.name" :value="item.value" :key="item.value">
                  <router-link :to="item.href">
                    {{item.name}}
                  </router-link>
                </el-option>
              </el-select>
            </client-only>
          </div>
        </div>
        <client-only>
          <div class="relative flex items-center search">
            <IconFont class="absolute text-global-highTitle text-opacity-45 left-3" size="16" type="icon-sousuo-da1"/>
            <el-input  v-model="search"  placeholder="Search"/>
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.select{
  ::v-deep(.el-input__inner){
    border: 1px solid rgba(3, 54, 102, 0.1) !important;
    background: none;
    height: 34px !important;
    padding-left:12px !important;
    @apply text-kd14px18px md:w-25 text-left    text-global-highTitle text-opacity-85  flex items-center  text-kd14px18px;
  }
}
.search{
  ::v-deep(.el-input__inner){
    border: 1px solid rgba(3, 54, 102, 0.1) !important;
    background: none;
    height: 34px !important;
    padding-left:35px !important;
    border-radius: 6px !important;
    @apply text-kd14px18px md:w-50 text-left    text-global-highTitle text-opacity-85  flex items-center  text-kd14px18px;
  }
}
%first-ml0 {
  &:first-child {
    @apply ml-0;
  }
}
.is-tab {
  @apply flex items-center;
  ::v-deep(.tab-wrap) {
    @apply items-center;
    .tab-item {
      @apply  flex px-3 py-2  max-h-8  rounded-md;
      &:after {
        @apply h-0;
      }
      &:not(a) {
        &:not([href]) {
          @apply cursor-pointer ml-4;
          @extend %first-ml0;
        }
      }
      &:not(:first-child){
        @apply ml-4;
      }
    }
    span {
      @apply  text-kd14px18px font-medium font-kdFang;
    }
    .active {
      @apply flex px-3  py-2 max-h-8 bg-global-darkblue bg-opacity-6 rounded-md;
    }
  }
}
</style>