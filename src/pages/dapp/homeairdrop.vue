<script lang="ts" setup>
import DAppAirdropHeader from "src/pages/dapp/airdrop/header.vue";
import DAppAirdropItem from "src/pages/dapp/airdrop/item.vue";
import I18n from "src/utils/i18n";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { DataItem } from "src/types/dapp/airdrop";
import * as alias from "src/utils/root/alias";
import { Model } from "src/logic/dapp";
import { onMounted } from "vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";

// 装载 swiper 组件
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const i18n = I18n();

// 创建列表对象并获取缓存数据
const AirdropList = createRef<DataItem[]>(alias.dApp.airdrop.ongoing, [] as any);
const params = {
  page: 1,
  page_size: 4,
  status: "ongoing",
};
// 即将上线列表
const getAirdropList = async function () {
  const model = new Model();
  return model.getAirdropProjects(params);
};

onMounted(() => {
  // 判断列表数据是否为空，如果为空则获取最新数据
  onLoadRef(AirdropList, getAirdropList);
});
</script>

<template>
  <div>
    <!-- 头部 -->
    <div>
      <DAppAirdropHeader :tips="i18n.home.airdrop.tips" :title="i18n.home.airdrop.title" />
    </div>
    <!-- 内容 -->
    <div class="airdrop-list mt-4 hidden md:block">
      <DAppAirdropItem v-for="(data, index) in AirdropList" :key="index" :data="data" />
    </div>
    <div class="h-57 mt-4 block md:hidden">
      <Swiper :autoplay="{ delay: 3000, stopOnLastSlide: false, disableOnInteraction: true, pauseOnMouseEnter: true }" :pagination="{ clickable: true }" :slides-per-view="1" :space-between="0" class="h-full swiper-recom">
        <template v-for="(item, index) in AirdropList" :key="index">
          <SwiperSlide class="w-full h-full rounded-kd6px">
            <DAppAirdropItem status="upcoming" :data="item" class="w-full h-49.5 hand" />
          </SwiperSlide>
        </template>
      </Swiper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@screen md {
  .airdrop-list {
    @apply grid grid-cols-2 gap-6;
  }
}
@screen lg {
  .airdrop-list {
    @apply grid grid-cols-4 gap-6;
  }
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
