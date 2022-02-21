<script setup lang="ts">
/**
 * @file 控制登录/注册弹窗
 * @author svon.me@gmail.com
 */

import I18n from "src/utils/i18n";
import {onMounted, computed} from "vue";
import {getEnv} from "src/config/"
import {ElDialog, ElTabs, ElTabPane} from "element-plus";
import {
  visible,
  FlagStatus,
  showLogin,
  switchStatus,
  showRegister,
  emailForget,
  mobileForget
} from "src/logic/user/login";

const i18n = I18n();
const env = getEnv();

const tabValue = computed(function () {
  return FlagStatus;
})

const handleClose = function (next: () => void) {
  return next();
};

onMounted(function () {
  showLogin();
});

</script>

<template>
  <el-dialog v-model="visible" custom-class="dialog-user-wrap" :append-to-body="true" :before-close="handleClose">
    <div>
      <div class="text-center mb-6">
        <div class="inline-block w-37.5">
          <ui-image fit="none" :src="`${env.VITE_oss}/nav/logoJpg.png`"/>
        </div>
      </div>
      <!--登录-->
      <div v-if="switchStatus === FlagStatus.emailLogin || switchStatus === FlagStatus.mobileLogin">
        <el-tabs v-model="switchStatus" class="demo-tabs">
          <!--邮箱登录-->
          <el-tab-pane :name="FlagStatus.emailLogin">
            <template #label>
              <span class="text-16-20">{{ i18n.common.email }}</span>
            </template>
            <account-login-email>
              <div class="flex items-center justify-between pt-4.5 pb-2.5 font-14-18">
                <a class="link" @click="showRegister">
                  <span>{{ i18n.common.switchRegister }}</span>
                </a>
                <a class="link" @click="emailForget">
                  <span>{{ i18n.common.switchRorget }}</span>
                </a>
              </div>
            </account-login-email>
          </el-tab-pane>
          <!--手机号登录-->
          <el-tab-pane :name="FlagStatus.mobileLogin">
            <template #label>
              <span class="text-16-20">{{ i18n.common.phone }}</span>
            </template>
            <account-login-mobile>
              <div class="flex items-center justify-between pt-4.5 pb-2.5 font-14-18">
                <a class="link" @click="showRegister">
                  <span>{{ i18n.common.switchRegister }}</span>
                </a>
                <a class="link" @click="mobileForget">
                  <span>{{ i18n.common.switchRorget }}</span>
                </a>
              </div>
            </account-login-mobile>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--找回密码-->
      <div v-else-if="switchStatus === FlagStatus.emailForget || switchStatus === FlagStatus.mobileForget">
        <account-forget>
          <div class="text-center pt-4.5 pb-2.5 font-14-18">
            <a class="link" @click="showLogin">
              <span>{{ i18n.common.switchLogin }}</span>
            </a>
          </div>
        </account-forget>
      </div>
      <!--注册-->
      <div v-else>
        <account-register>
          <div class="text-center pt-4.5 pb-2.5 font-14-18">
            <a class="link" @click="showLogin">
              <span>{{ i18n.common.switchLogin }}</span>
            </a>
          </div>
        </account-register>
      </div>
    </div>
  </el-dialog>
</template>

