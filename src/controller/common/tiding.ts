/**
 * @file 导航菜单消息
 * @author svon.me@gmail.com
 */

import API from "src/api";
import type { Request, Response } from "express";
import safeSet from "@fengqiaogang/safe-set";
import * as alias from "src/utils/root/alias";
import Cookie from "src/plugins/browser/cookie";

// 用户公链配置信息
export const getTidings = async function(req: Request, res: Response) {
  const api = new API(req);
  const list = await api.common.getTidings();
  const result = {};
  const cookie = new Cookie(req, res);
  cookie.setTidingTime();
  safeSet(result, alias.common.tiding.list, list);

  return result;
};
