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
  <div class="p-10">
    <FloorData v-if="value.type === 'nft' && value.rank" :value="value" />
    <DAppUserData :value="value" />
    <MarketCapData :value="value" />
    <TVLData v-if="value.type !== 'nft' && value.rank" :value="value" />
  </div>
</template>
