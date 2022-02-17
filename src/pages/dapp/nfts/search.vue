<script setup lang="ts">
import DappDiscoversContentType from '../discovers/content/type.vue'
import DappDiscoversContentChain from '../discovers/content/chain.vue'
import DappDiscoversContentInputseach from '../discovers/content/inputsearch.vue'
</script>
<template>
  <div class="mt-5">
    <!-- 项目类型、公链、搜索框 -->
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <!-- 项目类型 -->
        <DappDiscoversContentType></DappDiscoversContentType>
        <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
        <!-- 公链 -->
        <DappDiscoversContentChain></DappDiscoversContentChain>
      </div>
      <!-- 搜索框 -->
      <div>
        <DappDiscoversContentInputseach></DappDiscoversContentInputseach>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>