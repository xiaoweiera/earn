/**
 * @file url 处理
 * @author svon.me@gmail.com
 */

import Parse from "src/utils/url/parse";
import safeGet from "@fengqiaogang/safe-get";
import window from "src/plugins/browser/window";

export const getParam = function<T>(key?: string, url?: string): T {
  const location = Parse(url || window.location.href);
  const query = location.query || {};
  if (key) {
    return safeGet<T>(query, key);
  }
  return query as any;
};
