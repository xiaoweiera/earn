<script setup lang="ts">
import HomeDetailInfo  from './info.vue'
import HomeDetailTable  from './table.vue'
import HomeDetailTop  from './top.vue'
import HomeDetailTopic  from './topic.vue'
import {onMounted, ref} from 'vue'
import {createReactive, onLoadReactive} from "~/utils/ssr/ref";
import {detail} from "~/types/home";
import {Model} from "~/logic/home";
import {getParam} from "~/utils/router";

const data = createReactive<detail>("API.home.getDetail", {} as any);
onMounted(function () {
  const api = new Model();
  const id=getParam<string>('id', '') as string
  // 得到数据汇总
  onLoadReactive(data, () => api.getDetail(id));
});

</script>
<template>
  <div class="max-w-360 py-8 pb-30 px-20 mx-auto  flex justify-between">
    <div class="max-w-243">
      <HomeDetailInfo :data="data"/>
      <HomeDetailTable class="mt-6" :detail="data"/>
    </div>
    <div class="w-65 min-w-65">
      <HomeDetailTop/>
      <HomeDetailTopic class="mt-6"/>
    </div>
  </div>
</template>
