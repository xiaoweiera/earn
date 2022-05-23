/**
 * @file 临时缓存
 * @author svon.me@gmail.com
 */

import window from "src/plugins/browser/window";

export class Storage {
  private map: Map<string, string>;
  constructor() {
    this.map = new Map<string, string>();
  }
  hasOwnProperty(key: string): boolean {
    return this.map.has(key);
  }
  setItem(key: string, value = "") {
    this.map.set(key, value);
  }
  getItem(key: string) {
    return this.map.get(key);
  }
  removeItem(key: string) {
    return this.map.delete(key);
  }
  clear() {
    this.map.clear();
  }
}

export const cache = window.sessionStorage ? window.sessionStorage : new Storage();
