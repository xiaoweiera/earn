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
import Web3 from "./web3";
import Earn from "./earn"

const Router = async function (root: string, env: Env): Promise<ExpressRouter> {
  const router = ExpressRouter();
  // 封装 send 方法
  const send = await Send(root, env);
  router.use(send);

  router.use(Web3());

  router.use(Earn())
  router.get(routerConfig.api, function (req: Request, res: Response) {
    res.locals.menuActive = names.api.api;
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
