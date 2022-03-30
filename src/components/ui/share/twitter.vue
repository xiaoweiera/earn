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
  text: {
    type: String,
    default: "",
  },
  // icon 大小
  size: {
    type: Number,
    default: 36,
  },
});

const shareLink = function (href?: string, text?: string) {
  const link = encodeURIComponent(href || window.location.href);
  const query = [];
  if (href && text) {
    query.push(`text=${encodeURIComponent(text)}`);
  }
  query.push(`url=${link}`);
  return `https://twitter.com/share?${query.join("&")}`;
};
</script>

<template>
  <v-router :href="shareLink(href, text)" :href-compile="false" target="_blank">
    <slot>
      <IconFont bright :size="size" type="twitter" />
    </slot>
  </v-router>
</template>
