<script lang="ts" setup>
/**
 * @file 指标详情
 * @auth svon.me@gmail.com
 */

import I18n from "src/utils/i18n/";
import { config as routerConfig } from "src/router/config";
import type { Data } from "src/types/quota/";
import type { PropType } from "vue";
import OnFollow from "../follow/on.vue";
import { asyncLoad } from "src/plugins/lazyload/";
import { Name } from "src/plugins/ui/router/props";

const i18n = I18n();
const Image = asyncLoad(() => import("../list/image.vue"));

defineProps({
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

const getLink = function (data: Data) {
  if (data && data.id) {
    return `${routerConfig.news}/${data.id}`;
  }
  return routerConfig.news;
};

const getIndicator = function (data: Data) {
  if (data && data.chart) {
    return `${routerConfig.quota}/${data.chart.id}`;
  }
  return routerConfig.quota;
};

const getRouterName = function (text: string): Name {
  if (/<a/.test(text)) {
    return Name.div;
  }
  return Name.a;
};
</script>

<template>
  <div class="quota-detail">
    <div v-if="isList && data.chart" class="mb-1 flex justify-between items-center">
      <!--显示指标标题-->
      <v-router class="quota-title text-global-black-title flex-1 w-1 flex items-center" :href="getIndicator(data)" target="_blank">
        <h3 class="text-16-24 font-b truncate">{{ data.chart.name }}</h3>
        <icon-vip class="ml-1" :type="data.chart.chart_type" />
      </v-router>
      <div class="quota-follow ml-2">
        <OnFollow v-if="isList" :id="data.chart.id" v-model:status="data.chart.followed" />
      </div>
    </div>

    <div class="quota-content">
      <!-- 描述 -->
      <div v-if="isList" class="text-14-22">
        <!--在列表中样式-->
        <ui-description :line="10" line-height="22px">
          <v-router :href="getLink(data)" class="block text-global-black-desc" :name="getRouterName(data.content)" target="_blank">
            <div class="whitespace-pre-wrap" v-html="data.content"></div>
          </v-router>
        </ui-description>
      </div>
      <div v-else class="text-16-24">
        <!--在详情页中样式-->
        <div class="whitespace-pre-wrap text-global-black-desc" v-html="data.content"></div>
      </div>
      <!-- 原文链接 -->
      <div v-if="data.origin_url" class="mt-2 text-14-22">
        <v-router :href="data.origin_url" class="link" target="_blank">{{ i18n.news.link }}</v-router>
      </div>
      <!-- 图片集合 -->
      <div v-if="data.image_urls && data.image_urls.length > 0" class="mt-4">
        <Image :list="data.image_urls" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
%hidden {
  @apply hidden;
}

.quota-follow {
  @at-root .vague & {
    @extend %hidden;
  }
  @at-root .indicators-quota-list & {
    @extend %hidden;
  }
}
</style>
