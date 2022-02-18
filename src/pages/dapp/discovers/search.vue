<script setup lang="ts">
import DappDiscoversContentType from './content/type.vue'
import DappDiscoversContentChain from './content/chain.vue'
import DappDiscoversContentInputseach from './content/inputsearch.vue'
import DappDiscoversContentPlatform from './content/platform.vue'
</script>
<template>
  <div class="mt-5">
    <!-- 项目类型、公链、搜索框 -->
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <!-- 项目类型 -->
        <DappDiscoversContentType title="项目类型" id="1"></DappDiscoversContentType>
        <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
        <!-- 公链 -->
        <DappDiscoversContentChain title="公链" id="1"></DappDiscoversContentChain>
      </div>
      <!-- 搜索框 -->
      <div>
        <DappDiscoversContentInputseach title="项目名称" id="1"></DappDiscoversContentInputseach>
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