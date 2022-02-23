<script setup lang="ts">
import {PropType} from "vue";
import {detail} from "src/types/home";
const props=defineProps({
  data: Object as PropType<detail>
})

</script>
<template>
  <div>
    <div class="flex items-end w-full py-2.5">
      <span class="text-kd36px36px font-kdSemiBold text-global-primary font-bold">#</span>
      <span class="text-kd40px40px font-kdSemiBold ml-2 text-global-highTitle text-opacity-85">{{data.name}}</span>
      <div class="w-25 h-8 ml-6 bg-global-primary rounded-kd6px flex items-center justify-center cursor-pointer">
        <IconFont class="text-global-white" size="16" type="icon-updata"/>
        <span class="text-kd14px18px text-global-white font-medium ml-1">申请收录</span>
      </div>
    </div>
    <div class="mt-4 text-kd14px20px font-medium text-global-highTitle text-opacity-65 smallTxt">{{data.desc}}</div>
    <div class="mt-4 flex items-center">
      <span class="text-kd14px18px text-global-highTitle text-opacity-45">Share</span>
      <v-router href="https://www.baidu.com" class="text-global-primary flex items-center">
        <IconFont class="share-item" type="icon-twitter"/>
        <IconFont class="share-item" type="icon-telegram"/>
        <IconFont class="share-item" type="icon-yuyan"/>
      </v-router>
    </div>
  </div>
</template>
<style scoped lang="scss">
.smallTxt{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.share-item{
  @apply ml-4 cursor-pointer;
}
</style>