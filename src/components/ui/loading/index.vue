<script setup lang='ts'>
import { getEnv } from "src/config";
const env = getEnv();
</script>
<template>
  <div class="flex items-center justify-center   w-full   h-full justify-center">
    <img class="w-50   z-2 mt-4 md:mt-0 mr-4 mb-10" :src="`${env.VITE_oss}/nav/loadingState.gif`" alt="">
  </div>
</template>
