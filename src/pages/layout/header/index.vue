<script setup lang="ts">
import * as env from "src/config";
import {ref, computed} from "vue";
import User from "../user/index.vue";
import MenuContentList from "./menu.vue";

import isShowChildren from "./isshow";
import {MenuItem} from "src/types/menu/";
import {createRef} from "src/utils/ssr/ref";

const headers = createRef<MenuItem[]>("common.header", []);
const Logo = ref<string>(env.oss + "/common/logo-white.svg");


const isShowSub = computed<boolean>(function () {
  let flag: boolean = false;
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
  <div class="header-wrap" :class="{'sub-header': isShowSub}">
    <div class="bg-global-darkblue px-6 flex justify-between fixed top-0 left-0 right-0 z-1000">
      <div class="flex w-full items-center ui-header-menu w-full justify-between">
        <v-router class="inline-block select-none" :href="env.dashboard">
          <img class="min-w-28" :src="Logo">
        </v-router>
        <!-- PC端导航 -->
        <div class="ml-10 h-full hidden lg:block flex-1">
          <MenuContentList class="pt-2.5 h-full" :menus="headers"/>
        </div>
        <div>
          <User/>
        </div>
      </div>
    </div>
    <div class="extend"></div>
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

    & ~ .main {
      .top-header {
        top: $height;
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
