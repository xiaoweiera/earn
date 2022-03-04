<script lang="ts" setup>
import I18n from "src/utils/i18n";
import {detail} from "src/types/home";
import {PropType, onMounted, ref} from "vue";
import {copyTxtMessage} from "src/lib/tool";
import window from "src/plugins/browser/window";
import { config as routerConfig } from "src/router/config";

const i18n = I18n();
defineProps({
  data: {
    type: Object as PropType<detail>
  }
});

const twitterShare = ref<string>(`https://twitter.com/share`);
const telegramShare = ref<string>(`https://t.me/share/url`);
const copyUrl = function () {
  copyTxtMessage(window.location.href, i18n.common.message.copyAlert);
}

onMounted(function () {
  twitterShare.value = `https://twitter.com/share?url=${window.location.href}`;
  telegramShare.value = `https://t.me/share/url?url=${window.location.href}`;
});

</script>
<template>
  <div>
    <div class="flex items-end justify-between flex-wrap w-full md:py-2.5">
      <div class="md:flex items-center flex-wrap break-all md:mr-6">
        <span
            class="text-kd32px32px whitespace-pre-line md:text-kd40px40px font-kdSemiBold text-global-highTitle text-opacity-85 font-semibold">{{ data.name }}</span>
      </div>
      <v-router class="min-w-25 h-8  bg-global-primary rounded-kd6px flex items-center justify-center cursor-pointer"
                :href="routerConfig.dappApply"
                target="_blank">
        <IconFont class="text-global-white" size="16" type="icon-updata"/>
        <span class="text-kd14px18px text-global-white font-medium ml-1">{{ i18n.home.projectApply }}</span>
      </v-router>
    </div>
    <div class="mt-4  w-full text-kd13px18px md:text-kd14px20px font-medium text-global-highTitle text-opacity-65">
      {{ data.desc }}
    </div>
    <div class="mt-4 flex items-center">
      <span class="text-kd14px18px text-global-highTitle text-opacity-45">{{ i18n.home.share }}</span>
      <a :href="twitterShare" class="text-global-primary flex items-center" target="_blank">
        <IconFont class="share-item" type="icon-twitter"/>
      </a>
      <a :href="telegramShare" class="text-global-primary flex items-center" target="_blank">
        <IconFont class="share-item" type="icon-telegram"/>
      </a>
      <div class="text-global-primary flex items-center" @click="copyUrl()">
        <IconFont class="share-item" type="icon-link"/>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.smallTxt {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.share-item {
  @apply ml-4 cursor-pointer;
}
</style>
