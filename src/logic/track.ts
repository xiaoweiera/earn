/**
 * @file 埋点事件处理
 * @author svon.me@mgail.com
 */

import { Gio } from "src/plugins/track/gio";
import { Origin } from "src/types/track/";
import { toArray } from "src/utils";
import { getLang } from "src/utils/root/data";
import Cookie from "src/plugins/browser/cookie";
import { tokenName } from "src/config/";

export * from "src/types/track/";

// 推送埋点消息
export const push = function (origin: Origin | Origin[], event: string, data?: object) {
  if (origin && event) {
    const cookie = new Cookie();
    const value = Object.assign(
      {
        language: getLang(), // 当前语言类型
        isUser: cookie.get(tokenName) ? 1 : 0, // 判断是否登录
      },
      data ? data : {},
    );
    for (const name of toArray(origin)) {
      if (name === Origin.gio) {
        const gio = new Gio();
        gio.track(event, value);
      }
    }
  }
};
