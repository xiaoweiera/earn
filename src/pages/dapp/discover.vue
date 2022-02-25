<script setup lang="ts">
import DappDiscoversHeader from './discovers/header.vue';
import DappDiscoversSearch from './discovers/search.vue';
import DappDiscoversEndlist from './discovers/endlist.vue';
import DappDiscoversList from './discovers/list.vue';
import * as alias from "src/utils/root/alias";
import {onMounted, ref} from "vue"
import safeGet from "@fengqiaogang/safe-get";
import * as logic from "src/types/dapp/";
import {toLower, uuid} from "src/utils";
import { includes } from 'ramda';
import {Model} from "src/logic/dapp";
import {createReactive, onLoadReactive} from "src/utils/ssr/ref";
import {summaryModel} from "src/types/home";
import {Model as HomeModel} from "src/logic/home";

import { stateAlias, useReactiveProvide, useWatch } from "src/utils/use/state";

interface Query {
  group: string;
  platform: string;
  type: string;
  [key: string]: string
}

const key = ref<string>(uuid());
// 定义一个 provide 数据，给子组件（ui-tab）使用
const [ query ] = useReactiveProvide<Query>(stateAlias.ui.tab, {});


//获取类型
const summary = createReactive<summaryModel>(alias.dApp.summary.list, {} as summaryModel);
onMounted(function () {
  // 得到数据汇总
  onLoadReactive(summary, () => {
    const api = new HomeModel();
    return api.getSummary();
  });
});
// 获取ido列表
const list = createReactive("API.dapp.getList", {});
const igolist = createReactive("API.dapp.getIGOList", {});

onMounted(function () {
  const api = new Model();
  // 得到数据汇总
  onLoadReactive(list, () => api.getList());
  onLoadReactive(igolist, () => api.getIGOList());
});

const active = ref<logic.TabTypes>();
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
  // 默认为upcoming
  active.value = logic.TabTypes.upcoming;
}

// 监听 ui-tab 数据变化
useWatch<object>(query, function (value: object) {
  key.value = uuid();
  console.log("ui-tab", value);
  // todo 可以在此处更新某些数据
});

</script>
<template>
  <div class="discover-warp px-3 md:px-22.5">
    <div class="content pt-8">
      <!-- 头部 -->
      <div class="header">
        <DappDiscoversHeader></DappDiscoversHeader>
      </div>
       <!-- 分类 -->
      <ui-sticky active-class="table-box-title" class="is-tab bg-global-topBg mt-8">
        <ui-tab :key="key" :list="logic.tabs" active-name="type"/>
      </ui-sticky>
      <!-- 搜索条件 -->
      <div v-if="summary && summary.ido">
        <DappDiscoversSearch :key="key" :data="summary.ido"/>
      </div>
      <!-- 列表内容 -->
      <div class="py-8">
        <div v-if="query.type === logic.TabTypes.ended">
          <DappDiscoversEndlist class="px-4" :list="list"></DappDiscoversEndlist>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" v-else>
          <DappDiscoversList v-for="(item, index) in list" :key='index' :data="item"></DappDiscoversList>
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
