<script setup lang="ts">
import { ref } from "vue"
import safeGet from "@fengqiaogang/safe-get";
import DappDiscoversHeader from "./discovers/header.vue";
import DappDiscoversList from "./discovers/list.vue";
import DappDiscoversSearch from "./discovers/search.vue";
import DappDiscoversEndlist from "./discovers/endlist.vue";
import * as logic from "src/types/dapp/";
import { toLower } from "src/utils";
import { setScrollTop } from '~/utils/event/scroll';
import { includes } from 'ramda';

const active = ref<logic.TabTypes>();
const tabs = ref<logic.TabItem[]>(logic.tabs);
const init = function (query: object) {
  const type = safeGet<logic.TabTypes>(query, "type");
  if (type) {
    const id = toLower<logic.TabTypes>(type);
    const values = Object.values(logic.TabTypes);
    if (includes(id, values)) {
      active.value = id as logic.TabTypes;
      return;
    }
  }
  // 默认为全部
  active.value = logic.TabTypes.upcoming;
}
const onChangeView = function (data: object) {
  init(data);
  setTimeout(setScrollTop);
}
</script>
<template>
  <div class="discover-warp px-3 md:px-22.5">
    <div class="content pt-8">
      <!-- 头部 -->
      <div class="header">
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
        <DappDiscoversSearch></DappDiscoversSearch>
      </div>
      <!-- 列表内容 -->
      <div class="py-8">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <!-- <DappDiscoversList v-for="(item, index) in 9" :key='index'></DappDiscoversList> -->
        </div>
        <div>
          <DappDiscoversEndlist v-for="(item, index) in 9" :key='index'></DappDiscoversEndlist>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.discover-warp {
  @apply pb-15 bg-global-topBg;

  .content {
    @apply max-w-320 mx-auto;
  }
  .is-tab {
    box-shadow: 0px 1px 0px rgba(3, 54, 102, 0.06);
  }
}
</style>
