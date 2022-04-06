<script setup lang="ts">
/**
 * @file DApp 详情页
 */
import { createReactive } from "src/utils/ssr/ref";

const project = createReactive<object>("query", {});
</script>

<template>
  <div>
    <p>{{ project }}</p>
  </div>
</template>
