<script setup lang="ts">
/**
 * @file 判断 vip 状态，模糊文案
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n/";
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

const i18n = I18n();
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
            <p class="mb-2 text-14-18">{{ i18n.news.unlock }}</p>
            <div class="inline-block button">
              <span class="flex items-center">
                <icon-font type="icon-lock" size="14" />
                <span class="ml-0.5 text-12-16 font-m">{{ i18n.common.nav.download3 }}</span>
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
  @apply relative select-none;
  .new-content {
    @apply min-h-20;
    ::v-deep(.quota-content) {
      text-transform: capitalize !important;
      filter: blur(8px);
    }
  }

  .vip-lock {
    @apply flex items-center justify-center;
  }
  @at-root .indicators-quota-list & {
    .new-content {
      @apply min-h-28;
    }
    .vip-lock {
      @apply top-8;
    }
  }
}
</style>
