<script setup lang="ts">
/**
 * @file 邮箱修改
 * @author svon.me@gmail.com
 */

import API from "src/api/index";
import I18n from "src/utils/i18n";
import { messageError } from "src/lib/tool";
import { computed, ref, toRaw } from "vue";
import * as Common from "src/logic/account/register";
import { ValidateType } from "src/components/ui/validate/config";
import { ElButton, ElCheckbox, ElForm, ElFormItem, ElInput } from "element-plus";

const i18n = I18n();
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
// 返回
const selfGoBack = function () {
  Common.onUpdateEmailCallback(domForm);
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
    // 提交数据
    const status = await api.user.updateEmail(data);
    if (status) {
      // 执行返回逻辑
      selfGoBack();
    }
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
        <el-input v-model="formData.email" name="email" type="email" :placeholder="i18n.common.placeholder.email" autocomplete="off" />
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-input v-model="formData.code" name="code" :placeholder="i18n.common.placeholder.verification" autocomplete="off">
          <template #append>
            <ui-validate :type="ValidateType.update" :before="emailValidate" :query="{ email: formData.email }" @click="onSeadCode" />
          </template>
        </el-input>
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

      <!-- 确定按钮 -->
      <el-form-item style="margin-bottom: 0">
        <div class="w-full">
          <el-button class="w-full" type="primary" native-type="submit">
            <span class="text-16">{{ i18n.common.button.confirm }}</span>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </client-only>
</template>
