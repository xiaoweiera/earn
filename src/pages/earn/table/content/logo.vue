<script setup lang="ts">
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
  <ui-image class="w-6 h-6" :src="`${data[field]}`" :title="data['name']" rounded />
</template>
