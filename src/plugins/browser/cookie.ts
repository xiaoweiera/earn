/**
 * @file 操作 cookie
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import type { Request, Response } from "express";
import jsCookie from "js-cookie";
import { MD5 } from "src/plugins/encryption/md5";
import { deviceName, getEnv, IsBrowser, IsNode, tidingName, tokenExpires, tokenName, userLogin, uuIdName } from "src/config/";
import * as webkit from "src/plugins/webkit/";
import { Device } from "src/types/common/device";
import { Equals } from "src/utils/check/is";
import { toInteger } from "src/utils/convert/to";

export default class Cookie {
  private readonly req?: Request;
  private readonly res?: Response;

  constructor(req?: Request, res?: Response) {
    if (req) {
      this.req = req;
    }
    if (res) {
      this.res = res;
    }
  }

  private static cookieOption(expires = 0) {
    const env = getEnv();
    const option = {
      path: "/",
      domain: env.VITE_cookie,
    };
    if (expires && expires > 0) {
      Object.assign(option, {
        expires: new Date(Date.now() + expires),
      });
    }
    return option;
  }

  // 获取
  get(name: string): string | undefined {
    if (this.req) {
      return safeGet<string>(this.req.cookies, name);
    } else {
      return jsCookie.get(name);
    }
  }

  // 设置
  set(name: string, value: string, expires = 0) {
    if (this.res) {
      return this.res.cookie(name, value, Cookie.cookieOption(expires));
    } else {
      return jsCookie.set(name, value, Cookie.cookieOption(expires));
    }
  }

  // 删除 cookie
  remove(name: string) {
    if (this.res) {
      return this.res.clearCookie(name, Cookie.cookieOption());
    } else {
      return jsCookie.remove(name, Cookie.cookieOption());
    }
  }
  getUuid() {
    return this.get(uuIdName);
  }
  setUuid() {
    const value = MD5();
    const time = 1000 * 60 * 60 * 24 * 365 * 2; // 2 年有效期
    return this.set(uuIdName, value, time);
  }

  // 获取用户 token
  async getUserToken() {
    if (IsNode()) {
      if (this.req) {
        return this.get(tokenName);
      }
      return void 0;
    }
    if (IsBrowser()) {
      // 从移动端获取用户信息
      const process = await webkit.env.process();
      if (process && process.token) {
        return process.token;
      }
    }
    return this.get(tokenName);
  }

  // 修改用户登录时间
  setUserLoginTime() {
    const at = 1000 * 60 * 60 * 4; // 4小时过期时间
    const now = Date.now();
    this.set(userLogin, `${now}`, at);
  }

  // 获取用户登录时间
  getUserLoginTime() {
    return this.get(userLogin);
  }

  // 修改用户信息
  setUserToken(value?: string) {
    if (value) {
      this.setUserLoginTime();
      return this.set(tokenName, value, tokenExpires);
    } else {
      return this.removeUserToken();
    }
  }

  // 删除用户信息
  removeUserToken() {
    return this.remove(tokenName);
  }

  // 获取当前设备类型
  async getDeviceValue() {
    if (IsBrowser()) {
      // 从移动端获取用户信息
      const process = await webkit.env.process();
      if (process && process.device) {
        if (Equals(process.device, Device.app) || Equals(process.device, Device.ios) || Equals(process.device, Device.android)) {
          return Device.app;
        }
      }
    }
    return this.get(deviceName) || Device.web;
  }

  // 设置当前设备类型
  setDeviceValue(value?: string) {
    if (value) {
      return this.set(deviceName, value);
    } else {
      return this.removeDeviceValue();
    }
  }

  removeDeviceValue() {
    return this.remove(deviceName);
  }

  getTidingTime() {
    return this.get(tidingName) || "";
  }

  setTidingTime(value: number = toInteger(Date.now() / 1000)) {
    const expires = tokenExpires * (366 / 3); // 约等于1年时间
    this.set(tidingName, `${value}`, expires);
  }
}
