/**
 * @file 静态文件处理
 * @author svon.me@gmail.com
 */
import path from "path";
import _ from "lodash";
import { createServer } from "vite";
import Compression from "compression";
import type { Env } from "src/config";
import { Command } from "src/config";
import redirect from "src/controller/common/redirect";
import { config as routerConfig } from "src/router/config";
import type { Request, Response } from "express";
import Express, { Router } from "express";

// 代理静态服务
const staticServer = function(src: string) {
  return Express.static(src, {
    // 设置强缓
    immutable: true,
    maxAge: "31536000000",
  });
};

const Assets = async function(root: string, env: Env) {
  const router = Router();
  const goHome = function(req: Request, res: Response) {
    redirect(req, res, routerConfig.home);
  };
  if (env.VITE_command === Command.build) {
    router.use(Compression());
    if (env.VITE_staticPath && !/^http/.test(env.VITE_staticPath)) {
      router.all(`${env.VITE_staticPath}/:date`, goHome);
      router.all(`${env.VITE_staticPath}/:date/index`, goHome);
      router.all(`${env.VITE_staticPath}/:date/index.html`, goHome);

      const dist = path.join(root, "dist/client");
      // 设置静态文件代理
      router.use(`${env.VITE_staticPath}/:date`, staticServer(dist));
    }
  } else {
    const vite = await createServer({
      root,
      logLevel: "info",
      server: {
        middlewareMode: "ssr",
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
    });
    router.use(vite.middlewares);
  }
  _.each(["assets", "images", "libs", "util"], (value: string) => {
    router.use(`/${value}`, staticServer(path.join(root, `public/${value}`)));
  });
  return router;
};

export default Assets;
