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
  {name: 'aaaa',url:'https:www.baidu.com',img:`${oss}/dapp/01.png`},
  {name: 'aaaa',url:'https:www.baidu.com',img:`${oss}/dapp/02.png`},
  {name: 'aaaa',url:'https:www.baidu.com',img:`${oss}/dapp/03.png`},
  {name: 'aaaa',url:'https:www.baidu.com',img:`${oss}/dapp/04.png`},
  {name: 'aaaa',url:'https:www.baidu.com',img:`${oss}/dapp/05.png`},
  {name: 'aaaa',url:'https:www.baidu.com',img:`${oss}/dapp/01.png`},
  {name: 'aaaa',url:'https:www.baidu.com',img:`${oss}/dapp/02.png`},
  {name: 'aaaa',url:'https:www.baidu.com',img:`${oss}/dapp/03.png`},
  {name: 'aaaa',url:'https:www.baidu.com',img:`${oss}/dapp/04.png`},
  {name: 'aaaa',url:'https:www.baidu.com',img:`${oss}/dapp/05.png`},

]
const isBegin = ref(true)
const isEnd = ref(false)
const swiperDom=ref(null)
//下一页
const next = () => document.querySelector('.swiper-company').swiper.slideNext()
//上一页
const last = () => document.querySelector('.swiper-company').swiper.slidePrev()
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
    <div class="mt-4 relative px-2.5">
      <div class="w-full">
        <div :class="isBegin?'hidden':'jian-left'" class="rounded-kd8px">
          <ui-image class="left shadow" @click="last" :src="`${oss}/dapp/zuojian.png`" fit="cover"/>
        </div>
        <Swiper class="h-full swiper-company"
                @init="init"
                :initialSlide="0"
                slidesPerView="auto"
                :space-between="24"
                :resize-observer="true"
                @setTranslate="change">
          <template v-for="(item, index) in list" :key="index">
            <SwiperSlide>
              <div class="h-9 flex items-center">
                <img class="h-6 w-40" :src="item.img" alt="">
              </div>
            </SwiperSlide>
          </template>
        </Swiper>
      </div>
      <div :class="isEnd?'hidden':'jian-right'">
        <ui-image class="right shadow" @click="next" :src="`${oss}/dapp/rightjian.png`" fit="cover"/>
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
  @apply absolute left-0 z-10 top-0;
}

.right {
  @apply w-9 h-9 cursor-pointer rounded-full;
  @apply absolute right-0 z-10 top-0;
}
.swiper-slide {
  width: auto !important;
}
.shadow{
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.1);
}
</style>
