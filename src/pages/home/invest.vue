<script lang="ts" setup>
import { ref } from "vue";
import I18n from "src/utils/i18n";
import { config } from "src/router/config";

import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import DAppInvestProjectsItem from "src/pages/dapp/investment/projects/item.vue";
import DAppInvestFundItem from "src/pages/dapp/investment/fund/item.vue";
import { onMounted } from "vue";
import { Model } from "src/logic/dapp/invest";
import { InvestItem, ProjectItem } from "src/types/dapp/invest";

// 装载 swiper 组件
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
const i18n = I18n();
const params = {
  page: 1,
  page_size: 4,
  keyword: "",
  stage: "",
};
const fundsParams = {
  page: 1,
  page_size: 4,
  keyword: "",
};
const projectsList = ref<ProjectItem[]>([]);
const getProjectsList = async function () {
  const api = new Model();
  const list = (await api.getProjectsList(params)) as ProjectItem[];
  projectsList.value = list;
};

const fundsList = ref<InvestItem[]>([]);
const getFundsList = async function () {
  const api = new Model();
  const list = (await api.getFundsList(fundsParams)) as InvestItem[];
  fundsList.value = list;
};
onMounted(() => {
  getProjectsList();
  getFundsList();
});
</script>

<template>
  <div>
    <div v-if="(projectsList && projectsList.length > 0) || (fundsList && fundsList.length > 0)" class="w-full">
      <!-- pc端头部 -->
      <div class="w-full hidden md:block">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <h3 class="text-kd32px32px text-global-highTitle font-kdSemiBold">{{ i18n.invest.project.trend }}</h3>
            <div class="ml-3 text-kd14px18px text-global-highTitle text-opacity-45 font-kdFang">
              <p>{{ i18n.invest.project.subTitle }}</p>
              <p>{{ i18n.invest.project.tipTitle }}</p>
            </div>
          </div>
          <div class="bg-global-darkblue bg-opacity-6 rounded-md px-3 py-2 flex items-center">
            <v-router :href="config.invest" target="_blank">
              <span class="text-kd14px18px text-global-darkblue font-kdFang">{{ i18n.home.idoIgoProject.all }}</span>
            </v-router>
          </div>
        </div>
      </div>
      <div class="w-full block md:hidden">
        <div class="flex items-center justify-between">
          <h3 class="text-kd24px24px text-global-highTitle font-kdSemiBold">{{ i18n.invest.project.trend }}</h3>
          <v-router :href="config.invest" target="_blank" class="bg-global-darkblue bg-opacity-6 rounded-md px-3 py-2 flex items-center">
            <span class="text-kd14px18px text-global-darkblue font-kdFang">{{ i18n.home.more }}</span>
          </v-router>
        </div>
        <div class="w-full mt-4">
          <div class="text-kd12px16px text-global-highTitle text-opacity-45 font-kdFang">
            <p>{{ i18n.invest.project.subTitle }}{{ i18n.invest.project.tipTitle }}</p>
          </div>
        </div>
      </div>
      <!-- projects -->
      <div v-if="projectsList && projectsList.length > 0" class="mt-4 w-full">
        <div class="w-full">
          <h4 class="text-kd24px28px text-global-highTitle font-kdBarlow">{{ i18n.invest.project.title }}</h4>
        </div>
        <div class="mt-3 hidden md:block">
          <div class="grid grid-cols-2 gap-6 lg:grid-cols-2 xl:grid-cols-4">
            <DAppInvestProjectsItem v-for="item in projectsList" :key="item.id" :data="item" />
          </div>
        </div>
        <div class="mt-3 block md:hidden h-105">
          <Swiper :autoplay="{ delay: 3000, stopOnLastSlide: false, disableOnInteraction: true, pauseOnMouseEnter: true }" :pagination="{ clickable: true }" :slides-per-view="1" :space-between="0" class="h-full swiper-recom">
            <template v-for="item in projectsList" :key="item.id">
              <SwiperSlide class="w-full h-full rounded-kd6px">
                <DAppInvestProjectsItem :data="item" class="w-full" />
              </SwiperSlide>
            </template>
          </Swiper>
        </div>
      </div>
      <!-- funds -->
      <div v-if="fundsList && fundsList.length > 0" class="mt-4 md:mt-6 w-full">
        <div class="w-full">
          <h4 class="text-kd24px28px text-global-highTitle font-kdBarlow">{{ i18n.invest.project.funds }}</h4>
        </div>
        <div class="mt-3 hidden md:block">
          <div class="grid grid-cols-2 gap-6 lg:grid-cols-2 xl:grid-cols-4">
            <DAppInvestFundItem v-for="item in fundsList" :key="item.id" :data="item" />
          </div>
        </div>
        <div class="mt-3 block md:hidden h-82">
          <Swiper :autoplay="{ delay: 3000, stopOnLastSlide: false, disableOnInteraction: true, pauseOnMouseEnter: true }" :pagination="{ clickable: true }" :slides-per-view="1" :space-between="0" class="h-full swiper-recom">
            <template v-for="item in fundsList" :key="item.id">
              <SwiperSlide class="w-full h-full rounded-kd6px">
                <DAppInvestFundItem :data="item" />
              </SwiperSlide>
            </template>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper-recom {
  ::v-deep(.swiper-pagination-bullets) {
    @apply bottom-0;
    .swiper-pagination-bullet {
      @apply mr-6;
    }
  }
}
</style>
