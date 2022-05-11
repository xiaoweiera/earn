<script setup lang="ts">
/**
 * @file 侧边栏导航
 * @auth svon.me@gmail.com
 */

import { MenuItem } from "src/types/menu";
import { PropType } from "vue";

defineProps({
  header: {
    type: Object as PropType<MenuItem>,
  },
});
</script>

<template>
  <div v-if="header" class="p-4">
    <template v-for="(data, index) in header.children" :key="index">
      <v-router class="item flex items-center" :href="data.href" :class="{ active: data.active }">
        <IconFont v-if="data.icon" class="mr-2" :type="data.icon" size="34" />
        <span class="text-14-18 text-global-highTitle font-m">{{ data.name }}</span>
      </v-router>
    </template>
  </div>
</template>

<style scoped lang="scss">
.item {
  @apply p-2;
  transition: all 0.3s;
  &.active,
  &:hover {
    @apply bg-global-highTitle bg-opacity-4 rounded-md;
  }
}
</style>
