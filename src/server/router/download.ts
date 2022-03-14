/**
 * @file  下载页面迁移
 * @author zhangkun@163.com
 */

import { config } from "src/router/config";
import * as down from "src/controller/download";
import { Router as ExpressRouter } from "express";

const Router = function() {
  const router = ExpressRouter();
  router.get(`${config.download}`, down.begin); // 下载首页
  return router;
};

export default Router;