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
    <div class="flex items-end text-global-white">
      <span class="text-kd20px20px md:text-kd24px24px font-kdBarlow font-semibold">{{ i18n.home.todayTrend.title
        }}</span>
      <span class="ml-3 text-kd12px18px md:text-kd14px18px font-medium text-number">{{ i18n.home.todayTrend.time
        }}</span>
    </div>
    <div class="mt-4 relative">
      <div class="w-full h-full">
        <div :class="isBegin ? 'hidden' : 'jian-left'" class="xshidden">
          <img class="left shadow" :src="`${env.VITE_oss}/dapp/zuojian.png`" alt="" @click="last"/>
        </div>
        <Swiper
            v-if="trend.length > 0"
            class="h-full swiper-topic"
            :initial-slide="0"
            slides-per-view="auto"
            :space-between="24"
            :resize-observer="true"
            @init="init"
            @set-translate="change"
        >
          <template v-for="(item, index) in trend" :key="index">
            <SwiperSlide class="rounded-kd6px">
              <v-router :href="item['url']" target="_blank" class="rounded-kd6px relative cursor-pointer">
                <div v-if="item['data_type'] === 'blog' && index === 0" class="relative">
                  <div class="absolute z-3 w-full h-full px-2 md:px-3">
                    <div class="blog-name pt-1.5 md:pt-2.5 font-kdSemiBold font-semibold">
                      <span>Daily Trending</span>
                      <span class="ml-1">({{ formatDefaultTime(item['release_date'], 'MM/DD') }})</span>
                    </div>
                    <div v-if="item['label'].length > 0" class="blog-label mt-1.5 font-kdFang">
                      <span>{{ i18n.home.todayTrend.key }}: </span>
                      <template v-for="(label, i) in item['label']" :key="i">
                        <span>{{ label }}</span>
                        <span v-if="i + 1 < item['label'].length">、</span>
                      </template>
                    </div>
                    <div class="blog-label absolute bottom-1 md:bottom-2.5">
                      <span>{{ item['viewers'] ? item['viewers'] : 0 }} {{ i18n.home.todayTrend.read }}</span>
                      <span v-if="item['release_date']" class="mx-1 gang text-kd12px16px">|</span>
                      <span v-if="item['release_date']"
                      >{{ i18n.home.todayTrend.updateTime }}:
                        {{ timeago(dataToTimestamp(item['release_date'])) }}</span
                      >
                    </div>
                  </div>
                  <ui-image class="rounded-kd6px h-28 w-65 md:w-101" :src="getImg(item)" fit="cover"/>
                  <div class="blog-jian"/>
                </div>
                <div v-else class="h-28 w-47.5 relative overflow-hidden rounded-kd6px">
                  <UiAd v-if="item['data_type'] === 'ad'" class="top-3 left-3 absolute"/>
                  <ui-image class="rounded-kd6px  w-full h-full" :class="getImg(item) ? '' : 'mohu'" :src="getImg(item) ? getImg(item) : item['logo']"/>
                  <div class="top-3 absolute w-full px-3 flex flex-col items-center justify-center">
                    <div class="relative">
                      <ui-image v-if="item['data_type'] === 'dapp'" class="cover-logo" :src="item['logo']" fit="cover"/>
                      <div class="chain-logo">
                        <ui-image class="w-3.5 h-3.5" :src="safeGet(config,`chain.${item.chain}.logo`)" fit="cover"/>
                      </div>
                    </div>
                    <div class="mt-2 font-medium font-kdSemiBold  text-kd14px14px font-kdSemiBold text-global-white relative z-10">
                      <div class="w-41.5 text-center whitespace-nowrap short">{{ item.name }}</div>
                    </div>
                    <div class="relative z-3 mt-2 flex">
                      <span v-if="safeGet(item, `category`)" :class="safeGet(item, `category`)==='NFT'?'bg-global-money':'bg-global-primary'" class="chain-coin mr-2">{{ safeGet(item, `category`)
                        }}</span>
                      <span v-if="safeGet(item, `chain`)" class="chain-tip">{{ safeGet(item, `chain`) }}</span>
                    </div>
                  </div>
                  <div class="w-47.5 h-28 absolute top-0 left-0 rounded-kd6px jian z-2"/>
                </div>
              </v-router>
            </SwiperSlide>
          </template>
        </Swiper>
      </div>
      <div class="xshidden" :class="isEnd ? 'hidden' : 'jian-right'">
        <img class="right shadow" :src="`${env.VITE_oss}/dapp/rightjian.png`" alt="" @click="next"/>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cover-logo {
  @apply w-9 h-9 border-2 border-global-white rounded-full relative z-3;
}

.chain-logo {
  @apply w-4 h-4  flex justify-center items-center absolute  bottom-0 right-0 bg-global-white rounded-full z-3;
}

.chain-coin {
  width: fit-content;
  @apply flex items-center px-2 whitespace-nowrap text-global-white  rounded-kd20px text-kd12px14px font-kdFang h-5.5;
}

.chain-tip {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  width: fit-content;
  @apply flex items-center px-2 whitespace-nowrap text-global-white   rounded-kd20px text-kd12px14px font-kdFang h-5.5;
}

.jian-right {
  @apply w-35 h-full absolute right-0 top-0 z-2;
}

.blog-jian {
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  @apply w-full h-full absolute left-0 top-0  z-2 rounded-kd6px;
}

.ruo {
  -webkit-mask: -webkit-gradient(linear, left top, right bottom, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
}

.jian-left {
  @apply w-35 h-full absolute left-0 top-0 z-2;
}

.left {
  @apply w-9 h-9 cursor-pointer rounded-full;
  @apply absolute left-3 z-10 top-7;
}

.right {
  @apply w-9 h-9 cursor-pointer rounded-full;
  @apply absolute right-3 z-10 top-7;
}

.swiper-slide {
  width: auto !important;
}

.gang {
  opacity: 0.4;
}

.blog-name {
  @apply text-kd18px18px md:text-kd20px20px font-semiBold text-global-white;
}

.mohu {
  filter: blur(3px);
  -webkit-filter: blur(3px);
  -moz-filter: blur(3px);
  -ms-filter: blur(3px);
  -o-filter: blur(3px);
}

.jian {
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
}

.blog-label {
  @apply text-kd12px16px font-medium text-global-white;
}

.shadow {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.1);
}
</style>
