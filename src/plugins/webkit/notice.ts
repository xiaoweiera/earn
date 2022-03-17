/**
 * @file 浏览器通知
 */
import { omit } from "ramda";
import window from "src/plugins/browser/window";
import { uuid } from "src/utils";

const cache = new Map<string, any>();

interface Option {
  icon: string;
  body: string;
  requireInteraction: boolean;
}

interface Param {
  title: string;
  options: Option;
  callback?: () => void;
}

export const showNotice = function (param: Param) {
  const notify = new Notification(param.title, param.options);
  notify.onclick = function () {
    try {
      window.focus();
      if (param.callback) {
        param.callback();
      }
    } catch (e) {
      // todo
    } finally {
      notify.close();
    }
  };
};
export const notifyMe = function (param: Param) {
  const key = uuid(omit(["callback"], param));
  if (cache.has(key)) {
    return false;
  }
  cache.set(key, param);
  const Notification = window["Notification"];
  if (Notification) {
    if (Notification.permission === "granted") {
      showNotice(param);
      return;
    }
    if (Notification.permission !== "denied") {
      const callback = function (permission: string) {
        if (permission === "granted") {
          // 如果用户同意，就可以向他们发送通知
          showNotice(param);
        }
      };
      Notification.requestPermission(callback);
    }
  }
};
