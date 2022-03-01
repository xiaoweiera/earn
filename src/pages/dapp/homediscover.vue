<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import {AdItem, ProjectItem, Status} from "src/types/dapp/ixo";
import {Model, tabChain} from "src/logic/dapp/";
import * as alias from "src/utils/root/alias";
import {createRef, onLoadRef, onUpdateRef} from "src/utils/ssr/ref";


import DAppHomeHeader from './home/header.vue';
import DAppHomeTitle from './home/title.vue';
import DAppDiscoversContentType from './discovers/content/type.vue';
import DAppDiscoversList from './discovers/list.vue';
import {getParam} from "src/utils/router";
import {useRoute} from "vue-router";
import {config} from "src/router/config";

defineProps({
  summary: {
    type: Object,
    default: () => {
    }
  }
})

const route = useRoute();
const urlType = true;
// 公链类型
const chain = ref(getParam<string>("chain"));

// 即将上线列表
const getUpcomingList = function () {
  const model = new Model();
  return model.getUpcomingProjects(chain.value);
}
// 创建列表对象并获取缓存数据
const UpcomingList = createRef<Array<ProjectItem | AdItem>>(alias.dApp.ixo.upcoming, []);
// 创建更新列表钩子函数
const updateUpcomingList = onUpdateRef(UpcomingList, getUpcomingList);

// 进行中列表
const getOngoingList = function () {
  const model = new Model();
  return model.getOngoingProjects(chain.value);
}
const OngoingList = createRef<Array<ProjectItem | AdItem>>(alias.dApp.ixo.ongoing, []);
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
  chain.value = querys.chain;
  getUpcomingList();
  getOngoingList();
  // todo 可以在此处更新某些数据
})

</script>
<template>
  <div>
    <div>
      <div>
        <DAppHomeHeader :status="Status.upcoming" :type="urlType" tips="聚合 14 条公链，68 个IDO平台最新优质 Dapp 项目"
                        title="IDO & IGO Projects"/>
      </div>
      <!-- 公链数据 -->
      <div class="mt-4">
        <DAppDiscoversContentType v-if="summary.ixo" :list="tabChain(summary.ixo.chain, 'chain', config.home)"
                                  :split="6" name="chain" title="公链"/>
      </div>
      <!-- IDO进行中项目 -->
      <div class="mt-5">
        <DAppHomeTitle :status="Status.upcoming" :type="urlType" title="Upcoming Projects"/>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
          <DAppDiscoversList v-for="(item, index) in UpcomingList" :key="index" :data="item"></DAppDiscoversList>
        </div>
      </div>
      <!-- IGO进行中项目 -->
      <div class="mt-6">
        <DAppHomeTitle :status="Status.ongoing" :type="urlType" title="Ongoing Projects"/>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
          <DAppDiscoversList v-for="(item, index) in OngoingList" :key="index" :data="item"></DAppDiscoversList>
        </div>
      </div>
    </div>
  </div>
</template>
