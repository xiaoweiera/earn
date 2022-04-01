/**
 * @file MD5
 * @author svon.me@gmail.com
 */

import { v1 as uuidV1, v4 as uuidV4, v5 as uuidV5 } from "uuid";

// 生成唯一值
export const MD5 = function (value?: any): string {
  function create(): string {
    if (value) {
      if (typeof value === "string") {
        return uuidV5(value, uuidV5.URL);
      }
      const text = JSON.stringify({ value });
      return uuidV5(text, uuidV5.URL);
    }
    if (Math.random() > 0.5) {
      return uuidV1();
    }
    return uuidV4();
  }
  const text = create();
  return text.replace(/-/g, "");
};
