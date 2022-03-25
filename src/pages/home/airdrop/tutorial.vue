<script lang="ts" setup>
import { Model } from "src/logic/home";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { BlogData } from "src/types/blog";
import * as alias from "src/utils/root/alias";
import { onMounted } from "vue";
import HomeAirdropTutorialPc from "src/pages/home/airdrop/tutorials/pc.vue";
import HomeAirdropTutorialsMobile from "src/pages/home/airdrop/tutorials/mobile.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";

// 装载 swiper 组件
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

// 创建列表对象并获取缓存数据
const TutorialList = createRef<BlogData[]>(alias.blog.list, [] as any);

const params = {
  page: 1,
  page_size: 2,
};
// 即将上线列表
const getTutorialList = async function () {
  const model = new Model();
  return model.getTutorialList(params);
};

onMounted(() => {
  // 判断列表数据是否为空，如果为空则获取最新数据
  onLoadRef(TutorialList, getTutorialList);
});
</script>

<template>
  <div class="hidden md:block">
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div v-for="item in TutorialList" :key="item.id">
        <HomeAirdropTutorialPc :data="item" />
      </div>
    </div>
  </div>
  <!-- 手机端-->
  <div class="h-69.5 block md:hidden">
    <Swiper :autoplay="{ delay: 3000, stopOnLastSlide: false, disableOnInteraction: true, pauseOnMouseEnter: true }" :pagination="{ clickable: true }" :slides-per-view="1" :space-between="0" class="h-full swiper-recom">
      <template v-for="item in TutorialList" :key="item.id">
        <SwiperSlide class="w-full h-full rounded-kd6px">
          <HomeAirdropTutorialsMobile :data="item" />
        </SwiperSlide>
      </template>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
.blog-font {
  font-family: "PingFang SC" !important;
}
.swiper-recom {
  ::v-deep(.swiper-pagination-bullets) {
    @apply bottom-0;
    .swiper-pagination-bullet {
      @apply mr-6;
    }
  }
}
</style>
