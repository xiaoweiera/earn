/**
 * @file 监听页面滚动条
 * @author svon.me@gmail.com
 */

import { $ } from "src/plugins/browser/event";
import window from "src/plugins/browser/window";
import document from "src/plugins/browser/document";
import { isElement, isNumber, isString, max } from "src/utils";
import * as event from "./index";

type Callback = (e: Event) => void;

let initAdd = false;

const data = new Map<string, Callback>();

// 删除事件
const removeScroll = function () {
  if (data.size === 0) {
    initAdd = false;
    event.removeEvent(document as any, "scroll", onScroll);
  }
};

const onScroll = function (e: Event) {
  data.forEach((callback: Callback) => {
    callback(e);
  });
  removeScroll();
};

const init = function () {
  if (initAdd) {
    return initAdd;
  }
  initAdd = true;
  event.addEvent(document as any, "scroll", onScroll);
};

export const viewHieght = function () {
  return document.documentElement.clientHeight;
};
export const viewWidth = function () {
  return max(document.body.clientWidth, document.documentElement.clientWidth);
};

export const bodyHeight = function () {
  return document.body.clientHeight;
};

export const scrollTop = function (): number {
  let scroll_top = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scroll_top = document.documentElement.scrollTop;
  } else if (document.body) {
    scroll_top = document.body.scrollTop;
  }
  return scroll_top;
};

// 设置页面滚动条位置
export const setScrollTop = function (top = 0) {
  // @ts-ignore
  document.scrollingElement.scrollTop = top;
};

const offset = function (element?: HTMLElement) {
  const OffEst = {
    top: 0,
    left: 0,
  };

  // 递归获取 offset, 可以考虑使用 getBoundingClientRect
  const getOffset = function (node: any, init?: boolean) {
    // 非Element 终止递归
    if (node.nodeType !== 1) {
      return;
    }
    _position = window.getComputedStyle(node)["position"];

    // position=static: 继续递归父节点
    if (typeof init === "undefined" && _position === "static") {
      if (node.parentNode) {
        getOffset(node.parentNode);
      }
      return;
    }
    OffEst.top = node.offsetTop + OffEst.top - node.scrollTop;
    OffEst.left = node.offsetLeft + OffEst.left - node.scrollLeft;

    // position = fixed: 获取值后退出递归
    if (_position === "fixed") {
      return;
    }
    getOffset(node.parentNode);
  };

  let _position;
  if (element) {
    getOffset(element, true);
  }
  return OffEst;
};

// 异动滚动条到某一位置
export const scrollGoToDom = function (value: any) {
  if (isNumber(value)) {
    return setScrollTop(value);
  }
  if (isString(value) || isElement(value)) {
    const dom = $(value);
    if (dom) {
      const rect = offset(dom);
      return setScrollTop(rect.top);
    }
  }
};

export const unbind = function (namespace: string) {
  if (data.has(namespace)) {
    data.delete(namespace);
  }
};

export const bind = function (namespace: string, callback: Callback) {
  init();
  const value = function (e: Event) {
    return callback(e);
  };
  unbind(namespace);
  data.set(namespace, value);
};
