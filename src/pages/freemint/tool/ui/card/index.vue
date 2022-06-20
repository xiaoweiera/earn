<script setup lang="ts">
/**
 * 状态卡片
 */
import Item from "./item.vue";
</script>
<template>
  <div class="w-full flex showX">
    <Item state="low" />
    <Item state="averag" class="mx-4" />
    <Item state="high" />
  </div>
</template>
