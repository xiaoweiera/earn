<script lang="ts" setup>
/**
 * @file 底部-菜单
 * @author svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import { getEnv } from "src/config/";
import type { MenuItem } from "src/types/menu";
import { alias, createRef } from "src/utils/ssr/ref";
import Column from "./column.vue";
import Hover from "./hover.vue";

const env = getEnv();
const i18n = I18n();

const list = createRef<MenuItem[]>(alias.common.layout.footer, []);
</script>

<template>
  <div class="w-full wrap-footer-box is-web">
    <div class="wrap-footer">
      <div class="text-global-highTitle text-opacity-65">
        <ul class="lg:flex lg:justify-between">
          <li v-for="(data, index) in list" :key="index" class="menu-list-box">
            <Column :data="data" :index="index" />
          </li>

          <li class="menu-list-box">
            <div class="menu-label hidden lg:block">
              <span class="text-18">{{ i18n.common.nav.download }}</span>
            </div>
            <label class="menu-label cursor-pointer block lg:hidden">
              <span class="select-none w-full flex justify-between items-center">
                <span class="text-base">{{ i18n.common.nav.download }}</span>
              </span>
            </label>
            <div class="pt-3 lg:pt-6 w-27 menu-content">
              <div class="mb-4">
                <Hover :desc="i18n.menu.hover.app" :href="env.appDownload">
                  <ui-image class="block" fit="none" :src="`${env.VITE_oss}/common/download_apple.jpg`" />
                </Hover>
              </div>

              <div>
                <Hover :desc="i18n.menu.hover.app" :href="env.appDownload">
                  <ui-image class="block" fit="none" :src="`${env.VITE_oss}/common/download_android.jpg`" />
                </Hover>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="pt-0 lg:pt-8">
        <div class="pb-4 lg:pb-8 border-t border-solid border-global-highTitle border-opacity-6" />
      </div>

      <div class="lg:flex lg:items-end lg:justify-between text-global-highTitle text-opacity-65">
        <div>
          <v-router :href="env.dashboard" class="md:flex md:items-end">
            <div class="w-28">
              <ui-image src="/images/common/logo.svg" />
            </div>
            <div class="md:ml-6">
              <span class="text-13">{{ i18n.menu.footer.desc }}</span>
            </div>
          </v-router>
        </div>
        <div class="flex items-center mt-5 lg:mt-0">
          <v-router :href="i18n.chat.medium" class="flex" target="_blank">
            <IconFont class="flex text-global-primary" type="medium" />
          </v-router>

          <v-router :href="i18n.chat.discord" class="flex ml-6" target="_blank">
            <IconFont class="flex text-global-primary" type="discord" />
          </v-router>

          <div class="flex ml-6">
            <Hover :desc="i18n.menu.hover.telegram" :href="i18n.chat.telegram">
              <IconFont class="flex text-global-primary" type="icon-telegram" />
            </Hover>
          </div>

          <v-router :href="i18n.chat.twitter" class="flex ml-6" target="_blank">
            <IconFont class="flex text-global-primary" type="icon-twitter" />
          </v-router>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap-footer-box {
  background-color: #f6f9fc;
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
