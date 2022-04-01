<script lang="ts" setup>
import * as track from "src/logic/track";
import { onMounted, ref, toRaw, reactive } from "vue";
import I18n from "src/utils/i18n";
import { Model, nftTabs, transformNftList } from "src/logic/dapp";
import { NftTabTypes } from "src/types/dapp";
import { uuid } from "src/utils";
import type { summaryModel } from "src/types/home";
import { getValue } from "src/utils/root/data";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";

// 引入 use state
import { stateAlias, useReactiveProvide, useWatch } from "src/utils/use/state";
import { getParam } from "src/utils/router";
import DAppNftSearch from "./nfts/search.vue";
import DAppDiscoversHeader from "./discovers/header.vue";
import DAppNftEndList from "./nfts/endlist.vue";
import HomeAd from "src/pages/home/ad.vue";
import DAppNftUpcoming from "./nfts/upcoming.vue";

const key = ref<string>(uuid());
const sortKey = ref<string>(uuid());

const i18n = I18n();
let initStatus = true;

const sort = reactive({
  sort_type: "",
  sort_field: "",
});

const [query] = useReactiveProvide<object>(stateAlias.ui.tab, {});

// 获取 nft 列表
const requestList = function (data: object) {
  const model = new Model();
  const params = toRaw(query);
  return model.getNftList({ ...params, ...data, ...sort });
};

// 获取类型
const summary = createReactive<summaryModel>(alias.dApp.summary.list, {} as summaryModel);

const initValue = function () {
  if (initStatus) {
    initStatus = false;
    return getValue(alias.nft.list, []);
  }
  return [];
};

onMounted(() => {
  // 上报数据
  track.push(track.Origin.gio, track.event.dApp.nft);
  onLoadReactive(summary, () => {
    const model = new Model();
    return model.getSummary();
  });
  // 监听路由变化
  useWatch(query, () => {
    (sort.sort_type = ""),
    (sort.sort_field = ""), // 置空排序参数，此处逻辑不需要设置排序参数
    (key.value = uuid());
  });
});
const changeSort = function (val: any) {
  if (!sort.sort_type || sort.sort_field !== val) {
    sort.sort_type = "desc";
  } else if (sort.sort_type === "desc") {
    sort.sort_type = "asc";
  } else {
    sort.sort_type = "";
  }
  // 定义排序参数
  sort.sort_field = val;
  // 重新渲染列表
  sortKey.value = uuid();
};
const getFilter = function (data: any) {
  const status = getParam<string>("status");
  if (data && (data.nft_upcoming || data.nft_ended)) {
    if (status === NftTabTypes.history) {
      return data.nft_ended;
    } else {
      return data.nft_upcoming;
    }
  }
};
</script>
<template>
  <div class="pb-15 bg-global-topBg px-3 md:px-22.5">
    <div :key="key" class="max-w-315 mx-auto pt-8">
      <!-- 项目名称 -->
      <div class="w-full mb-6">
        <DAppDiscoversHeader :tips="i18n.home.nfts.desc" :title="i18n.home.nfts.title" />
      </div>
      <!-- 广告 -->
      <div class="w-full">
        <HomeAd class="mb-6" :position="24" />
      </div>
      <!-- 分类 -->
      <ui-sticky active-class="table-box-title" class="is-tab bg-global-topBg">
        <ui-tab :list="nftTabs" active-name="status" />
      </ui-sticky>
      <!-- 搜索条件 -->
      <div v-if="summary">
        <DAppNftSearch :data="getFilter(summary)" />
      </div>

      <div :key="sortKey" class="mt-4">
        <ui-pagination :limit="20" :init-value="initValue()" :request="requestList">
          <template #default="scope">
            <!--历史项目-->
            <div v-if="query.status === NftTabTypes.history" class="showX">
              <DAppNftEndList class="min-w-307" :params="sort" :list="scope.list" @change-sort="changeSort" />
            </div>
            <!--进行中-->
            <DAppNftUpcoming v-else class="pb-1" :list="transformNftList(scope.list)" />
          </template>
        </ui-pagination>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.is-tab {
  box-shadow: 0px 1px 0px rgba(3, 54, 102, 0.06);
}
</style>
