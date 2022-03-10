/**
 * @file window 对象
 * @author svon.me@gmail.com
 */

import { IsSSR } from "src/config/ssr";

type Document = Record<string, any>;

let doc: Document = {};

if (IsSSR()) {
  doc = {
    documentElement: {
      clientHeight: 600,
      clientWidth: 1200,
      scrollTop: 0,
    },
    scrollingElement: {
      scrollTop: 0,
    },
    body: {
      scrollTop: 0,
      appendChild() {
        // todo
      },
      removeChild() {
        // todo
      },
    },
    execCommand() {
      // todo
    },
    querySelector() {
      // todo
    },
    createElement() {
      // todo
    },
  };
} else {
  try {
    doc = document;
  } catch (e) {
    // todo
  }
}

export default { ...doc };
