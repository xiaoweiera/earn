/**
 * @file Express App
 * @author svon.me@gmail.com
 */

import path from "path";
import Express from "express";
import { getEnv } from "src/config";
import { setClient } from "src/plugins/redis";
import CookieParser from "cookie-parser";
import common from "src/controller/common/";
import cors from "src/controller/common/cors";
import * as console from "src/plugins/log/";
import Site from "src/controller/site/";
import { getRedisClient } from "./redis";
import Assets from "./router/assets";
import Router from "./router/index";

const root: string = path.resolve(__dirname, "../..");

const init = async function() {
  const redis = await getRedisClient();
  if (redis) {
    setClient(redis as any);
  }
};

const main = async function() {
  setTimeout(init);
  const app = Express();
  const config = Object.assign({}, getEnv(), {
    port: process.env.port || 3333,
    host: process.env.host || "0.0.0.0",
  });
  console.log(config);
  app.use(Site(root, config));
  app.use(cors);

  const assets = await Assets(root, config);
  app.use(assets);

  app.use(CookieParser());
  // app.use(userAgent.express());
  // 处理公共数据
  app.use(common);

  const router = await Router(root, config);
  app.use(router);
  // @ts-ignore
  const http = await app.listen(config.port, config.host);
  return { app, http, config };
};

export { main };
