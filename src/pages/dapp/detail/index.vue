<script lang="ts" setup>
/**
 * @file DApp 详情页
 * @author svon.me@gmail.com
 */

import { onMounted } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import { TabName } from "src/types/dapp/data";
import { getTabList } from "src/logic/dapp/detail";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { DAppProject, DAppData } from "src/types/dapp/data";
import { useReactiveProvide } from "src/utils/use/state";
import { asyncLoad } from "src/plugins/lazyload/";
import { AnyEquals } from "src/utils/";
import Header from "./header/index.vue";

const Twitter = asyncLoad(() => import("./content/twitter.vue"));
const IDO = asyncLoad(() => import("./content/ido.vue"));
const Reviews = asyncLoad(() => import("./reviews/index.vue"));
const Dashboard = asyncLoad(() => import("./dashboard/index.vue"));
const NFT = asyncLoad(() => import("./content/nft.vue"));
const AirDrops = asyncLoad(() => import("./content/airdrop.vue"));

// 项目信息
const project = createReactive<DAppProject>("query", {} as DAppProject);
// 项目数据
const detail = createReactive<DAppData>(alias.dApp.detail, {} as DAppData);
useReactiveProvide("detailState", detail);

onMounted(function () {
  const id = project.id;
  if (id) {
    onLoadReactive(detail, alias.dApp.detail, id);
  }
});

const onChangeTab = function (data: object) {
  const key = safeGet<TabName>(data, "tab");
  if (key) {
    project.tab = key;
  }
};

const getTwitterName = function (data: DAppData) {
  const name = data?.community?.twitter?.name;
  if (name) {
    return name;
  }
};

const getTabData = function (info: DAppProject, data: DAppData) {
  const array: object[] = [];
  const twitterName = getTwitterName(data);
  for (const item of getTabList(info)) {
    const value = safeGet<TabName>(item, "tab");
    if (value === TabName.twitter) {
      if (twitterName) {
        array.push(item);
      }
      continue;
    }
    array.push(item);
  }
  return array;
};
</script>

<template>
  <ui-spin class="pt-8 pb-16 px-4">
    <div v-if="detail && detail.id" class="w-full max-w-300 mx-auto">
      <Header :data="detail" :project="project" />
      <ui-sticky class="mt-11 bg-white">
        <ui-tab :def="TabName.dashboard" :list="getTabData(project, detail)" active-name="tab" @change="onChangeTab">
          <template #default="{ data }">
            <span class="text-18-24 font-m">{{ data.label }}</span>
          </template>
        </ui-tab>
      </ui-sticky>
      <!--内容-->
      <div class="mt-6" :data-tab="project.tab">
        <template v-if="AnyEquals(project.tab, TabName.twitter)">
          <Twitter :name="getTwitterName(detail)" class="bg-white" />
        </template>
        <template v-else-if="AnyEquals(project.tab, TabName.reviews)">
          <Reviews :id="project.id" />
        </template>
        <template v-else-if="AnyEquals(project.tab, TabName.nft)">
          <NFT :data="detail" />
        </template>
        <template v-else-if="AnyEquals(project.tab, TabName.airdrop)">
          <AirDrops :data="detail" />
        </template>
        <template v-else-if="AnyEquals(project.tab, TabName.dapp)">
          <IDO :data="detail" />
        </template>
        <template v-else>
          <Dashboard :data="project" />
        </template>
      </div>
    </div>
    <div v-else>
      <ui-empty />
    </div>
  </ui-spin>
</template>
