/**
 * @file 参数定义
 * @author svon.me@gmail.com
 */

import type { PropType } from "vue";

export enum Name {
  a = "a",
  span = "span",
  div = "div",
  link = "router-link",
}

export enum Target {
  self = "_self",
  blank = "_blank",
}

export const props = {
  name: {
    type: String as PropType<Name>,
  },
  href: {
    type: [String, Object],
  },
  target: {
    type: String as PropType<Target>,
    default: () => Target.self,
  },
  login: {
    type: Boolean,
    default: () => false,
  },
  disable: {
    type: Boolean,
    default: () => false,
  },
};
