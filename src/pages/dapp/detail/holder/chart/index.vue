<script lang="ts" setup>
import HolderTrends from "src/pages/dapp/detail/holder/chart/trends.vue";
import HolderRatio from "src/pages/dapp/detail/holder/chart/ratio.vue";
import HolderNft from "src/pages/dapp/detail/holder/chart/nft.vue";
import HolderNftRatio from "src/pages/dapp/detail/holder/chart/nftRatio.vue";

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
    <HolderTrends :data="data" />
    <HolderRatio :data="data" />
    <HolderNft class="mt-7" :data="data" />
    <HolderNftRatio :data="data" />
  </div>
</template>

<style lang="scss" scoped></style>
