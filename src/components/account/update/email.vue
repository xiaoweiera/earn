<script lang="ts" setup>
/**
 * @file 邮箱修改
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import { ElButton, ElCheckbox, ElForm, ElFormItem, ElInput } from "element-plus";
import API from "src/api/index";
import { ValidateType } from "src/components/ui/validate/config";
import { messageError } from "src/lib/tool";
import * as Common from "src/logic/account/register";
import I18n from "src/utils/i18n";
import { computed, ref, toRaw } from "vue";

const i18n = I18n();
const domForm = ref<any>(null);

const rules = computed(Common.rules);

const formData = Common.createFormData();

const emailValidate = function () {
  return Common.checkValidateEmail(domForm);
};

// 获取验证码
const onSeadCode = function (data: object) {
  // 保存人机校验得到的值
  formData.token = safeGet<string>(data, "token") || "";
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
    <el-form ref="domForm" :model="formData" :rules="rules" autocomplete="off" size="large" @submit.stop.prevent="submit">
      <!-- 邮箱地址 -->
      <el-form-item prop="email">
        <el-input v-model="formData.email" :placeholder="i18n.common.placeholder.email" autocomplete="off" name="email" type="email" />
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-input v-model="formData.code" :placeholder="i18n.common.placeholder.verification" autocomplete="off" name="code">
          <template #append>
            <ui-validate :before="emailValidate" :query="{ email: formData.email }" :type="ValidateType.update" @click="onSeadCode" />
          </template>
        </el-input>
      </el-form-item>

      <!--推送-->
      <el-form-item style="margin-bottom: 10px">
        <el-checkbox v-model="formData.push" :false-label="false" :true-label="true">
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
          <el-button class="w-full" native-type="submit" type="primary">
            <span class="text-16">{{ i18n.common.button.confirm }}</span>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </client-only>
</template>
