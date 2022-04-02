<script lang="ts" setup>
import { onMounted } from "vue";
import { asyncLoad } from "src/plugins/lazyload";
import { downList } from "src/logic/common/down";

import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { SystemInfo } from "src/types/common/down";

const DownLoadPc = asyncLoad(() => import("./pc.vue"));
const DownLoadMobile = asyncLoad(() => import("./mobile.vue"));

const detail = createReactive<SystemInfo>(alias.common.system.info, {} as SystemInfo);

onMounted(function () {
  onLoadReactive(detail, alias.common.system.info);
});
</script>

<template>
  <div class="download-banner view-full">
    <template v-if="detail && detail.android_url">
      <!-- pc下载页 -->
      <div class="hidden md:block">
        <DownLoadPc :data="detail" :list="downList()" class="h-full w-full" />
      </div>
      <!-- 手机下载页 -->
      <div class="block md:hidden">
        <DownLoadMobile :data="detail" :list="downList()" class="h-full w-full" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "src/styles/function";

.download-banner {
  background-image: cdn("/download/bg.png");
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
