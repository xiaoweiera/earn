<script setup lang="ts">
import {onMounted, ref} from "vue";
import document from "src/plugins/browser/document";
import {getEnv} from "src/config";
import safeGet from "@fengqiaogang/safe-get";
// 引入 swiper vue 组件
// @ts-ignore
import SwiperCore, {Autoplay, Pagination} from "swiper";
// @ts-ignore
import {Swiper, SwiperSlide} from "swiper/vue";
// 引入 swiper 样式
import "swiper/swiper-bundle.css";
import {getValue} from "src/utils/root/data";
import {alias, createRef, onLoadRef} from "src/utils/ssr/ref";
import {Model} from "src/logic/home";
import {dataToTimestamp, formatDefaultTime, timeago} from "src/lib/tool";
import I18n from "src/utils/i18n";
import type {SiteConfig} from "src/types/common/chain";

const config = getValue<SiteConfig>(alias.common.chain.site, {} as SiteConfig);
const i18n = I18n();
const env = getEnv();
// 装载 swiper 组件
SwiperCore.use([Pagination, Autoplay]);
const isBegin = ref(true);
const isEnd = ref(false);
// 下一页
const next = () => document.querySelector(".swiper-topic").swiper.slideNext();
// 上一页
const last = () => document.querySelector(".swiper-topic").swiper.slidePrev();
const change = (swiper: any) => {
  isBegin.value = swiper.isBeginning;
  isEnd.value = swiper.isEnd;
};
const init = (swiper: any) => {
  setTimeout(() => {
    isBegin.value = swiper.isBeginning;
    isEnd.value = swiper.isEnd;
  });
};
// 得到图片
const getImg = (data: any) => {
  if (data.data_type === "ad") {
    return data.image;
  }
  return data.cover;
};
const trend = createRef("API.home.getTrend", []);

onMounted(() => {
  const api = new Model();
  // 得到数据汇总
  onLoadRef(trend, () => api.getTrend());
});
</script>
<template>
  <div>
      <div class="w-full h-full">21
        <Swiper
            v-if="trend.length > 0"
            class="h-full swiper-topic"
            slides-per-view="auto"
            :resize-observer="true"
            @init="init"
            @set-translate="change"
        >
          <template v-for="(item, index) in trend" :key="index">
            <SwiperSlide class="rounded-kd6px">
              <v-router :href="item['url']" target="_blank" class="rounded-kd6px relative cursor-pointer">

              </v-router>
            </SwiperSlide>
          </template>
        </Swiper>
      </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
