/**
 * @file 常用方法
 * @author svon.me@gmail.com
 */
import type { ChainItem } from "src/types/common/chain";
import { getValue } from "src/utils/root/data";
import * as alias from "src/utils/root/alias";
import safeGet from "@fengqiaogang/safe-get";
import { sort as _sort } from "ramda";
import { compact, flattenDeep as flatten, size, toLower, toUpper } from "lodash";
import uuid from "./uuid/";
import { Equals, isArray } from "./check/is";

export * from "./check/is";
export * from "./convert/to";
export * from "./time/index";
export { uuid, size, compact, flatten, Equals };

/**
 * 排序
 * @param list 排序的列表数据
 * @param diff 如果数据是集合, 以集合中某一个健值做排序
 * @param reverse 是否倒序, 默认正序
 */
export const sort = function (list: any[], diff?: string, reverse?: boolean) {
  const app = function (value1: any, value2: any) {
    if (diff) {
      if (reverse) {
        return safeGet<number>(value2, diff) - safeGet<number>(value1, diff);
      }
      return safeGet<number>(value1, diff) - safeGet<number>(value2, diff);
    }
    if (reverse) {
      return value2 - value1;
    }
    return value1 - value2;
  };
  return _sort(app, list);
};

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

/**
 * 循环
 */
export const forEach = function (callback: any, data: any[] | any) {
  if (callback && data) {
    if (isArray(data)) {
      data.forEach((value: any, index: number) => {
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

/**
 * 循环
 */
export const map = function (callback: any, data: any): any {
  const isArr = isArray(data);
  const array: any[] = [];
  const result: any = {};
  // @ts-ignore
  forEach(function (value: any, index: number | string, origin: any) {
    const item = callback(value, index, origin);
    if (isArr) {
      // @ts-ignore
      array[index] = item;
    } else {
      result[`${index}`] = item;
    }
  }, data);
  return isArr ? array : result;
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

export const getChain = function (name: string) {
  const data = getValue(alias.common.chain.site, {});
  const chain = safeGet<object>(data, "chain");
  if (chain) {
    const value = safeGet<ChainItem>(chain, name);
    if (value) {
      return value;
    }
  }
};
export const getChainLogo = function (name: string) {
  const data = getChain(name);
  if (data) {
    return data.logo;
  }
};
