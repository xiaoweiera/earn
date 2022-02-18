<script setup lang="ts">

import { ref } from "vue"
import safeGet from "@fengqiaogang/safe-get";
 import * as logic from "src/types/dapp/";
import { toLower } from "src/utils";
import { setScrollTop } from '~/utils/event/scroll';
import { includes } from 'ramda';
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
  setTimeout(setScrollTop);
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
      <ui-Header-sticky active-class="table-box-title" class="is-tab bg-global-topBg mt-8">
        <div>
          <ui-tab :list="tabs" @change="onChangeView"></ui-tab>
        </div>
      </ui-Header-sticky>
      <!-- 搜索条件 -->
      <div>
        <DappNftsSearch></DappNftsSearch>
      </div>
      <!-- 列表数据 -->
      <div class="w-full py-8 overflow-x-scroll showX">
        <div class="w-315 grid grid-cols-5 gap-6">
          <DappNftsList v-for="( item, index ) in 5" :key="index"></DappNftsList>
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