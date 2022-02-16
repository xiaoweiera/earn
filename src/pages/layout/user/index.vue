<script setup lang="ts">
/**
 * @file 个人信息
 * @author svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import { languageKey, appDownload, oss } from "src/config";
import {Language} from "src/types/language";
import { User } from "src/types/common/user";
import window from "src/plugins/browser/window";
import {createReactive} from "src/utils/ssr/ref";
import { createHref } from "src/plugins/router/pack";
import VRouter from "~/components/v/router.vue";
import {Pointer} from "@element-plus/icons";

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
  <div class="flex cursor-pointer user-box relative" v-if="user.id">
    <IconFont class="flex" type="icon-yonghu1" size="22"/>
    <div class="user-menu py-4.25 px-3 bg-global-white rounded-md absolute right-0 top-full transform translate-y-2.5">
      <div class="flex items-center cursor-pointer">
        <IconFont :type="`${oss}/nav/navUser.jpg`" size="20"/>
        <div class="text-14-18 ml-2 flex whitespace-nowrap text-global-grey">
          <template v-if="user.nickname">{{ user.nickname }}</template>
          <template v-else-if="user.username">{{ user.username }}</template>
          <template v-else-if="user.email">{{ user.email }}</template>
          <template v-else>{{ user.mobile }}</template>
        </div>
        <ui-image class="w-7.75 ml-2" fit="none" :src="`${oss}/nav/navVip.jpg`" alt=""/>
      </div>
      <v-router class="mt-2 flex items-center itemMt cursor-pointer" href="/user/logout">
        <IconFont :type="`${oss}/nav/navOut.jpg`" size="20"/>
        <span class="ml-2 text-14-18 flex whitespace-nowrap text-global-grey">{{ i18n.nav.outLogin }}</span>
      </v-router>
    </div>
  </div>
  <div class="flex" v-else>
    <span class="whitespace-nowrap cursor-pointer" @click.stop.prevent="goLogin">{{i18n.common.login }}</span>
    <img class="w-0.5 h-0.5 ml-1 mr-1 Z hidden md:inline-block" :src="`${oss}/nav/dian.png`" alt=""/>
    <span class="whitespace-nowrap cursor-pointer hidden md:inline-block" @click.stop.prevent="goRegister">{{i18n.common.register }}</span>
  </div>
</div>
</template>

<style scoped lang="scss">
.user-box {
  .user-menu {
    @apply hidden;
    box-shadow: inset 0px -1px 0px rgba(37, 62, 111, 0.06);
  }
  &:hover {
    .user-menu {
      @apply block;
    }
  }
}
</style>
