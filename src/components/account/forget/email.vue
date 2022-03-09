<script setup lang="ts">
/**
 * @file 邮箱密码找回
 * @author svon.me@gmail.com
 */
import API from "src/api/index";
import I18n from "src/utils/i18n";
import { computed, ref, toRaw } from "vue";
import { messageError } from "src/lib/tool";
import * as Common from "src/logic/account/register";
import { ValidateType } from "src/components/ui/validate/config";
import { ElButton, ElForm, ElFormItem, ElInput } from "element-plus";

const i18n = I18n();
const domForm = ref<any>(null);

const formData = Common.createFormData();

const rules = computed(Common.rules);

const emailValidate = function() {
  return Common.checkValidateEmail(domForm);
};

// 获取验证码
const onSeadCode = async function(value: string | undefined) {
  // 保存人机校验得到的值
  formData.token = value;
};

const selfGoBack = function() {
  // 返回登录页面
  Common.onGoBack(domForm);
};

// 确定，表单提交
const submit = async function() {
  try {
    await Common.checkValidate(domForm);
  } catch (e) {
    return false;
  }
  try {
    const api = new API();
    // 获取表单数据
    const data: Common.FormData = toRaw(formData);
    // 找回密码
    await api.user.resetEmailPassword(data);
    // 返回登录页面
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
</script>

<template>
  <client-only>
    <el-form ref="domForm" size="large" :rules="rules" :model="formData" autocomplete="off" @submit.stop.prevent="submit">
      <!-- 邮箱地址 -->
      <el-form-item prop="email">
        <el-input
          v-model="formData.email" name="email" type="email" :placeholder="i18n.common.placeholder.email"
          autocomplete="off"
        />
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-input
          v-model="formData.code" name="code" :placeholder="i18n.common.placeholder.verification"
          autocomplete="off"
        >
          <template #append>
            <ui-validate
              :type="ValidateType.forget" :before="emailValidate" :query="{'email': formData.email}"
              @click="onSeadCode"
            />
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="formData.password" name="password" type="password"
          :placeholder="i18n.common.placeholder.password" show-password autocomplete="off"
        />
      </el-form-item>

      <!-- 确认密码 -->
      <el-form-item prop="new_password" :rules="Common.checkedNewPassword(formData)">
        <el-input
          v-model="formData.new_password" name="password" type="password"
          :placeholder="i18n.common.placeholder.new_password" show-password autocomplete="off"
        />
      </el-form-item>

      <!-- 确定按钮 -->
      <el-form-item style="margin-bottom: 0;">
        <div class="w-full">
          <!--  :disabled="!toBoolean(formData.token)" -->
          <el-button class="w-full" type="primary" native-type="submit">
            <span class="text-16">{{ i18n.common.resetPassword }}</span>
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
