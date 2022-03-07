<script lang="ts" setup>
import DAppHomeHeader from './home/header.vue';
import DAppDiscoversContentType from './discovers/content/type.vue';
import DAppDiscoversContentChain from './discovers/content/chain.vue';
import {ElInput} from "element-plus";
import DAppDiscoversEndList from './discovers/endlist.vue';
import I18n from "src/utils/i18n";

import {onMounted, ref} from "vue";
import {Model, tabChain, tabPlat, getClassWidth} from "src/logic/dapp";
import {alias, createRef, onLoadRef, onUpdateRef} from "src/utils/ssr/ref";
import {AdItem, ProjectItem, Status} from "src/types/dapp/ixo";
import {config} from "src/router/config";
import {getParam} from "src/utils/router";
import {getReactiveInject, setInject, stateAlias, useWatch} from "src/utils/use/state";
import {uuid} from "src/utils";
import safeGet from "@fengqiaogang/safe-get";
import {useRouter} from "vue-router";
import _ from "lodash";
import {createHref} from "src/plugins/router/pack";
import window from "src/plugins/browser/window";
import {Query} from "src/types/common";

const props = defineProps({
  summary: {
    type: Object,
    default: () => {
    }
  }
})
const i18n = I18n();
const search = ref<string>("");
const params = getParam<Query>();

const urlType = true;
const loading = ref<boolean>(false);
const route = getReactiveInject<Query>(stateAlias.ui.tab) || {};
const key = ref<string>(uuid());

// nft drops
const getEndedList = async function () {
  loading.value = true;
  const model = new Model();
  const list = await model.getEndedProjects(params);
  loading.value = false;
  return list;
}
// 创建列表对象并获取缓存数据
const EndedList = createRef<Array<ProjectItem | AdItem>>(alias.dApp.ixo.ended, []);
// 创建更新列表钩子函数
const updateEndedList = onUpdateRef(EndedList, getEndedList);

onMounted(function () {
  params.query = getParam<string>("query") || "";
  search.value = params.query;

  // 判断列表数据是否为空，如果为空则获取最新数据
  onLoadRef(EndedList, getEndedList);

  const onUpdate = function () {
    params.chain = route.bracket;
    params.category = route.category;
    params.platform = route.platform;
    updateEndedList();
  }

  useWatch(route, function () {
    key.value = uuid();

    if (params.chain !== route.bracket) {
      onUpdate();
    } else if (params.category !== route.category) {
      onUpdate();
    } else if (params.platform !== route.platform) {
      onUpdate();
    } else if (params.query !== route.query) {
      onUpdate();
    }

  });
});

//排序方法
const changeSort = function (value: string) {
  params.sort_field = value;
  updateEndedList();
}

const $router = useRouter()
const onChangeParam = setInject(stateAlias.ui.tab);

const onSearch = _.debounce(async function () {
  const value = search.value || "";
  const query = {...getParam<object>(), query: value};
  const url = createHref(window.location.pathname, query);
  params.query = value;
  await $router.push(url);
  if (onChangeParam) {
    onChangeParam(query);
  }
  return updateEndedList();
}, 300);
</script>
<template>
  <div class="mt-5 p-4 bg-global-white rounded-md">
    <!-- header -->
    <div class="border-0 md:border-b-1 border-global-highTitle border-opacity-6 pb-4">
      <DAppHomeHeader :status="Status.ended" :tips="i18n.home.endProject.desc" :title="i18n.home.endProject.title"
                      :type="urlType"/>
    </div>
    <div class="hidden md:block">
      <!-- 项目类型、公链、搜索框 -->
      <div class="flex justify-between items-center mt-4" :key="key">
        <div class="flex items-center" v-if="summary.ixo">
          <!-- 公链 -->
          <DAppDiscoversContentType :list="tabChain(safeGet(summary,'ixo.chain'), 'bracket', config.home)"
                                    :title="i18n.home.idoIgoProject.chain" active-name="bracket" name="bracket" :title-width="getClassWidth()"/>
          <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
          <!-- 类型 -->
          <DAppDiscoversContentChain :chainData="safeGet(summary,'ixo.category')" :href="config.home"
                                     :title="i18n.home.topList.category" name="category"/>
        </div>
        <!-- 搜索框 -->
        <div>
          <!-- 搜索框 -->
          <client-only class="w-50 input-style">
            <ElInput v-model="search" :placeholder="i18n.common.placeholder.search" class="w-full"
                     @change="onSearch">
              <template #prefix>
                <IconFont size="16" type="icon-sousuo" @click="onSearch"/>
              </template>
            </ElInput>
          </client-only>
        </div>
      </div>
      <!-- platform -->
      <div class="mt-4" v-if="summary.ixo" :key="key">
        <DAppDiscoversContentType :list="tabPlat(safeGet(summary,'ixo.platform'), 'platform', config.home)"
                                  :title="i18n.home.topList.plat" active-name="platform" name="platform" :title-width="getClassWidth()"/>
      </div>
    </div>

    <!--移动端展示-->
    <div class="block md:hidden" :key="key">
      <div class="flex items-center" v-if="summary.ixo">
        <DAppDiscoversContentChain :chainData="safeGet(summary,'ixo.chain')" :href="config.home"
                                   :title="i18n.home.idoIgoProject.chain" class="w-1/2" name="bracket"/>
        <IconFont class="text-global-highTitle text-opacity-10 mx-2 relative top-0.5  h-full"
                  type="icon-gang"/>
        <DAppDiscoversContentChain :chainData="safeGet(summary,'ixo.category')" :href="config.home"
                                   :title="i18n.home.topList.category" class="w-1/2" name="category"/>
      </div>
      <div class="flex items-center mt-4">
        <DAppDiscoversContentChain :chainData="safeGet(summary,'ixo.platform')" :href="config.home"
                                   :title="i18n.home.topList.plat" class="w-1/2" name="platform"/>
        <IconFont v-if="safeGet(summary,'ixo.platform')"
                  class="text-global-highTitle text-opacity-10 mx-2 relative top-0.5  h-full" type="icon-gang"/>
        <!-- 搜索框 -->
        <client-only class="w-1/2 input-style">
          <ElInput v-model="search" :placeholder="i18n.common.placeholder.search" class="w-full" @change="onSearch">
            <template #prefix>
              <IconFont size="16" type="icon-sousuo" @click="onSearch"/>
            </template>
          </ElInput>
        </client-only>
      </div>
    </div>


    <div v-if="EndedList.length > 0" class="overflow-x-auto showX mt-4">
      <div class="w-307 border-t-1 border-global-highTitle border-opacity-6">
        <DAppDiscoversEndList :key="key" :list="EndedList" :params="params" @changeSort="changeSort"/>
      </div>
    </div>
    <div v-else>
      <ui-empty class="pb-3 pt-10"/>
      <p class="text-center text-kd12px16px text-global-highTitle text-opacity-45 font-kdFang">{{
          i18n.address.noData
        }}</p>
    </div>
    <UiLoading v-if="loading" class="fixed top-0 bottom-0 left-0 right-0"/>
  </div>
</template>
<style lang="scss" scoped>
.input-style {
  ::v-deep(.el-input__inner) {
    @apply border-0 border-global-highTitle border-opacity-4 bg-global-white rounded-md;
  }

  ::v-deep(input::-webkit-input-placeholder) {
    @apply text-kd12px16px text-global-highTitle text-opacity-45 font-medium;
  }

  ::v-deep(input::-ms-input-placeholder) {
    @apply text-kd12px16px text-global-highTitle text-opacity-45 font-medium;
  }
}

@screen md {
  .input-style {
    ::v-deep(.el-input__inner) {
      @apply border-0 border-global-highTitle border-opacity-4 bg-global-topBg rounded-md;
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
