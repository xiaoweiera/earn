/**
 * @file 指标，快讯
 * @author svon.me@gmail.com
 */

import type { Data } from "src/types/quota";
import safeGet from "@fengqiaogang/safe-get";

export const isLocked = function (data: Data): boolean {
  const type = safeGet<string>(data, "chart.chart_type");
  const unlocked = safeGet<boolean>(data, "chart.unlocked");
  if (type && /^vip/i.test(type)) {
    if (!unlocked) {
      return true;
    }
  }
  return false;
};
