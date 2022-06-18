<script setup lang="ts">
import Tag from "../../tool/ui/tag.vue";
import Card from "./card.vue";
import Chain from "../chain.vue";
const tagList = [
  { name: "Free", value: "free" },
  { name: "All", value: "all" },
];
</script>
<template>
  <div class="feed-page">
    <div class="state justify-between">
      <div class="text-kd16px22px font-medium text-global-highTitle">Live Feeds</div>
      <div>
        <Chain />
      </div>
    </div>
    <div class="state justify-between h-14 border-css px-3 mt-4">
      <div class="state">
        <ui-image class="mr-1.5 w-6 h-6" oss src="/mint/jiqiren.png" />
        <div class="text-kd14px18px font-medium text-global-black-title">Free Mint 播报机器人</div>
      </div>
      <div class="get">领取</div>
    </div>
    <div class="state justify-between mt-4 h-9.25">
      <div class="state">
        <div class="yuan-green"></div>
        <div class="green">Block：14937360</div>
      </div>
      <div class="state">
        <span class="text-kd12px16px text-global-black-title font-medium mr-1">地址过滤</span>
        <div class="relative mr-6">
          <ui-image class="w-6 h-6" oss src="/mint/filter.png" />
          <div class="dian">12</div>
        </div>
        <Tag :data="tagList" />
      </div>
    </div>
    <!--list-->
    <template v-for="(item, i) in 3" :key="item">
      <Card :class="i === 0 ? 'mt-1' : 'mt-8.25'" />
    </template>
  </div>
</template>
<style lang="scss">
.feed-page {
  @apply max-w-240 mx-auto pt-6;
  .border-css {
    @apply border-1 border-global-highTitle border-opacity-10 rounded-kd6px;
  }
  .state {
    @apply flex items-center;
  }
  .get {
    @apply px-3 h-8;
    @apply flex items-center rounded-kd4px max-w-max cursor-pointer;
    @apply text-global-white text-kd14px18px font-medium bg-global-primary;
  }
  .green {
    color: #008f28;
    @apply text-kd14px18px font-medium;
  }
  .yuan-green {
    background: rgba(9, 217, 142, 0.12);
    @apply w-5.5 h-5.5 mr-1.5 rounded-full relative flex justify-center items-center;
  }
  .yuan-green:before {
    content: "";
    position: absolute;
    background: rgba(9, 217, 142, 1);
    @apply w-3 h-3 rounded-full;
  }
  .yuan-green:after {
    content: "";
    position: absolute;
    border-left: 1px solid rgba(3, 54, 102, 0.1);
    @apply top-6 h-3.4;
  }
  .dian {
    @apply text-kd12px16px font-medium text-global-white bg-global-numRed;
    @apply w-5 h-5.25 flex items-center justify-center rounded-full;
    @apply absolute -top-2.5 -right-2.5;
  }
}
</style>
