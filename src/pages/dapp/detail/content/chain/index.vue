<script lang="ts" setup>
import DAppUserData from "src/pages/dapp/detail/content/chain/userdata.vue";
import MarketCapData from "src/pages/dapp/detail/content/chain/marketcap.vue";
import TVLData from "src/pages/dapp/detail/content/chain/tvldata.vue";
import FloorData from "src/pages/dapp/detail/content/chain/floordata.vue";

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
    <FloorData :value="value" />
    <!-- 用户&资产 -->
    <DAppUserData :value="value" />
    <!-- 市值&交易量 -->
    <MarketCapData :value="value" />
    <!-- TVL/变化率 & Mcap/TVL -->
    <TVLData class="mt-3" :value="value" />
  </div>
</template>
