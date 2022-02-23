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



// const list = ref([
//   {
//     "id": 1,
//     // 名字
//     "name": "Raca",
//     // 数据类型
//     "data_type": "dapp",
//     // 图集
//     "gallery": [
//         "https://xxx.jpg"
//     ],
//     // 持有人数
//     "owners": 1000,
//     // 公链
//     "chains": ["bsc"],
//     // 类型
//     "categories": ["game"],
//     // 项目评分
//     "overall_score": 9.8,
//     // Mint价格
//     "mint_price": '',
//     // 发行数量
//     "issue_volume": '',
//     // 开始时间
//     "mint_start_at": 1645574400,
//     // 地板价格
//     "floor_price": 0.02
//   },{
//     "id": 2,
//     // 名字
//     "name": "Raca",
//     // 数据类型
//     "data_type": "dapp",
//     // 图集
//     "gallery": [
//         "https://xxx.jpg"
//     ],
//     // 持有人数
//     "owners": 1000,
//     // 公链
//     "chains": ["bsc"],
//     // 类型
//     "categories": ["game"],
//     // 项目评分
//     "overall_score": 9.8,
//     // Mint价格
//     "mint_price": 0.05,
//     // 发行数量
//     "issue_volume": 10000,
//     // 开始时间
//     "mint_start_at": 1645574400,
//   },{
//     "id": 3,
//     // 名字
//     "name": "Raca",
//     // 数据类型
//     "data_type": "dapp",
//     // 图集
//     "gallery": [
//         "https://xxx.jpg"
//     ],
//     // 公链
//     "chains": ["bsc"],
//     // 类型
//     "categories": ["game"],
//     // 项目评分
//     "overall_score": 9.8,
//     // Mint价格
//     "mint_price": 0.05,
//     // 发行数量
//     "issue_volume": 10000,
//     // 开始时间
//     "mint_start_at": 1645574400,
//   },{
//     "id": 4,
//     // 名字
//     "name": "Raca",
//     // 数据类型
//     "data_type": "dapp",
//     // 图集
//     "gallery": [
//         "https://xxx.jpg"
//     ],
//     // 公链
//     "chains": ["bsc"],
//     // 类型
//     "categories": ["game"],
//     // 项目评分
//     "overall_score": 9.8,
//     // Mint价格
//     "mint_price": 0.05,
//     // 发行数量
//     "issue_volume": 10000,
//     // 开始时间
//     "mint_start_at": 1645574400,
//     // 地板价格
//     "floor_price": 0.02
//   },{
//     "id": 4,
//     // 名字
//     "name": "Raca",
//     // 数据类型
//     "data_type": "dapp",
//     // 图集
//     "gallery": [
//         "https://xxx.jpg"
//     ],
//     // 公链
//     "chains": ["bsc"],
//     // 类型
//     "categories": ["game"],
//     // 项目评分
//     "overall_score": 9.8,
//     // Mint价格
//     "mint_price": 0.05,
//     // 发行数量
//     "issue_volume": 10000,
//     // 开始时间
//     "mint_start_at": 1645574400,
//     // 地板价格
//     "floor_price": 0.02
//   }
// ])


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
      <ui-Header-sticky active-class="table-box-title" class="is-tab bg-global-topBg mt-8">
        <div>
          <ui-tab :list="tabs" @change="onChangeView" active-name="type"></ui-tab>
        </div>
      </ui-Header-sticky>
      <!-- 搜索条件 -->
      <div>
        <DappNftsSearch></DappNftsSearch>
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