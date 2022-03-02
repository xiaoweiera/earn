<script lang="ts" setup>
import {onMounted, ref, toRaw} from "vue";
import I18n from "src/utils/i18n";
import {Model, transformNftList} from "src/logic/dapp";
import {nftTabs} from "src/types/dapp";
import { uuid } from "src/utils";
import DAppNftList from './nfts/list.vue';
import DAppNftEndList from './nfts/endlist.vue';
import DAppDiscoversHeader from './discovers/header.vue';
import DAppNftSearch from './nfts/search.vue';
import {summaryModel} from "src/types/home";
import { getValue } from "src/utils/root/data";
import { alias, createReactive, onLoadReactive} from "src/utils/ssr/ref";

// 引入 use state
import {stateAlias, useReactiveProvide, useWatch} from "src/utils/use/state";

const key = ref<string>(uuid());
const i18n = I18n();
let initStatus = true;

const [ query ] = useReactiveProvide<object>(stateAlias.ui.tab, {});

// 获取 nft 列表
const requestList = function (data: object) {
  const model = new Model();
  const params = toRaw(query);
  return model.getNftList({ ...params, ...data });
}

//获取类型
const summary = createReactive<summaryModel>(alias.dApp.summary.list, {} as summaryModel);

const initValue = function () {
  if (initStatus) {
    initStatus = false;
    return getValue(alias.nft.list, []);
  }
  return [];
}

onMounted(function () {
  onLoadReactive(summary, function () {
    const model = new Model();
    return model.getSummary();
  });
  // 监听路由变化
  useWatch(query, function () {
    key.value = uuid();
  });
});

</script>
<template>
  <div class="pb-15 bg-global-topBg px-3 md:px-22.5">
    <div class="max-w-315 mx-auto pt-8" :key="key">
      <!-- 项目名称 -->
      <div>
        <DAppDiscoversHeader :tips="i18n.home.nfts.desc" :title="i18n.home.nfts.title"/>
      </div>
      <!-- 分类 -->
      <ui-sticky active-class="table-box-title" class="is-tab bg-global-topBg mt-8">
        <ui-tab :list="nftTabs" active-name="status"/>
      </ui-sticky>
      <!-- 搜索条件 -->
      <div v-if="summary && summary.nft">
        <DAppNftSearch :data="summary.nft"/>
      </div>

      <div class="mt-4">
        <ui-pagination :limit="10" :init-value="initValue()" :request="requestList">
          <template #default="scope">
            <!--历史项目-->
            <div v-if="query.status === 'history'">
              <DAppNftEndList :list="scope.list"/>
            </div>
            <!--进行中-->
            <div class="pb-1" v-else>
              <div v-for="data in transformNftList(scope.list)" :key="data.title">
                <h3 class="py-4">{{ data.title }}</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-6">
                  <DAppNftList v-for="(item, index ) in data.list" :key="index" :data="item"/>
                </div>
              </div>
            </div>
          </template>
        </ui-pagination>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.ui-tab {
  box-shadow: 0 1px 0 rgba(3, 54, 102, 0.06);
}
</style>
