/**
 * @file 指标
 * @author svon.me@gmail.com
 */

import API from "src/api/";
import safeGet from "@fengqiaogang/safe-get";
import { names } from "src/config/header";
import * as alias from "src/utils/root/alias";
import type { Request, Response } from "express";
import { go404 } from "src/controller/common/redirect";

// 列表
export const signals = async function (req: Request, res: Response) {
  const api = new API(req);

  res.locals.menuActive = names.quota.signals;

  const list = await api.quota.getSignals({
    page: 1,
    page_size: 100,
  });

  const data = {
    [alias.quota.signals]: list,
  };
  res.send(data);
};

// 详情
export const detail = async function (req: Request, res: Response) {
  const id = safeGet<string>(req.params, "id");
  if (id) {
    const api = new API(req);
    const [data, recommend] = await Promise.all([
      api.quota.getDetail(id), // 详情数据
      api.quota.getRecommend(id), // 相关推荐
    ]);
    res.locals.menuActive = names.quota.signals;
    res.send({
      [alias.quota.detail]: data,
      [alias.quota.recommend]: recommend,
    });
  } else {
    go404(req, res);
  }
};
