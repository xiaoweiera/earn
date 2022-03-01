<script setup lang="ts">
import {PropType} from "vue";
import {detail} from "src/types/home";
import window from "src/plugins/browser/window";
import I18n from "src/utils/i18n";
import {copyTxtMessage} from "src/lib/tool";

const i18n = I18n();
const props=defineProps({
  data: Object as PropType<detail>
})
const getTwitter=`https://twitter.com/share?url=${window.location.href}`
const getTelegram =`https://t.me/share/url?url=${window.location.href}`;
const copyUrl=()=>copyTxtMessage(window?.location?.href,i18n.common.message.copyAlert)
</script>
<template>
  <div>
    <div class="flex items-end w-full md:py-2.5 ">
      <span class="text-kd32px32px md:text-kd36px36px font-kdSemiBold text-global-primary font-bold ">#</span>
      <span class="text-kd32px32px md:text-kd40px40px font-kdSemiBold ml-2 text-global-highTitle text-opacity-85 font-semibold">{{data.name}}</span>
      <v-router href="https://kingdata.com/dapp/apply" target="_blank" class="w-25 h-8 ml-6 bg-global-primary rounded-kd6px flex items-center justify-center cursor-pointer">
        <IconFont class="text-global-white" size="16" type="icon-updata"/>
        <span class="text-kd14px18px text-global-white font-medium ml-1">{{i18n.home.projectApply}}</span>
      </v-router>
    </div>
    <div class="mt-4  w-full text-kd13px18px md:text-kd14px20px font-medium text-global-highTitle text-opacity-65">{{data.desc}}</div>
    <div class="mt-4 flex items-center">
      <span class="text-kd14px18px text-global-highTitle text-opacity-45">{{i18n.home.share}}</span>
      <v-router :href="getTwitter" target="_blank"  class="text-global-primary flex items-center">
        <IconFont class="share-item" type="icon-twitter"/>
      </v-router>
      <v-router :href="getTelegram" target="_blank"  class="text-global-primary flex items-center">
        <IconFont class="share-item" type="icon-telegram"/>
      </v-router>
      <div @click="copyUrl()" class="text-global-primary flex items-center">
        <IconFont class="share-item" type="icon-link"/>
      </div>
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
