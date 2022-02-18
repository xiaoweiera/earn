<script setup lang="ts">
  import { ref } from "vue";
  const title = ref('NFT Drops 🎯');
  const tips = ref('Never miss an interesting NFT drop on NFTGo!');
</script>
<template>
  <div>
    <div>
      <!-- header -->
      <div>
        <DappHomeHeader :title="title" :tips="tips"></DappHomeHeader>
      </div>
      <!-- 搜索 -->
      <div class="mt-4">
        <DappDiscoversContentType title="公链" id="1"></DappDiscoversContentType>
      </div>
      <!-- nft项目 -->
      <div class="mt-4">
        <div class="w-315 grid grid-cols-5 gap-6">
          <DappNftsList v-for="( item, index ) in 5" :key="index"></DappNftsList>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>