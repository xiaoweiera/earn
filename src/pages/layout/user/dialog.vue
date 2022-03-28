<script lang="ts" setup>
/**
 * @file 控制登录/注册弹窗
 * @author svon.me@gmail.com
 */

import I18n from "src/utils/i18n";
import { getEnv } from "src/config/";
import { asyncLoad } from "src/plugins/lazyload/";
import { ElDialog, ElTabPane, ElTabs } from "element-plus";
import { FlagStatus, emailForget, mobileForget, showLogin, showRegister, switchStatus, visible } from "src/logic/user/login";

const i18n = I18n();
const env = getEnv();

// 邮箱登录
const LoginEmail = asyncLoad(() => import("src/components/account/login/email.vue"));
// 手机登录
const LoginMobile = asyncLoad(() => import("src/components/account/login/mobile.vue"));
// 邮箱找回
const ForgetEmail = asyncLoad(() => import("src/components/account/forget/email.vue"));
// 手机找回
const ForgetMobile = asyncLoad(() => import("src/components/account/forget/mobile.vue"));
// 邮箱注册
const Register = asyncLoad(() => import("src/components/account/register.vue"));
</script>

<template>
  <el-dialog v-model="visible" :append-to-body="true" custom-class="dialog-user-wrap">
    <div>
      <div class="text-center mb-6">
        <div class="inline-block w-37.5">
          <ui-image :src="`${env.VITE_oss}/nav/logoJpg.png`" fit="none" />
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
            <login-email>
              <div class="flex items-center justify-between pt-4.5 pb-2.5 font-14-18">
                <a class="link" @click="showRegister">
                  <span>{{ i18n.common.switchRegister }}</span>
                </a>
                <a class="link" @click="emailForget">
                  <span>{{ i18n.common.switchRorget }}</span>
                </a>
              </div>
            </login-email>
          </el-tab-pane>
          <!--手机号登录-->
          <el-tab-pane :name="FlagStatus.mobileLogin">
            <template #label>
              <span class="text-16-20">{{ i18n.common.phone }}</span>
            </template>
            <login-mobile>
              <div class="flex items-center justify-between pt-4.5 pb-2.5 font-14-18">
                <a class="link" @click="showRegister">
                  <span>{{ i18n.common.switchRegister }}</span>
                </a>
                <a class="link" @click="mobileForget">
                  <span>{{ i18n.common.switchRorget }}</span>
                </a>
              </div>
            </login-mobile>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--找回密码-->
      <div v-else-if="switchStatus === FlagStatus.emailForget">
        <forget-email>
          <div class="text-center pt-4.5 pb-2.5 font-14-18">
            <a class="link" @click="showLogin">
              <span>{{ i18n.common.switchLogin }}</span>
            </a>
          </div>
        </forget-email>
      </div>
      <div v-else-if="switchStatus === FlagStatus.mobileForget">
        <forget-mobile>
          <div class="text-center pt-4.5 pb-2.5 font-14-18">
            <a class="link" @click="showLogin">
              <span>{{ i18n.common.switchLogin }}</span>
            </a>
          </div>
        </forget-mobile>
      </div>
      <!--注册-->
      <div v-else>
        <register>
          <div class="text-center pt-4.5 pb-2.5 font-14-18">
            <a class="link" @click="showLogin">
              <span>{{ i18n.common.switchLogin }}</span>
            </a>
          </div>
        </register>
      </div>
    </div>
  </el-dialog>
</template>
