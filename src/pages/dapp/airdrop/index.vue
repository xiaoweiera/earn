<script lang="ts" setup>
import * as track from "src/logic/track";
import I18n from "src/utils/i18n/";
import safeGet from "@fengqiaogang/safe-get";
import { tabs } from "src/logic/dapp/airdrop";
import HomeAd from "src/pages/home/ad.vue";
import { TabTypes } from "src/types/dapp/airdrop";
import { getValue } from "src/utils/root/data";

import { onMounted, ref } from "vue";
import DAppAirdropAd from "./ad/index.vue";
import DAppAirdropContent from "./content/index.vue";

const i18n = I18n();
const activeName = ref<string>("name");
const active = ref<string>(getValue("query.name", TabTypes.all));

const onChange = function (data: object) {
  const value = safeGet<string>(data, activeName.value);
  if (value) {
    active.value = value;
  }
};
onMounted(() => {
  // 上报数据
  track.push(track.Origin.gio, track.event.dApp.airdrop);
});
</script>

<template>
  <div class="bg-global-topBg pb-20 px-4 lg:px-0">
    <div class="max-w-300 mx-auto">
      <!-- 标题 -->
      <div class="py-8">
        <h2 class="text-kd32px32px text-global-highTitle">
          <b class="font-b font-kdBarlow">{{ i18n.airdrop.title }}</b>
        </h2>
        <p class="text-kd13px18px md:text-kd14px18px mt-3 text-global-highTitle text-opacity-45 font-kdInter" v-html="i18n.airdrop.desc"></p>
      </div>
      <!-- 广告 -->
      <HomeAd :position="24" class="w-full h-full mb-6" />
      <!-- 分类 -->
      <ui-sticky active-class="table-box-title" class="shadow-border-b bg-global-topBg">
        <ui-tab :active-name="activeName" :list="tabs()" trigger="router" @change="onChange">
          <template #default="{ data }">
            <div v-if="data.logo" class="flex items-center">
              <IconFont :type="data.logo" class="mr-1.5" size="24" />
              <span class="text-18-24 font-m">{{ data.label }}</span>
            </div>
            <span v-else class="text-18-24 font-m">{{ data.label }}</span>
          </template>
        </ui-tab>
      </ui-sticky>
      <div :key="active">
        <!-- 广告 -->
        <DAppAirdropAd :active="active" class="w-full mt-8" />
        <!-- 内容 -->
        <DAppAirdropContent :active="active" class="mt-8" />
      </div>
    </div>
  </div>
</template>
