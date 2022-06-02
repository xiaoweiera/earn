/**
 * @file 邮箱注册
 * @author svon.me@gmail.com
 */

// 平台标识
import I18n from "src/utils/i18n";
import { toBoolean } from "src/utils";
import getLang from "src/utils/url/lang";
import type { Ref } from "vue";
import { reactive, toRaw } from "vue";
import { get } from "src/utils/root/data";
import * as webkit from "src/plugins/webkit/user";
import window from "src/plugins/browser/window";
import { dashboard, languageKey } from "src/config/";
import { createHref } from "src/plugins/router/pack";
import { config as routerConfig } from "src/router/config";
import * as console from "src/plugins/log/";
import { refresh } from "src/logic/user/login";

export const PlatformWeb = "web";

export interface FormData {
  checked: boolean; // 是否同意注册协议
  code: string; // 验证码
  invitation_code?: string; // 邀请码
  email: string; // 邮箱账号
  mobile: string; // 手机号
  password: string; // 密码
  new_password?: string; // 密码
  platform?: string; // 平台标识
  token?: string; // 人机校验签名
  area_code?: string; // 手机号区号
  push?: boolean; // 推送
}

export const createFormData = function (value?: FormData) {
  const data = {
    checked: true, // 注册协议
    code: "", // 验证码
    invitation_code: "", // 邀请码
    email: "", // 邮箱账号
    mobile: "", // 手机号
    password: "", // 密码
    platform: void 0, // 平台标识
    token: "", // 人机校验签名
    area_code: "+86",
    new_password: "",
    push: true,
  };
  if (value) {
    return reactive<FormData>({ ...data, ...value });
  }
  return reactive<FormData>(data);
};

export const rules = function (lang?: string) {
  const i18n = I18n(lang);
  return {
    // 注册前请阅读
    checked: [
      {
        required: true,
        type: "boolean",
        trigger: ["blur", "change"],
        message: i18n.common.message.checked,
      },
      {
        type: "boolean",
        trigger: ["blur", "change"],
        message: i18n.common.message.checked,
      },
      {
        trigger: ["blur", "change"],
        validator(rule: any, value: boolean, callback: any) {
          if (toBoolean(value)) {
            callback();
          } else {
            callback(i18n.common.message.checked);
          }
        },
      },
    ],
    // 手机
    mobile: [
      {
        required: true,
        type: "string",
        trigger: ["blur"], // , "change"
        message: i18n.common.placeholder.tel,
      },
      {
        required: true,
        type: "string",
        trigger: ["blur"], // , "change"
        pattern: /^[0-9]{8,}$/i,
        message: i18n.common.message.telError,
      },
    ],
    // 邮箱
    email: [
      {
        required: true,
        type: "string",
        trigger: ["blur"], // , "change"
        message: i18n.common.placeholder.email,
      },
      {
        required: true,
        type: "email",
        trigger: ["blur"], // , "change"
        message: i18n.common.message.mailError,
      },
    ],
    // 验证码
    code: [
      {
        required: true,
        type: "string",
        trigger: ["blur"], // , "change"
        message: i18n.common.placeholder.verification,
      },
      {
        trigger: ["blur"],
        type: "string",
        pattern: /^[0-9]{6}$/i,
        message: i18n.common.message.verificationError,
      },
    ],
    // 密码校验
    password: [
      {
        required: true,
        type: "string",
        trigger: ["blur"], // , "change"
        message: i18n.common.placeholder.password,
      },
      {
        type: "string",
        trigger: ["blur"], // , "change"
        pattern: /^.{6,24}$/,
        message: i18n.common.message.passwordError,
      },
    ],
    // 邀请码
    invitation_code: [
      {
        type: "string",
        trigger: ["blur"],
        pattern: /^[\w-+]{4,}$/,
        message: i18n.common.user.invite,
      },
    ],
  };
};
// 确认密码
export const checkedNewPassword = function (data: FormData) {
  const i18n = I18n();
  return [
    {
      required: true,
      type: "string",
      trigger: ["blur"], // , "change"
      message: i18n.common.placeholder.new_password,
    },
    {
      type: "string",
      trigger: ["blur"], // , "change"
      pattern: /^.{6,24}$/,
      message: i18n.common.message.passwordError,
    },
    {
      trigger: ["blur"], // , "change"
      validator(rule: any, value: string, callback: any) {
        if (data.password === value) {
          callback();
        } else {
          callback(i18n.common.message.new_password);
        }
      },
    },
  ];
};

// 验证整个表单的值
export const checkValidate = function (form: Ref) {
  const dom = toRaw(form).value;
  if (dom) {
    return dom.validate();
  }
  return false;
};
// 单独验证邮箱
export const checkValidateEmail = function (form: Ref): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const callback = function (isValid?: boolean, invalidFields?: Error) {
      if (isValid && invalidFields) {
        console.log("validateField email");
        reject(invalidFields);
      } else {
        resolve(true);
      }
    };
    if (form) {
      const dom = toRaw(form).value;
      if (dom) {
        dom.validateField(["email"], callback);
        return;
      }
    }
    callback();
  });
};
// 单独校验手机
export const checkValidateMobile = function (form: Ref): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const callback = function (isValid?: boolean, invalidFields?: Error) {
      if (isValid && invalidFields) {
        console.log("validateField mobile");
        reject(invalidFields);
      } else {
        resolve(true);
      }
    };
    const dom = toRaw(form).value;
    if (dom) {
      dom.validateField(["mobile"], callback);
      return;
    }
    callback();
  });
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

// 邮箱修改成功
export const onUpdateEmailCallback = async function (form?: any) {
  resetFields(form);
  // 唤起移动端对应功能
  if (webkit.UpdateEmail()) {
    return true;
  } else {
    // 更新用户 token
    await refresh(true);
    // 刷新当前页面
    window.location.reload();
  }
};

// 返回登录
export const onGoBack = function (form?: any, goBack = false) {
  resetFields(form);
  const query = {
    [languageKey]: getLang(),
  };
  const href = createHref(routerConfig.user.login, query);
  // 唤起移动端返回功能
  if (goBack && webkit.goBack()) {
    return true;
  } else if (webkit.Login()) {
    // 唤起移动端登录功能
    return true;
  } else {
    // 进入登录页面
    window.location.href = href;
  }
};

// 登录/注册成功后跳转地址处理
export const onRedirect = function () {
  const redirect = get<string>("query.redirect");
  // 如果指定了回挑地址，则跳转到指定页面
  if (redirect) {
    window.location.href = decodeURI(redirect);
  } else {
    const url = window.location.pathname;
    // 如果当前页面不是登录页
    if (url !== routerConfig.user.login) {
      window.location.reload(); // 刷新当前页面
    } else {
      window.location.href = createHref(dashboard); // 登录后默认跳转到首页;
    }
  }
};
