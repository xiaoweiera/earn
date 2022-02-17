/**
 * @file 项目环境信息
 * @author svon.me@gmail.com
 * @description 网页嵌套在 App 下时，获取终端设备信息
 */

import jsCookie from 'js-cookie';
import { uuid } from "src/utils";
import window from "src/plugins/browser/window";
import { tokenName, deviceName } from "src/config/";
import {setDeviceValue, setUserToken} from "src/plugins/browser/cookie";

export enum Device {
  web= "web",
  app = "app"
}

export interface Env {
  token: string; // 用户凭证
  device: Device; // 设备类型
}


const callback = function (result: string): Env | undefined {
  console.log(`callback: ${result}`);
  if (result) {
    return JSON.parse(result) as Env;
  }
}

export const IosEnv = function(): Promise<Env | undefined> {
  // alert('尝试调用 ios')
  return new Promise((resolve, reject) => {
    try {
      let flag = false;
      const funName = `callback_${uuid()}`;
      window[funName] = function (res: string) {
        if (flag) {
          return false;
        }
        flag = true;
        resolve(callback(res));
      };
      // @ts-ignore
      window.webkit.messageHandlers.projectEnv.postMessage({"function": funName});
      // 默认 1.5s 后执行默认逻辑
      setTimeout(() => {
        window[funName]("");
      }, 1500);
    } catch (e) {
      reject(e);
    }
  });
}
export const AndroidEnv = function(): Promise<Env | undefined> {
  // alert('尝试调用 android')
  try {
    // @ts-ignore
    const result = window.kingdata.projectEnv(true);
    return Promise.resolve(callback(result));
  } catch (e) {
    return Promise.reject(e);
  }
}

export const processEnv = async function(): Promise<Env | undefined> {
  // 优先取缓存中的数据
  // console.log("begin - processEnv");
  // 从 android 中获取
  try {
    // console.log("try - android");
    const data = await AndroidEnv();
    if (data) {
      setDeviceValue(Device.app);
      setUserToken(data.token);
      return data;
    }
  } catch (e) {
    // todo
  }
  // 从 ios 中获取
  try {
    // console.log("try - ios");
    const data = await IosEnv();
    if (data) {
      setDeviceValue(Device.app);
      setUserToken(data.token);
      return data;
    }
  } catch (e) {
    // todo
  }
  try {
    // console.log("try - cookie cache");
    const token = jsCookie.get(tokenName);
    const device = jsCookie.get(deviceName);
    if (token || device) {
      setUserToken(token);
      setDeviceValue(device ? device : Device.web);
      return {
        token: token,
        device: device || Device.web,
      } as any;
    }
  } catch (e) {
    // todo
  }
  // console.log("try - default");
  // 默认数据
  const defValue: Env = {
    token: "",
    device: Device.web
  }
  setDeviceValue(defValue.device);
  setUserToken(defValue.token);
  return defValue;
}

