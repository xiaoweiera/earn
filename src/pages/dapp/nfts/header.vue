<script setup lang="ts">
import { toFixed } from "src/utils";
import DappNftsFooter from "./footer.vue";
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
  <div v-if="data" class="w-full h-full relative">
    <div v-if="data.gallery.length > 0" class="w-full h-full">
      <div v-for="(item, index) in data.gallery" :key="index" class="w-full h-full rounded-md">
        <ui-image v-if="index === 0" class="w-full" fit="none" :src="item" :lazy="true" />
        <ui-image v-if="index === 0" class="w-full image-transform" fit="none" :src="item" :lazy="true" />
      </div>
    </div>
    <div v-else class="is-flater w-full h-full">
      <ui-image class="w-full h-full" fit="cover" :src="data.logo" :lazy="true" />
    </div>
    <div class="w-full absolute top-4 left-0 z-1">
      <div class="w-full flex justify-between px-4">
        <p
          v-if="data.category"
          class="h-5.5 flex items-center bg-global-bgBlack px-2 border border-global-white border-opacity-25 rounded-2xl"
        >
          <span class="text-kd12px14px text-global-white font-kdFang font-medium">{{ data.category }}</span>
        </p>
        <p v-else />
        <p
          class="h-5.5 bg-global-gemstone px-2 text-global-white border border-global-white border-opacity-25 rounded-2xl flex items-center"
        >
          <IconFont type="icon-star" size="12" class="is-star" />
          <span class="ml-0.5 text-kd16px18px text-number font-semibold">{{ toFixed(data.overall_score, 1) }}</span>
        </p>
      </div>
    </div>
    <!-- footer -->
    <div class="nft-footer w-full absolute bottom-0 left-0">
      <DappNftsFooter :data="data" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.is-star {
  ::v-deep(.bright) {
    @apply text-global-white;
  }
}

.nft-footer {
  background: linear-gradient(180deg, rgba(45, 45, 45, 0) 0%, rgba(45, 45, 45, 0.931356) 80%);
}
.is-flater {
  @apply bg-global-hei;
  filter: blur(16px);
  -webkit-filter: blur(16px);
  -moz-filter: blur(16px);
  -ms-filter: blur(16px);
  -o-filter: blur(16px);
}
.image-transform {
  transform: matrix(1, 0, 0, -1, 0, 0);
  -ms-transform: matrix(1, 0, 0, -1, 0, 0);
  -moz-transform: matrix(1, 0, 0, -1, 0, 0);
  -webkit-transform: matrix(1, 0, 0, -1, 0, 0);
  -o-transform: matrix(1, 0, 0, -1, 0, 0);
}
</style>
