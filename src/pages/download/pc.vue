<script setup lang="ts">
import DownloadBanner from "src/pages/download/banner.vue";
import DownloadIcon from "src/pages/download/icon.vue";
import { PropType } from "vue";
import { DownData, DownUrl } from "src/types/common/down";
defineProps({
  list: {
    required: true,
    type: Array as PropType<DownData[]>,
  },
  data: {
    required: true,
    type: Object as PropType<DownUrl>,
  },
});
</script>
<template>
  <div class="banner-warp">
    <DownloadBanner :navigation="true" :list="list">
      <template #item="scope">
        <div class="content-wrap">
          <div class="left-content">
            <div class="title-content">
              <div class="top-content text-48">
                <b>{{ scope.data.mTitle }}</b>
              </div>
              <div class="bottom-content text-24">
                {{ scope.data.subTitle }}
              </div>
            </div>
            <div class="pc-icon">
              <DownloadIcon :data="data" />
            </div>
          </div>
          <img :url="scope.data.img" class="right-img" :src="scope.data.img" />
        </div>
      </template>
    </DownloadBanner>
  </div>
</template>
<style lang="scss" scoped>
.content-wrap {
  @apply h-full w-full px-4 mt-10 flex flex-col items-center mx-auto;
  .left-content {
    @apply flex flex-col;
    .top-content {
      color: #272c33;
    }
    .bottom-content {
      @apply mt-8;
      color: #808080;
    }
    .pc-icon {
      @apply text-white mt-20;
    }
  }
  .right-img {
    @apply inline-block mt-10 max-h-77.5;
  }
  @screen sm {
    @apply w-160 px-1;
    @apply grid grid-cols-2 items-center;
    transform: translateY(-5%);
    .right-img {
      @apply max-h-127.5;
    }
  }
  @screen md {
    @apply w-full px-2;
    @apply flex flex-row justify-between items-center;
    transform: translateY(-5%);
  }
  @screen lg {
    @apply w-250 px-2 flex flex-row justify-between items-center;
  }
}
</style>
