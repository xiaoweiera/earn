<script setup lang="ts">
import {onMounted, ref} from "vue";
import document from "src/plugins/browser/document";
import {getEnv} from "src/config";
import safeGet from "@fengqiaogang/safe-get";
// 引入 swiper vue 组件
// @ts-ignore
import SwiperCore, {Pagination, Autoplay} from "swiper";
// @ts-ignore
import {Swiper, SwiperSlide} from "swiper/vue";
// 引入 swiper 样式
import "swiper/swiper-bundle.css";
import { getValue } from "src/utils/root/data";
import {createRef, onLoadRef} from "src/utils/ssr/ref";
import {Model} from "src/logic/home";
import {timeago, dataToTimestamp, formatDefaultTime} from "src/lib/tool";
import I18n from "src/utils/i18n";
import {SiteConfig} from "~/types/common/chain";
import * as alias from "~/utils/root/alias";
const config = getValue<SiteConfig>(alias.common.chain.site, {} as SiteConfig);
const i18n = I18n();
const env = getEnv();
// 装载 swiper 组件
SwiperCore.use([Pagination, Autoplay])
const isBegin = ref(true)
const isEnd = ref(false)
//下一页
const next = () => document.querySelector('.swiper-topic').swiper.slideNext()
//上一页
const last = () => document.querySelector('.swiper-topic').swiper.slidePrev()
const change = (swiper: any) => {
  isBegin.value = swiper.isBeginning
  isEnd.value = swiper.isEnd

}
const init = (swiper: any) => {
  setTimeout(() => {
    isBegin.value = swiper.isBeginning
    isEnd.value = swiper.isEnd
  })
}
//得到图片
const getImg = (data: any) => {
  if (data['data_type'] === 'ad') {
    return data.image
  }
  return data.cover
}
const trend = createRef("API.home.getTrend", []);

onMounted(function () {
  const api = new Model();
  // 得到数据汇总
  onLoadRef(trend, () => api.getTrend());
});
</script>
<template>
  <div>
    <div class="flex items-center text-global-white">
      <span class="text-kd20px20px md:text-kd24px24px font-kdBarlow font-semibold">{{i18n.home.todayTrend.title}}</span>
      <span class="ml-3 text-kd12px18px md:text-kd14px18px font-medium text-number">{{i18n.home.todayTrend.time}}</span>
    </div>
    <div class="mt-4 relative">
      <div class="w-full h-full">
        <div :class="isBegin?'hidden':'jian-left'" class="xshidden">
          <img class="left" @click="last" :src="`${env.VITE_oss}/dapp/zuojian.png`" alt="">
        </div>
        <Swiper class="h-full swiper-topic"
                @init="init"
                :initialSlide="0"
                slidesPerView="auto"
                :space-between="24"
                :resize-observer="true"
                @setTranslate="change">
          <template v-for="(item, index) in trend" :key="index">
            <SwiperSlide class="rounded-kd6px">
              <v-router :href="item['url']" target="_blank" class="rounded-kd6px relative cursor-pointer">
                <div v-if="item['data_type']==='blog' && index===0" class="relative">
                  <div class="absolute  w-full h-full px-2 md:px-3">
                    <div class="blog-name pt-1.5 md:pt-2 font-kdSemiBold font-semibold">
                      <span>Daily Trending</span>
                      <span class="ml-1">({{ formatDefaultTime(item['release_date'], 'MM/DD') }})</span>
                    </div>
                    <div v-if="item['label'].length>0" class="blog-label mt-1.5 font-kdFang">
                      <span>{{i18n.home.todayTrend.key}}: </span>
                      <template v-for="(label,i) in item['label']">
                        <span>{{ label }}</span><span v-if="i+1<item['label'].length">、</span>
                      </template>
                    </div>
                    <div class="blog-label absolute bottom-1 md:bottom-1.5">
                      <span>{{ item['viewers'] ? item['viewers'] : 0 }} {{i18n.home.todayTrend.read}}</span>
                      <span class="mx-1" v-if="item['release_date']">|</span>
                      <span v-if="item['release_date']">{{i18n.home.todayTrend.updateTime}}:{{ timeago(dataToTimestamp(item['release_date'])) }}</span>
                    </div>
                  </div>
                  <img class="rounded-kd6px h-23.5 w-65 md:w-101 " :src="getImg(item)" fit="cover" alt="">
                </div>
                <div v-else>
                  <UiAd v-if="item['data_type']==='ad'" class="top-3 left-3 absolute"/>
                  <img class="rounded-kd6px h-23.5 w-47.5" :src="getImg(item)" alt="">
                  <div class="absolute top-0  top-5 left-4 flex items-center">
                    <img v-if="item['data_type']==='dapp'" class="min-w-12.5 min-h-12.5 rounded-full"  fit="cover" :src="item['logo']" />
                    <div class="ml-3 font-kdSemiBold font-bold text-kd18px18px   text-global-white">
                      <div>{{item.name}}</div>
                      <span class="chain-tip">{{safeGet(config,`chain.${item.chain}.name`)}}</span>
                    </div>
                  </div>
                </div>
              </v-router>
            </SwiperSlide>
          </template>
        </Swiper>
      </div>
      <div class="xshidden" :class="isEnd?'hidden':'jian-right'">
        <img class="right" @click="next" :src="`${env.VITE_oss}/dapp/rightjian.png`" alt="">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.chain-tip{
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border:1px solid rgba(255, 255, 255, 0.25);
  width:fit-content;
  @apply flex items-center px-2  rounded-kd20px text-kd12px14px font-kdFang h-5.5 mt-2.5;
}
.jian-right {
  //background: linear-gradient(to right,#ff000000, #ffffffc9);
  @apply w-35 h-full absolute right-0 top-0 z-2;
}

.ruo {
  -webkit-mask: -webkit-gradient(linear, left top, right bottom, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
}

.jian-left {
  //background: linear-gradient(to right, #ffffffc9, #ff000000);
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

.blog-name {
  @apply text-kd18px18px md:text-kd20px20px font-semiBold text-global-white;
}

.blog-label {
  @apply text-kd12px16px font-medium text-global-white;
}
</style>
