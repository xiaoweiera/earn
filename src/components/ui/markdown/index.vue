<script lang="ts" setup>
import Content from "./content.vue";

defineProps({
  value: {
    type: String,
    default: () => "",
  },
});
</script>
<template>
  <Content :value="value" class="markdown-container" />
</template>
