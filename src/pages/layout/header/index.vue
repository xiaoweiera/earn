<script setup lang="ts">
import * as env from "src/config";
import { ref, computed } from "vue";
import MenuContentList from "./menu.vue";
import { MenuItem } from "src/types/menu/";
import getRootData from "src/utils/root/data";
const urlActive = getRootData<string>("menuActive");
const headers = getRootData<MenuItem[]>("headers") || [];

const active = ref<string>("");
const menuList = ref<MenuItem[]>([]);
const Logo = ref<string>(env.oss + "/common/logo-white.svg");

if (urlActive) {
  active.value = urlActive;
}
if (headers.length) {
  menuList.value = headers;
}

const isShowSub = computed<boolean>(function () {
  let status = false;
  for(let i = 0, len = headers.length; i < len; i++) {
    const item = headers[i];
    if (item.children && item.children.length > 0 && item.active) {
      status = true;
      break;
    }
  }
  return status;
});

</script>

<template>
  <div class="header-wrap" :class="{'sub-header': isShowSub}">
    <div class="bg-global-darkblue px-6 flex justify-between fixed top-0 left-0 right-0 z-1000">
      <div class="flex items-center ui-header-menu">
        <v-router class="inline-block select-none" :href="env.dashboard">
          <img class="min-w-28" :src="Logo">
        </v-router>
        <!-- PC端导航 -->
        <div class="ml-10 h-full hidden lg:block">
          <MenuContentList class="pt-2.5 h-full" :menus="menuList"/>
        </div>
      </div>
    </div>
    <div class="extend"></div>
  </div>
</template>

<style lang="scss">
/* 设置导航高度 */
@mixin mainHeaderSpace ($height) {
  height: $height;
  .top-header {
    top: $height;
  }
  & ~ main {
    .top-header {
      top: $height;
    }
  }
}

.header-wrap {
  $height: 60px;
  $subHeight: 50px;

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
