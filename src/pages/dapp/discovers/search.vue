<script setup lang="ts">
import DappDiscoversContentType from './content/type.vue';
import DappDiscoversContentChain from './content/chain.vue';
import DappDiscoversContentField from './content/field.vue';
import DappDiscoversContentPlatform from './content/platform.vue'
import { ref } from 'vue';
const query = ref('');

const chainData:any = ref([
  {
    'platformId': 106,
    'name': 'all',
    'slug': 'all',
    'logo': 'icon-quanbu',
    'href': '',
  },
  {
    'platformId': 107,
    'name': 'ETH',
    'slug': 'ETH',
    'logo': 'icon-quanbu',
    'href': '',
  },
  {
    'platformId': 108,
    'name': 'Bsc',
    'slug': 'Bsc',
    'logo': 'icon-quanbu',
    'href': '',
  },
  {
    'platformId': 109,
    'name': 'Polygon',
    'slug': 'POS',
    'logo': 'icon-quanbu',
    'href': '',
  }
])

const chainData2:any = ref([
  {
    'groudId': 100,
    'name': 'all',
    'slug': 'all',
    'logo': 'icon-quanbu',
    'href': ''
  },
  {
    'groudId': 101,
    'name': 'ETH',
    'slug': 'ETH',
    'logo': 'icon-quanbu',
    'href': ''
  },
  {
    'groudId': 102,
    'name': 'Bsc',
    'slug': 'Bsc',
    'logo': 'icon-quanbu',
    'href': ''
  },
  {
    'groudId': 103,
    'name': 'Polygon',
    'slug': 'POS',
    'logo': 'icon-quanbu',
    'href': ''
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
        <!-- <DappDiscoversContentType :key="key" @change="change" title="项目类型" :chainData="chainData2"></DappDiscoversContentType> -->
        <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
        <!-- 公链 -->
        <DappDiscoversContentChain title="公链"></DappDiscoversContentChain>
      </div>
      <!-- 搜索框 -->
      <div>
        <DappDiscoversContentField :query="query" title="项目名称"></DappDiscoversContentField>
      </div>
    </div>
    <!-- platform -->
    <div class="mt-4">
      <!-- <DappDiscoversContentPlatform :key="key" @change="change" title='platform' :chainData="chainData"></DappDiscoversContentPlatform> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>