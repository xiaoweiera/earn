/**
 * @file 处理全局公链信息
 * @author svon.me@gmail.com
 */

import API from "src/api";
import type { Request } from "express";
import safeSet from "@fengqiaogang/safe-set";
import * as alias from "src/utils/root/alias";

// 用户公链配置信息
export const chainSiteConfig = async function(req: Request) {
  const api = new API(req);
  const data = await api.common.getChainSiteConfig();
  const result = {};
  safeSet(result, alias.common.chain.site, data);
  return result;
};
