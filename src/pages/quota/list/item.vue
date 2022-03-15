<script lang="ts" setup>
/**
 * @file 指标详情
 * @auth svon.me@gmail.com
 */
import { computed } from "vue";
import Image from "../list/image.vue";
import { config as routerConfig } from "src/router/config";
import type { Data } from "src/types/quota/";
import { dateDiff } from "src/utils/";
import type { PropType } from "vue";

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
    <client-only>
      <p class="text-12-16 text-global-highTitle text-opacity-65">
        <span>{{ dateDiff(data.published_at) }}</span>
      </p>
    </client-only>

    <div class="py-2">
      <!-- 标题 -->
      <v-router :disable="!isList" :href="link" target="_blank">
        <h3 class="text-16-24 text-global-highTitle">{{ data.chart.name }}</h3>
      </v-router>
    </div>

    <div class="text-global-highTitle text-opacity-65">
      <div class="text-14-20 whitespace-pre-wrap">
        <!-- 文案描述 -->
        <v-router :disable="!isList" :href="link" class="block" name="div" target="_blank">
          <div v-html="data.content"></div>
        </v-router>
        <!-- 原文链接 -->
        <div v-if="data.origin_url" class="mt-2">
          <v-router :href="data.origin_url" target="_blank">原文链接</v-router>
        </div>
      </div>
    </div>

    <!-- 图片集合 -->
    <div v-if="data.image_urls" class="mt-4">
      <v-router v-if="isList" :href="link" class="block w-full" target="_blank">
        <Image :list="data.image_urls" />
      </v-router>
      <Image v-else :list="data.image_urls" />
    </div>
  </div>
</template>
