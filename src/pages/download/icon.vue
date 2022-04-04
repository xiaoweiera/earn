<script lang="ts" setup>
import I18n from "src/utils/i18n/";
import { PropType } from "vue";
import DownloadHover from "./hover.vue";
import { SystemInfo } from "src/types/common/down";
import { getUA } from "src/plugins/browser/ua";
import window from "src/plugins/browser/window";
import { messageError } from "src/lib/tool";

defineProps({
  data: {
    required: true,
    type: Object as PropType<SystemInfo>,
  },
});

// 判断终端
const onClick = function (e: Event, type: string, url: string) {
  const ua = getUA();
  // 当前是微信内打开
  if (ua.isWechat) {
    // 屏蔽浏览器默认行为
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  if (ua.isAndroid) {
    // 屏蔽浏览器默认行为
    e.stopPropagation();
    e.preventDefault();
    if (type === "ios") {
      const i18n = I18n();
      messageError(i18n.downLoad.warn.ios);
    } else {
      window.location.href = "kingdata://higgses.king/main?pid=1";
      setTimeout(() => {
        window.location.href = url;
      }, 2000);
    }
    return false;
  }
  if (ua.isiPhone) {
    if (type === "android") {
      // 屏蔽浏览器默认行为
      e.stopPropagation();
      e.preventDefault();
      const i18n = I18n();
      messageError(i18n.downLoad.warn.android);
      return false;
    }
  }
};
</script>
<template>
  <div class="btn-content text-base">
    <DownloadHover :href="data.ios_url">
      <v-router :href="data.ios_url" class="download-btn ios-btn" target="_blank" @click="onClick($event, 'ios', data.ios_url)">
        <IconFont class="text-white" size="24" type="icon-apple" />
        <span>App Store</span>
      </v-router>
    </DownloadHover>
    <div class="w-6"></div>
    <DownloadHover :href="data.android_url">
      <v-router :href="data.android_url" class="download-btn android-btn" target="_blank" @click="onClick($event, 'android', data.android_url)">
        <IconFont class="text-white" size="24" type="icon-android" />
        <span>Android</span>
      </v-router>
    </DownloadHover>
  </div>
</template>
<style lang="scss" scoped>
.btn-content {
  @apply flex flex-row items-center text-white cursor-pointer;
  .download-btn {
    @apply px-4 min-w-32.5 cursor-pointer;
  }

  .ios-btn {
    @apply bg-gray-900 flex justify-between py-2 px-3 rounded;
  }

  .android-btn {
    @apply flex justify-between py-2 px-5 rounded;
    background-color: #21c863;
  }
}
</style>
