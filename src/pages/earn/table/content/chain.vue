<script setup lang="ts">
import {icons} from 'src/logic/earn'
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
  <ui-image class="w-3.5 h-3.5" :src="`${icons[data[field]]}`" :title="data['name']"/>
</template>
