<script setup lang="ts">
import { oss } from "src/config";
</script>
<template>
  <div class="w-full font-kdFang">
    <div class="header">
      <span class="text-kd14px18px text-global-highTitle font-medium">Recommended Topics</span>
      <div class="flex items-center">
        <IconFont class="fan" size="8" type="icon-leftNo"></IconFont>
        <div class="pageNumber">1/5</div>
        <IconFont class="fan" size="8" type="icon-rightNo"></IconFont>
      </div>
    </div>
    <template v-for="item in [1,2,3,4,5,6,7,2]">
      <v-router class="text-kdFang flex items-center mt-3 cursor-pointer" href="https://www.baidu.com">
        <img class="w-8 h-8 rounded-kd4px" :src="`${oss}/dapp/recomTest.jpg`"/>
        <span class="ml-2 text-global-primary txt">#</span>
        <span class="txt ml-0.5 text-global-highTitle text-opacity-85">NFT Projects</span>
      </v-router>
    </template>

  </div>
</template>
<style scoped lang="scss">
.fan{
  @apply text-global-highTitle text-opacity-65;
}
.pageNumber{
  @apply mx-2 text-kd12px16px text-global-highTitle text-opacity-65;
}
.header{
  @apply py-2.5;
  @apply flex items-center justify-between header-border;
  @apply border-t-1 border-b-1 border-global-highTitle border-opacity-6;
}
.txt{
  @apply text-kd14px18px font-medium;
}
</style>