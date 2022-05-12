<script setup lang="ts">
import { onMounted, ref } from "vue";
import document from "src/plugins/browser/document";
import safeGet from "@fengqiaogang/safe-get";
// 引入 swiper vue 组件
// @ts-ignore
import SwiperCore, { Autoplay, Pagination } from "swiper";
// @ts-ignore
import { Swiper, SwiperSlide } from "swiper/vue";
// 引入 swiper 样式
import "swiper/swiper-bundle.css";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { Model } from "src/logic/home";
import VRouter from "src/components/v/router.vue";
// 装载 swiper 组件
SwiperCore.use([Pagination, Autoplay]);
const props = defineProps({
  position: {
    type: Number,
    required: true,
  },
});
const adsList = createRef("API.home.ads", []);
const isBegin = ref(true);
const isEnd = ref(true);
// 下一页
const next = () => document.querySelector(".swiper-recom").swiper.slideNext();
// 上一页
const last = () => document.querySelector(".swiper-recom").swiper.slidePrev();
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
const getUrl = (data: any) => {
  if (document.body.clientWidth > 768) {
    return safeGet(data, "image");
  } else {
    return safeGet(data, "image_app") ? safeGet(data, "image_app") : safeGet(data, "image");
  }
};
onMounted(() => {
  const api = new Model();
  // 得到数据汇总
  onLoadRef(adsList, () => api.getAdList(props.position));
});
</script>
<template>
  <div class="md:min-w-181.25 md:min-h-70">
    <div v-if="adsList.length > 0" class="w-full md:w-181.25 h-33.75 md:h-70 relative">
      <div v-if="!isBegin && adsList.length > 0" class="yuan top-14 md:top-28 left-4" @click="last()">
        <IconFont class="text-global-white" size="20" type="icon-leftNo" />
      </div>
      <Swiper class="h-full rounded-kd6px swiper-recom" :initial-slide="0" :loop="false" :autoplay="{ delay: 3000, stopOnLastSlide: false, disableOnInteraction: true, pauseOnMouseEnter: true }" slides-per-view="auto" :resize-observer="true" :pagination="{ clickable: true, paginationShow: true }" @init="init" @set-translate="change">
        <template v-for="(item, index) in adsList" :key="index">
          <SwiperSlide>
            <v-router :href="item['url']" target="_blank" class="w-full h-33.75 md:h-70 hand">
              <ui-image class="w-full h-full" :src="getUrl(item)" fit="cover" />
            </v-router>
          </SwiperSlide>
        </template>
      </Swiper>
      <div v-if="!isEnd && adsList.length > 0" class="yuan top-14 md:top-28 right-4" @click="next()">
        <IconFont class="text-global-white" size="20" type="icon-rightNo" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.yuan {
  background: rgba(0, 0, 0, 0.45);
  border-radius: 50%;
  @apply absolute md:w-11 md:h-11 w-8 h-8 z-999;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.06), 0px 16px 48px rgba(0, 0, 0, 0.1);
  opacity: 0.8;
  @apply flex items-center justify-center cursor-pointer;
}
::v-deep(.swiper-pagination-bullet) {
  width: 24px !important;
  height: 4px !important;
  border-radius: 8px !important;
  margin-right: 10px !important;
  background: rgba(255, 255, 255, 0.45) !important;
}

::v-deep(.swiper-pagination-bullet-active) {
  width: 24px !important;
  height: 4px !important;
  border-radius: 8px !important;
  margin-right: 10px !important;
  background: white !important;
}

::v-deep(.swiper-pagination) {
  position: absolute !important;
  bottom: 8px !important;
  @apply flex  justify-center;
}

@screen md {
  ::v-deep(.swiper-pagination-bullet) {
    width: 24px !important;
    height: 4px !important;
    border-radius: 8px !important;
    margin-right: 10px !important;
    background: rgba(255, 255, 255, 0.45) !important;
  }

  ::v-deep(.swiper-pagination-bullet-active) {
    width: 24px !important;
    height: 4px !important;
    border-radius: 8px !important;
    background: white !important;
  }

  ::v-deep(.swiper-pagination) {
    position: absolute !important;
    bottom: 8px !important;
  }
}
::v-deep(.swiper-pagination-bullet) {
  opacity: 1 !important;
}
</style>
