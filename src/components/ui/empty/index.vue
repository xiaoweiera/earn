<script setup lang="ts">
import { getEnv } from 'src/config';
defineProps({
  desc: {
    type: String,
    default: ''
  }
});

const env = getEnv();
</script>

<template>
  <div class="py-18">
    <div class="w-60 h-60 mx-auto">
      <ui-image class="h-full" fit="contain" :src="`${env.VITE_oss}/common/noData.png`"/>
    </div>
  </div>
</template>



