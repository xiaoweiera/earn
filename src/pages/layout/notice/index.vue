<script setup lang="ts">
/**
 * @file 公告
 * @author svon.me@gmail.com
 */
import { createRef } from "src/utils/ssr/ref";
const notice = createRef<string[]>("notice", []);
</script>

<template>
  <div class="notice-wrap">
    <p v-for="(value, index) in notice" :key="index">{{ value }}</p>
  </div>
</template>
