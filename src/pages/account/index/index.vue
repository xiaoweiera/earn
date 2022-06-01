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
import { messageSuccess } from "src/lib/tool";
import { ref } from "vue";
import I18n from "src/utils/i18n";

const i18n = I18n();

const BindEmail = asyncLoad(() => import("src/pages/layout/user/email.vue"));
const UpdateName = asyncLoad(() => import("src/pages/account/update/name.vue"));
const UploadImg = asyncLoad(() => import("src/pages/account/update/upload.vue"));
const user = createReactive<User>(alias.common.user, {} as User);

// 修改密码
const passwordVisible = ref<boolean>(false);
// 修改邮箱
const emailVisible = ref<boolean>(false);
// 修改昵称
const nameVisible = ref<boolean>(false);

const encryptionMobile = (value: string | number): string => {
  const encryption = new Encryption(value as string);
  encryption.setReplace("*");
  return encryption.value();
};
// 获取昵称
const getUserName = (data: User): string => {
  return data.nickname || data.email;
};

const onCallback = (data: object) => {
  if (data) {
    messageSuccess(`${i18n.user.info.success}`);
  }
  // todo
};
</script>

<template>
  <div class="bg-global-bg-grey p-4">
    <div class="max-w-full w-150 mx-auto">
      <div class="shadow-base p-4 sm:flex sm:items-center sm:justify-between rounded-kd6px bg-global-white">
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
        <div class="flex items-center justify-around mt-4 md:mt-0">
          <div class="text-center">
            <span class="block text-18-24 font-m text-global-black-title">{{ user.left_days }}</span>
            <span class="block text-12-16 text-global-text-grey">{{ i18n.user.info.vip }}</span>
          </div>
          <div class="w-px h-6 bg-global-highTitle bg-opacity-10 mx-10"></div>
          <div class="text-center">
            <span class="block text-18-24 font-m text-global-black-title">{{ user.points }}</span>
            <span class="block text-12-16 text-global-text-grey">{{ i18n.user.info.balance }}</span>
          </div>
        </div>
      </div>
      <div class="mt-6">
        <p class="text-14-18 font-m text-global-black-title">{{ i18n.user.info.set }}</p>
        <!--头像-->
        <!--        <div class="flex items-center justify-between p-4 rounded-md bg-white mt-3">-->
        <!--          <div class="flex items-center">-->
        <!--            <h5 class="text-14-18 text-global-text-grey">{{ i18n.user.info.avatar }}</h5>-->
        <!--            <ui-image class="w-12 h-12 ml-6" :src="user.avatar_url" :rounded="true" />-->
        <!--          </div>-->
        <!--          <div class="cursor-pointer">-->
        <!--            <UploadImg>-->
        <!--              <span class="v-router text-global-darkblue text-14-18">{{ i18n.user.info.uploadAvatar }}</span>-->
        <!--            </UploadImg>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        &lt;!&ndash;昵称&ndash;&gt;-->
        <!--        <div class="p-4 rounded-md bg-white mt-3">-->
        <!--          <h5 class="text-14-18 text-global-text-grey">{{ i18n.user.info.nickname }}</h5>-->
        <!--          <div class="flex items-center justify-between mt-3">-->
        <!--            <h5 class="text-14-18 text-global-black-title">{{ getUserName(user) }}</h5>-->
        <!--            <div class="cursor-pointer" @click="nameVisible = true">-->
        <!--              <span class="v-router text-global-darkblue text-14-18">{{ i18n.user.info.edit }}</span>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--手机-->
        <div class="p-4 rounded-md bg-white mt-3">
          <h5 class="text-14-18 text-global-text-grey">{{ i18n.user.info.phone }}</h5>
          <div class="mt-3">
            <h5 v-if="user.mobile" class="text-14-18 text-global-black-title">{{ encryptionMobile(user.mobile) }}</h5>
            <h5 class="text-14-18 text-global-red">{{ i18n.user.info.noBind }}</h5>
          </div>
        </div>
        <!--邮箱-->
        <div class="p-4 rounded-md bg-white mt-3">
          <h5 class="text-14-18 text-global-text-grey">{{ i18n.user.info.email }}</h5>
          <div v-if="user.email" class="flex items-center justify-between mt-3">
            <h5 class="text-14-18 text-global-black-title">{{ user.email }}</h5>
            <div class="cursor-pointer whitespace-nowrap" @click="emailVisible = true">
              <span class="v-router text-global-darkblue text-14-18">{{ i18n.user.info.edit }}</span>
            </div>
          </div>
          <div v-else class="flex items-center justify-between mt-3">
            <h5 class="text-14-18 text-global-red">{{ i18n.user.info.noBind }}</h5>
            <BindEmail>
              <div class="cursor-pointer whitespace-nowrap">
                <span class="v-router text-global-darkblue text-14-18">{{ i18n.user.info.goBind }}</span>
              </div>
            </BindEmail>
          </div>
        </div>
        <!--密码-->
        <div class="p-4 rounded-md bg-white mt-3">
          <h5 class="text-14-18 text-global-text-grey">{{ i18n.user.info.password }}</h5>
          <div class="flex items-center justify-between mt-3">
            <h5 class="text-14-18 text-global-black-title">******</h5>
            <div class="cursor-pointer" @click="passwordVisible = true">
              <span class="v-router text-global-darkblue text-14-18">{{ i18n.user.info.edit }}</span>
            </div>
          </div>
        </div>
        <!--webhook-->
        <div class="p-4 rounded-md bg-white mt-3">
          <h5 class="text-14-18 text-global-text-grey">Webhook</h5>
          <div class="flex items-center justify-between mt-3">
            <h5 v-if="user.web_hook" class="text-14-18 text-global-black-title">
              <span>{{ i18n.user.info.alreadyBind }}</span>
              <span v-for="(item, index) in user.web_hook.telegram" :key="index" class="ml-2">{{ item.token }} {{ item > 1 ? "、" : "" }}</span>
            </h5>
            <h5 v-else class="text-14-18 text-global-red">{{ i18n.user.info.noBind }}</h5>
            <v-router class="block cursor-pointer whitespace-nowrap" :href="routerConfig.user.webHook()">
              <span class="v-router text-global-darkblue text-14-18">{{ i18n.user.info.goBind }}</span>
            </v-router>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改密码弹框 -->
    <div v-if="passwordVisible">
      <el-dialog v-model="passwordVisible" :append-to-body="true" custom-class="dialog-user-wrap">
        <template #title>
          <span class="text-16-22 font-m text-global-highTitle">{{ i18n.user.info.editPassword }}</span>
        </template>
        <div>
          <!--如果有邮箱，则使用邮箱进行修改密码-->
          <account-forget-email v-if="user.email" :email="user.email" :callback="onCallback" />
          <!--电话修改密码-->
          <account-forget-mobile v-else :mobile="user.mobile" :area-code="user.area_code" :callback="onCallback" />
        </div>
      </el-dialog>
    </div>
    <!-- 修改邮箱-->
    <div v-if="emailVisible">
      <el-dialog v-model="emailVisible" :append-to-body="true" custom-class="dialog-user-wrap">
        <template #title>
          <span class="text-16-22 font-m text-global-highTitle">{{ i18n.user.info.emailVerify }}</span>
        </template>
        <div>
          <!-- 切换邮箱 -->
          <account-update-email :callback="onCallback" />
        </div>
      </el-dialog>
    </div>
    <!-- 修改昵称 -->
    <div v-if="nameVisible">
      <el-dialog v-model="nameVisible" :append-to-body="true" custom-class="dialog-user-wrap">
        <template #title>
          <span class="text-16-22 font-m text-global-highTitle">{{ i18n.user.info.editName }}</span>
        </template>
        <div>
          <UpdateName />
        </div>
      </el-dialog>
    </div>
  </div>
</template>
