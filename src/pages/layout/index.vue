<script setup lang="ts">
/**
 * @file Layout
 * @author svon.me@gmail.com
 */
import { useRoute } from "vue-router";
import Header from "./header/index.vue";
import Footer from "./footer/index.vue";
import Notice from "./notice/index.vue";
import { asyncLoad } from "src/plugins/lazyload/";

const $route = useRoute();

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
</script>
<template>
  <div class="layout">
    <input id="ui-header-mobile" class="hidden" type="checkbox" name="ui-header-mobile" />
    <!--导航-->
    <Header />
    <!--content-->
    <div class="main">
      <!--全局消息-->
      <Notice />
      <router-view />
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
