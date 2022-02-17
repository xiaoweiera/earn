<script setup lang="ts">
import {computed, ref} from "vue";
import document from "src/plugins/browser/document";
import { oss } from "src/config";
// 引入 swiper vue 组件
// @ts-ignore
import SwiperCore, {Pagination, Autoplay} from "swiper";
// @ts-ignore
import {Swiper, SwiperSlide} from "swiper/vue";
// 引入 swiper 样式
import "swiper/swiper-bundle.css";
// 装载 swiper 组件
SwiperCore.use([Pagination, Autoplay])
const list = [
  {name: 'aaaa', key: 'a',img:`${oss}/dapp/recomTest.jpg`},
  {name: 'aaaa', key: 'a',img:`${oss}/dapp/recomTest.jpg`},
  {name: 'aaaa', key: 'a',img:`${oss}/dapp/recomTest.jpg`},
  {name: 'aaaa', key: 'a',img:`${oss}/dapp/recomTest.jpg`},
  {name: 'aaaa', key: 'a',img:`${oss}/dapp/recomTest.jpg`},
  {name: 'aaaa', key: 'a',img:`${oss}/dapp/recomTest.jpg`},

]
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

const init=(swiper:any)=>{
  setTimeout(()=>{
    isBegin.value = swiper.isBeginning
    isEnd.value = swiper.isEnd
  })
}
</script>
<template>
  <div>
    <div class="text-kd24px24px  font-kdSemiBold text-global-highTitle">Recommended Topics</div>
    <div class="mt-4 relative">
      <div class="w-full">
        <div :class="isBegin?'hidden':'jian-left'" class="rounded-kd8px">
          <ui-image class="left" @click="last" :src="`${oss}/dapp/zuojian.png`" fit="cover"/>
        </div>
        <Swiper class="h-full swiper-recom"
                @init="init"
                :initialSlide="0"
                slidesPerView="auto"
                :space-between="24"
                :resize-observer="true"
                @setTranslate="change">
          <template v-for="(item, index) in list" :key="index">
            <SwiperSlide class="rounded-kd6px">
              <div class="h-48.5 w-47.5 rounded-kd6px  relative">
                <UiAd class="top-3 left-3 absolute"/>
                <ui-image class="rounded-kd6px h-full" :src="item.img" fit="cover"/>
              </div>
            </SwiperSlide>
          </template>
        </Swiper>
      </div>
      <div :class="isEnd?'hidden':'jian-right'">
        <img class="right" @click="next" :src="`${oss}/dapp/rightjian.png`" alt="">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
//.jian-right {
//  background: linear-gradient(to right, #ff000000, #ffffffc9);
//  @apply w-35 h-full absolute right-0 top-0 z-2;
//}
//
//.jian-left {
//  background: linear-gradient(to right, #ffffffc9, #ff000000);
//  @apply w-35 h-full absolute left-0 top-0 z-2;
//}

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
</style>
