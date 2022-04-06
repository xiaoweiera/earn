<script setup lang="ts">
/**
 * @file Echarts
 * @auth svon.me@gmail.com
 */
import { asyncLoad } from "src/plugins/lazyload/";
const Echarts = asyncLoad(() => import("./chart.vue"));
</script>

<template>
  <div>
    <Echarts class="h-full" />
  </div>
</template>
