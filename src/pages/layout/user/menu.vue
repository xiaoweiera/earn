<script lang="ts" setup>
/**
 * @file 右上角用户功能菜单
 * @author svon.me@gmail.com
 */
import {PropType} from "vue";
import I18n from "src/utils/i18n";
import {User} from "src/types/common/user";
import {config as routerConfig} from "src/router/config";

defineProps({
  user: {
    required: true,
    type: Object as PropType<User>
  }
});

const i18n = I18n();

// 获取昵称
const getUserName = function (data: User): string | number {
  return data.nickname || data.username || data.email || data.mobile;
}
</script>
<template>
  <div class="bg-global-white rounded-md">
    <div class="p-4 flex items-center cursor-pointer">
      <IconFont size="20" type="icon-yonghu"/>
      <span class="ml-2 text-14-18 text-global-grey inline-block">{{ getUserName(user) }}</span>
      <IconFont class="ml-2" type="vip1"/>
    </div>
    <div class="border-t border-solid border-gray-300">
      <client-only>
      </client-only>
      <div>
        <v-router :href="routerConfig.user.logout" class="p-4 flex items-center itemMt cursor-pointer">
          <IconFont size="20" type="icon-tuichu"/>
          <span class="ml-2 text-14-18 flex whitespace-nowrap text-global-grey">{{ i18n.nav.outLogin }}</span>
        </v-router>
      </div>
    </div>
  </div>
</template>
