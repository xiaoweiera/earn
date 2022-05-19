<script setup lang="ts">
/**
 * @file text
 * @auth svon.me@gmail.com
 */
defineProps({
  name: {
    required: true,
    type: String,
  },
  data: {
    required: true,
    type: Object,
  },
});
</script>

<template>
  <span class="inline-block max-w-full truncate text-14-16 text-global-highTitle" v-text="data[name] || '-'"></span>
</template>
