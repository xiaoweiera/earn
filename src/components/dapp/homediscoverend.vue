<script setup lang="ts">
  import { ref } from "vue";
  const title = ref('Ended IDO & IGO Projects');
  const tips = ref('Data supported by 14 public chain and 65 platforms');
</script>
<template>
  <div class="mt-5 p-4 bg-global-white rounded-md">
    <!-- header -->
    <div class="border-b-1 border-global-highTitle border-opacity-6 pb-4">
      <DappHomeHeader :title="title" :tips="tips"></DappHomeHeader>
    </div>
    <!-- 项目类型、公链、搜索框 -->
    <div class="flex justify-between items-center mt-4">
      <div class="flex items-center">
        <!-- 项目类型 -->
        <DappDiscoversContentType title="项目类型"></DappDiscoversContentType>
        <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
        <!-- 公链 -->
        <DappDiscoversContentChain title="公链"></DappDiscoversContentChain>
      </div>
      <!-- 搜索框 -->
      <div>
        <DappDiscoversContentField title="项目名称"></DappDiscoversContentField>
      </div>
    </div>
    <!-- platform -->
    <div class="mt-4 border-b-1 border-global-highTitle border-opacity-6 pb-4">
      <DappDiscoversContentPlatform></DappDiscoversContentPlatform>
    </div>
    <div>
       <DappDiscoversEndlist></DappDiscoversEndlist>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>