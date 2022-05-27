<script setup lang="ts">
/**
 * @file vip icon
 * @auth svon.me@gmail.com
 */

import { Equals } from "src/utils";

defineProps({
  type: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div v-show="type" class="inline-block">
    <template v-if="Equals(type, 'vip')">
      <div class="vip-icon w-6.5">
        <icon-font class="icon-content" type="icon-VIP" size="26" />
      </div>
    </template>
    <template v-else-if="Equals(type, 'vip_pro')">
      <div class="vip-icon w-10">
        <icon-font class="icon-content" type="icon-a-VIPPro" size="40" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.vip-icon {
  height: 18px;
  @apply flex relative overflow-hidden;
  .icon-content {
    @apply absolute left-0 top-1/2 transform -translate-y-1/2;
  }
}
</style>
