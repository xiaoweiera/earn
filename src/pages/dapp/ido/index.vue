<script setup lang="ts">
/**
 * @file
 * @auth svon.me@gmail.com
 */
import _ from "lodash";
import API from "src/api/";
import I18n from "src/utils/i18n/";
import { ref, onMounted } from "vue";
import { size, uuid } from "src/utils/";
import safeGet from "@fengqiaogang/safe-get";
import { alias, createRef } from "src/utils/ssr/ref";
import { getUiTabList, getTabList, TabTypes } from "src/logic/dapp/dapp";
import { stateAlias, useReactiveProvide, useWatch } from "src/utils/use/state";

import DAppDiscoversItem from "../discovers/list.vue";
import DAppDiscoversEndList from "../discovers/endlist.vue";

import type { PropType } from "vue";
import type { DAppType } from "src/types/dapp/dapp";
import type { Result } from "src/types/dapp/detail";

import { ElInput } from "element-plus";

const props = defineProps({
  name: {
    type: String as PropType<DAppType>,
    required: true,
  },
});

const i18n = I18n();
const keyword = ref<string>("");
const listKey = ref<string>("");
const tabKey = ref<string>("");
// 定义一个 provide 数据，给子组件（ui-tab）使用
const [query] = useReactiveProvide<object>(stateAlias.ui.tab, {});

// 公链
const Chains = createRef<string[]>(alias.dApp.chains, []);
// 平台
const Platforms = createRef<string[]>(alias.dApp.platforms, []);
// 分类
const Categories = createRef<string[]>(alias.dApp.categories, []);

const onGetList = async function (param: object) {
  const api = new API();
  const activity_stage = safeGet<string>(query, "activity_stage") || TabTypes.upcoming;
  const option = {
    ...param,
    keyword: _.trim(keyword.value),
    chain: safeGet<string>(query, "chain"),
    platform: safeGet<string>(query, "platform"),
    category: safeGet<string>(query, "category"),
    // 活动类型
    activity_type: _.toUpper(props.name),
    // 活动状态
    activity_stage: _.toUpper(activity_stage),
  };

  const data = await api.dApp.getList<Result>(option);
  const extra = data.extra;
  if (size(Chains.value) < 1) {
    Chains.value = extra.available_chains;
  }
  if (size(Platforms.value) < 1) {
    Platforms.value = extra.available_platforms;
  }
  if (size(Categories.value) < 1) {
    Categories.value = extra.available_categories;
  }
  return data.items;
};

// 搜索框的内容不用缓存到 url
const onSearch = _.debounce(async () => {
  // 刷新列表
  listKey.value = uuid();
}, 300);

onMounted(function () {
  useWatch(query, () => {
    tabKey.value = uuid();
    listKey.value = uuid();
  });
});
</script>

<template>
  <div class="max-w-full w-250 mx-auto py-6">
    <!-- 分类 -->
    <ui-sticky active-class="table-box-title" class="z-900 is-tab bg-white">
      <div :key="tabKey">
        <ui-tab :list="getTabList(name)" active-name="activity_stage" />
      </div>
    </ui-sticky>

    <div :key="tabKey" class="pt-5">
      <div class="flex items-center">
        <div class="flex items-center flex-1 mr-2">
          <div class="flex items-center w-1/2">
            <span class="whitespace-nowrap">Type</span>
            <div class="ml-2 flex-1 w-1">
              <ui-tab :list="getUiTabList(Categories, 'category')" active-name="category" :split="2" />
            </div>
          </div>
          <div class="flex items-center w-1/2">
            <span class="whitespace-nowrap">公链</span>
            <div class="ml-2 flex-1 w-1">
              <ui-tab :list="getUiTabList(Chains, 'chain')" active-name="chain" :split="1" />
            </div>
          </div>
        </div>
        <!-- 搜索框 -->
        <client-only class="w-50 input-style">
          <el-input v-model="keyword" class="w-full" :placeholder="i18n.common.placeholder.search" @change="onSearch">
            <template #prefix>
              <IconFont type="icon-sousuo-da" class="text-global-highTitle" size="16" @click="onSearch" />
            </template>
          </el-input>
        </client-only>
      </div>
      <div class="flex items-center mt-4">
        <span class="whitespace-nowrap">来源平台</span>
        <div class="ml-2 flex-1 w-1">
          <ui-tab :list="getUiTabList(Platforms, 'platform')" active-name="platform" :split="6" />
        </div>
      </div>
    </div>
    <div :key="listKey" class="py-8">
      <ui-pagination :request="onGetList">
        <template #default="scope">
          <div v-if="query.activity_stage === TabTypes.ended" class="overflow-x-scroll showX">
            <div class="w-315">
              <DAppDiscoversEndList :params="query" class="px-4" :list="scope.list" />
            </div>
          </div>
          <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <DAppDiscoversItem v-for="(data, index) in scope.list" :key="index" :data="data" :name="name" />
          </div>
        </template>
      </ui-pagination>
    </div>
  </div>
</template>
