<script lang="ts" setup>
import { ProjectType } from "src/types/dapp/ixo";
import DappNftsAd from "./ad.vue";
import DappNftsHeader from "./header.vue";

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
  <div
    class="nft-items h-79 border border-global-highTitle border-opacity-6 box-content rounded-md overflow-hidden cursor-pointer"
  >
    <div v-if="data.data_type === ProjectType.ad" class="nft-row h-full">
      <DappNftsAd :data="data" />
    </div>
    <div v-else class="nft-row w-full h-full">
      <v-router :href="data.url" target="_blank">
        <!-- 背景图 -->
        <DappNftsHeader :data="data" class="w-full h-full overflow-hidden" />
      </v-router>
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
.nft-footer {
  background: linear-gradient(180deg, rgba(45, 45, 45, 0) 0%, rgba(45, 45, 45, 0.931356) 60.7%);
}
</style>
