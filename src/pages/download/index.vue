<script lang="ts" setup>
import DownLoadPc from "src/pages/download/pc.vue";
import DownLoadMobile from "src/pages/download/mobile.vue";
import { DownList } from "src/logic/common/down";
import { createRef } from "src/utils/ssr/ref";
import { onMounted, reactive } from "vue";
import { DownUrl } from "src/types/common/down";
import { forEach } from "src/utils";

const urlList = createRef("API.down.getUrl", []);

const detail = reactive<DownUrl>({} as DownUrl);
const onGetUrl = async function () {
  if (urlList.value) {
    forEach((value, key) => {
      // @ts-ignore
      detail[key] = value;
    }, urlList.value);
  }
};
onMounted(() => onGetUrl());
</script>

<template>
  <div class="download-banner view-full">
    <!-- pc下载页 -->
    <div class="hidden md:block">
      <DownLoadPc :list="DownList()" :data="detail" />
    </div>
    <!-- 手机下载页 -->
    <div class="block md:hidden">
      <DownLoadMobile :list="DownList()" :data="detail" />
    </div>
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
