/**
 * @file 浏览器补丁
 * @author svon.me@gmail.com
 */

import document from "./document";
import { $ } from "./event";
import { getUA } from "./ua";

// 禁用双指缩放
const touchStart = function (event: Event) {
  // @ts-ignore
  if (event.touches.length > 1) {
    event.preventDefault();
  }
};

// 禁用双击缩放
let lastTouchEnd = 0;
const touchEnd = function (event: Event) {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
};

const hack = function () {
  const ua = getUA();
  if (ua.isiPod || ua.isiPhone || ua.isiPad) {
    const $doc = $(document);
    if ($doc) {
      $(document).on("touchstart", touchStart);
      $(document).on("touchend", touchEnd);
    }
  }
};

setTimeout(hack);
