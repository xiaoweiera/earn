import { config as routerConfig, config } from "src/router/config";
import * as home from "src/controller/home";
import { Request, Response, Router as ExpressRouter } from "express";
import * as dApp from "src/controller/invest";
import safeGet from "@fengqiaogang/safe-get";
import _ from "lodash";
import redirect from "src/controller/common/redirect";

const Router = function () {
  const router = ExpressRouter();
  router.get("/", home.begin); // home.begin
  //兼容详情页老路由
  router.get(`${routerConfig.homeDetail}/detail`, (req: Request, res: Response) => {
    const query = req.query;
    const id = safeGet<string>(query, "id");
    if (id) {
      const value = _.omit<object>(query, ["id"]);
      redirect(req, res, `${routerConfig.homeDetail}/${id}`, { ...value });
    } else {
      redirect(req, res, routerConfig.homeDetail);
    }
  });
  router.get(`${config.homeDetail}/:id`, home.detail);
  return router;
};

export default Router;
