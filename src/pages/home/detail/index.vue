<script setup lang="ts">
import HomeDetailInfo from './info.vue'
import HomeDetailTable from './table.vue'
import HomeDetailTop from './top.vue'
import HomeDetailTopic from './topic.vue'
import {onMounted} from 'vue'
import {createReactive, onLoadReactive} from "src/utils/ssr/ref";
import {detail} from "src/types/home";
import {Model} from "src/logic/home";
import {getParam} from "src/utils/router";

const data = createReactive<detail>("API.home.getDetail", {} as any);
onMounted(function () {
  const api = new Model();
  const id = getParam<string>('id', '') as string
  // 得到数据汇总
  onLoadReactive(data, () => api.getDetail(id));
});
</script>
<template>
  <div class="md:max-w-360 md:py-8 md:pb-30 md:px-20  mx-auto px-3 flex">
    <div class="w-full md:mr-12">
      <HomeDetailInfo class="mt-6 md:mt-0" :data="data"/>
      <HomeDetailTable v-if="data.id" class="mt-6" :info="data"/>
    </div>
    <div class="min-w-65 xshidden">
      <HomeDetailTop/>
      <HomeDetailTopic class="mt-6"/>
    </div>
  </div>
</template>
