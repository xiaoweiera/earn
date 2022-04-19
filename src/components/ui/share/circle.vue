<script setup lang="ts">/**
 * @file 圆形形状的分享，包含 twitter, telegram, 链接复制
 * @auth svon.me@gmail.com
 */

import I18n from "src/utils/i18n/";
import type {PropType} from "vue";
import type { Callback } from "src/types/common/";
import { isFunction } from "src/utils/";

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
  }
});

const getShareValue = function (type: string, url?: string) {
  if (props.shareLink && isFunction(props.shareLink)) {
    try {
      // @ts-ignore
      const value = props.shareLink<string>(type, url);
      if (value) {
        return value;
      }
    } catch (e) {
      // todo
    }
  }
  return url;
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
  <div class="flex items-center text-global-darkblue">
    <ui-share-twitter :href="getShareValue('twitter', url)" :text="text">
      <div class="circular">
        <IconFont class="flex" size="16" type="icon-twitter" />
      </div>
    </ui-share-twitter>
    <ui-share-telegram :href="getShareValue('telegram', url)" :text="text" class="ml-4">
      <div class="circular">
        <IconFont size="16" type="icon-telegram" />
      </div>
    </ui-share-telegram>
    <v-copy :value="getCopyValue(url, text)" class="ml-4 cursor-pointer">
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
</template>

<style scoped lang="scss">
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
