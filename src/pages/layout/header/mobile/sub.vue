<script setup lang="ts">
/**
 * @file 三级子导航
 * @auth svon.me@gmail.com
 */

import type { PropType } from "vue";
import type { MenuItem } from "src/types/menu/";

defineProps({
  list: {
    type: Array as PropType<MenuItem[]>,
    default() {
      return [];
    },
  },
});
</script>

<template>
  <div>
    <template v-for="item in list" :key="item.name">
      <v-router v-if="!item.group" :href="item.href" class="block" :class="{ active: item.active }">
        <span class="item-name">{{ item.name }}</span>
      </v-router>
    </template>
  </div>
</template>

<style scoped lang="scss">
.item-name {
  @apply text-kd14px18px text-global-highTitle font-medium font-kdFang text-opacity-65;
}

.active {
  .item-name {
    @apply text-global-darkblue;
  }
}
</style>
