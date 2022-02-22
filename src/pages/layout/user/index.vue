<script setup lang="ts">
/**
 * @file 个人信息
 * @author svon.me@gmail.com
 */

import I18n from "src/utils/i18n";
import Dialog from "./dialog.vue";
import UserMenu from "./menu.vue";
import {Language} from "src/types/language";
import {User} from "src/types/common/user";
import window from "src/plugins/browser/window";
import {createReactive} from "src/utils/ssr/ref";
import {createHref} from "src/plugins/router/pack";
import {languageKey, oss, getEnv} from "src/config";
import {showLogin, showRegister} from "src/logic/user/login";

const env = getEnv();
const i18n = I18n();
const user = createReactive<User>("common.user", {} as User);

const reload = function (value: string) {
  window.location.href = value;
}

const onSwitch = function () {
  if (i18n.getLang() === Language.en) {
    const href = createHref(window.location.href, {
      [languageKey]: Language.cn
    });
    reload(href);
  } else {
    const href = createHref(window.location.href, {
      [languageKey]: Language.en
    });
    reload(href);
  }
}
</script>

<template>
  <div class="flex items-center text-white">
  <span class="flex items-center cursor-pointer" @click.stop.prevent="onSwitch">
    <span class="inline-block whitespace-nowrap text-14-18">{{ i18n.common.lang }}</span>
  </span>
    <span class="mx-4 text-white text-opacity-65 hidden lg:inline-block">|</span>
    <v-router class="hidden lg:flex" :href="env.appDownload" target="_blank">
      <span class="inline-block whitespace-nowrap text-14-18">APP</span>
    </v-router>
    <span class="mx-4 text-white text-opacity-65">|</span>

    <!-- 已登录 -->
    <ui-hover v-if="user.id" class="flex" placement="bottom-end" trigger="hover">
      <template #label>
        <IconFont class="flex cursor-pointer" type="icon-yonghu1" size="22"/>
      </template>
      <template #content>
        <user-menu :user="user"/>
      </template>
    </ui-hover>

    <!--未登录-->
    <div v-else>
      <div class="flex items-center">
        <span class="whitespace-nowrap cursor-pointer" @click.stop.prevent="showLogin">{{ i18n.common.login }}</span>
        <img class="w-0.5 h-0.5 ml-1 mr-1 Z hidden md:inline-block" :src="`${oss}/nav/dian.png`" alt=""/>
        <span class="whitespace-nowrap cursor-pointer hidden md:inline-block"
              @click.stop.prevent="showRegister">{{ i18n.common.register }}</span>
      </div>
      <!--登录、注册、找回密码-->
      <client-only>
        <Dialog/>
      </client-only>
    </div>
  </div>
</template>
