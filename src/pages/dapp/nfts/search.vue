<script setup lang="ts">
import DappDiscoversContentType from '../discovers/content/type.vue';
import DappDiscoversContentChain from '../discovers/content/chain.vue';
import DappDiscoversContentField from '../discovers/content/field.vue';

import { tabChain, tabCage } from "src/logic/dapp/";
import { ref } from 'vue';
import { config } from "src/router/config";

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
    <!-- 项目类型、公链、搜索框 -->
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <!-- 项目类型 -->
         <DappDiscoversContentType v-if="data.category" :list="tabCage(data.category,'group', `${config.nft}/discover`)" :key="key" :split="3" title="项目类型" name="group"></DappDiscoversContentType>
        <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
        <!-- 公链 -->
        <DappDiscoversContentChain :key="key" :title="chain" :chainData="data.chain" :href="`${config.nft}/discover`" name="chain"></DappDiscoversContentChain>
      </div>
      <!-- 搜索框 -->
      <div>
        <DappDiscoversContentField :herf="`${config.nft}/discover`" :title="search"></DappDiscoversContentField>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>