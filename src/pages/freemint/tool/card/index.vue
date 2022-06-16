<script setup lang="ts">
import Item from "./item.vue";
</script>
<template>
  <div class="w-full flex">
    <Item state="low" />
    <Item state="averag" class="mx-4" />
    <Item state="high" />
  </div>
</template>
