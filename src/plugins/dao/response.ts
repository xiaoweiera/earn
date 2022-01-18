/**
 * @file API 响应结果校验
 */

import _ from "lodash";
import safeGet from "@fengqiaogang/safe-get";

// 判断状态码
export const check = function<T>(result: any): T {
  if (_.isString(safeGet(result, "data"))) {
    throw safeGet(result, "data");
  }
  const code = safeGet<number>(result, "data.code");
  if (code === 0) {
    return safeGet<T>(result, "data.data");
  }
  if (code === 1) {
    // 向外跑出异常
    throw safeGet<T>(result, "data");
  }
  return safeGet<T>(result, "data");
}
export const asyncCheck = async function<T>(result: any): Promise<T> {
  const data = await Promise.resolve(result);
  return check(data);
}
