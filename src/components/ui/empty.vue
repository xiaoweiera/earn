<script setup lang="ts">
import { oss } from 'src/config';
defineProps({
  desc: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="py-18">
    <div class="w-60 h-60 mx-auto">
      <ui-image class="h-full" fit="contain" :src="`${oss}/common/noData.png`"/>
    </div>
  </div>
</template>



