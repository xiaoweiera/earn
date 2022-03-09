/**
 * @file 简易模版
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";

const template = function(text: string, data: object): string {
  const reg = /{([\w]+)}/g;
  return text.replace(reg, (variable: string, key: string): string => {
    return safeGet<string>(data, key) || "";
  });
};

export default template;
