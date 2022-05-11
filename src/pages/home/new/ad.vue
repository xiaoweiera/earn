<script setup lang="ts">
import { onMounted } from "vue";
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
  <div v-if="adsList.length > 0" class="w-181.25 h-90.5 relative">
    <Swiper class="h-full rounded-kd6px" :initial-slide="0" :loop="true" :autoplay="{ delay: 3000, stopOnLastSlide: false, disableOnInteraction: true, pauseOnMouseEnter: true }" slides-per-view="auto" :resize-observer="true" :pagination="{ clickable: true }">
      <template v-for="(item, index) in adsList" :key="index">
        <SwiperSlide>
          <v-router :href="item['url']" target="_blank" class="w-full h-full h-full hand">
            <ui-image class="w-full h-full" :src="getUrl(item)" fit="cover" />
          </v-router>
        </SwiperSlide>
      </template>
    </Swiper>
  </div>
</template>
<style lang="scss" scoped>
::v-deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.45) !important;
}

::v-deep(.swiper-pagination-bullet-active) {
  background: white !important;
}

::v-deep(.swiper-pagination) {
  position: absolute !important;
  bottom: 4px !important;
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
