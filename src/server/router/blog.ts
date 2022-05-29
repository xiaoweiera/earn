/**
 * @file 博客
 * @author svon.me@gmail.com
 */

import * as blog from "src/controller/blog";
import { Router as ExpressRouter } from "express";
import { routerConfig } from "src/router/config";

const Router = function () {
  const router = ExpressRouter();
  // 博客详情
  router.get(routerConfig.blog.detailPattern(), blog.detail);
  // 列表
  router.get(routerConfig.blog.listPattern(), blog.list);

  return router;
};

export default Router;
