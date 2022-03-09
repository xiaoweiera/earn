<script setup lang="ts">
import { VueShowdown } from "vue-showdown";

defineProps({
  value: {
    type: String,
    default: () => "",
  },
});
</script>
<template>
  <div class="markdown-container">
    <VueShowdown v-if="value" :markdown="value" flavor="github" :options="{ emoji: true }" />
  </div>
</template>
