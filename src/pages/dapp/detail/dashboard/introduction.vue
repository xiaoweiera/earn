<script setup lang="ts">
import safeGet from "@fengqiaogang/safe-get";
import { getInject } from "src/utils/use/state";
const detail = getInject("detailState");
</script>
<template>
  <div v-if="safeGet(detail, 'long_description')">
    <h class="title mb-2">Introduction</h>
    <ui-description :line="10" class="text-kd14px20px text-global-highTitle text-opacity-65">
      <ui-markdown class="text-kd14px20px text-global-highTitle text-opacity-65" :value="safeGet(detail, 'long_description')" />
    </ui-description>
  </div>
</template>
<style scoped>
.title {
  @apply text-global-highTitle text-kd24px28px font-medium;
}
::v-deep(p) {
  color: #033666;
  display: contents;
}
</style>
