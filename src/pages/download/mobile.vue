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
  <div class="mobile-warp">
    <DownloadBanner :list="list" :direction="'horizontal'" :navigation="false" :loop="true" :autoplay="true">
      <template #item="scope">
        <div class="content-mobile">
          <div class="content">
            <div class="top-title text-24">
              <b>{{ scope.data.mTitle }}</b>
            </div>
            <div class="bottom-title text-14">
              {{ scope.data.subTitle }}
            </div>
            <img :url="scope.data.img" class="bottom-img" :src="scope.data.img" />
          </div>
        </div>
      </template>
    </DownloadBanner>
    <div class="app-icon">
      <DownloadIcon :data="data" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content-mobile {
  @apply h-full w-full mx-auto mt-10;
  .content {
    @apply flex flex-col justify-center items-center;
    .top-title {
      color: #272c33;
    }
    .bottom-title {
      @apply mt-5;
      color: #808080;
    }
    .bottom-img {
      @apply max-h-77.5 mt-10;
    }
  }
}
.app-icon {
  @apply w-full z-10 fixed inset-x-0 bottom-15 flex justify-center;
}
</style>
