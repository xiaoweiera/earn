<script setup lang="ts">
/**
 * @file
 * @auth svon.me@gmail.com
 */
import _ from "lodash";
import API from "src/api/";
import { size } from "src/utils/";
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

// 公链
const Chains = createRef<string[]>(alias.dApp.chains, []);
// 平台
const Platforms = createRef<string[]>(alias.dApp.platforms, []);

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
    Chains.value = extra.available_platforms;
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
</script>

<template>
  <div class="max-w-full w-250 mx-auto py-6">
    <!-- 分类 -->
    <ui-sticky active-class="table-box-title" class="z-900 is-tab bg-white">
      <ui-tab :list="tabs()" active-name="activity_stage" />
    </ui-sticky>

    <div>
      <div class="flex items-center">
        <span class="whitespace-nowrap">类型</span>
        <div class="ml-2 flex-1 w-1">
          <ui-tab :list="getUiTabList(Chains, 'chain')" active-name="chain" :split="2" />
        </div>
      </div>
      <div class="flex items-center">
        <span class="whitespace-nowrap">来源平台</span>
        <div class="ml-2 flex-1 w-1">
          <ui-tab :list="getUiTabList(Platforms, 'platform')" active-name="platform" />
        </div>
      </div>
    </div>
    <ui-pagination :request="onGetList">
      <template #default="scope">
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <DAppDiscoversItem v-for="(data, index) in scope.list" :key="index" :data="data" :name="name" />
        </div>
      </template>
    </ui-pagination>
  </div>
</template>
