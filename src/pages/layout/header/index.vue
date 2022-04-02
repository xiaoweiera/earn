<script lang="ts" setup>
/**
 * @file 导航-菜单
 * @author svon.me@gmail.com
 */
import { computed } from "vue";
import * as env from "src/config";
import type { MenuItem } from "src/types/menu/";
import { alias, createRef } from "src/utils/ssr/ref";
import { asyncLoad } from "src/plugins/lazyload/";
import Mobile from "./mobile.vue";
import isShowChildren from "./isshow";
import MenuContentList from "./menu.vue";

const User = asyncLoad(() => import("../user/index.vue"));

const headers = createRef<MenuItem[]>(alias.common.layout.header, []);
const Logo = computed<string>(() => {
  const data = env.getEnv();
  return `${data.VITE_oss}/common/logo-white.svg`;
});

const isShowSub = computed<boolean>(() => {
  let flag = false;
  const menus: MenuItem[] = headers.value;
  for (let i = 0, len = menus.length; i < len; i++) {
    const item = menus[i];
    if (item.active && isShowChildren(item.children)) {
      flag = true;
      break;
    }
  }
  return flag;
});
</script>

<template>
  <div :class="{ 'sub-header': isShowSub }" class="header-wrap is-web">
    <div class="bg-global-darkblue px-6 flex justify-between fixed top-0 left-0 right-0 z-1000">
      <div class="flex w-full items-center ui-header-menu">
        <div class="h-full flex items-center">
          <!--移动端导航-->
          <div class="mr-4 block lg:hidden">
            <Mobile :menus="headers" />
          </div>

          <!--Logo-->
          <v-router :href="env.dashboard" class="inline-block select-none">
            <img :alt="env.title" :src="Logo" class="min-w-28" />
          </v-router>
        </div>

        <div class="h-full flex-1 flex items-center justify-end lg:justify-between">
          <!-- PC端导航 -->
          <div class="ml-10 h-full hidden lg:block flex-1">
            <MenuContentList :menus="headers" class="pt-2.5 h-full" />
          </div>

          <!--用户信息-->
          <User />
        </div>
      </div>
    </div>
    <div class="extend" />
  </div>
</template>

<style lang="scss">
/* 设置导航高度 */
@mixin mainHeaderSpace($height) {
  height: $height;
  @at-root .layout & {
    .top-header {
      top: $height;
    }

    .view-full {
      height: calc(100vh - $height);
    }

    & ~ .main {
      .top-header {
        top: $height;
      }

      .view-full {
        height: calc(100vh - $height);
      }
    }
  }
}

.header-wrap {
  $height: 60px;
  $subHeight: 50px;
  height: $height;

  .fixed {
    max-width: 100vw;
  }

  .ui-header-menu {
    height: $height;
  }

  .ui-header-sub {
    height: $subHeight;
  }

  @include mainHeaderSpace($height);

  .extend {
    @apply hidden;
  }

  @screen lg {
    &.sub-header {
      @include mainHeaderSpace($height + $subHeight);

      .extend {
        @apply block;
      }
    }
  }
}
</style>
