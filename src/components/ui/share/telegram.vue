<script setup lang="ts">
/**
 * @file
 * @auth svon.me@gmail.com
 */

import window from "src/plugins/browser/window";

defineProps({
  // 跳转链接
  href: {
    type: [String, Object],
    default: "",
  },
  // icon 大小
  size: {
    type: Number,
    default: 36,
  },
});

const shareLink = function (href?: string) {
  const link = encodeURIComponent(href || window.location.href);
  return `https://t.me/share/url?url=${link}`;
};
</script>

<template>
  <v-router :href="shareLink(href)" target="_blank">
    <slot>
      <IconFont bright :size="size" type="telegram" />
    </slot>
  </v-router>
</template>
