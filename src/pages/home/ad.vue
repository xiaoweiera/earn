<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
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
import {oss} from "src/config";
import {Model} from "src/logic/home";
import I18n from "src/utils/i18n";
import type {SiteConfig} from "src/types/common/chain";
import VRouter from "src/components/v/router.vue";

const config = getValue<SiteConfig>(alias.common.chain.site, {} as SiteConfig);
const i18n = I18n();
const env = getEnv();
// 装载 swiper 组件
SwiperCore.use([Pagination, Autoplay]);
// 得到图片
const getImg = (data: any) => {
  if (data.data_type === "ad") {
    return data.image;
  }
  return data.cover;
};
const adsList = createRef("API.home.ads", []);
const getUrl = (data: any) => {
  if (document.body.clientWidth > 768) {
    return safeGet(data, 'image')
  } else {
    return safeGet(data, 'image_app') ? safeGet(data, 'image_app') : safeGet(data, 'image')
  }
}
onMounted(() => {
  const api = new Model();
  // 得到数据汇总
  onLoadRef(adsList, () => api.getAdList(21));
});
</script>
<template>
  <div v-if="adsList.length>0" class="w-full h-full mt-6">
    <Swiper
        class="h-15 rounded-kd6px"
        :initial-slide="0"
        :loop="true"
        :autoplay="{ delay: 3000, stopOnLastSlide: false, disableOnInteraction: true, pauseOnMouseEnter: true }"
        slides-per-view="auto"
        :resize-observer="true"
        :pagination="{clickable:true}"
    >
      <template v-for="(item, index) in adsList" :key="index">
        <SwiperSlide>
          <v-router :href="item['url']" target="_blank" class="w-full h-15 hand">
            <ui-image class="w-full h-full" :src="getUrl(item)" fit="cover"/>
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
  bottom:4px !important;
  @apply  flex  justify-center;
}

@screen md {
  ::v-deep(.swiper-pagination-bullet) {
    margin-right: 20px !important;
    background: rgba(255, 255, 255, 0.45) !important;
  }

  ::v-deep(.swiper-pagination-bullet-active) {
    margin-right: 20px !important;
    background: white !important;
  }

  ::v-deep(.swiper-pagination) {
    position: absolute !important;
    bottom:4px !important;
  }
}
::v-deep(.swiper-pagination-bullet) {
  opacity: 1 !important;
}
</style>
