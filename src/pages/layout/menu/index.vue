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
      <v-router class="item flex items-center" :href="data.href" :class="{ active: data.active }" :target="data.blank ? Target.blank : Target.self">
        <IconFont v-if="data.icon" class="mr-2" :type="data.icon" size="34" />
        <span class="flex-1 text-14-18 inline-block text-global-highTitle font-m">{{ data.name }}</span>
        <!--        <div v-if="data.coming" class="ml-2 w-15 h-6">-->
        <!--          <ui-image class="w-full h-full" src="/images/common/coming.png"/>-->
        <!--        </div>-->
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
