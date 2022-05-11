<script setup lang="ts">
import type { PropType } from "vue";
import type { MenuItem } from "src/types/menu/";
import MenuSub from "./sub.vue";
import isShowChildren from "./isshow";
import MenuContent from "./content.vue";

defineProps({
  menus: {
    default: () => [],
    type: Array as PropType<MenuItem[]>,
  },
});
</script>
<template>
  <div class="text-kdFang text-white">
    <div class="wrap-menu-box flex font-medium">
      <!-- 快捷菜单 -->
      <template v-for="data in menus" :key="data.id">
        <div class="relative">
          <MenuContent class="wrap-menu-item" :data="data">
            <template #children="scope">
              <div v-if="isShowChildren(scope.list)" class="menu-children">
                <template v-if="data.active">
                  <MenuSub :list="scope.list" :sub="data.expand" />
                </template>
                <template v-else>
                  <MenuSub :list="scope.list" />
                </template>
              </div>
            </template>
          </MenuContent>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="scss">
%active {
  /* 通过 theme 获取 tailwind 中定义的颜色值 */
  --menu-content-bg: theme("colors.global.darkblue");
  --menu-content-text: rgba(255, 255, 255, 0.65);

  .menu-children {
    @apply fixed top-15 left-0 right-0 opacity-0 invisible z-1010;
  }
}

%animation {
  --menu-content-bg: theme("colors.global.primary");
  --menu-content-text: theme("colors.white");

  .menu-children {
    visibility: visible;
    opacity: 1;
  }
}

.wrap-menu-box {
  @apply h-full;
  .wrap-menu-item {
    @extend %active;
  }

  &:not(:hover) {
    .wrap-menu-item {
      &.active {
        @extend %animation;
      }
    }
  }

  &:hover {
    .wrap-menu-item {
      &:hover {
        @extend %animation;
      }
    }
  }
}
</style>
