/**
 * @file 从页面缓存中读取数据
 * @author svon.me@gmail.com
 */
import _ from "lodash";
import { languageKey } from "src/config";
import { Language } from "src/types/language";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";

const cache = {};

export const set = function (data: object) {
  _.each(data, (value: any, key: string) => {
    safeSet(cache, key, value);
  });
};

export const get = function <T>(name?: string): T {
  if (name) {
    return safeGet<T>(cache, name);
  }
  return { ...cache } as T;
};

export const getValue = function <T>(key: string, auto?: T): T | undefined {
  const data = get<T>(key);
  if (data) {
    return data;
  }
  return auto;
};

// 获取当前环境中的语言类型
export const getLang = function () {
  return getValue<Language>(`query.${languageKey}`, Language.auto);
};

export default get;
