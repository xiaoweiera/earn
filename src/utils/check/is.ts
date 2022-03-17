/**
 * @file 类型判断
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import type { Request } from "express";
import { IsNode } from "src/config/ssr";
import { isEmpty as _isEmpty, is, isNil } from "ramda";

/**
 * 判断字符串是否是 http 链接
 * @param value
 */
export const isHttp = function (value?: string): boolean {
  if (value) {
    if (/^http/.test(value)) {
      return true;
    }
    if (/^\//.test(value)) {
      return true;
    }
    const list = value.split("/");
    if (list.length >= 2) {
      return true;
    }
  }
  return false;
};

/**
 * 判断对象是否为空
 * @param value
 * @param checkUndefined 是否判断为 "undefined" 情况
 */
export const isUndefined = function (value: any, checkUndefined?: boolean): boolean {
  if (typeof value === "undefined") {
    return true;
  }
  return !!(checkUndefined && value === "undefined");
};

/**
 * 判断对象是否是字符串
 * @param value
 */
export const isString = (value: any): boolean => {
  return is(String, value);
};

/**
 * @file 判断对象是否是数字
 * @param value
 */
export const isNumber = (value: any): boolean => {
  if (is(Number, value)) {
    return true;
  }
  return value === 0;
};

/**
 * 判断对象是否是数组
 * @param value
 */
export const isArray = function (value: any | any[]): boolean {
  if (Array.isArray(value)) {
    return true;
  }
  return is(Array, value);
};

/**
 * 判断对象是否 object
 * @param value
 */
export const isObject = function (value: any): boolean {
  const status = isArray(value);
  if (status) {
    return false;
  }
  return is(Object, value);
};

// 判断对象是否是 Request 对象
export const isRequest = function (value?: any): boolean {
  if (value && isObject(value) && IsNode()) {
    const req: Request = value;
    if (req.url && req.method && req.header) {
      return true;
    }
  }
  return false;
};

/**
 * 判断对象是否是函数
 * @param value
 */
export const isFunction = function (value: any): boolean {
  return is(Function, value);
};

/**
 * 判断对象是否为空
 * @param value
 * @param checkUndefined 是否判断字符串 "Undefined"
 */
export const isEmpty = function (value: any, checkUndefined?: boolean): boolean {
  const status = isUndefined(value, checkUndefined);
  if (status) {
    return true;
  }
  if (_isEmpty(value)) {
    // 判断 [], '', {}
    return true;
  }
  return isNil(value); // 判断 null, undefined
};

/**
 * 判断对象是否为 Element 类型
 * @param value
 */
export const isElement = function (value: any) {
  if (isEmpty(value) || isString(value) || isNumber(value) || isArray(value)) {
    return false;
  }
  if (value && value.activeElement) {
    return true;
  }
  return false;
  //
  // // @ts-ignore
  // if (value instanceof HTMLElement) {
  //   return true;
  // }
  // let flag = true;
  // if (isObject(value)) {
  //   flag = true;
  // }
  //
  // if (flag) {
  //   if (typeof value.nodeName === "string") {
  //     return true;
  //   }
  //   if (value?.navigator) {
  //     return true;
  //   }
  // }
  return false;
};

export const Equals = function (...args: Array<string | number>): boolean {
  const len = args.length;
  let status = false;
  for (let i = 1; i < len; i++) {
    const value1 = _.trim(`${args[i - 1]}`);
    const value2 = _.trim(`${args[i]}`);
    if (value1 === value2) {
      status = true;
    } else {
      status = false;
      break;
    }
  }
  return status;
};
