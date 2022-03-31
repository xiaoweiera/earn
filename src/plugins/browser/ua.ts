/**
 * @file UserAgent
 * @author svon.me@gmail.com
 */

import type { UA } from "src/types/common/ua";
import window from "src/plugins/browser/window";

export const getUA = function () {
  try {
    if (window.navigator.userAgent && window.UserAgent) {
      const userAgent = new window.UserAgent();
      return userAgent.parse(window.navigator.userAgent) as UA;
    }
  } catch (e) {
    // todo
  }
  return {} as UA;
};
