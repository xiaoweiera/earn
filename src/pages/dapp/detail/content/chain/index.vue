<script lang="ts" setup>
import DAppUserData from "src/pages/dapp/detail/content/chain/userdata.vue";
import MarketCapData from "src/pages/dapp/detail/content/chain/marketcap.vue";
import TVLData from "src/pages/dapp/detail/content/chain/tvldata.vue";
import FloorData from "src/pages/dapp/detail/content/chain/floordata.vue";

defineProps({
  data: {
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
    <FloorData :data="data" />
    <!-- 用户&资产 -->
    <DAppUserData :data="data" />
    <!-- 市值&交易量 -->
    <MarketCapData :data="data" />
    <!-- TVL/变化率 & Mcap/TVL -->
    <TVLData class="mt-3" :data="data" />
  </div>
</template>
