<script setup lang="ts">
/**
 * @file 三级导航
 * @auth svon.me@gmail.com
 */
import { MenuItem } from "src/types/menu";
import { PropType } from "vue";

defineProps({
  header: {
    type: Object as PropType<MenuItem[]>,
  },
});
</script>

<template>
  <div></div>
</template>

<style scoped lang="scss"></style>
