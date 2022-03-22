<script setup lang="ts">
import {onMounted, ref} from "vue";
import {copyTxtMessage} from "src/lib/tool";
import window from "src/plugins/browser/window";
import I18n from "src/utils/i18n";
const i18n = I18n();
const twitterShare = ref<string>("https://twitter.com/share");
const telegramShare = ref<string>("https://t.me/share/url");
const copyUrl = ()=>copyTxtMessage(window.location.href, i18n.common.message.copyAlert)

onMounted(() => {
  twitterShare.value = `https://twitter.com/share?url=${window.location.href}`;
  telegramShare.value = `https://t.me/share/url?url=${window.location.href}`;
});
</script>
<template>
  <div class="card">
    <div class="text-center">
      <ui-image class="md:w-30 md:h-30 w-20 h-20 w-full rounded-full mx-auto" src=""/>
      <p class="name font-kdSemiBold">Drunk Robots</p>
      <div class="flex items-center justify-center w-full mt-3">
        <a :href="twitterShare" class="icon-url" target="_blank">
          <IconFont type="icon-twitter" size="24" />
        </a>
        <a :href="telegramShare" class="icon-url" target="_blank">
          <IconFont type="icon-telegram" size="24" />
        </a>
        <div class="icon-url hand" @click="copyUrl()">
          <IconFont type="icon-link" size="24" />
        </div>
      </div>
      <p class="des text-number">Drunk Robots has received investments from 4 investors. Their most recent funding round was on March 10, 2022, when they have raised 50.0K.</p>
      <div class="mt-4 md:mt-6">
        <div class="flex items-center">
          <div class="card-des">
            <p class="title">成立年份</p>
            <p class="mount font-kdSemiBold">2014</p>
          </div>
          <div class="card-des">
            <p class="title">最后投资</p>
            <p class="mount font-kdSemiBold">12</p>
          </div>
        </div>
        <div class="flex items-center mt-3">
          <div class="card-des">
            <p class="title">组合投资公司数</p>
            <p class="mount font-kdSemiBold">12</p>
          </div>
          <div class="card-des">
            <p class="title">投资数量</p>
            <p class="mount font-kdSemiBold">24</p>
          </div>
        </div>
      </div>
      <div class="gang my-4 md:my-6"></div>
      <div>
        <p class="share">分享此页面</p>
        <div class="mt-3 flex items-center justify-center">
          <a :href="twitterShare" class="share-url" target="_blank">
            <IconFont type="icon-twitter" size="16" />
          </a>
          <a :href="telegramShare" class="share-url" target="_blank">
            <IconFont type="icon-telegram" size="16" />
          </a>
          <div class="share-url hand" @click="copyUrl()">
            <IconFont type="icon-link" size="16" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card{
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.1);
  background: white;
  @apply p-4 md:p-6 rounded-kd12px;
}
.name{
  @apply mt-3 text-kd32px32px font-semibold text-global-highTitle;
}
.icon-url{
  @apply text-global-primary;
}
.icon-url:not(:first-child){
  @apply ml-4;
}
.des{
  @apply text-kd14px20px text-global-highTitle text-opacity-85 font-medium text-left;
}
.card-des{
  border: 1px solid rgba(3, 54, 102, 0.06);
  @apply bg-global-white w-1/2 md:w-43 h-17 rounded-kd12px overflow-hidden;
}
.card-des:nth-child(even){
  @apply border-1 ml-3;
}
.title{
  @apply flex items-center justify-center h-8.5 text-kd14px18px text-global-highTitle text-opacity-65 font-kdFang;
}
.mount{
  @apply flex items-center justify-center h-8.5 text-kd18px18px text-global-white bg-global-primary font-medium;
}
.gang{
  border: 1px solid rgba(3, 54, 102, 0.06);
}
.share{
  @apply text-kd14px18px text-global-highTitle text-opacity-65 font-kdFang;
}
.share-url{
  border: 1px solid rgba(0, 111, 247, 0.12);
  @apply text-global-primary w-10 h-10 flex items-center justify-center rounded-full;
}
.share-url:not(:first-child){
  @apply ml-8;
}
</style>