<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import document from "src/plugins/browser/document";
import {oss} from "src/config";
// 引入 swiper vue 组件
// @ts-ignore
import SwiperCore, {Pagination, Autoplay} from "swiper";
// @ts-ignore
import {Swiper, SwiperSlide} from "swiper/vue";
// 引入 swiper 样式
import "swiper/swiper-bundle.css";
import {createRef, onLoadRef} from "src/utils/ssr/ref";
import {Model} from "src/logic/home";
import I18n from "src/utils/i18n";
import {config} from "src/router/config";
// 装载 swiper 组件
SwiperCore.use([Pagination, Autoplay])
const i18n = I18n();
const params = {
  page: 1,
  page_size: 10,
  show_commercial: true
}
const isBegin = ref(true)
const isEnd = ref(false)
//下一页
const next = () => document.querySelector('.swiper-recom').swiper.slideNext()
//上一页
const last = () => document.querySelector('.swiper-recom').swiper.slidePrev()
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

const recommend = createRef("API.home.getRecommend", []);
const getImg = (type: string, item: any) => {
  if (type === 'topic') {
    return item.cover
  }
  return item.image
}
const getHref = (type: string, item: any) => {
  if (type === 'topic') {
    return `${config.homeDetail}?id=${item.id}`
  }
  return item.url
}
onMounted(function () {
  const api = new Model();
  // 得到数据汇总
  onLoadRef(recommend, () => api.getRecommend(params));
});
</script>
<template>
  <div>
    <div class="text-kd20px20px md:text-kd24px24px  font-kdSemiBold text-global-highTitle font-semibold">{{i18n.home.hotTopic}}</div>
    <div class="mt-4 relative">
      <div class="w-full">
        <div :class="isBegin?'hidden':'jian-left'" class="xshidden">
          <ui-image class="left" @click="last" :src="`${oss}/dapp/zuojian.png`" fit="cover"/>
        </div>
        <Swiper class="h-full swiper-recom"
                @init="init"
                :initialSlide="0"
                slidesPerView="auto"
                :space-between="24"
                :resize-observer="true"
                @setTranslate="change">
          <template v-for="(item, index) in recommend" :key="index">
            <SwiperSlide class="rounded-kd6px">
              <v-router :href="getHref(item['data_type'],item)" target="_blank" class="w-35 h-35 md:h-47.5 md:w-47.5 rounded-kd6px block relative">
                <UiAd v-if="item['data_type']==='ad'" class="top-3 left-3 absolute"/>
                <div class="info">
                  <div class="name text-number">{{ item.name }}</div>
                  <div class="go">Go</div>
                </div>
                <ui-image class="rounded-kd6px w-full h-full" :src="getImg(item['data_type'],item)" fit="cover"/>
              </v-router>
            </SwiperSlide>
          </template>
        </Swiper>
      </div>
      <div :class="isEnd?'hidden':'jian-right'" class="xshidden">
        <img class="right" @click="next" :src="`${oss}/dapp/rightjian.png`" alt="">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.left {
  @apply w-9 h-9 cursor-pointer rounded-full;
  @apply absolute left-3 z-10 top-20;
}

.right {
  @apply w-9 h-9 cursor-pointer rounded-full;
  @apply absolute right-3 z-10 top-20;
}

.swiper-slide {
  width: auto !important;
}

.info {
  @apply flex items-center justify-between px-2.5 md:px-4 w-full  absolute bottom-1.5 md:bottom-2 z-999;
  .name {
    @apply text-kd14px18px font-medium text-global-white;
  }

  .go {
    @apply h-6 flex items-center justify-center cursor-pointer;
    @apply bg-global-primary w-fit px-2 rounded-kd34px;
    @apply text-kd12px16px font-medium text-global-white font-kdFang;
  }
}
</style>
