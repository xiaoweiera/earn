<script setup lang="ts">
/**
 * @file 侧边栏导航
 * @auth svon.me@gmail.com
 */

import { MenuItem } from "src/types/menu";
import { PropType } from "vue";
import { Target } from "src/plugins/ui/router/props";

defineProps({
  header: {
    required: false,
    type: Object as PropType<MenuItem>,
    default() {
      return void 0;
    },
  },
});
</script>

<template>
  <div v-if="header" class="p-4">
    <template v-for="(data, index) in header.children" :key="index">
      <template v-if="data.group">
        <div class="py-1.5 first:pt-0">
          <span class="text-12-16 text-global-highTitle text-opacity-45">{{ data.name }}</span>
        </div>
      </template>
      <v-router v-else class="item flex items-center" :href="data.href" :class="{ active: data.active }" :target="data.blank ? Target.blank : Target.self">
        <IconFont v-if="data.icon" class="mr-2" :type="data.icon" size="16" />
        <span class="flex-1 text-14-18 inline-block">{{ data.name }}</span>
      </v-router>
    </template>
  </div>
</template>

<style scoped lang="scss">
.item {
  @apply py-3 pl-4 pr-2 text-global-highTitle text-opacity-65;
  transition: all 0.3s;

  &.active,
  &:hover {
    @apply text-global-darkblue;
    @apply bg-global-highTitle bg-opacity-4 rounded-md;
  }
}
</style>
