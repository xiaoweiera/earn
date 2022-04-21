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
import I18n from "src/utils/i18n";

const $route = useRoute();

const i18n = I18n();
const IpValidate = asyncLoad(() => import("./notice/validate.vue"));
const DownloadApp = asyncLoad(() => import("./download/app.vue"));
const Tool = asyncLoad(() => import("src/components/ui/tool/index.vue"));
const applyUrl = `/dapp/apply?lang=${i18n.getLang()}`;
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
      <Footer />
      <!--download app-->
      <div class="download-app is-web">
        <DownloadApp />
      </div>
      <client-only>
        <Tool :applyUrl="applyUrl" :is-idea="true" />
        <!-- 判断用户来源 -->
        <IpValidate />
      </client-only>
    </template>
  </div>
</template>
