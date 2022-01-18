<script setup lang="ts">
// @ts-ignore
import { VueShowdown } from "vue-showdown";

const props = defineProps({
  value: {
    type: String,
    default: () => ''
  }
});
</script>
<template>
  <div class="markdown-container">
    <VueShowdown
      :markdown="value"
      flavor="github"
      :options="{ emoji: true }"
    />
  </div>
</template>
