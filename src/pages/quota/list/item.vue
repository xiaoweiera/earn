<script lang="ts" setup>
/**
 * @file 指标详情
 * @auth svon.me@gmail.com
 */

import I18n from "src/utils/i18n/";
import { computed } from "vue";
import { config as routerConfig } from "src/router/config";
import type { Data } from "src/types/quota/";
import type { PropType } from "vue";
import AtTime from "./time.vue";
import OnFollow from "../follow/on.vue";
import { asyncLoad } from "src/plugins/lazyload/";

const i18n = I18n();
const Image = asyncLoad(() => import("../list/image.vue"));

const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<Data>,
  },
  // 是否是列表
  isList: {
    type: Boolean,
    default: () => true,
  },
});

const link = computed<string>(function () {
  if (props.data) {
    return `${routerConfig.news}/${props.data.id}`;
  }
  return routerConfig.news;
});
</script>

<template>
  <div class="quota-detail">
    <div v-if="isList && data.chart" class="mb-2 flex justify-between items-center">
      <!-- 标题 -->
      <v-router class="block mr-2 md:mr-0" :disable="!isList" :href="link" target="_blank">
        <h3 class="text-16-24 text-global-black-title">{{ data.chart.name }}</h3>
      </v-router>
      <div class="quota-follow">
        <OnFollow v-if="isList" :id="data.chart.id" v-model:status="data.chart.followed" />
      </div>
    </div>

    <div class="text-global-black-desc">
      <div class="text-14-20">
        <!-- 文案描述 -->
        <v-router :disable="!isList" :href="link" class="block" name="div" target="_blank">
          <div class="whitespace-pre-wrap" v-html="data.content"></div>
        </v-router>
        <!-- 原文链接 -->
        <div v-if="data.origin_url" class="mt-2">
          <v-router :href="data.origin_url" class="link" target="_blank">{{ i18n.news.link }}</v-router>
        </div>
      </div>
    </div>

    <!-- 图片集合 -->
    <div v-if="data.image_urls && data.image_urls.length > 0" class="mt-4">
      <Image :list="data.image_urls" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.quota-follow {
  @at-root .vague & {
    @apply invisible opacity-0;
  }
}
</style>
