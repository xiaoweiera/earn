<script setup lang="ts">
  import DappHomeHeader from './home/header.vue';
  import DappHomeTitle from './home/title.vue';
  import DappDiscoversContentType from './discovers/content/type.vue';
  import DappDiscoversList from './discovers/list.vue';
  
  import { ref } from "vue";
  const subtitle = ref('Upcoming Projects');
  const substitle = ref('Ongoing Projects');
  const title = ref('IDO & IGO Projects');
  const tips = ref('聚合 14 条公链，68 个IDO平台最新优质 Dapp 项目');
</script>
<template>
  <div>
    <div>
      <!-- header -->
      <div>
        <DappHomeHeader :title="title" :tips="tips"></DappHomeHeader>
      </div>
      <!-- 搜索 -->
      <div class="mt-4">
        <!-- <DappDiscoversContentType title="公链" id="1"></DappDiscoversContentType> -->
      </div>
      <!-- IDO进行中项目 -->
      <div class="mt-5">
        <DappHomeTitle :title="subtitle"></DappHomeTitle>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
          <DappDiscoversList v-for="(item, index) in 4" :key='index'></DappDiscoversList>
        </div>
      </div>
      <!-- IGO进行中项目 -->
      <div class="mt-6">
        <DappHomeTitle :title="subtitle"></DappHomeTitle>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
          <DappDiscoversList v-for="(item, index) in 4" :key='index'></DappDiscoversList>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>