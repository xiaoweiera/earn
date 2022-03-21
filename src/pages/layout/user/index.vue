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
import { createHref } from "src/plugins/router/pack";
import { getEnv, languageKey } from "src/config";
import { showLogin, showRegister } from "src/logic/user/login";
import { set as setValue } from "src/utils/root/data";
import UserMenu from "./menu.vue";
import Dialog from "./dialog.vue";
import EmailTips from "./tips.vue";

const env = getEnv();
const i18n = I18n();
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

const reload = function (value: string) {
  window.location.href = value;
};

const onSwitch = function () {
  if (i18n.getLang() === Language.en) {
    const href = createHref(window.location.href, {
      [languageKey]: Language.cn,
    });
    reload(href);
  } else {
    const href = createHref(window.location.href, {
      [languageKey]: Language.en,
    });
    reload(href);
  }
};

onMounted(function () {
  return onLoadReactive<User>(user, getUserData);
});
</script>

<template>
  <client-only class="flex items-center text-white">
    <!--中英文切换-->
    <span class="flex items-center cursor-pointer" @click.stop.prevent="onSwitch">
      <span class="inline-block whitespace-nowrap text-14-18">{{ i18n.common.lang }}</span>
    </span>

    <span class="mx-4 text-white text-opacity-65 hidden lg:inline-block">|</span>

    <v-router :href="env.appDownload" class="hidden lg:flex" target="_blank">
      <span class="inline-block whitespace-nowrap text-14-18">APP</span>
    </v-router>

    <span class="mx-4 text-white text-opacity-65">|</span>

    <!-- 已登录 -->
    <div v-if="user && user.id">
      <ui-hover class="flex" placement="bottom-end" trigger="hover">
        <template #label>
          <div class="relative">
            <span class="flex">
              <IconFont class="cursor-pointer" size="22" type="icon-yonghu1" />
            </span>
            <span class="absolute bottom-0 right-0 leading-2 transform translate-x-1/5 translate-y-1/5">
              <IconFont size="8" type="redTip" />
            </span>
          </div>
        </template>
        <template #content>
          <user-menu :user="user" />
        </template>
      </ui-hover>
      <EmailTips class="absolute right-0 top-full" :user="user" />
    </div>

    <!--未登录-->
    <div v-else>
      <div class="flex items-center">
        <span class="whitespace-nowrap cursor-pointer" @click.stop.prevent="showLogin">{{ i18n.common.login }}</span>
        <img :src="`${env.VITE_oss}/nav/dian.png`" alt="" class="w-0.5 h-0.5 ml-1 mr-1 Z hidden md:inline-block" />
        <span class="whitespace-nowrap cursor-pointer hidden md:inline-block" @click.stop.prevent="showRegister">{{ i18n.common.register }}</span>
      </div>
      <!--登录、注册、找回密码-->
      <Dialog />
    </div>
    <!--钱包-->
    <div class="ml-4 hidden lg:block">
      <ui-wallet-connect />
    </div>
  </client-only>
</template>
