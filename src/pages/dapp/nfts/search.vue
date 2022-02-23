<script setup lang="ts">
import DappDiscoversContentType from '../discovers/content/type.vue';
import DappDiscoversContentChain from '../discovers/content/chain.vue';
import DappDiscoversContentField from '../discovers/content/field.vue';

import { ref } from 'vue';
const title = ref('项目类型');
const search = ref('项目名称');
const chain = ref('公链');
const chainData:any = ref([
  {
    'platformId': 110,
    'name': 'all',
    'slug': 'all',
    'logo': 'icon-quanbu',
    'href': '',
  },
  {
    'platformId': 111,
    'name': 'ETH',
    'slug': 'ETH',
    'logo': 'icon-quanbu',
    'href': '',
  },
  {
    'platformId': 112,
    'name': 'Bsc',
    'slug': 'Bsc',
    'logo': 'icon-quanbu',
    'href': '',
  },
  {
    'platformId': 113,
    'name': 'Polygon',
    'slug': 'POS',
    'logo': 'icon-quanbu',
    'href': '',
  }
])
const key=ref(0)
const change=()=>{
  key.value++
}
</script>
<template>
  <div class="mt-5">
    <!-- 项目类型、公链、搜索框 -->
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <!-- 项目类型 -->
        <DappDiscoversContentType :key="key" @change="change" title="项目类型" :chainData="chainData"></DappDiscoversContentType>
        <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
        <!-- 公链 -->
        <DappDiscoversContentChain :title="chain"></DappDiscoversContentChain>
      </div>
      <!-- 搜索框 -->
      <div>
        <DappDiscoversContentField :title="search"></DappDiscoversContentField>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>