<script setup lang="ts">
/**
 * @file
 * @auth svon.me@gmail.com
 */
import _ from "lodash";
import API from "src/api/";
import { ref } from "vue";
import { size, uuid } from "src/utils/";
import { alias, createRef } from "src/utils/ssr/ref";
import type { Result } from "src/types/dapp/detail";
import { getTabList } from "src/logic/dapp/dapp";

import DAppDiscoversItem from "../discovers/list.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const tabKey = ref<string>(uuid());

// 公链
const Chains = createRef<string[]>(alias.dApp.chains, []);
// 平台
const Platforms = createRef<string[]>(alias.dApp.platforms, []);
// 分类
const Categories = createRef<string[]>(alias.dApp.categories, []);

const onGetList = async function (query: object) {
  const api = new API();
  const data = await api.dApp.getList<Result>({
    ...query,
    // 活动类型
    activity_type: _.toUpper(props.name),
    activity_stage: "UPCOMING",
  });
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

const tabs = function () {
  return getTabList(props.name);
};

const getUiTabList = (list: string[], key: string) => {
  return function () {
    const array: object[] = [
      {
        name: "All",
        [key]: "all",
      },
    ];
    for (const value of list) {
      array.push({
        name: value,
        [key]: value,
      });
    }
    return array;
  };
};

const onChange = function () {
  tabKey.value = uuid();
};
</script>

<template>
  <div class="max-w-full w-250 mx-auto py-6">
    <!-- 分类 -->
    <ui-sticky active-class="table-box-title" class="z-900 is-tab bg-white">
      <div :key="tabKey">
        <ui-tab :list="tabs()" active-name="activity_stage" @change="onChange" />
      </div>
    </ui-sticky>

    <div class="pt-5">
      <div class="flex items-center">
        <div class="flex items-center w-1/2">
          <span class="whitespace-nowrap">Type</span>
          <div :key="tabKey" class="ml-2 flex-1 w-1">
            <ui-tab :list="getUiTabList(Categories, 'category')" active-name="category" :split="2" @change="onChange" />
          </div>
        </div>
        <div class="flex items-center w-1/2">
          <span class="whitespace-nowrap">公链</span>
          <div :key="tabKey" class="ml-2 flex-1 w-1">
            <ui-tab :list="getUiTabList(Chains, 'chain')" active-name="chain" :split="1" @change="onChange" />
          </div>
        </div>
      </div>
      <div class="flex items-center mt-4">
        <span class="whitespace-nowrap">来源平台</span>
        <div :key="tabKey" class="ml-2 flex-1 w-1">
          <ui-tab :list="getUiTabList(Platforms, 'platform')" active-name="platform" :split="6" @change="onChange" />
        </div>
      </div>
    </div>
    <div :key="tabKey" class="py-8">
      <ui-pagination :request="onGetList">
        <template #default="scope">
          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <DAppDiscoversItem v-for="(data, index) in scope.list" :key="index" :data="data" :name="name" />
          </div>
        </template>
      </ui-pagination>
    </div>
  </div>
</template>
