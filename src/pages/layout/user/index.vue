<script lang="ts" setup>
/**
 * @file 个人信息
 * @author svon.me@gmail.com
 */

import API from "src/api/index";
import { onMounted, watch } from "vue";
import I18n from "src/utils/i18n";
import { Language } from "src/types/language";
import type { User } from "src/types/common/user";
import window from "src/plugins/browser/window";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import { getEnv, languageKey } from "src/config";
import { showLogin, showRegister } from "src/logic/user/login";
import { set as setValue, getLang } from "src/utils/root/data";
import { createRef } from "src/utils/ssr/ref";
import { asyncLoad } from "src/plugins/lazyload/";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import UserMenu from "./menu.vue";
import UserDialog from "./dialog.vue";

const EmailTips = asyncLoad(() => import("./tips.vue"));
const WalletConnect = asyncLoad(() => import("src/components/ui/wallet/connect.vue"));

const env = getEnv();
const i18n = I18n();
const $route = useRoute();
const url = createRef<string>("url", window.location.href);
const user = createReactive<User>(alias.common.user, {} as User);

const getUserData = async function () {
  const api = new API();
  const data = await api.user.getInfo<User>();
  if (data) {
    setValue({
      [alias.common.user]: data,
    });
  }
  return data;
};

const getLangValue = function () {
  if (getLang() === Language.en) {
    return {
      [languageKey]: Language.cn,
    };
  }
  return {
    [languageKey]: Language.en,
  };
};

onMounted(function () {
  // 监听 url 变化
  watch($route, function (data: RouteLocationNormalizedLoaded) {
    url.value = data.fullPath;
  });
  return onLoadReactive<User>(user, getUserData);
});
</script>

<template>
  <div>
    <div class="flex items-center">
      <!--中英文切换-->
      <v-router :href="url" :query="getLangValue()" class="flex items-center cursor-pointer">
        <span class="text-white inline-block whitespace-nowrap text-14-18">{{ i18n.common.lang }}</span>
      </v-router>

      <span class="mx-4 text-white text-opacity-65 hidden lg:inline-block">|</span>

      <ui-hover popper-class="header-user" class="flex" trigger="hover">
        <template #label>
          <v-router :href="env.appDownload" class="hidden lg:flex" target="_blank">
            <span class="text-white inline-block whitespace-nowrap text-14-18">APP</span>
          </v-router>
        </template>
        <template #content>
          <div class="p-3">
            <ui-qrcode :value="env.appDownload" height="136" width="136" />
          </div>
        </template>
      </ui-hover>

      <span class="mx-4 text-white text-opacity-65">|</span>

      <!-- 已登录 -->
      <div v-if="user && user.id">
        <ui-hover popper-class="header-user" class="flex" placement="bottom-end" trigger="hover">
          <template #label>
            <div class="relative text-white">
              <span class="flex">
                <IconFont class="cursor-pointer" size="22" type="icon-yonghu1" />
              </span>
              <span v-if="!user.email" class="absolute bottom-0 right-0 leading-2 transform translate-x-1/5 translate-y-1/5">
                <IconFont size="8" type="redTip" />
              </span>
            </div>
          </template>
          <template #content>
            <UserMenu :user="user" />
          </template>
        </ui-hover>
        <EmailTips :user="user" class="absolute right-0 top-full" />
      </div>

      <!--未登录-->
      <div v-else>
        <div class="flex items-center text-white">
          <span class="whitespace-nowrap cursor-pointer" @click.stop.prevent="showLogin">{{ i18n.common.login }}</span>
          <img :src="`${env.VITE_oss}/nav/dian.png`" alt="" class="w-0.5 h-0.5 ml-1 mr-1 Z hidden md:inline-block" />
          <span class="whitespace-nowrap cursor-pointer hidden md:inline-block" @click.stop.prevent="showRegister">{{ i18n.common.register }}</span>
        </div>
        <!--登录、注册、找回密码-->
        <UserDialog />
      </div>
      <!--钱包-->
      <div class="ml-4 hidden lg:block">
        <WalletConnect />
      </div>
    </div>
  </div>
</template>
