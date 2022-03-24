/**
 * @file 事件处理
 * @author svon.me@gmail.com
 */

import window from "./window";
import { IsBrowser } from "src/config/";
import { isElement, isString } from "src/utils/check/is";

type Callback = (...args: any[]) => void;
const eventAttr = "__vueClickOutside";

type El = HTMLElement | string;

export const $ = function (value: El): any | undefined {
  if (IsBrowser() && window.Zepto) {
    if (isString(value) || isElement(value)) {
      return window.Zepto(value);
    }
  }
};

// 添加事件
export const addEvent = function (el: El, eventName: string, callback: Callback, useCapture?: boolean) {
  const dom = $(el);
  if (dom) {
    dom.on(eventName, callback, useCapture);
  }
};
// 删除事件
export const removeEvent = function (el: El, eventName: string, callback: Callback, useCapture?: boolean) {
  const dom = $(el);
  if (dom) {
    dom.off(eventName, callback, useCapture);
  }
};

const makeEventName = function (el: El, event: string): string {
  return `${eventAttr}_${event}`;
};

const get = function (el: El, eventName: string): Callback | undefined {
  const dom = $(el);
  if (dom) {
    const attr = makeEventName(el, eventName);
    // @ts-ignore
    const value = dom[attr];
    if (value) {
      return value;
    }
  }
  return void 0;
};

const set = function (el: El, eventName: string, callback?: Callback): boolean {
  const dom = $(el);
  if (dom) {
    const attr = makeEventName(el, eventName);
    if (callback) {
      // @ts-ignore
      dom[attr] = callback;
    } else {
      // @ts-ignore
      dom[attr] = "";
      // @ts-ignore
      delete dom[attr];
    }
    return true;
  }
  return false;
};

const remove = function (el: El, eventName: string): boolean {
  return set(el, eventName, void 0);
};

// 删除事件
export const unbind = function (el: El, eventName: string, useCapture?: boolean) {
  const callback = get(el, eventName);
  if (callback) {
    removeEvent(el, eventName, callback, useCapture);
    remove(el, eventName);
  }
};

export const bind = function (el: El, eventName: string, callback: Callback, useCapture?: boolean) {
  // 判断事件是否已经绑定，绑定则删除
  unbind(el, eventName, useCapture);
  // 添加事件
  addEvent(el, eventName, callback, useCapture);
  // 设置事件属性（记录该事件已绑定）
  set(el, eventName, callback); // 添加
};

export const stop = function (el: Event) {
  if (el) {
    el.stopPropagation();
  }
};

export const prevent = function (el: Event) {
  if (el) {
    el.preventDefault();
  }
};
