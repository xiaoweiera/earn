<script setup lang="ts">
/**
 * @file logo
 * @auth svon.me@gmail.com
 */
defineProps({
  field: {
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
  <ui-image class="w-8 h-8" :src="`https://jsdata-web.kingdata.xyz/media/${data[field]}`" :title="data['name']" rounded />
</template>
