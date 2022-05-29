<script lang="ts" setup>
import DAppUserData from "src/pages/dapp/detail/content/chain/userdata.vue";
import MarketCapData from "src/pages/dapp/detail/content/chain/marketcap.vue";
import TVLData from "src/pages/dapp/detail/content/chain/tvldata.vue";
import FloorData from "src/pages/dapp/detail/content/chain/floordata.vue";
import { DAppProject, ProjectType } from "src/types/dapp/data";
import { PropType } from "vue";

defineProps({
  project: {
    required: true,
    type: Object as PropType<DAppProject>,
  },
});
</script>

<template>
  <div class="w-full">
    <!-- 地板价 -->
    <FloorData v-if="project.type === ProjectType.nft || project.type === ProjectType.mint" :project="project" />
    <!-- 用户&资产 -->
    <DAppUserData :project="project" />
    <!-- 市值&交易量 -->
    <MarketCapData :project="project" />
    <!-- TVL/变化率 & Mcap/TVL -->
    <TVLData class="mt-3" :project="project" />
  </div>
</template>
