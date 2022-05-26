<script setup lang="ts">
/**
 * @file 分享
 * @auth svon.me@gmail.com
 */
import _ from "lodash";
import { onMounted, ref, computed } from "vue";
import I18n from "src/utils/i18n/";
import window from "src/plugins/browser/window";

const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  // 分享文案
  share: {
    type: String,
    default: "",
  },
  // 复制文案
  copy: {
    type: String,
    default: "",
  },
});

const i18n = I18n();
const link = ref<string>("");
const status = ref<boolean>(false);

const copyValue = computed<string>(function () {
  const text = _.trim(props.copy);
  if (text) {
    return `${text}
${link.value}`;
  }
  return link.value;
});

let timeout: any;
const onMouseenter = function () {
  status.value = true;
  clearTimeout(timeout);
};
const onMouseleave = function () {
  timeout = setTimeout(function () {
    status.value = false;
  }, 500);
};

onMounted(function () {
  link.value = props.url || window.location.href;
});
</script>

<template>
  <div class="absolute top-0 bottom-0 right-0 w-6 z-10" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div class="hover:bg-global-highTitle hover:bg-opacity-4 cursor-pointer rounded-sm h-full">
      <div class="flex justify-center items-center h-full w-full">
        <div class="transform rotate-90 w-5 h-5 overflow-hidden">
          <icon-font type="icon-more1" size="20" />
        </div>
      </div>
      <div class="share-content shadow-base rounded-sm bg-white absolute right-full bottom-0 shadow-base py-2 px-3" :class="{ active: status }">
        <client-only class="flex items-center flex-nowrap whitespace-nowrap">
          <template v-if="share">
            <ui-share :url="link" :value="share">
              <span class="text-global-black-desc v-router flex items-center">
                <IconFont class="mr-1" size="16" type="icon-fenxiang1" />
                <span class="text-14-18">{{ i18n.dapp.share.label }}</span>
              </span>
            </ui-share>
            <div class="line"></div>
          </template>
          <v-router class="text-global-black-desc flex items-center" :href="link" target="_blank">
            <icon-font class="mr-1" size="16" type="icon-whitepaper" />
            <span class="text-14-18">{{ i18n.common.button.detail }}</span>
          </v-router>
          <template v-if="copy">
            <div class="line"></div>
            <v-copy :value="copyValue" :message="true">
              <span class="flex items-center v-router text-global-black-desc">
                <icon-font class="mr-1" size="16" type="icon-copy" />
                <span class="text-14-18">{{ i18n.common.button.copy }}</span>
              </span>
            </v-copy>
          </template>
        </client-only>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.line {
  @apply w-px h-3 mx-3;
  background: #d3d6db;
}

.share-content {
  transition: all 0.3s;
  @apply invisible opacity-0 transform translate-y-full;
  &.active {
    @apply opacity-100 visible;
  }
}
</style>
