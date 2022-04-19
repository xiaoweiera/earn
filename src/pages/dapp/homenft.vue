<script lang="ts" setup>
/**
 * @file NFT 列表
 */
import I18n from "src/utils/i18n";
import { onMounted, reactive, ref } from "vue";
import { Model, tabChain } from "src/logic/dapp";
import { alias, createRef, onLoadRef, onUpdateRef } from "src/utils/ssr/ref";
import type { AdNftItem, ProjectNftItem } from "src/types/dapp/nft";
import { nftStatus } from "src/types/dapp/nft";
import { getParam } from "src/utils/router";
import { config } from "src/router/config";
import { uuid } from "src/utils";

import { getReactiveInject, stateAlias, useWatch } from "src/utils/use/state";
import type { Query } from "src/types/common";
import DAppDiscoverContentChain from "./discovers/content/chain.vue";
import DAppNftList from "./nfts/list.vue";
import DAppDiscoverContentType from "./discovers/content/type.vue";
import DAppHomeHeader from "./home/header.vue";

defineProps({
  summary: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const i18n = I18n();
const route = getReactiveInject<Query>(stateAlias.ui.tab) || {};
const chain = ref(getParam<string>("group"));
const keys = ref<string>(uuid());
const params = reactive({
  page: 1,
  page_size: 15,
  chain: chain.value,
  category: "",
  status: "upcoming",
  query: "",
  sort_field: "",
  sort_type: "", // desc asc
  paginate: false,
});
const urlType = false;

// 创建列表对象并获取缓存数据
const UpcomingNftList = createRef<Array<ProjectNftItem | AdNftItem>>(alias.nft.upcoming, [] as any);
// nft drops
const getUpcomingNftList = async function () {
  const model = new Model();
  return model.getUpcomingNftList(params);
};

// 创建更新列表钩子函数
const updateUpcomingList = onUpdateRef(UpcomingNftList, getUpcomingNftList);

onMounted(() => {
  // 判断列表数据是否为空，如果为空则获取最新数据
  onLoadRef(UpcomingNftList, getUpcomingNftList);

  useWatch(route, () => {
    keys.value = uuid();
    if (params.chain !== route.group) {
      params.chain = route.group;
      updateUpcomingList();
    }
  });
});
</script>
<template>
  <div>
    <div>
      <!-- header -->
      <div>
        <DAppHomeHeader :status="nftStatus.upcoming" :tips="i18n.home.idoIgoProject.never" :type="urlType" title="NFT Projects 🎯" />
      </div>
      <!-- 搜索 -->
      <!-- pc端-->
      <div :key="keys" class="mt-4 hidden md:block">
        <DAppDiscoverContentType v-if="summary.nft_upcoming" :list="tabChain(summary.nft_upcoming.chain, 'group', config.home)" :split="6" :title="i18n.home.idoIgoProject.chain" active-name="group" name="group" />
      </div>
      <!--手机端-->
      <div :key="keys" class="mt-4 block md:hidden">
        <DAppDiscoverContentChain v-if="summary.nft_upcoming" :chain-data="summary.nft_upcoming.chain" :href="config.home" :title="i18n.home.idoIgoProject.chain" class="w-full" name="group" />
      </div>
      <!-- nft项目 -->
      <div v-if="UpcomingNftList.length > 0" class="mt-4 nft-item w-full showX">
        <div class="coming-item">
          <div v-for="(item, index) in UpcomingNftList" :key="index" :class="{ 'ml-6': index > 0 }" class="xl:ml-0">
            <DAppNftList :key="index" :data="item" />
          </div>
        </div>
      </div>
      <div v-else>
        <ui-empty class="pb-3" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nft-item {
  .coming-item {
    @apply flex items-center flex-nowrap;
  }

  @screen xl {
    @apply overflow-auto;
    .coming-item {
      @apply grid grid-cols-5 gap-6;
    }
  }
}
</style>
