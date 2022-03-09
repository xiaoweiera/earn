/**
 * @file API 响应结果校验
 */

import type { AxiosResponse } from "axios";
import safeGet from "@fengqiaogang/safe-get";
import { isNumber, isObject, isString } from "src/utils/";

const getResult = function(response: AxiosResponse) {
  if (response && response.data) {
    const data = response.data;
    if (isString(data)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        // todo
      }
    }
    return data;
  }
};

// 判断状态码
export const check = function<T>(response: AxiosResponse): T {
  const result = getResult(response);
  if (isObject(result)) {
    const code = safeGet<number>(result, "code");
    if (code === 0) {
      return safeGet<T>(result, "data");
    }
    if (isNumber(code)) {
      // 向外跑出异常
      throw result;
    }
  }
  return safeGet<T>(result, "data");
};

export const asyncCheck = async function<T>(result: any): Promise<T> {
  const data = await Promise.resolve(result);
  return check(data);
};
