<script setup lang="ts">
import { onMounted, ref } from "vue";
import document from "src/plugins/browser/document";
import { getEnv } from "src/config";
import safeGet from "@fengqiaogang/safe-get";
// 引入 swiper vue 组件
// @ts-ignore
import SwiperCore, { Autoplay, Pagination } from "swiper";
// @ts-ignore
import { Swiper, SwiperSlide } from "swiper/vue";
// 引入 swiper 样式
import "swiper/swiper-bundle.css";
import { getValue } from "src/utils/root/data";
import { alias, createRef, onLoadRef } from "src/utils/ssr/ref";
import { Model } from "src/logic/home";
import I18n from "src/utils/i18n";
import type { SiteConfig } from "src/types/common/chain";
import window from "src/plugins/browser/window";
import { createHref } from "src/plugins/router/pack";

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
  if (data.cover_url) return data.cover_url;
  if (data.type === "ADVERTISEMENT") {
    return safeGet(data, "payload.image");
  }
  return safeGet(data, "payload.project.logo");
};
const getChain = (item: any) => {
  const chains: any = safeGet(item, "payload.project.chains");
  if (chains && chains.length > 0) {
    return chains[0];
  }
  return {};
};
const trend = createRef("API.home.getTrend", []);
const isDapp = (item: any) => {
  const isDapp: any = safeGet(item, "payload.project.is_dapp");
  const isNft: any = safeGet(item, "payload.project.is_nft");
  if (isDapp || (!isDapp && !isNft)) {
    return true;
  }
  return false;
};
const getUrl = (item: any) => {
  if (item.type === "ADVERTISEMENT") {
    return createHref(safeGet(item, "payload.url"));
  }
  let url = "";
  if (isDapp(item)) {
    url = `/rank/dapp/${safeGet(item, "payload.project.id")}`;
  } else {
    url = `/rank/nft/${safeGet(item, "payload.project.id")}`;
  }
  return createHref(url);
};

onMounted(() => {
  const api = new Model();
  // 得到数据汇总
  onLoadRef(trend, () => api.getTrend());
});
</script>
<template>
  <div v-if="trend.length > 1">
    <div class="flex items-end text-global-white">
      <span class="trend-title font-kdBarlow font-semibold">{{ i18n.home.new.hot }}</span>
    </div>
    <div class="mt-2.5 relative">
      <div class="w-full h-full">
        <div :class="isBegin ? 'hidden' : 'jian-left'" class="xshidden">
          <img class="left shadow" :src="`${env.VITE_oss}/dapp/zuojian.png`" alt="" @click="last" />
        </div>
        <Swiper v-if="trend.length > 1" class="h-full swiper-topic w-full" :initial-slide="0" slides-per-view="auto" :space-between="24" :resize-observer="true" @init="init" @set-translate="change">
          <template v-for="(item, index) in trend" :key="index">
            <SwiperSlide class="rounded-kd6px">
              <v-router :href="getUrl(item)" target="_blank" class="rounded-kd6px relative cursor-pointer">
                <div class="h-23 w-47.5 relative overflow-hidden rounded-kd6px">
                  <ui-image class="rounded-kd6px h-23 w-47.5" :class="{ mohu: item['type'] === 'ADVERTISEMENT' }" :src="getImg(item)" />
                  <div v-if="item['type'] !== 'ADVERTISEMENT'" class="top-0 absolute w-full h-full p-3">
                    <div class="flex">
                      <div class="relative mr-3 min-w-9 min-h-9 max-w-9 max-w-9 h-9">
                        <ui-image class="cover-logo min-w-9 min-h-9 max-w-9 max-w-9 h-9" :src="getImg(item)" fit="cover" />
                        <div class="chain-logo absolute bottom-2">
                          <ui-image class="w-3.5 h-3.5" :src="safeGet(getChain(item), 'logo')" fit="cover" />
                        </div>
                      </div>
                      <div class="relative z-30">
                        <div class="max-w-30.5 text-kd14px14px text-global-white font-kdBarlow whitespace-nowrap short">
                          {{ safeGet(item, "payload.project.name") }}
                        </div>
                        <div class="relative mt-2 flex">
                          <span :class="isDapp(item) ? 'bg-global-primary' : 'bg-global-money'" class="chain-coin mr-2">{{ isDapp(item) ? "DAPP" : "NFT" }}</span>
                          <span v-if="getChain(item).id" class="chain-tip">{{ safeGet(getChain(item), "name") }}</span>
                        </div>
                      </div>
                    </div>
                    <span class="relative z-30 top-1 text-global-white text-kd12px16px font-kdBarlow">{{ safeGet(item, `payload.reason`) }}</span>
                  </div>
                  <div class="w-47.5 h-23 absolute top-0 left-0 rounded-kd6px z-2" :class="item['type'] === 'ADVERTISEMENT' ? '' : 'jian'" />
                </div>
              </v-router>
            </SwiperSlide>
          </template>
        </Swiper>
      </div>
      <div class="xshidden" :class="isEnd ? 'hidden' : 'jian-right'">
        <img class="right shadow" :src="`${env.VITE_oss}/dapp/rightjian.png`" alt="" @click="next" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.trend-time {
  @apply text-kd12px18px md:text-kd14px18px;
}

.viewers {
  @apply absolute bottom-1 md:bottom-2.5;
}

.trend-img {
  @apply rounded-kd6px h-28 w-65 md:w-101;
}

.trend-title {
  @apply text-kd20px20px md:text-kd24px24px;
}

.trend-blog {
  @apply absolute z-3 w-full h-full px-2 md:px-3;
}

.cover-logo {
  @apply border-2 border-global-white rounded-full relative z-3;
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
  @apply pt-1.5 md:pt-2.5 text-kd18px18px md:text-kd20px20px font-semiBold text-global-white;
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
