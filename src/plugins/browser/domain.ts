/**
 * @file 域名处理
 * @author svon.me@gmail.com
 */

import { getEnv } from "src/config";
import window from "./window";

const getDomain = function(): string {
  const config = getEnv();
  if (config.VITE_domain) {
    return config.VITE_domain;
  }
  return window.location.origin;
};

export default getDomain;
