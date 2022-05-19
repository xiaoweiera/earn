<script setup lang="ts">
/**
 * @file logo
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
  <ui-image class="w-8 h-8" :src="data[name]" rounded />
</template>
