<script setup lang="ts">
import type { PropType } from "vue";
import type { MenuItem } from "src/types/menu/";

defineProps({
  data: {
    required: true,
    type: Object as PropType<MenuItem>,
  },
});

const isShowSub = function (data: MenuItem) {
  return !(data.active && data.layout);
};
</script>

<template>
  <div class="item-main" :class="{ active: data.active }">
    <v-router class="menu-content" :href="data.href">
      <div class="label-box text-16-20 font-r">
        <div class="relative z-1">
          <div v-if="data.newTip" class="tip-hot">
            <IconFont size="8" type="redTip" />
          </div>
          <slot name="label">
            <span>{{ data.name }}</span>
          </slot>
        </div>
      </div>
    </v-router>
    <template v-if="isShowSub(data)">
      <slot name="children" :list="data.children" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.item-main {
  @apply h-full relative;
  & > a {
    @apply block;
  }

  .menu-content {
    color: var(--menu-content-text);
    @apply px-6;
    @apply h-full cursor-pointer whitespace-nowrap block;
    .label-box {
      @apply h-full flex items-center;
      background-color: var(--menu-content-bg);
    }
  }

  .tip-hot {
    @apply flex absolute right-0 top-0;
    @apply transform translate-x-2 -translate-y-2;
  }
}
</style>
