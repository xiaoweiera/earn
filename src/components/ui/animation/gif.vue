<script setup lang="ts">
/**
 * @file 图片自动轮播
 * @auth svon.me@gmail.com
 */
import { PropType } from "vue";

defineProps({
  src: {
    type: Array as PropType<String[]>,
    required: true,
  }
});
</script>

<template>
  <div></div>
</template>

<style scoped lang="scss">

</style>
