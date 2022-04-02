<script setup lang="ts">
/**
 * @file Layout
 * @author svon.me@gmail.com
 */

import Header from "./header/index.vue";
import Footer from "./footer/index.vue";
import Notice from "./notice/index.vue";
import { asyncLoad } from "src/plugins/lazyload/";

const IpValidate = asyncLoad(() => import("./notice/validate.vue"));
const DownloadApp = asyncLoad(() => import("./download/app.vue"));
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
    <!--底部-->
    <Footer />
    <!--download app-->
    <div class="download-app is-web">
      <DownloadApp />
    </div>
    <client-only>
      <!-- 判断用户来源 -->
      <IpValidate />
    </client-only>
  </div>
</template>
