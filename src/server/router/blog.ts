/**
 * @file 博客
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import * as blog from "src/controller/blog";
import safeGet from "@fengqiaogang/safe-get";
import redirect from "src/controller/common/redirect";
import { config as routerConfig } from "src/router/config";
import type { Request, Response } from "express";
import { Router as ExpressRouter } from "express";

const Router = function () {
  const router = ExpressRouter();
  //兼容博客详情页老路由
  router.get(`${routerConfig.blog}/detail`, (req: Request, res: Response) => {
    const query = req.query;
    const id = safeGet<string>(query, "id");
    if (id) {
      const value = _.omit<object>(query, ["id"]);
      redirect(req, res, `${routerConfig.blog}/${id}`, { ...value });
    } else {
      redirect(req, res, routerConfig.blog);
    }
  });
  // 博客详情
  router.get(`${routerConfig.blog}/:id`, blog.detail);
  // 列表
  router.get(routerConfig.blog, blog.list);

  return router;
};

export default Router;
