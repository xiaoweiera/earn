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
// 装载 swiper 组件
SwiperCore.use([Pagination, Autoplay])
const isBegin = ref(true)
const isEnd = ref(false)
//下一页
const next = () => document.querySelector('.swiper-company').swiper.slideNext()
//上一页
const last = () => document.querySelector('.swiper-company').swiper.slidePrev()
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
const platform = createRef("API.home.getPlatform", []);
onMounted(function () {
  const api = new Model();
  // 得到数据汇总
  onLoadRef(platform, () => api.getTrend());
});
</script>
<template>
  <div>
    <div class="mt-4 relative px-2.5">
      <div class="w-full">
        <div :class="isBegin?'hidden':'jian-left'" class="xshidden">
          <ui-image class="left shadow" @click="last" :src="`${oss}/dapp/zuojian.png`" fit="cover"/>
        </div>
        <Swiper class="h-full swiper-company"
                @init="init"
                :initialSlide="0"
                :loop="true"
                :autoplay="{ delay: 1000, stopOnLastSlide: false, disableOnInteraction: true, pauseOnMouseEnter: true }"
                slidesPerView="auto"
                :space-between="32"
                :resize-observer="true"
                @setTranslate="change">
          <template v-for="(item, index) in platform" :key="index">
            <SwiperSlide>
<!--              :href="item['website']"-->
              <span  class="h-9 w-fit flex items-center">
                <ui-image class="w-6 h-6" fit="cover" :src="item.logo" :lazy="true"/>
                <span class="text-kd18px24px text-global-highTitle text-opacity-85 font-kdSemiBold font-medium ml-1.5">{{ item.name }}</span>
              </span>
            </SwiperSlide>
          </template>
        </Swiper>
      </div>
      <div :class="isEnd?'hidden':'jian-right'" class="xshidden">
        <ui-image class="right shadow" @click="next" :src="`${oss}/dapp/rightjian.png`" fit="cover"/>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.left {
  @apply w-9 h-9 cursor-pointer rounded-full;
  @apply absolute left-0 z-10 top-0;
}

.right {
  @apply w-9 h-9 cursor-pointer rounded-full;
  @apply absolute right-0 z-10 top-0;
}

.swiper-slide {
  width: auto !important;
}

.shadow {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.1);
}
</style>
