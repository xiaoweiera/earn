<script lang="ts" setup>
/**
 * @file 个人信息
 * @author svon.me@gmail.com
 */

import API from "src/api/index";
import { onMounted } from "vue";
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
import UserMenu from "./menu.vue";
import UserDialog from "./dialog.vue";

const WalletConnect = asyncLoad(() => import("src/components/ui/wallet/connect.vue"));

const env = getEnv();
const i18n = I18n();
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
  return onLoadReactive<User>(user, getUserData);
});
</script>

<template>
  <div>
    <div class="flex items-center text-white">
      <!--中英文切换-->
      <v-router class="flex items-center cursor-pointer" :href="url" :query="getLangValue()">
        <span class="inline-block whitespace-nowrap text-14-18">{{ i18n.common.lang }}</span>
      </v-router>

      <span class="mx-4 text-white text-opacity-65 hidden lg:inline-block">|</span>

      <ui-hover class="flex" trigger="hover">
        <template #label>
          <v-router :href="env.appDownload" class="hidden lg:flex" target="_blank">
            <span class="inline-block whitespace-nowrap text-14-18">APP</span>
          </v-router>
        </template>
        <template #content>
          <div class="p-3">
            <ui-qrcode width="136" height="136" :value="env.appDownload" />
          </div>
        </template>
      </ui-hover>

      <span class="mx-4 text-white text-opacity-65">|</span>

      <!-- 已登录 -->
      <ui-hover v-if="user && user.id" class="flex" placement="bottom-end" trigger="hover">
        <template #label>
          <IconFont class="flex cursor-pointer" size="22" type="icon-yonghu1" />
        </template>
        <template #content>
          <user-menu :user="user" />
        </template>
      </ui-hover>

      <!--未登录-->
      <div v-else>
        <div class="flex items-center">
          <span class="whitespace-nowrap cursor-pointer" @click.stop.prevent="showLogin">{{ i18n.common.login }}</span>
          <img :src="`${env.VITE_oss}/nav/dian.png`" alt="" class="w-0.5 h-0.5 ml-1 mr-1 Z hidden md:inline-block" />
          <span class="whitespace-nowrap cursor-pointer hidden md:inline-block" @click.stop.prevent="showRegister">{{ i18n.common.register }}</span>
        </div>
        <!--登录、注册、找回密码-->
        <user-dialog />
      </div>
      <!--钱包-->
      <div class="ml-4 hidden lg:block">
        <WalletConnect />
      </div>
    </div>
  </div>
</template>
