<script lang="ts" setup>
/**
 * @file 圆形形状的分享，包含 twitter, telegram, 链接复制
 * @auth svon.me@gmail.com
 */

import { onMounted, ref } from "vue";
import I18n from "src/utils/i18n/";
import type { PropType } from "vue";
import type { Callback } from "src/types/common/";
import { isFunction } from "src/utils/";
import window from "src/plugins/browser/window";

const i18n = I18n();
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  shareLink: {
    type: Function as PropType<Callback>,
    default: null,
  },
});

const link = ref<string>("");

onMounted(function () {
  link.value = props.url || window.location.href;
});

const getShareValue = function (type: string, url?: string) {
  if (props.shareLink && isFunction(props.shareLink)) {
    try {
      // @ts-ignore
      const value = props.shareLink<string>(type, url || window.location.href);
      if (value) {
        return value;
      }
    } catch (e) {
      // todo
    }
  }
  return url || window.location.href;
};

const getCopyValue = function (url?: string, text?: string) {
  const link = getShareValue("copy", url);
  if (link) {
    return `${text}  \n${link}`;
  }
  return link;
};
</script>

<template>
  <div class="text-global-darkblue">
    <div :key="url || link" class="flex items-center">
      <ui-share-twitter :href="getShareValue('twitter', url || link)" :text="text">
        <div class="circular">
          <IconFont class="flex" size="16" type="icon-twitter" />
        </div>
      </ui-share-twitter>
      <ui-share-telegram :href="getShareValue('telegram', url || link)" :text="text" class="ml-4">
        <div class="circular">
          <IconFont size="16" type="icon-telegram" />
        </div>
      </ui-share-telegram>
      <v-copy :value="getCopyValue(url || link, text)" class="ml-4 cursor-pointer">
        <ui-hover :offset="5" class="flex-popover" rounded>
          <template #label>
            <div class="circular">
              <IconFont size="16" type="icon-link" />
            </div>
          </template>
          <template #content>
            <div class="text-global-darkblue text-12-18">{{ i18n.common.share.link }}</div>
          </template>
        </ui-hover>
      </v-copy>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-sync {
  @apply flex items-center justify-center;
  @apply border border-solid border-global-highTitle border-opacity-12;
}

.circular {
  @extend .button-sync;
  @apply w-10 h-10 rounded-1/2 overflow-hidden;

  @at-root .user & {
    @apply bg-global-gemstone bg-opacity-6;
    @apply border-dashed border-global-gemstone;
  }
}
</style>
