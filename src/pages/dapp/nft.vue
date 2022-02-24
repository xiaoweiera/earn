<script setup lang="ts">
import DappDiscoversHeader from './discovers/header.vue';
import DappNftsSearch from './nfts/search.vue';
import DappNftsEndlist from './nfts/endlist.vue';
import DappNftsList from './nfts/list.vue';

import {onMounted, ref} from "vue"
import safeGet from "@fengqiaogang/safe-get";
 import * as logic from "src/types/dapp/";
import { toLower } from "src/utils";
import { includes } from 'ramda';
import { useRoute } from 'vue-router'
import {Model} from "~/logic/dapp";
import {createReactive, onLoadReactive} from "~/utils/ssr/ref";
import {summaryModel} from "~/types/home";
import {Model as Homemodel} from "~/logic/home";


//获取类型
const summary = createReactive<summaryModel>("API.home.getSummary", {} as summaryModel);
onMounted(function () {
  const api = new Homemodel();
  // 得到数据汇总
  onLoadReactive(summary, () => api.getSummary());
});

// 获取ido列表
const list = createReactive("API.dapp.getNftList", {});
onMounted(function () {
  const api = new Model();
  // 得到数据汇总
  onLoadReactive(list, () => api.getNftList());
});

const $router = useRoute();
const active = ref<logic.NftTabTypes>();
const tabs = ref<logic.NftTabItem[]>(logic.nftTabs);
const init = function (query: object) {
  const type = safeGet<logic.NftTabTypes>(query, "type");
  if (type) {
    const id = toLower<logic.NftTabTypes>(type);
    const values = Object.values(logic.NftTabTypes);
    if (includes(id, values)) {
      active.value = id as logic.NftTabTypes;
      return;
    }
  }
  // 默认为全部
  active.value = logic.NftTabTypes.upcoming;
}
const onChangeView = function (data: object) {
  init(data);
}
</script>
<template>
  <div class="pb-15 bg-global-topBg px-3 md:px-22.5">
    <div class="max-w-315 mx-auto pt-8">
      <!-- 项目名称 -->
      <div>
        <DappDiscoversHeader></DappDiscoversHeader>
      </div>
      <!-- 分类 -->
      <ui-sticky active-class="table-box-title" class="is-tab bg-global-topBg mt-8">
        <div>
          <ui-tab :list="tabs" @change="onChangeView" active-name="type"></ui-tab>
        </div>
      </ui-sticky>
      <!-- 搜索条件 -->
      <div>
        <DappNftsSearch :data="summary.nft"></DappNftsSearch>
      </div>
      <!-- 列表数据 -->
      <div class="w-full py-8 overflow-x-scroll showX">
        <div class="w-315" v-if="$router.query.type === logic.NftTabTypes.history">
          <DappNftsEndlist :list="list"></DappNftsEndlist>
        </div>
        <div class="w-315 grid grid-cols-5 gap-6" v-else>
          <DappNftsList v-for="( item, index ) in list" :key="index" :data="item"></DappNftsList>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.is-tab {
  box-shadow: 0px 1px 0px rgba(3, 54, 102, 0.06);
}
</style>
