/**
 * @file 客户端
 * @author svon.me@gmail.com
 */

// 引入 element 样式
import "src/styles/element.scss";
// 引入 tailwindcss
import "virtual:windi.css";
import "virtual:windi-devtools";
// 引入项目全局样式
import "src/styles/main.scss";

import { config } from "src/router/config";
import * as webkit from "src/plugins/webkit/";
import Cookie from "src/plugins/browser/cookie";
import { Device } from "src/types/common/device";

// 设置 Element Ui 中英文
import ElementPlus from "element-plus";
import { Language } from "src/types/language";
import safeGet from "@fengqiaogang/safe-get";
import * as console from "src/plugins/log/";
import zhEn from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import Decrypt from "src/plugins/encryption/decrypt";
import { AppId, getEnv, languageKey, rootData, tokenName } from "src/config";
import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded } from "vue-router";
import { createApp } from "./bootstrap/main";
import { refresh } from "src/logic/user/login";

const getCache = async function (): Promise<object> {
  // 从 script 标签中获取数据
  const dom = document.getElementById(rootData);
  if (dom) {
    const value = dom.innerText;
    if (value) {
      // 解密
      const data = await Decrypt<object>(value);
      if (data) {
        return data;
      }
      return {};
    }
  }
  return Promise.resolve({});
};

// 前置处理
const prepend = async function () {
  const cookie = new Cookie();
  const process = await webkit.env.process(); // 尝试与移动端设备进行交互
  // 如果移动端有返回数据
  if (process && process.device) {
    // 设置设备类型
    cookie.setDeviceValue(process.device);

    // 判断浏览器中是否有 token 信息
    if (cookie.get(tokenName)) {
      return getCache();
    }
    // 如果有 token 信息
    if (process.token) {
      // 修改 token 数据
      cookie.setUserToken(process.token);
      // 刷新页面
      window.location.reload();
    }
    return getCache();
  } else {
    // 设置默认类型
    cookie.setDeviceValue(Device.web);
  }
  return getCache();
};

const main = async function () {
  const data = await prepend();

  console.log("env : ", getEnv());
  console.log("Server data ", data);

  const { app, router } = createApp(data);

  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {
    const matched = to.matched;
    if (matched && matched.length > 0) {
      next();
    } else {
      // 如果当前路由无匹配状态，则默认跳转至 404 页面
      next(config.E404);
    }
  });

  // 设置 Element Ui 中英文
  const lang = safeGet<Language>(data, `query.${languageKey}`) || Language.auto;
  if (lang === Language.cn) {
    app.use(ElementPlus, {
      locale: zhCn,
    });
  } else {
    app.use(ElementPlus, {
      locale: zhEn,
    });
  }
  await router.isReady();
  app.mount(`#${AppId}`, true);
  // 延迟处理用户数据
  setTimeout(refresh);
};

setTimeout(main);
