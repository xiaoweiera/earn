/**
 * @file 路由
 * @author svon.me@gmail.com
 */

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

const Router = async function (root: string, env: Env): Promise<ExpressRouter> {
  const router = ExpressRouter();
  // 封装 send 方法
  const send = await Send(root, env);
  router.use(send);

  router.get("/demo", function (req: Request, res: Response) {
    res.send({});
  });

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
  // 榜单
  router.use(rank());
  //下载页面
  router.use(down());
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
