<script setup lang="ts">
/**
 * @file 判断 vip 状态，模糊文案
 * @auth svon.me@gmail.com
 */

import { getEnv } from "src/config";
import { isLocked } from "src/logic/quota/";

import type { Data } from "src/types/quota/";
import type { PropType } from "vue";

defineProps({
  data: {
    required: true,
    type: Object as PropType<Data>,
  },
});

const env = getEnv();
</script>

<template>
  <div>
    <div :class="{ vague: isLocked(data) }">
      <div class="new-content">
        <slot></slot>
      </div>
      <template v-if="isLocked(data)">
        <client-only class="hidden vip-lock">
          <v-router :href="env.appDownload" class="block text-center p-2" target="_blank">
            <p class="mb-2 text-14-18">下载 KingData App 解锁指标</p>
            <div class="inline-block button">
              <span class="flex items-center">
                <icon-font type="icon-lock" size="14" />
                <span class="ml-0.5 text-12-16 font-m">立即下载</span>
              </span>
            </div>
          </v-router>
        </client-only>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.vip-lock {
  @apply absolute left-0 top-0 right-0 bottom-0 z-2;
  p {
    color: #924005;
  }

  .button {
    color: #976e27;
    background: linear-gradient(180deg, #fff0ba 0%, #ffc451 100%);
    @apply rounded-kd32px py-1 px-2;
  }
}

.vague {
  @apply relative;
  .new-content {
    @apply min-h-20;
    text-transform: capitalize !important;
    filter: blur(8px);
  }

  .vip-lock {
    @apply flex items-center justify-center;
  }
}
</style>
