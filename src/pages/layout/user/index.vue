<script setup lang="ts">
/**
 * @file 个人信息
 * @author svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import {Language} from "src/types/language";
import {User} from "src/types/common/user";
import window from "src/plugins/browser/window";
import {createReactive} from "src/utils/ssr/ref";
import {createHref} from "src/plugins/router/pack";
import {config as routerConfig} from "src/router/config";
import {languageKey, appDownload, oss} from "src/config";

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

const getUserName = function (data: User): string | number {
  return data.nickname || data.username || data.email || data.mobile;
}

// 登录
const goLogin = function () {

}
// 注册
const goRegister = function () {

}

</script>

<template>
  <div class="flex items-center text-white">
  <span class="flex items-center cursor-pointer" @click.stop.prevent="onSwitch">
    <span class="inline-block whitespace-nowrap text-14-18">{{ i18n.common.lang }}</span>
  </span>
    <span class="mx-4 text-white text-opacity-65 hidden lg:inline-block">|</span>
    <v-router class="hidden lg:flex" :href="appDownload" target="_blank">
      <span class="inline-block whitespace-nowrap text-14-18">APP</span>
    </v-router>
    <span class="mx-4 text-white text-opacity-65">|</span>

    <!-- 已登录 -->
    <ui-hover v-if="user.id" class="flex" placement="bottom-end" trigger="hover">
      <template #label>
        <IconFont class="flex cursor-pointer" type="icon-yonghu1" size="22"/>
      </template>
      <template #content>
        <div class="bg-global-white rounded-md">
          <div class="p-4 flex items-center cursor-pointer">
            <IconFont type="icon-yonghu" size="20"/>
            <span class="ml-2 text-14-18 text-global-grey inline-block">{{ getUserName(user) }}</span>
            <IconFont class="ml-2" type="vip1"/>
          </div>
          <v-router class="p-4 flex items-center itemMt cursor-pointer border-t border-solid border-gray-300" :href="routerConfig.user.logout">
            <IconFont type="icon-tuichu" size="20"/>
            <span class="ml-2 text-14-18 flex whitespace-nowrap text-global-grey">{{ i18n.nav.outLogin }}</span>
          </v-router>
        </div>
      </template>
    </ui-hover>

    <!--未登录-->
    <div class="flex" v-else>
      <span class="whitespace-nowrap cursor-pointer" @click.stop.prevent="goLogin">{{ i18n.common.login }}</span>
      <img class="w-0.5 h-0.5 ml-1 mr-1 Z hidden md:inline-block" :src="`${oss}/nav/dian.png`" alt=""/>
      <span class="whitespace-nowrap cursor-pointer hidden md:inline-block"
            @click.stop.prevent="goRegister">{{ i18n.common.register }}</span>
    </div>
  </div>
</template>
