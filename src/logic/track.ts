/**
 * @file 埋点事件处理
 * @author svon.me@mgail.com
 */

import { Gio } from "src/plugins/track/gio";
import { Origin } from "src/types/track/";
import { toArray } from "src/utils";
import { getLang } from "src/utils/root/data";
import * as console from "src/plugins/log/";
export * from "src/types/track/";

// 推送埋点消息
export const push = function (origin: Origin | Origin[], name: string, data?: object) {
  console.log(origin, name, data);
  if (origin && name) {
    const value = Object.assign({ language: getLang() }, data ? data : {});
    for (const name of toArray(origin)) {
      if (name === Origin.gio) {
        const gio = new Gio();
        gio.track(name, value);
      }
    }
  }
};
