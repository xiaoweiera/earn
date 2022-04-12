<script lang="ts" setup>
import DAppUserData from "src/pages/dapp/detail/content/chain/userdata.vue";
import MarketCapData from "src/pages/dapp/detail/content/chain/marketcap.vue";
import TVLData from "src/pages/dapp/detail/content/chain/tvldata.vue";
import FloorData from "src/pages/dapp/detail/content/chain/floordata.vue";
import { TabName } from "src/types/dapp/data";

defineProps({
  value: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>

<template>
  <div class="w-full">
    <!-- 地板价 -->
    <FloorData v-if="value.type === TabName.nft && value.rank" :value="value" />
    <div v-if="value.type === TabName.nft" class="w-full h-0.25 bg-global-highTitle bg-opacity-6 my-6"></div>
    <!-- 用户&资产 -->
    <DAppUserData :value="value" />
    <div class="w-full h-0.25 bg-global-highTitle bg-opacity-6 my-6"></div>
    <!-- 市值&交易量 -->
    <MarketCapData :value="value" />
    <div v-if="value.type !== TabName.nft && value.rank" class="w-full h-0.25 bg-global-highTitle bg-opacity-6 my-6"></div>
    <!-- TVL/变化率 & Mcap/TVL -->
    <TVLData v-if="value.type !== TabName.nft && value.rank" class="mt-3" :value="value" />
  </div>
</template>
