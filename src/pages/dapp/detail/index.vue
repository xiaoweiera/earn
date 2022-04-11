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

import Header from "./header/index.vue";
const Twitter = asyncLoad(() => import("./content/twitter.vue"));
const IDO = asyncLoad(() => import("./content/ido.vue"));
const Reviews = asyncLoad(() => import("./reviews/index.vue"));
const Dashboard = asyncLoad(() => import("./dashboard/index.vue"));
const NFT = asyncLoad(() => import("./content/nft.vue"));
const AirDrops = asyncLoad(() => import("./content/airdrop.vue"));
const Token = asyncLoad(() => import("./token/index"));
const Information = asyncLoad(() => import("./content/chain/index.vue"));

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
</script>

<template>
  <div class="pt-8 pb-16">
    <div class="max-w-300 mx-auto">
      <Header :project="project" :data="detail" />
      <div class="mt-11">
        <ui-tab :def="TabName.dashboard" :list="getTabList(project)" active-name="tab" @change="onChangeTab">
          <template #default="{ data }">
            <span class="text-18-24 font-m">{{ data.label }}</span>
          </template>
        </ui-tab>
      </div>
      <!--内容-->
      <div class="mt-6">
        <template v-if="project.tab === TabName.dashboard">
          <Dashboard />
        </template>
        <template v-else-if="project.tab === TabName.twitter">
          <Twitter :name="getTwitterName(detail)" class="bg-white" />
        </template>
        <template v-else-if="project.tab === TabName.reviews">
          <Reviews :id="project.id" />
        </template>
        <template v-else-if="project.tab === TabName.nft">
          <NFT :data="detail" />
        </template>
        <template v-else-if="project.tab === TabName.airdrop">
          <AirDrops :data="detail" />
        </template>
        <template v-else>
          <IDO :data="detail" />
        </template>
      </div>
    </div>
  </div>
</template>
