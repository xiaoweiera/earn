<script lang="ts" setup>
/**
 * @file DApp 详情页
 * @author svon.me@gmail.com
 */

import { onMounted } from "vue";
import * as track from "src/logic/track";
import safeGet from "@fengqiaogang/safe-get";
import { TabName } from "src/types/dapp/data";
import { getTabList } from "src/logic/dapp/detail";
import { ProjectType } from "src/types/dapp/data";
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
const ProjectInfo = asyncLoad(() => import("./project/index.vue"));
const CommonTopics = asyncLoad(() => import("src/pages/home/recommend.vue"));

const i18n = I18n();
// 项目信息
const project = createReactive<DAppProject>("query", {} as DAppProject);
// 项目数据
const detail = createReactive<DAppData>(alias.dApp.detail, {} as DAppData);
useReactiveProvide("detailState", detail);

// 上报数据
const pushTrack = function (tab?: string | TabName) {
  const id = project.id;
  const type = project.type;
  let value = tab ? tab : project.tab;

  if (AnyEquals(value, TabName.nft)) {
    value = "Mint";
  }
  // 上报数据
  if (type === ProjectType.nft) {
    track.push(track.Origin.gio, track.event.dApp.nftDetail, {
      nft_id: id,
      nft_tab: value,
    });
    return;
  }
  track.push(track.Origin.gio, track.event.dApp.dappDetail, {
    project_id: id,
    project_tab: value,
  });
};

onMounted(function () {
  const id = project.id;
  if (id) {
    onLoadReactive(detail, alias.dApp.detail, id);
  }
});

const onChangeTab = function (data: object) {
  const key = safeGet<TabName>(data, "tab");
  if (key) {
    pushTrack(key);
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
    <div class="max-w-300 mx-auto">
      <div v-if="detail && detail.id" class="w-full mb-4 md:mb-14">
        <Header :data="detail" :project="project" />
        <ui-sticky class="is-tab mt-11 bg-white">
          <ui-tab :def="TabName.dashboard" :list="getTabData(project, detail)" active-name="tab" @change="onChangeTab">
            <template #default="{ data }">
              <span class="text-18-24 font-m">{{ data.label }}</span>
            </template>
          </ui-tab>
        </ui-sticky>
        <!--内容-->
        <div :key="project.tab" :data-tab="project.tab" class="mt-6">
          <template v-if="AnyEquals(project.tab, TabName.twitter)">
            <Twitter :name="getTwitterName(detail)" class="bg-white" />
          </template>
          <template v-if="AnyEquals(project.tab, TabName.project)">
            <projectInfo :id="project.id" />
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
      <div>
        <div class="text-24-28 text-global-highTitle font-medium">
          <p class="title">{{ i18n.home.hotRecommend }}</p>
        </div>
        <div class="mt-3">
          <CommonTopics :isShowTitle="false" />
        </div>
      </div>
    </div>
  </ui-spin>
</template>

<style lang="scss" scoped>
.is-tab {
  box-shadow: 0px 1px 0px rgba(3, 54, 102, 0.06);
}
</style>
