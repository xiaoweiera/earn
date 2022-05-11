<script setup lang="ts">
/**
 * @file Layout
 * @author svon.me@gmail.com
 */
import { useRoute } from "vue-router";
import Header from "./header/index.vue";
import Footer from "./footer/index.vue";
import Notice from "./notice/index.vue";
import { MenuItem } from "src/types/menu";
import { alias, createRef } from "src/utils/ssr/ref";
import { asyncLoad } from "src/plugins/lazyload/";
import MenuSub from "./menu/sub.vue";
import MenuContent from "./menu/index.vue";

const $route = useRoute();

const headerList = createRef<MenuItem[]>(alias.common.layout.header, []);

const IpValidate = asyncLoad(() => import("./notice/validate.vue"));
const DownloadApp = asyncLoad(() => import("./download/app.vue"));
const Tool = asyncLoad(() => import("src/components/ui/tool/index.vue"));
// 判断哪些页面需要隐藏底部
const hiddenFooter = function (path: string) {
  if (/^\/topic/i.test(path)) {
    return true;
  }
  if (/^\/apy\/token/i.test(path)) {
    return true;
  }
  if (/^\/apy\/lp/i.test(path)) {
    return true;
  }
  if (/^\/apy\/project/i.test(path)) {
    return true;
  }
  if (/^\/portfolio/i.test(path)) {
    return true;
  }
};
// 判断是否需要展示底部
const notDownload = function (path: string): boolean {
  return !/^\/download/.test(path);
};

const currMenu = function () {
  const list = headerList.value;
  let value: MenuItem | undefined;
  if (list) {
    for (const data of list) {
      if (data && data.active) {
        value = data;
        break;
      }
    }
  }
  return value;
};

const isLayout2 = function (path: string) {
  if (/^\/topic/i.test(path)) {
    return false;
  }
  const data = currMenu();
  if (data && data.layout) {
    return true;
  }
};
</script>
<template>
  <div class="layout">
    <input id="ui-header-mobile" class="hidden" type="checkbox" name="ui-header-mobile" />
    <!--导航-->
    <Header :headers="headerList" />
    <!--content-->
    <div class="main">
      <!--全局消息-->
      <Notice />
      <div class="clearfix" :class="{ 'layout-2': isLayout2($route.path) }">
        <ui-sticky class="z-900 float-left view-full bg-white menu">
          <div v-if="isLayout2($route.path)" class="h-full overflow-auto">
            <MenuContent :header="currMenu()" />
          </div>
        </ui-sticky>
        <div class="router-view">
          <ui-sticky v-if="isLayout2($route.path)" class="z-999">
            <MenuSub :header="currMenu()" />
          </ui-sticky>
          <router-view />
        </div>
      </div>
    </div>
    <template v-if="notDownload($route.path)">
      <!--底部-->
      <Footer :class="{ 'md:hidden': hiddenFooter($route.path) }" />
      <!--download app-->
      <div class="download-app is-web">
        <DownloadApp />
      </div>
      <client-only>
        <Tool applyUrl="/dapp/apply" :is-idea="true" />
        <!-- 判断用户来源 -->
        <IpValidate />
      </client-only>
    </template>
  </div>
</template>

<style scoped lang="scss">
.menu {
  @apply hidden w-54;
  @screen md {
    @at-root .layout-2 & {
      @apply block;
      border-right: 1px solid rgba(0, 50, 108, 0.06);
    }
  }
}

.layout-2 {
  @screen md {
    .router-view {
      @apply ml-54;
    }
  }
}
</style>
