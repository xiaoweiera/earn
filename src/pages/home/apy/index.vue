<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { oss } from "src/config";
import I18n from "src/utils/i18n";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { DataItem } from "src/types/dapp/airdrop";
import * as alias from "src/utils/root/alias";
import { Model } from "src/logic/home";
import { config } from "src/router/config";

import ApyItem from "src/pages/home/apy/content/item.vue";
import Empty from "src/pages/home/apy/content/empty.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
// 装载 swiper 组件
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const i18n = I18n();
// 创建列表对象并获取缓存数据
const ApyList = createRef<DataItem[]>(alias.home.apy.list, [] as any);
const params = {
  page: 1,
  page_size: 12,
};
// 即将上线列表
const getApyList = async function () {
  const model = new Model();
  return model.getApyList(params);
};

onMounted(() => {
  // 判断列表数据是否为空，如果为空则获取最新数据
  onLoadRef(ApyList, getApyList);
});
const activeId = ref(1);
const list = [
  { id: 1, name: "DeFi", icon: "icon-paihang" },
  { id: 2, name: "NFTFi", icon: "icon-NFT" },
];
const tabClick = function (value: any) {
  activeId.value = value.id;
};
</script>

<template>
  <div>
    <div>
      <!-- 标题 -->
      <div class="flex items-center justify-center">
        <div class="flex items-center">
          <ui-image class="w-6 h-6" :src="`${oss}/image/apy-left.png`" />
          <h1 class="text-kd16px22px md:text-kd24px28px text-global-highTitle mx-4 text-center">{{ i18n.home.apy.title }}</h1>
          <ui-image class="w-6 h-6" :src="`${oss}/image/apy-right.png`" />
        </div>
      </div>
      <!-- 切换按钮 -->
      <div class="flex items-center justify-center mt-6">
        <div class="w-full md:w-92 h-11 md:h-14.25 bg-global-highTitle bg-opacity-6 rounded-md p-1 flex items-center hand">
          <div v-for="(item, index) in list" :key="index" :class="item.id === activeId ? 'tab-item tab-item-active' : 'tab-item'" @click="tabClick(item)">
            <div class="hidden md:block">
              <IconFont class="flex items-center" :type="item.icon" size="24" />
            </div>
            <IconFont class="block md:hidden flex items-center" :type="item.icon" size="20" />
            <span class="ml-2 md:ml-3">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <!-- DeFi内容 -->
      <div v-if="activeId === 1" class="mt-6">
        <div class="hidden md:block">
          <div class="grid grid-cols-2 xl:grid-cols-3 gap-6">
            <template v-for="(item, index) in ApyList" :key="index">
              <ApyItem :data="item" />
            </template>
          </div>
        </div>
        <div class="h-74 block md:hidden">
          <Swiper :autoplay="{ delay: 3000, stopOnLastSlide: false, disableOnInteraction: true, pauseOnMouseEnter: true }" :pagination="{ clickable: true }" :slides-per-view="1" :space-between="0" class="h-full swiper-recom">
            <template v-for="(item, index) in ApyList" :key="index">
              <SwiperSlide class="w-full h-full rounded-kd6px">
                <ApyItem :data="item" class="w-full hand" />
              </SwiperSlide>
            </template>
          </Swiper>
        </div>
        <!-- 查看更多 -->
        <div class="w-full flex items-center justify-center mt-6">
          <v-router :href="config.apyToken" class="more hand" target="_blank">
            {{ i18n.home.apy.more }}
          </v-router>
        </div>
      </div>
      <div v-if="activeId === 2" class="mt-6">
        <div class="h-50 md:h-69.5 rounded-md overflow-hidden">
          <Empty class="w-full h-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-item {
  @apply w-45 h-full flex items-center justify-center text-global-highTitle text-18-24 md:text-kd24px28px font-medium font-kdFang;
}
.tab-item-active {
  @apply bg-global-darkblue text-global-white rounded-md;
}
.swiper-recom {
  ::v-deep(.swiper-pagination-bullets) {
    @apply bottom-0;
    .swiper-pagination-bullet {
      @apply mr-3;
    }
  }
}
.more {
  @apply w-30 h-8 flex items-center justify-center bg-global-darkblue bg-opacity-6 rounded text-global-darkblue text-14-18 font-medium font-kdFang;
}
</style>
