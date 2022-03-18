/**
 * @file 项目库
 */
import safeGet from "@fengqiaogang/safe-get";
import _ from "lodash";
import * as api from "src/config/api";
import Cookie from "src/plugins/browser/cookie";

import { NullValue, expire, get, post, required, tryError, userToken, validate } from "src/plugins/dao/http";
import type { User } from "src/types/common/user";
import getLang from "src/utils/url/lang";
import ApiTemplate from "../template";

export default class extends ApiTemplate {
  @tryError(NullValue)
  @post(api.user.refreshToken)
  async refreshToken(): Promise<string> {
    const req = this.getRequest();
    const cookie = new Cookie(req);
    const token = await cookie.getUserToken();
    const callback = function (data: object): string {
      return safeGet<string>(data, "token");
    };
    return [{ token }, callback] as any;
  }

  // 获取用户详情
  @tryError(NullValue)
  @get(api.user.info, expire.min5)
  @userToken(true)
  getInfo<T>(): Promise<T> {
    return [] as any;
  }

  // 手机号重置密码
  @post(api.user.resetMobilePassword)
  @userToken()
  @validate
  resetMobilePassword<T>(@required data: object): Promise<T> {
    const lang = getLang(this.lang);
    const value = {
      ...data,
      lang,
    };
    return [value] as any;
  }

  // 邮箱重置密码
  @post(api.user.resetEmailPassword)
  @userToken()
  @validate
  resetEmailPassword<T>(@required data: object): Promise<T> {
    const lang = getLang(this.lang);
    const value = {
      ...data,
      lang,
    };
    return [value] as any;
  }

  // 获取邮箱验证码
  @post(api.user.getEmailCaptcha)
  @userToken()
  @validate
  getEmailCaptcha<T>(@required params: object, @required type: string): Promise<T> {
    const lang = getLang(this.lang);
    const data = {
      ...params,
      forget_type: type,
      lang,
    };
    return [data] as any;
  }

  // 获取手机验证码
  @post(api.user.getMobileCaptcha)
  @userToken()
  @validate
  getMobileCaptcha<T>(@required params: object, @required type: string): Promise<T> {
    const lang = getLang(this.lang);
    const value = Object.assign({ area_code: "+86" }, params, {
      type,
      lang,
    });
    return [value] as any;
  }

  // 邮箱注册
  @post(api.user.registerEmail)
  @userToken()
  @validate
  registerEmail<T>(@required data: object): Promise<T> {
    const lang = getLang(this.lang);
    const value = {
      ...data,
      lang,
    };
    return [value] as any;
  }

  // 邮箱登录
  @post(api.user.emailLogin)
  @userToken()
  @validate
  emailLogin(@required data: object): Promise<User | undefined> {
    const lang = getLang(this.lang);
    const value = Object.assign({ lang }, _.pick(data, ["email", "password"]));

    const callback = function (result: User) {
      const token = safeGet<string>(result, "token");
      if (token) {
        const cookie = new Cookie();
        cookie.setUserToken(token);
        return result;
      } else {
        return Promise.reject(result);
      }
    };
    return [value, callback] as any;
  }

  // 手机号登录
  @post(api.user.mobileLogin)
  @userToken()
  @validate
  mobileLogin(@required data: object): Promise<User | undefined> {
    const lang = getLang(this.lang);
    const value = Object.assign({ lang }, _.pick(data, ["mobile", "password", "area_code"]));

    const callback = function (result: User) {
      const token = safeGet<string>(result, "token");
      if (token) {
        const cookie = new Cookie();
        cookie.setUserToken(token);
        return result;
      } else {
        return Promise.reject(result);
      }
    };
    return [value, callback] as any;
  }
}
