<script lang="ts" setup>
/**
 * @file 右上角用户功能菜单
 * @author svon.me@gmail.com
 */
import type { PropType } from "vue";
import I18n from "src/utils/i18n";
import type { User } from "src/types/common/user";
import { isConnect } from "src/logic/common/wallet";
import { routerConfig } from "src/router/config";
import { asyncLoad } from "src/plugins/lazyload/";

defineProps({
  user: {
    required: true,
    type: Object as PropType<User>,
  },
});

const i18n = I18n();
const Email = asyncLoad(() => import("./email.vue"));
const Invite = asyncLoad(() => import("./invite.vue"));

// 获取昵称
const getUserName = function (data: User): string | number {
  return data.nickname || data.mobile || data.email;
};
</script>
<template>
  <div class="bg-global-white rounded-md">
    <div class="px-4 py-2 flex items-center cursor-pointer">
      <IconFont class="text-global-primary" size="20" type="icon-yonghu" />
      <span class="ml-2 text-14-18 text-global-grey inline-block">{{ getUserName(user) }}</span>
      <IconFont v-if="user.is_vip" class="ml-2" type="vip1" />
    </div>
    <div class="border-t border-solid border-gray-300">
      <v-router :href="routerConfig.user.account()" class="px-4 py-2 flex items-center cursor-pointer">
        <IconFont class="text-global-primary" size="20" type="icon-setting" />
        <span class="ml-2 text-14-18 flex whitespace-nowrap text-global-grey">{{ i18n.user.info.set }}</span>
      </v-router>
      <client-only>
        <Invite :code="user.my_invitation_code">
          <div class="px-4 py-2 flex items-center cursor-pointer">
            <IconFont class="text-global-primary" size="20" type="icon-users" />
            <span class="ml-2 text-14-18 flex whitespace-nowrap text-global-grey">{{ i18n.user.share.title }}</span>
          </div>
        </Invite>
      </client-only>
      <v-router :href="routerConfig.user.webHook()" class="px-4 py-2 flex items-center cursor-pointer">
        <IconFont class="text-global-primary" size="20" type="icon-jiqiren" />
        <span class="ml-2 text-14-18 flex whitespace-nowrap text-global-grey">Webhook</span>
      </v-router>
      <client-only v-if="!user.email" class="px-4 py-2 cursor-pointer">
        <!--绑定邮箱-->
        <Email>
          <div class="flex items-center">
            <IconFont class="text-global-primary" type="icon-email1" size="20" />
            <span class="ml-2 text-14-18 whitespace-nowrap text-global-grey">{{ i18n.common.account.email.bind2 }}</span>
            <IconFont class="ml-2" size="8" type="redTip" />
          </div>
        </Email>
      </client-only>
      <div v-if="isConnect()" class="py-1 text-global-grey">
        <client-only>
          <!--钱包地址-->
          <ui-wallet-portfolio class="px-4 py-1" />
        </client-only>
      </div>
      <v-router :href="routerConfig.user.logout()" class="px-4 py-2 flex items-center cursor-pointer">
        <IconFont class="text-global-primary" size="20" type="icon-tuichu" />
        <span class="ml-2 text-14-18 flex whitespace-nowrap text-global-grey">{{ i18n.nav.outLogin }}</span>
      </v-router>
    </div>
  </div>
</template>
