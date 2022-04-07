/**
 * @file 扩展 http 功能
 * @author svon.me@gmail.com
 * @description 根据某些场景做一些处理
 */

import type { AxiosRequestConfig } from "axios";
import safeGet from "@fengqiaogang/safe-get";
import { isFunction, isObject } from "src/utils/";

export * from "src/utils/decorate";

/**
 * @file 是否对 token 做判断
 * @param status = true / false
 * @description 等于 true 时如果当前环境为未登录状态则会不进行 http 请求, 等于 false 当前请求则不会携带 token
 */
export const userToken = function (status = false) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const app = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const self = this;
      const _user = status ? "required" : "none";
      const [query, callback] = await app.apply(self, args);
      if (query && isObject(query)) {
        return [{ ...query, _user }, callback];
      }
      return [{ _user }, callback];
    };
  };
};
// 缓存时间(单位秒)
export enum expire {
  min1 = 60,
  min2 = 60 * 2,
  min5 = 60 * 5,
  min10 = 60 * 10,
  min30 = 60 * 30,
  hour1 = 60 * 60,
  hour2 = 60 * 60 * 2,
  hour12 = 60 * 60 * 12,
  day1 = 60 * 60 * 24,
  day2 = 60 * 60 * 24 * 2,
  day3 = 60 * 60 * 24 * 3,
}

/**
 * @file get 请求
 * @param url 请求地址
 * @param expire 缓存时间
 * @param config Axios 配置
 */
export const get = function (url: string, expire = 0, config: AxiosRequestConfig = {}) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const app = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const self: any = this;
      const [query = {}, callback]: [object, (value?: any) => any] = await Promise.resolve(app.apply(self, args));
      const params = { expire, ...query };
      let result = await self.get(url, { ...config, params });
      if (callback && isFunction(callback)) {
        result = await callback(result);
      }
      return result;
    };
  };
};
/**
 * @file post 请求
 * @param url 请求地址
 * @param expire 缓存时间
 * @param config Axios 配置
 */
export const post = function (url: string, expire = 0, config: AxiosRequestConfig = {}) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const app = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const self: any = this;
      const [data = {}, callback]: [object, (value?: any) => void] = await Promise.resolve(app.apply(self, args));
      const _user = safeGet<string>(data, "_user");

      const result = await self.post(url, data, {
        ...config,
        params: { expire, _user },
      });
      if (callback && isFunction(callback)) {
        return callback(result);
      }
      return result;
    };
  };
};
/**
 * @file delete 请求
 * @param url 请求地址
 * @param expire 缓存时间
 * @param config Axios 配置
 */
export const deleted = function (url: string, expire = 0, config: AxiosRequestConfig = {}) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const app = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const self: any = this;
      const [data = {}, callback]: [object, (value?: any) => void] = await Promise.resolve(app.apply(self, args));
      const _user = safeGet<string>(data, "_user");

      const result = await self.delete(url, data, {
        ...config,
        params: { expire, _user },
      });
      if (callback && isFunction(callback)) {
        return callback(result);
      }
      return result;
    };
  };
};
