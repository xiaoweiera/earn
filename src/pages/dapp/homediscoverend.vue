<script lang="ts" setup>


import DAppHomeHeader from './home/header.vue';
import DAppDiscoversContentType from './discovers/content/type.vue';
import DAppDiscoversContentChain from './discovers/content/chain.vue';
import { ElInput } from "element-plus";
import DAppDiscoversEndlist from './discovers/endlist.vue';
import I18n from "src/utils/i18n";

import {onMounted, reactive, ref} from "vue";
import {Model, tabChain, tabPlat} from "src/logic/dapp";
import {createRef, onLoadRef} from "src/utils/ssr/ref";
import * as alias from "src/utils/root/alias";
import {AdItem, ProjectItem, Status} from "src/types/dapp/ixo";
import {config} from "src/router/config";
import {getParam} from "src/utils/router";
import {setInject, stateAlias, useWatch} from "src/utils/use/state";
import {uuid} from "src/utils";
import safeGet from "@fengqiaogang/safe-get";
import {useRoute, useRouter} from "vue-router";
import _ from "lodash";
import {createHref} from "src/plugins/router/pack";
import window from "src/plugins/browser/window";

const props = defineProps({
  summary: {
    type: Object,
    default: () => {
    }
  }
})
const i18n = I18n();
const chain = ref(getParam<string>("bracket"));
const category = ref(getParam<string>("category"));
const platform = ref(getParam<string>("platform"));
const search = ref(getParam<string>("search"));
const params = reactive({
  chain: chain.value,
  category: category.value,
  platform: platform.value,
  status: 'ended',
  query: '',
  sort_field: '',
  sort_type: '',//desc asc
})
const urlType = true;

const route = useRoute();
const key = ref<string>(uuid());

const model = new Model();

const loading = ref(false);
//nft drops
const getEndedList = async (flag: boolean) => {
  loading.value = true;
  const res: any = await model.getEndedProjects(params);
  if (flag) {
    EndedList.value = []
  }
  EndedList.value = res;
  loading.value = false;
}
// 创建列表对象并获取缓存数据
const EndedList = createRef<Array<ProjectItem | AdItem>>(alias.dApp.ixo.ended, []);
// 创建更新列表钩子函数
// const updateEndedList = onUpdateRef(EndedList, getEndedList);

onMounted(function () {
  // 判断列表数据是否为空，如果为空则获取最新数据
  onLoadRef(EndedList, () => model.getEndedProjects(params));
});
useWatch(route, (n) => {
  const querys: any = getParam<string>();
  key.value = uuid();
  params.chain = querys.bracket;
  params.category = querys.category;
  params.platform = querys.platform;
  params.query = querys.search ? querys.search : '';
  getEndedList(true)
  // todo 可以在此处更新某些数据
})
//排序方法
const changeSort = (sort: string) => {
  params.sort_field = sort;
  getEndedList(true);
}

const $router = useRouter()
const onChangeParam = setInject(stateAlias.ui.tab);
const searchVal = ref<string>();

const onSearch = _.debounce(async function () {
  const query = { ...getParam<object>(), search: searchVal.value || "" };
  const url = createHref(window.location.pathname, query);
  await $router.push(url);
  if (onChangeParam) {
    onChangeParam(query);
  }
}, 300);

onMounted(function() {
  search.value = getParam<string>("search") || "";
});
</script>
<template>
  <div class="mt-5 p-4 bg-global-white rounded-md">
    <!-- header -->
    <div class="border-0 md:border-b-1 border-global-highTitle border-opacity-6 pb-4">
      <DAppHomeHeader :title="i18n.home.endProject.title" :tips="i18n.home.endProject.desc" :status="Status.ended" :type="urlType"/>
    </div>
    <div class="hidden md:block">
      <!-- 项目类型、公链、搜索框 -->
      <div class="flex justify-between items-center mt-4">
        <div class="flex items-center">
          <!-- 公链 -->
          <DAppDiscoversContentType :key="key" v-if="summary.ixo" :list="tabChain(safeGet(summary,'ixo.chain'), 'bracket', config.home)" active-name="bracket" name="bracket" :title="i18n.home.idoIgoProject.chain"/>
          <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
          <!-- 类型 -->
          <DAppDiscoversContentChain v-if="summary.ixo" :href="config.home" :chainData="safeGet(summary,'ixo.category')" name="category" :title="i18n.home.topList.category"/>
        </div>
        <!-- 搜索框 -->
        <div>
         <!-- 搜索框 -->
          <client-only class="w-50 input-style">
            <ElInput class="w-full" v-model="searchVal" :placeholder="i18n.common.placeholder.search" @change="onSearch">
              <template #prefix>
                <IconFont type="icon-sousuo" size="16" @click="onSearch"/>
              </template>
            </ElInput>
          </client-only>
        </div>
      </div>
      <!-- platform -->
      <div class="mt-4">
        <DAppDiscoversContentType :key="key" v-if="summary.ixo" :list="tabPlat(safeGet(summary,'ixo.platform'), 'platform', config.home)" active-name="platform" name="platform" :title="i18n.home.topList.plat"/>
      </div>
    </div>

    <!--移动端展示-->
    <div class="block md:hidden">
      <div class="flex items-center">
        <DAppDiscoversContentChain :key="key" class="w-1/2" :chainData="safeGet(summary,'ixo.chain')" :href="config.home" name="bracket" :title="i18n.home.idoIgoProject.chain"/>
        <IconFont v-if="summary.ixo" class="text-global-highTitle text-opacity-10 mx-2 relative top-0.5  h-full" type="icon-gang"/>
        <DAppDiscoversContentChain :key="key" class="w-1/2" :chainData="safeGet(summary,'ixo.category')" :href="config.home" name="category" :title="i18n.home.topList.category"/>
      </div>
      <div class="flex items-center mt-4">
        <DAppDiscoversContentChain :key="key" class="w-1/2" :chainData="safeGet(summary,'ixo.platform')" :href="config.home" name="platform" :title="i18n.home.topList.plat"/>
        <IconFont v-if="safeGet(summary,'ixo.platform')" class="text-global-highTitle text-opacity-10 mx-2 relative top-0.5  h-full" type="icon-gang"/>
        <!-- 搜索框 -->
        <client-only class="max-w-50 input-style">
          <ElInput class="w-full" v-model="searchVal" :placeholder="i18n.common.placeholder.search" @change="onSearch">
            <template #prefix>
              <IconFont type="icon-sousuo" size="16" @click="onSearch"/>
            </template>
          </ElInput>
        </client-only>
      </div>
    </div>
    <div class="overflow-x-scroll showX mt-4" v-if="EndedList.length > 0">
      <div class="w-307 border-t-1 border-global-highTitle border-opacity-6">
        <DAppDiscoversEndlist :key="key" @changeSort="changeSort" :list="EndedList" :params="params"/>
      </div>
    </div>
    <div v-else>
      <ui-empty class="pb-3 pt-10"/>
      <p class="text-center text-kd12px16px text-global-highTitle text-opacity-45 font-kdFang">{{ i18n.address.noData }}</p>
    </div>
    <UiLoading v-if="loading" class="fixed top-0 bottom-0 left-0 right-0"/>
  </div>
</template>
<style lang="scss" scoped>
.input-style {
  ::v-deep(.el-input__inner) {
    @apply border border-global-highTitle border-opacity-4 bg-global-white rounded-md;
  }
  ::v-deep(input::-webkit-input-placeholder) {
    @apply text-kd12px16px text-global-highTitle text-opacity-45 font-medium;
  }
  ::v-deep(input::-ms-input-placeholder) {
    @apply text-kd12px16px text-global-highTitle text-opacity-45 font-medium;
  }
}

@screen md{
  .input-style {
    ::v-deep(.el-input__inner) {
      @apply border border-global-highTitle border-opacity-4 bg-global-topBg rounded-md;
    }
    ::v-deep(input::-webkit-input-placeholder) {
      @apply text-kd14px18px text-global-highTitle text-opacity-45 font-medium;
    }
    ::v-deep(input::-ms-input-placeholder) {
      @apply text-kd14px18px text-global-highTitle text-opacity-45 font-medium;
    }
  }
}
</style>
