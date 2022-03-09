<script lang="ts" setup>
import type { PropType } from "vue";
import type { MenuItem } from "src/types/menu/";
import MSub from "./msub.vue";

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
  <div v-for="data in list" :key="data.id" class="block p-4 text-kdFang text-white">
    <div class="pb-3 border-b border-solid border-white border-opacity-24">
      <h3 class="font-normal">
        <span class="text-14-18">{{ data.name }}</span>
      </h3>
    </div>
    <MSub v-if="data.children" :list="data.children" />
  </div>
</template>
