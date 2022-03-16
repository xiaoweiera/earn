<script setup lang="ts">
import { toFixed } from "src/utils";
import DappDiscoversContentRisk from "./risk.vue";
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
  <div v-if="data">
    <div class="w-full h-40 rounded-md overflow-hidden">
      <div v-if="data.cover" class="w-full h-full">
        <ui-image class="w-full h-full" fit="cover" :src="data.cover" :lazy="true" />
      </div>
      <div v-else class="is-flater w-full h-full">
        <div class="is-flater w-full h-full">
          <ui-image class="iw-full h-full" fit="cover" :src="data.logo" :lazy="true" />
        </div>
      </div>
    </div>
    <div class="w-full absolute top-4 left-0">
      <div class="flex justify-between px-2">
        <p class="flex">
          <DappDiscoversContentRisk class="bg-global-bgBlack" :value="data.risk" />
          <span
            v-if="data.category"
            class="flex items-center bg-global-bgBlack ml-1 px-2 text-kd12px14px text-global-white border border-global-white border-opacity-25 font-kdFang rounded-2xl"
            >{{ data.category }}</span
          >
        </p>
        <p class="min-w-12.5 bg-global-gemstone px-2 text-global-white border border-global-white border-opacity-25 rounded-2xl">
          <IconFont type="icon-star" size="12" class="is-star" />
          <span class="ml-0.5 text-kd16px18px font-semibold text-number is-score">{{
            toFixed(data.overall_score, 1)
          }}</span>
        </p>
      </div>
    </div>
    <div v-if="data.cover && data.cover != null" class="is-cover" />
  </div>
</template>
<style lang="scss" scoped>
.is-star {
  ::v-deep(.bright) {
    @apply text-global-white;
  }
}
.is-cover {
  @apply absolute bottom-0 left-0 w-full h-20;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
}
.is-score {
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.06);
}
.is-flater {
  @apply bg-global-hei;
  filter: blur(14px);
  -webkit-filter: blur(14px);
  -moz-filter: blur(14px);
  -ms-filter: blur(14px);
  -o-filter: blur(14px);
}
</style>
