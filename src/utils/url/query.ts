/**
 * @file 解析 url 参数
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import parse from "./parse";

export const getQuery = function<T>(url: string, key?: string): T | undefined {
  if (url) {
    const data = parse(url);
    if (data && data.query) {
      if (key) {
        return safeGet<T>(data.query, key);
      }
      return data.query as any;
    }
  }
};
