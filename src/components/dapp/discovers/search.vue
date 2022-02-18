<script setup lang="ts">

</script>
<template>
  <div class="mt-5">
    <!-- 项目类型、公链、搜索框 -->
    <div class="flex justify-between items-center">
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
    <div class="mt-7.5">
      <DappDiscoversContentPlatform></DappDiscoversContentPlatform>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>