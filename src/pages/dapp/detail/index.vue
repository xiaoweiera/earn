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
import I18n from "src/utils/i18n";

const Twitter = asyncLoad(() => import("./content/twitter.vue"));
const IDO = asyncLoad(() => import("./content/ido.vue"));
const Reviews = asyncLoad(() => import("./reviews/index.vue"));
const Dashboard = asyncLoad(() => import("./dashboard/index.vue"));
const NFT = asyncLoad(() => import("./content/nft.vue"));
const AirDrops = asyncLoad(() => import("./content/airdrop.vue"));
const CommonTopics = asyncLoad(() => import("src/pages/home/recommend.vue"));

const i18n = I18n();
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
  for (const item of getTabList(info, data)) {
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
      <div :key="project.tab" class="mt-6" :data-tab="project.tab">
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
        <template v-else-if="AnyEquals(project.tab, TabName.dapp) || AnyEquals(project.tab, TabName.igo)">
          <IDO :data="detail" :project="project" />
        </template>
        <template v-else>
          <Dashboard :data="project" />
        </template>
      </div>
    </div>
    <div class="mt-4 md:mt-14">
      <div class="flex items-center justify-between">
        <div class="title font-kdFang">{{ i18n.home.hotRecommend }}</div>
        <div class="flex items-center">
          <span class="more">{{ i18n.home.lookMore }}</span>
          <iconFont class="text-global-highTitle text-opacity-65 ml-1" type="rightNo" size="12" />
        </div>
      </div>
      <CommonTopics :isShowTitle="false" />
    </div>
  </ui-spin>
</template>

<style lang="scss" scoped>
.title {
  @apply mb-3;
  @apply text-kd24px28px text-global-highTitle font-medium;
}
.more {
  @apply text-global-primary text-kd14px18px font-medium;
}
</style>
