<script lang="ts" setup>
/**
 * @file 下载 App
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import {getEnv} from "src/config/";
import { UA } from "src/types/common/ua";
import window from "src/plugins/browser/window";
import ClientOnly from "~/components/client/only.vue";

const i18n = I18n();
const env = getEnv();

const getUA = function () {
  try {
    if (window.navigator.userAgent && window.UserAgent) {
      const userAgent = new window.UserAgent();
      return userAgent.parse(window.navigator.userAgent) as UA;
    }
  } catch (e) {
    // todo
  }
  return {} as UA;
}


const onClick = function (e: Event) {
  const ua =  getUA();
  if (ua.isAndroid) {
    // 屏蔽浏览器默认行为
    e.stopPropagation();
    e.preventDefault();

    window.location.href = "kingdata://higgses.king/main?pid=1";

    setTimeout(() => {
      window.location.href = env.appDownload;
    }, 2000);
    return false;
  }
  return true;
}
</script>

<template>
  <client-only class="download-app is-web">
    <div class="md:hidden">
      <div class="download-wrap">
        <v-router :href="env.appDownload"
                  class="flex items-center py-1.5 px-4 text-white cursor-pointer whitespace-nowrap"
                  target="_blank" @click="onClick">
          <IconFont class="mr-1" size="24" type="icon-shouji"/>
          <span class="text-14-18">{{ i18n.common.nav.download }}</span>
        </v-router>
      </div>
    </div>
  </client-only>
</template>

<style lang="scss" scoped>
.download-app {
  .download-wrap {
    border-radius: 34px;
    @apply bg-global-darkblue;
    @apply fixed left-1/2 bottom-6 transform -translate-x-1/2 z-10010;
  }

  @at-root .layout #ui-header-mobile:checked ~ & {
    @apply hidden;
  }
}
</style>
