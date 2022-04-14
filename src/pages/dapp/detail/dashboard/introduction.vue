<script setup lang="ts">
import safeGet from "@fengqiaogang/safe-get";
import { getInject } from "src/utils/use/state";
import I18n from "src/utils/i18n";
const i18n = I18n();
const detail = getInject("detailState");
</script>
<template>
  <div v-if="safeGet(detail, 'long_description')">
    <h1 class="title mt-4 md:mt-14 mb-3 font-kdFang">{{ i18n.dapp.introduction.title }}</h1>
    <ui-description :line="10">
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
