<script lang="ts" setup>
import DownloadBanner from "src/pages/download/banner.vue";
import DownloadIcon from "src/pages/download/icon.vue";
import { PropType } from "vue";
import { DownData, SystemInfo } from "src/types/common/down";

defineProps({
  list: {
    required: true,
    type: Array as PropType<DownData[]>,
  },
  data: {
    required: true,
    type: Object as PropType<SystemInfo>,
  },
});
</script>
<template>
  <div>
    <DownloadBanner :list="list" :navigation="true">
      <template #item="{ data: item }">
        <div class="content-wrap">
          <div class="left-content">
            <div class="title-content">
              <div class="top-content text-48">
                <b>{{ item.mTitle }}</b>
              </div>
              <div class="bottom-content text-24 mt-8">{{ item.subTitle }}</div>
            </div>
            <div class="text-white mt-20">
              <DownloadIcon :data="data" />
            </div>
          </div>
          <div class="h-full max-h-128">
            <ui-image :src="item.img" fit="none" class="h-full" />
          </div>
        </div>
      </template>
    </DownloadBanner>
  </div>
</template>
<style lang="scss" scoped>
.content-wrap {
  @apply h-full w-full p-4 flex items-center justify-between;
  .left-content {
    .top-content {
      color: #272c33;
    }
    .bottom-content {
      color: #808080;
    }
  }

  @screen lg {
    & {
      @apply w-250 mx-auto;
    }
  }
}
</style>
