<script setup lang="ts">
/**
 * @file
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n/";
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

const i18n = I18n();

const shareLink = function (href?: string, text?: string) {
  const link = encodeURIComponent(href || window.location.href);
  console.log(link);
  const query: string[] = [`url=${link}`];
  if (text) {
    query.push(`text=${encodeURIComponent(text)}`);
  }
  return `https://t.me/share/url?${query.join("&")}`;
};
</script>

<template>
  <v-router :href="shareLink(href, text)" target="_blank">
    <ui-hover class="flex-popover" rounded :offset="5">
      <template #label>
        <slot>
          <IconFont bright :size="size" type="telegram" />
        </slot>
      </template>
      <template #content>
        <div class="text-global-darkblue text-12-18">{{ i18n.common.share.telegram }}</div>
      </template>
    </ui-hover>
  </v-router>
</template>
