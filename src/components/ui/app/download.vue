<script setup lang="ts">
/***
 * @file App 下载提示
 * @author svon.me@gmail.com
 */
import { getEnv } from "src/config/";
import type { PropType } from "vue";
import { computed } from "vue";

const props = defineProps({
  direction: {
    type: String as PropType<"horizontal" | "vertical">,
    default: () => "vertical",
  },
});

const env = computed(getEnv);

const qrCodeSize = computed<number>(function () {
  if (props.direction === "horizontal") {
    return 64;
  }
  return 136;
});
</script>

<template>
  <div class="download-box rounded-md bg-white p-4">
    <h3 class="text-16-24 text-global-highTitle">下载 KingData App</h3>
    <div :class="direction">
      <div class="mt-3">
        <v-router :href="env.appDownload" target="_blank" class="apple-download">
          <IconFont type="icon-apple" size="20" />
          <span class="text-14-18">App Store</span>
        </v-router>
        <v-router :href="env.appDownload" class="android-download">
          <IconFont type="icon-android" size="20" />
          <span class="text-14-18">Android</span>
        </v-router>
      </div>
      <div class="mt-3">
        <div class="qr-code border border-solid rounded p-2">
          <div class="flex">
            <ui-qrcode :value="env.appDownload" :href="true" :width="qrCodeSize" :height="qrCodeSize" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.download-box {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.1);
  /* 水平方向 */
  .horizontal {
    @apply flex flex-nowrap pt-3;
    & > .mt-3 {
      @apply mt-0;
      &:first-child {
        @apply flex-1 w-1 mr-3;
      }
    }
  }
}

%download-link {
  @apply flex items-center justify-center;
  @apply rounded text-white whitespace-nowrap py-2;
}

.apple-download {
  @extend %download-link;
  background-color: #272c33;
}
.android-download {
  @apply mt-3;
  @extend %download-link;
  background-color: #21c863;
}

.qr-code {
  border-color: #dadada;
}
</style>
