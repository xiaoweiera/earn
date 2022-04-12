<script setup lang="ts">
import { getInject } from "src/utils/use/state";
const des =
  "you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!you are good!";
const detail = getInject("detailState");
</script>
<template>
  <div>
    <ui-description :line="10" class="text-kd14px20px text-global-highTitle text-opacity-65">
      <ui-markdown class="text-kd14px20px text-global-highTitle text-opacity-65" :value="detail.long_description ? detail.long_description : des" />
    </ui-description>
  </div>
</template>
<style scoped>
::v-deep(p) {
  color: #033666;
  display: contents;
}
</style>
