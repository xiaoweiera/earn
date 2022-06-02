<script setup lang="ts">
/**
 * @file 中间键, 跳转
 * @auth svon.me@gmail.com
 * @description 主要解决移动端打开前端页面时无用户信息的问题
 */

import { onMounted } from "vue";
import { config } from "src/router/config";
import { getValue } from "src/utils/root/data";
import { createHref } from "src/plugins/router/pack";

// 跳转地址
const redirect = getValue<string>("query.redirect", config.dashboard);
onMounted(() => {
  // 转码
  const url: string = decodeURIComponent(redirect || config.dashboard);
  // 跳转到目标页面
  setTimeout(() => {
    window.location.href = createHref(url);
  }, 300);
});
</script>

<template>
  <div>
    <ui-spin :loading="true">
      <div class="min-h-100 view-full"></div>
    </ui-spin>
  </div>
</template>
