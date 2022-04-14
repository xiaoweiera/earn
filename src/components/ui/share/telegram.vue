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
  // icon 大小
  size: {
    type: Number,
    default: 36,
  },
});

const i18n = I18n();

const shareLink = function (href?: string) {
  const link = encodeURIComponent(href || window.location.href);
  return `https://t.me/share/url?url=${link}`;
};
</script>

<template>
  <v-router :href="shareLink(href)" target="_blank">
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
