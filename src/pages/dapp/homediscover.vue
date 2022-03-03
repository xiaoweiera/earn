<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import I18n from "src/utils/i18n";
import {AdItem, ProjectItem, Status} from "src/types/dapp/ixo";
import {Model, tabChain} from "src/logic/dapp/";
import * as alias from "src/utils/root/alias";
import {createRef, onLoadRef, onUpdateRef} from "src/utils/ssr/ref";


import DAppHomeHeader from './home/header.vue';
import DAppHomeTitle from './home/title.vue';
import DAppDiscoversContentType from './discovers/content/type.vue';
import DappDiscoversContentChain from './discovers/content/chain.vue';
import DAppDiscoversList from './discovers/list.vue';
import {getParam} from "src/utils/router";
import {useRoute} from "vue-router";
import {config} from "src/router/config";
// @ts-ignore
import {Swiper, SwiperSlide} from "swiper/vue";
import SwiperCore, {Autoplay, Navigation, Pagination, Scrollbar, A11y} from "swiper";
import {uuid} from "src/utils";
// 装载 swiper 组件
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

defineProps({
  summary: {
    type: Object,
    default: () => {
    }
  }
})
const i18n = I18n();
const route = useRoute();
const urlType = true;
// 公链类型
const chain = ref(getParam<string>("chain"));
const keys = ref<string>(uuid());

// 创建列表对象并获取缓存数据
const UpcomingList = createRef<Array<ProjectItem | AdItem>>(alias.dApp.ixo.upcoming, [] as any);
// 即将上线列表
const getUpcomingList = async function (flag:boolean) {
  const model = new Model();
  if(flag){
    UpcomingList.value = [];
  }
  UpcomingList.value = await model.getUpcomingProjects(chain.value) as any;
}

// 创建更新列表钩子函数
const updateUpcomingList = onUpdateRef(UpcomingList, getUpcomingList);


const OngoingList = createRef<Array<ProjectItem | AdItem>>(alias.dApp.ixo.ongoing, []);
// 进行中列表
const getOngoingList = async function (flag:boolean) {
  const model = new Model();
  if(flag){
    OngoingList.value = [];
  }
  OngoingList.value = await model.getOngoingProjects(chain.value) as any;
}
const updateOngoingList = onUpdateRef(OngoingList, getOngoingList);

onMounted(function () {
  // 判断列表数据是否为空，如果为空则获取最新数据
  onLoadRef(UpcomingList, getUpcomingList);
  onLoadRef(OngoingList, getOngoingList);
});

// 修改公链
const onChangeChina = function () {
  chain.value = "all"; // 设置为更新后的值
  // 更新数据
  updateUpcomingList();
  updateOngoingList();
};
watch(route, () => {
  const querys: any = getParam<string>();
  keys.value = uuid();
  chain.value = querys.chain;
  getUpcomingList(true);
  getOngoingList(true);
  // todo 可以在此处更新某些数据
})
</script>
<template>
  <div>
    <div>
      <div>
        <DAppHomeHeader :status="Status.upcoming" :type="urlType" :tips="i18n.home.idoIgoProject.title" title="IDO & IGO Projects"/>
      </div>
      <!-- 公链数据 -->
      <div class="mt-4 hidden md:block">
        <DAppDiscoversContentType class="pb-2.5 border-b-1 border-global-highTitle border-opacity-6" v-if="summary.ixo" :list="tabChain(summary.ixo.chain, 'chain', config.home)" :split="6" name="chain" :title="i18n.home.idoIgoProject.chain"/>
      </div>
      <!--手机端-->
      <div class="mt-4 block md:hidden">
        <DappDiscoversContentChain :key="keys" class="w-full" v-if="summary.ixo" :chainData="summary.ixo.chain" :href="config.home" name="chain" :title="i18n.home.idoIgoProject.chain"/>
      </div>
      <!-- IDO&IGO即将开始项目 -->
      <div class="mt-5">
        <DAppHomeTitle :status="Status.upcoming" :type="urlType" :title="i18n.home.idoIgoProject.upcoming"/>
        <div class="hidden md:block">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
            <DAppDiscoversList v-for="(item, index) in UpcomingList" :key="index" status="upcoming" :data="item"/>
          </div>
        </div>
        <!-- 手机端IDO&IGO即将开始项目 -->
        <div class="block md:hidden mt-3 h-95" v-if="UpcomingList.length > 0">
          <Swiper class="h-full swiper-recom"
                  :autoplay="{ delay: 3000, stopOnLastSlide: false, disableOnInteraction: true, pauseOnMouseEnter: true }"
                  :slides-per-view="1"
                  :space-between="0"
                  :pagination="{ clickable: true }">
            <template class="w-full h-87.25" v-for="(item, index) in UpcomingList" :key="index">
              <SwiperSlide class="w-full h-full rounded-kd6px">
                <DAppDiscoversList class="w-full h-full hand" status="upcoming" :data="item"/>
              </SwiperSlide>
            </template>
          </Swiper>
        </div>
        <div v-else>
          <ui-empty class="pb-3"/>
          <p class="text-center text-kd12px16px text-global-highTitle text-opacity-45 font-kdFang">{{ i18n.address.noData }}</p>
        </div>
      </div>
      <!-- IDO&IGO进行中项目 -->
      <div class="mt-6">
        <DAppHomeTitle :status="Status.ongoing" :type="urlType" :title="i18n.home.idoIgoProject.ongoing"/>
        <div class="hidden md:block">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
            <DAppDiscoversList v-for="(item, index) in OngoingList" :key="index" status="ongoing" :data="item"/>
          </div>
        </div>
        <!--手机端IDO&IGO进行中项目 -->
        <div class="block md:hidden mt-3 h-95" v-if="OngoingList.length > 0">
          <Swiper class="h-full swiper-recom"
                  :autoplay="{ delay: 3000, stopOnLastSlide: false, disableOnInteraction: true, pauseOnMouseEnter: true }"
                  :slides-per-view="1"
                  :space-between="0"
                  :pagination="{ clickable: true }">
            <template class="w-full h-87.25" v-for="(item, index) in OngoingList" :key="index">
              <SwiperSlide class="w-full h-full rounded-kd6px">
                <DAppDiscoversList class="w-full h-full hand" status="ongoing" :data="item"/>
              </SwiperSlide>
            </template>
          </Swiper>
        </div>
        <div v-else>
          <ui-empty class="pb-3"/>
          <p class="text-center text-kd12px16px text-global-highTitle text-opacity-45 font-kdFang">{{ i18n.address.noData }}</p>
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
