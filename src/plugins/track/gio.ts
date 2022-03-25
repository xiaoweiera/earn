/**
 * @file gio 埋点
 * @author svon.me@gmail.com
 */

import window from "src/plugins/browser/window";
import * as console from "src/plugins/log/";
import { isObject, isString } from "src/utils/";

export class Gio {
  private static getIo() {
    if (window.gio) {
      return window.gio;
    }
    return function () {
      // todo
    };
  }

  track(eventName: string, value?: object) {
    console.info(eventName, value);
    const io = Gio.getIo();
    if (value && isObject(value)) {
      return io("track", eventName, value);
    }
    return io("track", eventName);
  }

  set(eventName: string, key: string | object, value: string) {
    console.info(eventName, value);
    const io = Gio.getIo();
    if (key && isString(key)) {
      return io(eventName, key, value);
    }
    if (key && isObject(key)) {
      return io(eventName, key);
    }
  }

  pageSet(key: string | object, value: string) {
    return this.set("page.set", key, value);
  }

  evarSet(key: string | object, value: string) {
    return this.set("evar.set", key, value);
  }

  peopleSet(key: string | object, value: string) {
    return this.set("people.set", key, value);
  }

  visitorSet(key: string | object, value: string) {
    return this.set("visitor.set", key, value);
  }

  setUserId(id: string | number) {
    if (id) {
      const io = Gio.getIo();
      io("setUserId", id);
    }
  }

  clearUserId() {
    const io = Gio.getIo();
    io("clearUserId");
  }

  config(value: object) {
    if (value) {
      const io = Gio.getIo();
      io("config", value);
    }
  }
}
