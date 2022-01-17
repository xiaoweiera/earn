<script setup lang="ts">
import I18n from "src/utils/i18n";
import * as env from "src/config/";
import Column from "./column.vue";
import { footers } from "src/config/footer";
</script>

<template>
  <div class="w-full wrap-footer-box is-web">
    <div class="wrap-footer">
      <div class="text-global-highTitle text-opacity-65">
        <ul class="lg:flex lg:justify-between">

          <li class="menu-list-box" v-for="(data, index) in footers" :key="index">
            <Column :data="data" :index="index"/>
          </li>

          <li class="menu-list-box">
            <div class="menu-label hidden lg:block">
              <span class="text-18">{{ I18n.common.nav.download }}</span>
            </div>
            <input class="menu-active hidden" id="footer-menu-download" type="checkbox" name="footer-menu-download">
            <label class="menu-label cursor-pointer block lg:hidden" for="footer-menu-download">
              <span class="select-none w-full flex justify-between items-center">
                <span class="text-base ">{{ I18n.common.nav.download }}</span>
<!--                <IconFont class="arrow" type="icon-arrow-down" size="16"/>-->
              </span>
            </label>
            <div class="pt-3 lg:pt-6 w-27 menu-content">
              <div class="menu-item">
<!--                <UiFooterHover :href="env.appDownload" :desc="I18n.menu.hover.app">-->
<!--                  <img class="block" src="https://res.kingdata.xyz/common/download_apple.jpg">-->
<!--                </UiFooterHover>-->
              </div>

              <div class="menu-item">
<!--                <UiFooterHover :href="env.appDownload" :desc="I18n.menu.hover.app">-->
<!--                  <img class="block" src="https://res.kingdata.xyz/common/download_android.jpg">-->
<!--                </UiFooterHover>-->
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="pt-0 lg:pt-8">
        <div class="pb-4 lg:pb-8 border-t border-solid border-global-highTitle border-opacity-6"></div>
      </div>

      <div class="lg:flex lg:items-end lg:justify-between text-global-highTitle text-opacity-65">
        <div>
          <v-router class="md:flex md:items-end" :href="env.dashboard">
            <div>
              <img class="min-w-28" src="/images/common/logo.svg">
            </div>
            <div class="md:ml-6">
              <span class="text-13">{{ I18n.menu.footer.desc }}</span>
            </div>
          </v-router>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap-footer-box {
  background-color: #F6F9FC;
  @apply pt-4 pb-8;
  @screen xl {
    @apply py-16;
  }
}
.wrap-footer {
  @apply max-w-300 px-4;
  @screen lg {
    @apply min-w-lg mx-auto;
  }
  @screen xl {
    @apply px-0;
  }


  .download {
    @apply h-2.5;
    $url: "https://res.kingdata.xyz/common/downloadfrom.png";
    background: url($url) no-repeat center / contain;
  }

  .menu-list-box {
    @apply mb-4;
  }
}
</style>

