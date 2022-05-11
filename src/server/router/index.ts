/**
 * @file 路由
 * @author svon.me@gmail.com
 */

import { names } from "src/config/header/";
import type { Env } from "src/config";
import Send from "src/plugins/express/send";
import redirect from "src/controller/common/redirect";
import { config as routerConfig } from "src/router/config";
import type { Request, Response } from "express";
import { Router as ExpressRouter } from "express";
import user from "./user";
import dApp from "./dapp";
import home from "./home";
import blog from "./blog";
import quota from "./quota";
import rank from "./rank";
import down from "./download";
import { app as activeApp } from "src/controller/activity/";
import invest from "./invest";
import apply from "./apply";
import agreement from "./agreement";
import instructions from "./instructions";
import policys from "./policys";
import Web3 from "./web3";

const Router = async function (root: string, env: Env): Promise<ExpressRouter> {
  const router = ExpressRouter();
  // 封装 send 方法
  const send = await Send(root, env);
  router.use(send);

  router.get("/demo", function (req: Request, res: Response) {
    res.send({});
  });
  // 活动
  router.get("/activity/:type/:id", activeApp);
  //协议书
  router.use(agreement());
  //使用说明
  router.use(instructions());
  //用户需知
  router.use(policys());
  // 榜单
  router.use(rank());
  // 装载 DApp 相关路由
  router.use(dApp());
  // 封装 user 相关路由
  router.use(user());
  // 装载Home相关路由
  router.use(home());
  // 装载博客相关路由
  router.use(blog());
  // 指标
  router.use(quota());
  //投融资
  router.use(invest());
  //下载页面
  router.use(down());
  //申请页面
  router.use(apply());
  // web3 页面
  router.use(Web3());
  router.get("/api", function (req: Request, res: Response) {
    res.locals.menuActive = names.api.api;
    res.send({});
  });
  router.get("/token", function (req: Request, res: Response) {
    res.locals.menuActive = names.analysis.token;
    res.send({});
  });
  // 404
  router.get(routerConfig.E404, (req: Request, res: Response) => {
    res.send({});
  });
  router.get("*", (req: Request, res: Response) => {
    const reg = /^.+(\.js|\.css|\.jpg|.jpeg|\.gif|\.svg|\.ttf)$/i;
    if (reg.test(req.url)) {
      return res.send(404);
    } else {
      redirect(req, res, routerConfig.E404);
    }
  });
  return router;
};

export default Router;
