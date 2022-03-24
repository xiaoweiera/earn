<script setup lang="ts">
import { getEnv } from "src/config/";
import { lazyLoad } from "src/plugins/lazyload/";
const Content = lazyLoad(() => import("./test.vue"));

const env = getEnv();
</script>
<template>
  <div class="text-3xl text-center">
    <v-router class="block" :href="env.home">
      <Content />
    </v-router>
  </div>
</template>
