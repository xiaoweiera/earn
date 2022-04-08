<script setup lang="ts">
/**
 * @file 邮箱注册
 * @author svon.me@gmail.com
 */
import { toLower } from "lodash";
import API from "src/api/index";
import I18n from "src/utils/i18n";
import { getParam } from "src/utils/router";
import { messageError } from "src/lib/tool";
import { computed, onMounted, ref, toRaw } from "vue";
import * as Common from "src/logic/account/register";
import { ValidateType } from "src/components/ui/validate/config";
import { ElButton, ElCheckbox, ElForm, ElFormItem, ElInput } from "element-plus";

const i18n = I18n();
const invitation = ref<boolean>(false); // 邀请状态
const domForm = ref<any>(null);

const rules = computed(Common.rules);

const formData = Common.createFormData();

const emailValidate = function () {
  return Common.checkValidateEmail(domForm);
};

// 获取验证码
const onSeadCode = async function (value: string | undefined) {
  // 保存人机校验得到的值
  formData.token = value;
};
const selfGoBack = function () {
  // 返回登录页面
  Common.onGoBack(domForm);
};

// 确定，表单提交
const submit = async function () {
  try {
    // 校验表单数据是否合法
    await Common.checkValidate(domForm);
  } catch (e) {
    return false;
  }

  try {
    const api = new API();
    // 获取表单数据
    const data: Common.FormData = toRaw(formData);
    // 提交表单数据
    await api.user.registerEmail(data);
    selfGoBack();
  } catch (e: any) {
    // 提升异常信息
    const { message } = e || {};
    if (message) {
      messageError(message);
    } else {
      messageError(i18n.apply.tips.error);
    }
  }
};

onMounted(() => {
  // 获取邀请码
  const value: string = getParam<string>("code");
  let platform: string = getParam<string>("platform");
  let type: string = getParam<string>("type");

  // 判断 utm_source 是否存在，并且不为 http 链接格式
  // https://kingdata.com/account/register?lang=cn&code=be8e&utm_source=ios_alert_1epU6gIu_user_id_2YZLkHEeydKeuxCJ
  // https://kingdata.com/account/register?lang=中英文&code=邀请码&platform=设备类型&type=活动类型
  /*
  const utm_source = getParam<string>("utm_source");
  if (utm_source && !/^https?/.test(utm_source)) {
    const array: string[] = utm_source.split("_");
    if (array.length >= 2) {
      if (!platform) {
        platform = array[0];
      }
      if (!type) {
        type = array[1];
      }
    } else {
      if (!type) {
        type = array[0];
      }
    }
  }
  */

  if (value) {
    invitation.value = true;
    formData.invitation_code = value;
  }
  // 注册终端类型
  if (platform) {
    // @ts-ignore
    formData.platform = toLower(type ? `${platform}!${type}` : platform);
  } else {
    // 默认等于Web
    formData.platform = toLower(type ? `${Common.PlatformWeb}!${type}` : Common.PlatformWeb);
  }
});
</script>

<template>
  <client-only>
    <el-form ref="domForm" size="large" :rules="rules" :model="formData" autocomplete="off" @submit.stop.prevent="submit">
      <!-- 邮箱地址 -->
      <el-form-item prop="email">
        <el-input v-model="formData.email" name="email" type="email" :placeholder="i18n.common.placeholder.email" autocomplete="off" />
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-input v-model="formData.code" name="code" :placeholder="i18n.common.placeholder.verification" autocomplete="off">
          <template #append>
            <ui-validate :type="ValidateType.create" :before="emailValidate" :query="{ email: formData.email }" @click="onSeadCode" />
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input v-model="formData.password" name="password" type="password" :placeholder="i18n.common.placeholder.password" show-password autocomplete="off" />
      </el-form-item>

      <!-- 邀请码 -->
      <el-form-item prop="invitation_code">
        <el-input v-model="formData.invitation_code" name="invitation_code" :placeholder="i18n.common.user.invite" autocomplete="off" :disabled="invitation" />
      </el-form-item>

      <!--推送-->
      <el-form-item style="margin-bottom: 10px">
        <el-checkbox v-model="formData.push" :true-label="true" :false-label="false">
          <span class="flex">
            <span class="block whitespace-pre-wrap">
              <span class="inline">{{ i18n.common.user.push }}</span>
            </span>
          </span>
        </el-checkbox>
      </el-form-item>

      <!-- 注册协议 -->
      <el-form-item prop="checked">
        <el-checkbox v-model="formData.checked" :true-label="true" :false-label="false">
          <div class="register-box flex flex-wrap">
            <span class="inline-block">{{ i18n.common.user.read }}</span>
            <v-router class="link inline-block" target="_blank" href="/policy">{{ i18n.common.user.agreement }}</v-router>
            <span class="defaultText inline-block">{{ i18n.common.and }}</span>
            <v-router class="link inline-block" target="_blank" href="/agreement">{{ i18n.common.user.terms }}</v-router>
            <v-router class="link inline-block" target="_blank" href="/instructions">{{ i18n.common.user.use }}</v-router>
          </div>
        </el-checkbox>
      </el-form-item>

      <!-- 确定按钮 -->
      <el-form-item style="margin-bottom: 0">
        <div class="w-full">
          <!--  :disabled="!toBoolean(formData.token)" -->
          <el-button class="w-full" type="primary" native-type="submit">
            <span class="text-16">{{ i18n.common.register }}</span>
          </el-button>
        </div>
      </el-form-item>
      <div>
        <slot>
          <!-- 返回登录 -->
          <div class="text-center pt-4.5 pb-2.5">
            <span class="inline-block" @click="selfGoBack">
              <a class="inline-block font-normal link cursor-pointer">{{ i18n.common.switchLogin }}</a>
            </span>
          </div>
        </slot>
      </div>
    </el-form>
  </client-only>
</template>
