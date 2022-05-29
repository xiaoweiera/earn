<script lang="ts" setup>
import { ProjectType } from "src/types/dapp/ixo";
import DAppNftsAd from "./ad.vue";
import DAppNftsItem from "./item.vue";

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
  <div class="nft-items h-79 border border-global-highTitle border-opacity-6 box-content rounded-md overflow-hidden cursor-pointer">
    <!--    <div v-if="data.data_type === ProjectType.ad" class="nft-row h-full">-->
    <!--      <DAppNftsAd :data="data" />-->
    <!--    </div>-->
    <div class="w-full h-full">
      <DAppNftsItem :data="data" />
    </div>
  </div>
</template>
<style lang="scss">
.nft-items {
  @apply w-58;
  &:hover {
    .nft-row {
      box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.12);
    }
  }
}

@screen md {
  .nft-item {
    @apply w-auto;
  }
}
</style>
