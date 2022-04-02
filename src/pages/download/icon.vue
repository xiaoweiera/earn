<script setup lang="ts">
import DownloadHover from "src/pages/download/hover.vue";
import { getEnv } from "src/config/";
import { PropType } from "vue";
import { SystemInfo } from "src/types/common/down";
import I18n from "src/utils/i18n";
import { getUA } from "src/plugins/browser/ua";
import { ElMessage } from "element-plus";

const env = getEnv();
const i18n = I18n();

defineProps({
  data: {
    required: true,
    type: Object as PropType<SystemInfo>,
  },
});
// 判断终端
const onClick = function (type: string, url: string) {
  const ua = getUA();
  if (ua.isAndroid) {
    if (type === "ios") {
      ElMessage.warning("当前设备仅支持Android下载");
      return;
    }
    window.location.href = url;
  } else if (ua.isiPhone) {
    if (type === "android") {
      ElMessage.warning("当前设备仅支持ios下载");
      return;
    }
    window.location.href = url;
  } else if (ua.isWechat) {
    return false;
  }
};
</script>
<template>
  <div class="btn-content text-base">
    <DownloadHover :href="env.appDownload">
      <div class="download-btn ios-btn" @click="onClick('ios', data.ios_url)">
        <IconFont type="icon-apple" class="text-white" size="24" />
        App Store
      </div>
    </DownloadHover>
    <DownloadHover :href="env.appDownload">
      <div class="download-btn android-btn" @click="onClick('android', data.android_url)">
        <IconFont type="icon-android" class="text-white" size="24" />
        Android
      </div>
    </DownloadHover>
  </div>
</template>
<style lang="scss" scoped>
.btn-content {
  @apply flex flex-row items-center text-white;
  .download-btn {
    @apply px-4 min-w-32.5 cursor-pointer;
  }
  .ios-btn {
    @apply bg-gray-900 flex justify-between py-2 px-3 rounded;
  }
  .android-btn {
    @apply flex justify-between ml-6 py-2 px-5 rounded;
    background-color: #21c863;
  }
}
</style>
