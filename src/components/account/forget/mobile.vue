<script setup lang="ts">
import safeGet from "@fengqiaogang/safe-get";

/**
 * @file 手机密码找回
 * @author svon.me@gmail.com
 */
import API from "src/api/index";
import I18n from "src/utils/i18n";
import { messageError } from "src/lib/tool";
import type { AreaCode } from "src/types/common/area";
import * as Common from "src/logic/account/register";
import { computed, onMounted, ref, toRaw } from "vue";
import { ValidateType } from "src/components/ui/validate/config";
import { ElButton, ElForm, ElFormItem, ElInput, ElOption, ElSelect } from "element-plus";

const props = defineProps({
  mobile: {
    type: String,
    default: "",
  },
  areaCode: {
    type: String,
    default: "",
  },
});

const i18n = I18n();
const domForm = ref<any>(null);
const areaCode = ref<AreaCode[]>([]);

const formData = Common.createFormData();

const rules = computed(Common.rules);

const mobileValidate = function () {
  return Common.checkValidateMobile(domForm);
};

// 获取验证码
const onSeadCode = function (data: object) {
  // 保存人机校验得到的值
  formData.token = safeGet<string>(data, "token") || "";
};

const selfGoBack = function () {
  // 返回登录页面
  Common.onGoBack(domForm);
};

// 确定，表单提交
const submit = async function () {
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
    await api.user.resetMobilePassword(data);
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

onMounted(async () => {
  if (props.mobile) {
    formData.mobile = props.mobile;
  }
  if (props.areaCode) {
    formData.area_code = props.areaCode;
  }
  const api = new API();
  areaCode.value = await api.common.getAreaCodeList();
});
</script>

<template>
  <client-only>
    <el-form ref="domForm" size="large" :rules="rules" :model="formData" autocomplete="off" @submit.stop.prevent="submit">
      <!--手机号-->
      <el-form-item prop="mobile">
        <template v-if="mobile">
          <el-input :model-value="mobile" name="email" type="mobile" disabled />
        </template>
        <template v-else>
          <el-input v-model="formData.mobile" class="user-mobile-box" name="mobile" type="text" :placeholder="i18n.common.placeholder.tel" autocomplete="off">
            <template #prepend>
              <el-select v-model="formData.area_code" class="w-24" placeholder="Select">
                <template v-for="item in areaCode" :key="item.phone_code">
                  <el-option :label="item.phone_code" :value="item.phone_code" />
                </template>
              </el-select>
            </template>
          </el-input>
        </template>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-input v-model="formData.code" name="code" :placeholder="i18n.common.placeholder.verification" autocomplete="off">
          <template #append>
            <ui-validate mobile :type="ValidateType.forget" :before="mobileValidate" :query="{ mobile: formData.mobile, area_code: formData.area_code }" @click="onSeadCode" />
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input v-model="formData.password" name="password" type="password" :placeholder="i18n.common.placeholder.password" show-password autocomplete="new-password" />
      </el-form-item>

      <!-- 确认密码 -->
      <el-form-item prop="new_password" :rules="Common.checkedNewPassword(formData)">
        <el-input v-model="formData.new_password" name="password" type="password" :placeholder="i18n.common.placeholder.new_password" show-password autocomplete="new-password" />
      </el-form-item>

      <!-- 确定按钮 -->
      <el-form-item style="margin-bottom: 0">
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
