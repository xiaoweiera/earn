<script lang="ts" setup>
import {onMounted, ref} from "vue";
import I18n from "src/utils/i18n";
import { Query } from "src/types/common/";
import {AdItem, ProjectItem, Status} from "src/types/dapp/ixo";
import {Model, tabChain} from "src/logic/dapp/";
import * as alias from "src/utils/root/alias";
import {createRef, onLoadRef, onUpdateRef} from "src/utils/ssr/ref";
import {stateAlias, useWatch, getReactiveInject} from "src/utils/use/state";

import DAppHomeHeader from './home/header.vue';
import DAppHomeTitle from './home/title.vue';
import DAppDiscoversContentType from './discovers/content/type.vue';
import DAppDiscoversContentChain from './discovers/content/chain.vue';
import DAppDiscoversList from './discovers/list.vue';
import {getParam} from "src/utils/router";
import {config} from "src/router/config";
// @ts-ignore
import {Swiper, SwiperSlide} from "swiper/vue";
import SwiperCore, {A11y, Autoplay, Navigation, Pagination, Scrollbar} from "swiper";
import {uuid} from "src/utils";
// 装载 swiper 组件
SwiperCore.use([ Navigation, Pagination, Scrollbar, A11y, Autoplay ])

defineProps({
  summary: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const i18n = I18n();
const route = getReactiveInject<Query>(stateAlias.ui.tab) || {};
const urlType = true;
// 公链类型
const chain = ref(getParam<string>("chain"));
const keys = ref<string>(uuid());

// 创建列表对象并获取缓存数据
const UpcomingList = createRef<Array<ProjectItem | AdItem>>(alias.dApp.ixo.upcoming, [] as any);

// 即将上线列表
const getUpcomingList = async function () {
  const model = new Model();
  return model.getUpcomingProjects(chain.value);
}

// 创建更新列表钩子函数
const updateUpcomingList = onUpdateRef(UpcomingList, getUpcomingList);


const OngoingList = createRef<Array<ProjectItem | AdItem>>(alias.dApp.ixo.ongoing, []);
// 进行中列表
const getOngoingList = async function () {
  const model = new Model();
  return model.getOngoingProjects(chain.value);
}
const updateOngoingList = onUpdateRef(OngoingList, getOngoingList);

onMounted(function () {
  // 判断列表数据是否为空，如果为空则获取最新数据
  onLoadRef(UpcomingList, getUpcomingList);
  onLoadRef(OngoingList, getOngoingList);

  useWatch(route, function (){
    keys.value = uuid();
    if (chain.value !== route.chain) {
      chain.value = route.chain;
      updateUpcomingList();
      updateOngoingList();
    }
  });
});
</script>
<template>
  <div>
    <div>
      <div>
        <DAppHomeHeader :status="Status.upcoming" :tips="i18n.home.idoIgoProject.title" :type="urlType"
                        title="IDO & IGO Projects"/>
      </div>
      <!-- 公链数据 -->
      <div class="mt-4 hidden md:block" v-if="summary.ixo_upcoming" :key="keys">
        <DAppDiscoversContentType :list="tabChain(summary.ixo_upcoming.chain, 'chain', config.home)"
                                  :split="6" :title="i18n.home.idoIgoProject.chain" class="pb-2.5 border-b-1 border-global-highTitle border-opacity-6"
                                  name="chain"/>
      </div>
      <!--手机端-->
      <div class="mt-4 block md:hidden" v-if="summary.ixo_upcoming" :key="keys" >
        <DAppDiscoversContentChain :chainData="summary.ixo_upcoming.chain" :href="config.home"
                                   :title="i18n.home.idoIgoProject.chain" class="w-full" name="chain"/>
      </div>
      <!-- IDO&IGO即将开始项目 -->
      <div class="mt-5">
        <DAppHomeTitle :status="Status.upcoming" :title="i18n.home.idoIgoProject.upcoming" :type="urlType"/>
        <div class="hidden md:block">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
            <DAppDiscoversList v-for="(item, index) in UpcomingList" :key="index" status="upcoming" :data="item"/>
          </div>
        </div>
        <div v-if="UpcomingList.length > 0" class="block md:hidden mt-3 h-95">
          <Swiper :autoplay="{ delay: 3000, stopOnLastSlide: false, disableOnInteraction: true, pauseOnMouseEnter: true }"
                  :pagination="{ clickable: true }"
                  :slides-per-view="1"
                  :space-between="0"
                  class="h-full swiper-recom">
            <template v-for="(item, index) in UpcomingList" :key="index" class="w-full h-87.25">
              <SwiperSlide class="w-full h-full rounded-kd6px">
                <DAppDiscoversList status="upcoming" :data="item" class="w-full h-full hand"/>
              </SwiperSlide>
            </template>
          </Swiper>
        </div>
        <div v-else>
          <ui-empty class="pb-3"/>
          <p class="text-center text-kd12px16px text-global-highTitle text-opacity-45 font-kdFang">
            {{ i18n.address.noData }}</p>
        </div>
      </div>
      <!-- IDO&IGO进行中项目 -->
      <div class="mt-6">
        <DAppHomeTitle :status="Status.ongoing" :title="i18n.home.idoIgoProject.ongoing" :type="urlType"/>
        <div class="hidden md:block">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
            <DAppDiscoversList v-for="(item, index) in OngoingList" :key="index" status="ongoing" :data="item"/>
          </div>
        </div>
        <div v-if="OngoingList.length > 0" class="block md:hidden mt-3 h-95">
          <Swiper :autoplay="{ delay: 3000, stopOnLastSlide: false, disableOnInteraction: true, pauseOnMouseEnter: true }"
                  :pagination="{ clickable: true }"
                  :slides-per-view="1"
                  :space-between="0"
                  class="h-full swiper-recom">
            <template v-for="(item, index) in OngoingList" :key="index" class="w-full h-87.25">
              <SwiperSlide class="w-full h-full rounded-kd6px">
                <DAppDiscoversList status="ongoing" :data="item" class="w-full h-full hand"/>
              </SwiperSlide>
            </template>
          </Swiper>
        </div>
        <div v-else>
          <ui-empty class="pb-3"/>
          <p class="text-center text-kd12px16px text-global-highTitle text-opacity-45 font-kdFang">
            {{ i18n.address.noData }}</p>
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
