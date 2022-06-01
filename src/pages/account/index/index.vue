<script setup lang="ts">
/**
 * @file 个人设置
 */
import type { User } from "src/types/common/user";
import { alias, createReactive } from "src/utils/ssr/ref";
import { routerConfig } from "src/router/config";
import { asyncLoad } from "src/plugins/lazyload/";
import { Encryption } from "src/utils/";
import { ElDialog } from "element-plus";
import { ref } from "vue";

const BindEmail = asyncLoad(() => import("src/pages/layout/user/email.vue"));
const user = createReactive<User>(alias.common.user, {} as User);

const passwordVisible = ref<boolean>(false);

const encryptionMobile = (value: string | number): string => {
  const encryption = new Encryption(value as string);
  encryption.setReplace("*");
  return encryption.value();
};
// 获取昵称
const getUserName = (data: User): string => {
  return data.nickname || data.email;
};
</script>

<template>
  <div class="bg-global-bg-grey p-4">
    <div class="max-w-full w-150 mx-auto">
      <div class="shadow-base p-4 sm:flex sm:items-center sm:justify-between">
        <div class="flex items-center justify-center">
          <div class="flex">
            <ui-image class="w-12 h-12" :src="user.avatar_url" :rounded="true" />
          </div>
          <div class="ml-3">
            <div class="flex items-center">
              <span class="text-16-22 font-m text-global-black-title">{{ getUserName(user) }}</span>
              <icon-vip class="ml-1.5" :type="user.vip_level"></icon-vip>
            </div>
            <p class="mt-0.5 text-global-text-grey text-14-18">ID: {{ user.username }}</p>
          </div>
        </div>
        <div class="flex items-center justify-center mt-4 md:mt-0">
          <div class="text-center">
            <span class="block text-18-24 font-m text-global-black-title">{{ user.left_days }}</span>
            <span class="block text-12-16 text-global-text-grey">VIP剩余天数</span>
          </div>
          <div class="w-px h-6 bg-global-highTitle bg-opacity-10 mx-10"></div>
          <div class="text-center">
            <span class="block text-18-24 font-m text-global-black-title">{{ user.follow_posts_count }}</span>
            <span class="block text-12-16 text-global-text-grey">金币余额</span>
          </div>
        </div>
      </div>
      <div class="mt-6">
        <p class="text-14-18 font-m text-global-black-title">个人设置</p>
        <!--头像-->
        <div class="flex items-center justify-between p-4 rounded-md bg-white mt-3">
          <div class="flex items-center">
            <h5 class="text-14-18 text-global-text-grey">头像</h5>
            <ui-image class="w-12 h-12 ml-6" :src="user.avatar_url" :rounded="true" />
          </div>
          <div class="cursor-pointer">
            <span class="v-router text-global-darkblue text-14-18">上传头像</span>
          </div>
        </div>
        <!--昵称-->
        <div class="p-4 rounded-md bg-white mt-3">
          <h5 class="text-14-18 text-global-text-grey">昵称</h5>
          <div class="flex items-center justify-between mt-3">
            <h5 class="text-14-18 text-global-black-title">{{ getUserName(user) }}</h5>
            <div class="cursor-pointer">
              <span class="v-router text-global-darkblue text-14-18">修改</span>
            </div>
          </div>
        </div>
        <!--手机-->
        <div v-if="user.mobile" class="p-4 rounded-md bg-white mt-3">
          <h5 class="text-14-18 text-global-text-grey">手机</h5>
          <div class="mt-3">
            <h5 class="text-14-18 text-global-black-title">{{ encryptionMobile(user.mobile) }}</h5>
          </div>
        </div>
        <!--邮箱-->
        <div class="p-4 rounded-md bg-white mt-3">
          <h5 class="text-14-18 text-global-text-grey">邮箱</h5>
          <div v-if="user.email" class="flex items-center justify-between mt-3">
            <h5 class="text-14-18 text-global-black-title">{{ user.email }}</h5>
            <div class="cursor-pointer whitespace-nowrap">
              <span class="v-router text-global-darkblue text-14-18">修改</span>
            </div>
          </div>
          <div v-else class="flex items-center justify-between mt-3">
            <h5 class="text-14-18 text-global-black-title">未绑定</h5>
            <BindEmail>
              <div class="cursor-pointer whitespace-nowrap">
                <span class="v-router text-global-darkblue text-14-18">去绑定</span>
              </div>
            </BindEmail>
          </div>
        </div>
        <!--密码-->
        <div class="p-4 rounded-md bg-white mt-3">
          <h5 class="text-14-18 text-global-text-grey">密码</h5>
          <div class="flex items-center justify-between mt-3">
            <h5 class="text-14-18 text-global-black-title">******</h5>
            <div class="cursor-pointer" @click="passwordVisible = true">
              <span class="v-router text-global-darkblue text-14-18">修改</span>
            </div>
          </div>
        </div>
        <!--webhook-->
        <div class="p-4 rounded-md bg-white mt-3">
          <h5 class="text-14-18 text-global-text-grey">Webhook</h5>
          <div class="flex items-center justify-between mt-3">
            <h5 class="text-14-18 text-global-black-title">已绑定 Telegram、Medium已绑定 Telegram、Medium</h5>
            <v-router class="block cursor-pointer whitespace-nowrap" :href="routerConfig.user.webHook()">
              <span class="v-router text-global-darkblue text-14-18">去绑定</span>
            </v-router>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="passwordVisible" :append-to-body="true" custom-class="dialog-user-wrap">
      <template #title>
        <span class="text-16-22 font-m text-global-highTitle">修改密码</span>
      </template>
      <div>
        <!--如果有邮箱，则使用邮箱进行修改密码-->
        <account-forget-email v-if="user.email" :email="user.email">
          <div></div>
        </account-forget-email>
        <!--否则使用电话找回-->
        <account-forget-mobile v-else :mobile="user.mobile" :area-code="user.area_code">
          <div></div>
        </account-forget-mobile>
      </div>
    </el-dialog>
  </div>
</template>
