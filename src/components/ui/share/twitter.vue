<script lang="ts" setup>
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
  const query = [];
  if (href && text) {
    query.push(`text=${encodeURIComponent(text)}`);
  }
  query.push(`url=${link}`);
  return `https://twitter.com/share?${query.join("&")}`;
};
</script>

<template>
  <v-router :href="shareLink(href, text)" :href-compile="false" class="block" target="_blank">
    <ui-hover class="flex" rounded :offset="5">
      <template #label>
        <slot>
          <IconFont :size="size" bright type="twitter" />
        </slot>
      </template>
      <template #content>
        <div class="text-global-darkblue text-12-18">{{ i18n.common.share.twitter }}</div>
      </template>
    </ui-hover>
  </v-router>
</template>
