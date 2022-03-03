<script setup lang="ts">
import DappDiscoversContentHeader from './header.vue';
import DappDiscoversContentTitle from './title.vue';
import DappDiscoversContentDec from './dec.vue';
import DappDiscoversContentPrice from './price.vue';
import DappDiscoversContentTime from './time.vue';
import { getNextUrl } from 'src/logic/dapp';
defineProps({
  data: {
    type: Object,
  }
})

</script>

<template>
  <div>
    <v-router  target="_blank" :href="data.url">
      <!-- 项目图片和tip角标 -->
      <div class="relative h-40">
        <DappDiscoversContentHeader :data="data"/>
      </div>

      <!-- 项目头像和项目名 -->
      <div class="w-full h-51.25 px-4 absolute top-35.75 left-0 bg-global-white rounded-md">
        <DappDiscoversContentTitle :data="data"/>
        <!-- 项目描述 -->
        <div>
          <DappDiscoversContentDec :data="data"/>
        </div>
        <!-- 项目价格 -->
        <div>
          <DappDiscoversContentPrice :data="data"/>
        </div>

        <!-- 项目时间 -->
        <div>
          <DappDiscoversContentTime :data="data"/>
        </div>
      </div>
    </v-router>
  </div>
</template>