<script lang="ts" setup>
import DownLoadPc from "src/pages/download/pc.vue";
import DownLoadMobile from "src/pages/download/mobile.vue";
const list = [
  { mTitle: "升级数据监控", subTitle: "一、二级市场数据全覆盖", img: "/assets/download/upgrade.png" },
  { mTitle: "Dapp新项目", subTitle: "快人一步,发现潜力新项目", img: "/assets/download/dapp.png" },
  { mTitle: "APY大全", subTitle: "快速发现高收益矿池", img: "/assets/download/apy.png" },
  { mTitle: "多线图表", subTitle: "数据对比一图搞定", img: "/assets/download/more.png" },
];
</script>

<template>
  <div class="download-banner view-full">
    <!-- pc下载页 -->
    <div class="hidden sm:block">
      <DownLoadPc :list="list" />
    </div>
    <!-- 手机下载页 -->
    <div class="block sm:hidden">
      <DownLoadMobile :list="list" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "src/styles/function";

.download-banner {
  background-position: center bottom;
  background-repeat: no-repeat;
  background-image: cdn("/download/bg.png");
  background-size: cover;
}
</style>
