<script setup lang="ts">
import { getValue } from "src/utils/root/data";
import { computed } from "vue";

const html = computed<string>(function () {
  const value = getValue<string>("html");
  if (value) {
    return value;
  }
  return "";
});
</script>
<template>
  <div>
    <div class="apy-main" v-html="html"></div>
  </div>
</template>
