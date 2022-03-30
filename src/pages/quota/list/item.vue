<script lang="ts" setup>
/**
 * @file 指标详情
 * @auth svon.me@gmail.com
 */

import { computed } from "vue";
import Image from "../list/image.vue";
import { config as routerConfig } from "src/router/config";
import type { Data } from "src/types/quota/";
import type { PropType } from "vue";
import AtTime from "./time.vue";
import OnFollow from "../follow/on.vue";

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
    <!-- 发布时间 -->
    <AtTime :data="data" :is-list="isList" />

    <div v-if="isList && data.chart" class="mb-2 flex justify-between items-center">
      <!-- 标题 -->
      <v-router class="flex items-center" :disable="!isList" :href="link" target="_blank">
        <h3 class="text-16-24 text-global-highTitle">{{ data.chart.name }}</h3>
        <AtTime class="ml-1.5" :is-list="isList" :data="data" />
      </v-router>
      <div>
        <OnFollow v-if="isList" :id="data.chart.id" v-model:status="data.chart.followed" />
      </div>
    </div>

    <div class="text-global-highTitle text-opacity-65">
      <div class="text-14-20">
        <!-- 文案描述 -->
        <v-router :disable="!isList" :href="link" class="block" name="div" target="_blank">
          <div class="whitespace-pre-wrap" v-html="data.content"></div>
        </v-router>
        <!-- 原文链接 -->
        <div v-if="data.origin_url" class="mt-2">
          <v-router :href="data.origin_url" class="link" target="_blank">原文链接</v-router>
        </div>
      </div>
    </div>

    <!-- 图片集合 -->
    <div v-if="data.image_urls && data.image_urls.length > 0" class="mt-4">
      <v-router v-if="isList" :href="link" class="block w-full" target="_blank">
        <Image :list="data.image_urls" :preview="!isList" />
      </v-router>
      <Image v-else :list="data.image_urls" />
    </div>
  </div>
</template>
