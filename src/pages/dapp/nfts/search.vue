<script setup lang="ts">
import DappDiscoversContentType from '../discovers/content/type.vue';
import DappDiscoversContentChain from '../discovers/content/chain.vue';
import DappDiscoversContentField from '../discovers/content/field.vue';

import { tabCage } from "src/logic/dapp/";
import { ref } from 'vue';
import { config } from "src/router/config";
import I18n from "src/utils/i18n";
const i18n = I18n();
defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
const title = ref('项目类型');
const search = ref('项目名称');
const chain = ref('公链');
const key=ref(0)
const change=()=>{
  key.value++
}
</script>
<template>
  <div class="mt-5" v-if="data">
    <div class="hidden md:block">
      <!-- 项目类型、公链、搜索框 -->
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <!-- 项目类型 -->
          <DappDiscoversContentType v-if="data.category" :list="tabCage(data.category,'group', `${config.nft}/discover`)" :key="key" :split="3" :title="i18n.home.topList.category" name="group"/>
          <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
          <!-- 公链 -->
          <DappDiscoversContentChain :key="key" :title="i18n.home.idoIgoProject.chain" :chainData="data.chain" :href="`${config.nft}/discover`" name="chain"/>
        </div>
        <!-- 搜索框 -->
        <div>
          <DappDiscoversContentField :herf="`${config.nft}/discover`" :title="search"/>
        </div>
      </div>
    </div>
    <div class="block md:hidden">
      <div>
        <div class="flex items-center">
          <DappDiscoversContentChain class="w-1/2" :key="key" :title="i18n.home.topList.category" :chainData="data.category" :href="`${config.nft}/discover`" name="group"/>
          <IconFont v-if="data.category" class="text-global-highTitle text-opacity-10 mx-2 relative top-0.5  h-full" type="icon-gang"/>
          <DappDiscoversContentField class="1/2" :herf="`${config.nft}/discover`" :title="search"/>
        </div>
      </div>
    </div>
  </div>
</template>
