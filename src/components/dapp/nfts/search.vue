<script setup lang="ts">
import { ref } from 'vue';
const title = ref('项目类型');
const search = ref('项目名称');
</script>
<template>
  <div class="mt-5">
    <!-- 项目类型、公链、搜索框 -->
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <!-- 项目类型 -->
        <DappDiscoversContentType :title="title"></DappDiscoversContentType>
        <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
        <!-- 公链 -->
        <DappDiscoversContentChain></DappDiscoversContentChain>
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