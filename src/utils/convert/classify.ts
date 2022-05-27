/**
 * @file 数据归类
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import DBList from "@fengqiaogang/dblist";
import safeGet from "@fengqiaogang/safe-get";
import { dateTime, dateFormat } from "src/utils/time/";
import type { Callback } from "src/types/common/";

export const convertList = function <T>(list: T[], key: string, newKey: string): T[] {
  if (list.length > 0) {
    return list.map((data: T) => {
      const value = safeGet<number>(data, key as string) || Date.now();
      const time = dateTime(value);
      const pid = dateFormat(time, "YYYYMMDD");
      return {
        ...data,
        [newKey]: pid,
      };
    });
  }
  return [];
};

/**
 * 把一个数组数据按某一个相同的键分类
 * @param key 需要归类的键
 * @param newKey 新的键
 * @param primaryKey 数据中的唯一键
 * @constructor
 */
export const Classify = function (key: string, newKey = "pid", primaryKey = "id") {
  const db = new DBList([], primaryKey, newKey);
  return function <T>(list: T[], convert?: Callback): object[] {
    const array = convert ? convert<T[]>(list, key, newKey) : convertList<T>(list, key, newKey);
    db.insert(array);
    const result: object[] = [];

    // @ts-ignore
    const keys: string[] = [...db.data.keys()];
    // 过滤正确的分组数据
    const ids: string[] = [];
    keys.forEach((value: string) => {
      if (/^[\d]+$/.test(value)) {
        ids.push(value);
      }
    }, keys);
    // 排序
    const ids2 = _.sortBy<string[]>(ids, function (value1: number, value2: number) {
      return value2 - value1;
    });
    const callback = (value: string) => {
      const where = { [newKey]: value };
      const data = {
        ...where,
        list: db.select<T>(where),
      };
      result.push(data);
    };
    ids2.forEach(callback as any);
    return result;
  };
};
