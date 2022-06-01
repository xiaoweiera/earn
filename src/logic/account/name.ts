/**
 * @file
 * @author zhangkun@163.com
 */

import I18n from "src/utils/i18n";
import { reactive, toRaw } from "vue";
import type { Ref } from "vue";
import { refresh } from "src/logic/user/login";
import * as console from "src/plugins/log/";

export interface FormData {
  nickname: string; // 昵称
}

export const createFormData = function (value?: FormData) {
  const data = {
    nickname: "", // 昵称
  };
  if (value) {
    return reactive<FormData>({ ...data, ...value });
  }
  return reactive<FormData>(data);
};

export const rules = function (lang?: string) {
  const i18n = I18n(lang);
  return {
    // 昵称
    nickname: [
      {
        required: true,
        type: "string",
        trigger: ["blur"], // , "change"
        message: i18n.user.info.inputName,
      },
    ],
  };
};
// 验证整个表单的值
export const checkValidate = function (form: Ref) {
  const dom = toRaw(form).value;
  if (dom) {
    return dom.validate();
  }
  return false;
};

export const resetFields = function (form?: any) {
  if (form) {
    try {
      const dom = toRaw(form).value;
      if (dom && dom.resetFields) {
        dom.resetFields();
      }
    } catch (e) {
      console.log(e);
      // todo
    }
  }
};

// 昵称修改成功
export const onUpdateEmailCallback = async function (form?: any) {
  resetFields(form);
  // 更新用户 token
  await refresh(true);
  // 刷新当前页面
  window.location.reload();
};
