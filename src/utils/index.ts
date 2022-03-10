/**
 * @file 常用方法
 * @author svon.me@gmail.com
 */

import { compact, flatten, size, toLower, toUpper } from "lodash";
import uuid from "./uuid/";
import { Equals, isArray } from "./check/is";

export * from "./check/is";
export * from "./convert/to";
export * from "./time/index";
export { uuid, size, compact, flatten, Equals };

// 首字母大写
export const upperFirst = function (value: string): string {
  // 将字符串转换为小写
  const str = toLower(value || "");
  const first = toUpper(str[0] || "");
  const last = str.slice(1);
  return `${first}${last}`;
};

export const max = function (...args: any[]): number {
  const list = compact(flatten(args));
  if (list.length > 0) {
    let value: number = list[0];
    for (const item of list) {
      if (item > value) {
        value = item;
      }
    }
    return value;
  }
  // @ts-ignore
  return void 0;
};

export const min = function (...args: any[]): number {
  const list = compact(flatten(args));
  if (list.length > 0) {
    let value: number = list[0];
    for (const item of list) {
      if (item < value) {
        value = item;
      }
    }
    return value;
  }
  // @ts-ignore
  return void 0;
};

type eachCallback = (value: never, index: number | string, list: never[] | never) => void;

/**
 * 循环
 */
export const forEach = function (callback: eachCallback, data: never[] | never) {
  if (callback && data) {
    if (isArray(data)) {
      data.forEach((value: never, index: number) => {
        callback(value, index, data);
      });
    } else {
      const keys = Object.keys(data);
      keys.forEach((key: string) => {
        // @ts-ignore
        const value: never = data[key];
        callback(value, key, data);
      });
    }
  }
};

export class Encryption {
  private text = "";
  private $1 = 4; // 开头保留几位
  private $2 = 4; // 结尾保留几位
  private replace = "."; // 用什么字符替换
  private replaceCount = 4; // 替换的字符保留几位
  constructor(value: string) {
    this.text = value;
  }

  set$1Count(value: number) {
    this.$1 = value;
    return this;
  }

  set$2Count(value: number) {
    this.$2 = value;
    return this;
  }

  setReplace(value: string) {
    this.replace = value;
    return this;
  }

  setReplaceCount(value: number) {
    this.replaceCount = value;
    return this;
  }

  value() {
    const reg = new RegExp(`^([0-9a-z]{${this.$1}}).+([0-9a-z]{${this.$2}})$`, "ig");
    const replaceText = new Array(this.replaceCount + 1).fill(this.replace).join("");
    const replace = `$1${replaceText}$2`;
    return this.text.replace(reg, replace);
  }
}
export const encryption = function (value: string): Encryption {
  return new Encryption(value || "");
};
