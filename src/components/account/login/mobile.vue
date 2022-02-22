<script setup lang="ts">
/**
 * @file 邮件登录
 * @author svon.me@gmail.com
 */

import API from "src/api/index";
import I18n from "src/utils/i18n";
import {computed, ref, toRaw, onMounted} from "vue";
import { messageError } from "src/lib/tool";
import { AreaCode } from "src/types/common/area";
import * as Common from "src/logic/account/register";
import { config as routerConfig } from "src/router/config";
import { ElForm, ElFormItem, ElInput, ElButton, ElSelect, ElOption, ElCheckbox } from "element-plus";

const i18n = I18n();
const areaCode = ref<AreaCode[]>([]);
const domForm = ref<any>(null);
const rules = computed(Common.rules);
const formData = Common.createFormData({
  checked: true,
  mobile: "",
  password: "",
} as any);

// 提交
const submit = async function () {
  try {
    await Common.checkValidate(domForm);
  } catch (e) {
    return false;
  }
  const api = new API();
  try {
    // 获取表单数据
    const data: Common.FormData = toRaw(formData);
    // 与服务器进行校验
    const user = await api.user.mobileLogin(data);
    if (user) {
      Common.onRedirect();
    }
  } catch (e) {
    // @ts-ignore
    const { message } = e || {};
    if (message) {
      messageError(message);
    } else {
      messageError(i18n.common.message.loginError);
    }
  }
}

onMounted(async function () {
  const api = new API();
  areaCode.value = await api.common.getAreaCodeList();
});

</script>

<template>
  <client-only>
    <el-form size="large" ref="domForm" :rules="rules" :model="formData" autocomplete="off" @submit.stop.prevent="submit">
      <el-form-item prop="mobile">
        <el-input class="user-mobile-box" v-model="formData.mobile" name="mobile" type="text" :placeholder="i18n.common.placeholder.tel"
                  autocomplete="off">
          <template #prepend>
            <el-select class="w-24" placeholder="Select" v-model="formData.area_code">
              <template v-for="item in areaCode" :key="item.phone_code">
                <el-option :label="item.phone_code" :value="item.phone_code"></el-option>
              </template>
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input v-model="formData.password" name="password" type="password"
                  :placeholder="i18n.common.placeholder.password" show-password autocomplete="off"/>
      </el-form-item>
      <el-form-item class="mb-0 py-0.5">
        <el-checkbox v-model="formData.checked">
          <span class="font-normal">{{ i18n.common.placeholder.login }}</span>
        </el-checkbox>
      </el-form-item>

      <!-- 确定按钮 -->
      <el-form-item style="margin-bottom: 0;">
        <div class="w-full">
          <!--  :disabled="!toBoolean(formData.token)" -->
          <el-button class="w-full" type="primary" native-type="submit">
            <span class="text-16">{{ i18n.common.login }}</span>
          </el-button>
        </div>
      </el-form-item>

      <div>
        <slot>
          <div class="flex items-center justify-between pt-4.5 pb-2.5 font-14-18">
            <v-router class="link" :href="routerConfig.user.register" name="router-link">
              <span>{{ i18n.common.switchRegister }}</span>
            </v-router>
            <v-router class="link" :href="routerConfig.user.forget" name="router-link">
              <span>{{ i18n.common.switchRorget }}</span>
            </v-router>
          </div>
        </slot>
      </div>
    </el-form>
  </client-only>
</template>
