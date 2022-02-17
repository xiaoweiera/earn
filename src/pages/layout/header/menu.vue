<script setup lang="ts">
import {PropType} from "vue";
import MenuSub from "./sub.vue";
import isShowChildren from "./isshow";
import MenuContent from "./content.vue";
import { MenuItem } from "src/types/menu/";

const props = defineProps({
  menus: {
    default: () => [],
    type: Array as PropType<MenuItem[]>,
  }
});


</script>
<template>
  <div class="text-kdFang text-white ">
    <div class="wrap-menu-box flex font-medium ">
      <!-- 快捷菜单 -->
      <template v-for="data in menus" :key="data.id">
        <div class="relative">
          <MenuContent class="wrap-menu-item" :data="data">
            <template #children="scope">
              <div class="menu-children" v-if="isShowChildren(scope.list)">
                <template v-if="data.active">
                  <MenuSub :list="scope.list" :sub="data.expand"></MenuSub>
                </template>
                <template v-else>
                  <MenuSub :list="scope.list"></MenuSub>
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
  --menu-content-bg: theme('colors.global.darkblue');
  --menu-content-text: theme('colors.white');

  &:before, &:after {
    @apply absolute h-full w-14.5 top-0;
    background-position: left bottom;
    background-repeat: no-repeat;
    background-size: contain;
    content: "";
    @apply opacity-0 invisible cursor-pointer;
  }

  &:before {
    left: -25px;
    $bg: "/assets/ui/header/left.png?r=1";
    background-image: url($bg);
  }

  &:after {
    right: -33px;
    $bg: "/assets/ui/header/right.png?r=1";
    background-image: url($bg);
  }

  .menu-children {
    @apply fixed top-15 left-0 right-0 opacity-0 invisible z-1000;
  }

  &.menu-more {
    /* 更多菜单背景图 */
    &:before, &:after {
      $bg: "/assets/ui/header/darkmenu.png?r=1";
      background-image: url($bg);
    }
  }
}

%animation {
  --menu-content-bg: theme('colors.white');
  --menu-content-text: theme('colors.global.primary');

  &:before, &:after {
    @apply visible opacity-100;
  }

  .menu-children {
    visibility: visible;
    opacity: 1;
  }

  &.menu-more {
    --menu-content-bg: #0056C3;

    .menu-children {
      background-color: var(--menu-content-bg);
    }
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
