/**
 * @file gio 埋点
 * @author svon.me@gmail.com
 */

import { isString, isObject } from "src/utils/";
import window from "src/plugins/browser/window";

export class Gio {
  private getIo() {
    if (window.gio) {
      return window.gio;
    }
    return function () {
      // todo
    };
  }
  track(eventName: string, value?: object) {
    const io = this.getIo();
    if (value && isObject(value)) {
      return io("track", eventName, value);
    }
    return io("track", eventName);
  }
  private set(eventName: string, key: string | object, value: string) {
    const io = this.getIo();
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
      const io = this.getIo();
      io("setUserId", id);
    }
  }
  clearUserId() {
    const io = this.getIo();
    io("clearUserId");
  }
  config(value: object) {
    if (value) {
      const io = this.getIo();
      io("config", value);
    }
  }
}
