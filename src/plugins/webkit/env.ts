/**
 * @file 项目环境信息
 * @author svon.me@gmail.com
 * @description 网页嵌套在 App 下时，获取终端设备信息
 */

import uuid from "src/utils/uuid";
import window from "src/plugins/browser/window";
import type { Device } from "src/types/common/device";

export interface Env {
	token: string; // 用户凭证
	device: Device; // 设备类型
}

const callback = function(result: string): Env | undefined {
  if (result) {
    return JSON.parse(result) as Env;
  }
};

export const Ios = function(): Promise<Env | undefined> {
  // alert('尝试调用 ios')
  return new Promise((resolve, reject) => {
    try {
      let flag = false;
      const funName = `callback_${uuid()}`;
      window[funName] = function(res: string) {
        if (flag) {
          return false;
        }
        flag = true;
        resolve(callback(res));
      };
      // @ts-ignore
      window.webkit.messageHandlers.projectEnv.postMessage({ function: funName });
      // 默认 1.5s 后执行默认逻辑
      setTimeout(() => {
        window[funName]("");
      }, 1500);
    } catch (e) {
      reject(e);
    }
  });
};
export const Android = function(): Promise<Env | undefined> {
  // alert('尝试调用 android')
  try {
    // @ts-ignore
    const result = window.kingdata.projectEnv(true);
    return Promise.resolve(callback(result));
  } catch (e) {
    return Promise.reject(e);
  }
};

export const process = async function(): Promise<Env | undefined> {
  // 从 android 中获取
  try {
    return await Android();
  } catch (e) {
    // todo
  }
  // 从 ios 中获取
  try {
    return await Ios();
  } catch (e) {
    // todo
  }
};
