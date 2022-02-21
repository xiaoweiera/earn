/**
 * @file 监听页面滚动条
 * @author svon.me@gmail.com
 */

import { max } from 'src/utils';
import * as event from './index';
import document from "src/plugins/browser/window";

type Callback = (e: Event) => void

let initAdd = false

const data = new Map<string, Callback>()

// 删除事件
const removeScroll = function() {
  if (data.size === 0) {
    initAdd = false
    event.removeEvent(document as any, 'scroll', onScroll)
  }
}

const onScroll = function(e: Event) {
  data.forEach(function(callback: Callback) {
    callback(e)
  })
  removeScroll()
}

const init = function() {
  if (initAdd) {
    return initAdd
  }
  initAdd = true
  event.addEvent(document as any, 'scroll', onScroll)
}

export const viewHieght = function() {
  return document.documentElement.clientHeight
}
export const viewWidth = function() {
  return max(document.body.clientWidth, document.documentElement.clientWidth)
}

export const bodyHeight = function() {
  return document.body.clientHeight
}

export const scrollTop = function(): number {
  let scroll_top = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scroll_top = document.documentElement.scrollTop
  }
  else if (document.body) {
    scroll_top = document.body.scrollTop
  }
  return scroll_top;
}

// 设置页面滚动条位置
export const setScrollTop = function(top: number = 0) {
  // @ts-ignore
  document.scrollingElement.scrollTop = top
}

export const unbind = function(namespace: string) {
  if (data.has(namespace)) {
    data.delete(namespace)
  }
}

export const bind = function(namespace: string, callback: Callback) {
  init()
  const value = function(e: Event) {
    return callback(e)
  }
  unbind(namespace)
  data.set(namespace, value)
}


