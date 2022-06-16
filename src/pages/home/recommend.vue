<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import document from "src/plugins/browser/document";
import { oss } from "src/config";
import { config } from "src/router/config";
// 引入 swiper vue 组件
// @ts-ignore
import SwiperCore, { Autoplay, Pagination } from "swiper";
// @ts-ignore
import { Swiper, SwiperSlide } from "swiper/vue";
// 引入 swiper 样式
import "swiper/swiper-bundle.css";
import { Model } from "src/logic/home";
import I18n from "src/utils/i18n";
import * as R from "ramda";
import safeGet from "@fengqiaogang/safe-get";
// 装载 swiper 组件
SwiperCore.use([Pagination, Autoplay]);
const i18n = I18n();
defineProps({
  isShowTitle: {
    type: Boolean,
    default: () => true,
  },
  title: {
    type: String,
    default: "",
  },
});
const api = new Model();
const params = reactive({
  page: 1,
  page_size: 50,
  is_recommendation: true,
});
const isBegin = ref(true);
const isEnd = ref(false);
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
const recommend = ref([]);
const ad = ref([]);
const cardList: any = ref([]);
const getAd = async () => {
  const adRes: any = await api.getAdList(17);
  ad.value = adRes;
};
const getData = async () => {
  const res: any = await api.getRankTopic(params);
  recommend.value = safeGet(res, "items");
};
const mergeData = () => {
  if (recommend.value.length === 0) {
    cardList.value = ad.value;
  } else {
    cardList.value = recommend.value;
    R.map((item: any) => {
      cardList.value.splice(item.display_location, 0, item);
    }, ad.value);
  }
};

onMounted(async () => {
  // 得到数据汇总
  await getData();
  await getAd();
  mergeData();
});
</script>
<template>
  <div v-if="cardList && cardList.length > 0">
    <div v-if="isShowTitle" class="mb-3 com-container font-kdSemiBold font-medium">{{ title ? title : i18n.home.hotTopic }}</div>
    <div class="relative">
      <div class="w-full">
        <div :class="isBegin ? 'hidden' : 'jian-left'" class="xshidden">
          <ui-image class="left shadow" :src="`${oss}/dapp/zuojian.png`" :lazy="false" fit="cover" @click="last" />
        </div>
        <Swiper v-if="cardList.length > 0" class="h-full swiper-recom" :initial-slide="0" slides-per-view="auto" :space-between="24" :resize-observer="true" @init="init" @set-translate="change">
          <template v-for="(item, index) in cardList" :key="index">
            <SwiperSlide class="rounded-kd6px">
              <v-router v-if="item['type'] != 1" :href="`${config.homeDetail}/${item.id}`" target="_blank" class="item-card rounded-kd6px overflow-hidden">
                <div class="info relative z-10 pt-8">
                  <div class="name font-kdSemiBold">{{ item["title"] }}</div>
                  <div class="bottom-bg"></div>
                </div>
                <ui-image class="rounded-kd6px w-full h-full" :src="item['cover_url']" fit="cover" />
              </v-router>
              <v-router v-else :href="item['url']" target="_blank" class="item-card rounded-kd6px overflow-hidden">
                <ui-image class="rounded-kd6px w-full h-full" :src="item['image']" fit="cover" />
              </v-router>
            </SwiperSlide>
          </template>
        </Swiper>
      </div>
      <div :class="isEnd ? 'hidden' : 'jian-right'" class="xshidden">
        <ui-image class="right shadow" :src="`${oss}/dapp/rightjian.png`" :lazy="false" fit="" cover alt="" @click="next" />
      </div>
      <div v-if="!isBegin" class="xshidden absolute top-0 left-0 left-jian w-15 h-full z-9" />
      <div v-if="!isEnd" class="xshidden absolute top-0 right-0 right-jian w-15 h-full z-9" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.com-container {
  @apply text-kd20px20px md:text-kd24px24px relative text-global-highTitle;
}
.left {
  @apply w-9 h-9 cursor-pointer rounded-full;
  @apply absolute left-3 z-10 top-20;
}
.right {
  @apply w-9 h-9 cursor-pointer rounded-full;
  @apply absolute right-3 z-10 top-20;
}
.item-card {
  @apply w-35 h-35 md:h-47.5 md:w-47.5 rounded-kd6px block relative;
}
.bottom-bg {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
  @apply w-full h-full left-0 absolute z-2 rounded-kd6px;
}
.swiper-slide {
  width: auto !important;
}
.info {
  @apply flex items-center justify-between px-2.5 md:px-3 w-full  absolute bottom-2 md:bottom-2 z-999;
  .name {
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.48);
    @apply relative z-5 text-kd22px26px md:text-kd26px31px font-medium text-global-white;
  }
}
.shadow {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.1);
}
.right-jian {
  background: linear-gradient(to right, rgba(250, 251, 252, 0), rgba(250, 251, 252, 1));
}
.left-jian {
  background: linear-gradient(to right, rgba(250, 251, 252, 1), rgba(250, 251, 252, 0));
}
</style>
