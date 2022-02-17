<script setup lang="ts">
import {PropType} from "vue";
import { MenuItem } from "src/types/menu/";
import { createDb } from "src/logic/common/header";

defineProps({
  data: {
    required: true,
    type: Object as PropType<MenuItem>,
  }
});

</script>

<template>
  <div class="item-main" :class="{'active': data.active}">
    <v-router class="menu-content" :href="data.href">
      <div class="label-box text-16-20 font-r">
        <div class="relative z-1">
          <div v-if="data.newTip" class="tip-hot">
            <IconFont size="8" type="redTip"/>
          </div>
          <slot name="label">
            <span>{{ data.name }}</span>
          </slot>
        </div>
      </div>
    </v-router>
    <slot name="children" :list="data.children"></slot>
  </div>
</template>

<style scoped lang="scss">
.item-main {
  @apply h-full relative;
  & > a {
    @apply block;
  }
  .menu-content {
    padding-left: 22px;
    padding-right: 22px;
    color: var(--menu-content-text);
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
