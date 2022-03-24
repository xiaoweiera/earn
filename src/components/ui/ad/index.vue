<script setup lang="ts">
/**
 * @file 展示广告
 * @author svon.me@gmail.com
 */

import type { Ad } from "src/types/common/ad";
import type { PropType } from "vue";
type Fit = "cover" | "contain" | "fill" | "none";
defineProps({
  data: {
    required: true,
    type: Object as PropType<Ad>,
  },
  fit: {
    type: String as PropType<Fit>,
    default: () => "none",
  },
});
</script>
<template>
  <v-router v-if="data" class="block" :href="data.url" target="_blank">
    <ui-image :src="data.image" :fit="fit" />
  </v-router>
</template>
<style scoped lang="scss">
.ad {
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.45);
  @apply text-kd12px12px font-medium text-global-white;
  @apply px-1.5 py-0.5 rounded-kd4px;
}
</style>
