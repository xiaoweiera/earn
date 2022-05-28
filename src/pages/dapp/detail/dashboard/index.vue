<script setup lang="ts">
import Introduction from "src/pages/dapp/detail/dashboard/introduction.vue";
import News from "src/pages/dapp/detail/dashboard/news.vue";
import Token from "src/pages/dapp/detail/token/index.vue";
import Information from "src/pages/dapp/detail/content/chain/index.vue";
import Statistics from "src/pages/dapp/detail/holder/chart/floor.vue";
import { ProjectType } from "src/types/dapp/data";
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
  <div>
    <div>
      <Token :data="data" />
    </div>
    <Statistics v-if="data.type === ProjectType.nft" :data="data" />
    <Information :data="data" />
    <Introduction />
    <News />
  </div>
</template>
