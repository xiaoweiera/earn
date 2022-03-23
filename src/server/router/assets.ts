/**
 * @file 静态文件处理
 * @author svon.me@gmail.com
 */
import path from "path";
import _ from "lodash";
import fs from "fs";
import { createServer } from "vite";
import Compression from "compression";
import type { Env } from "src/config";
import { Command } from "src/config";
import { goHome } from "src/controller/common/redirect";
import type { Request, Response } from "express";
import Express, { Router } from "express";
import * as console from "src/plugins/log/";

// 代理静态服务
const staticServer = function (src: string) {
  return Express.static(src, {
    // 设置强缓
    immutable: true,
    maxAge: "31536000000",
  });
};

const staticFiles = function (src: string) {
  return _.map(fs.readdirSync(src), (name: string) => {
    return {
      name,
      dir: `${src}/${name}`,
    };
  });
};

const Assets = async function (root: string, env: Env) {
  const router = Router();
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
  // 获取静态文件夹下文件列表
  const files = staticFiles(`${root}/public`);
  for (const item of files) {
    console.log("assets : ", item.dir);
    const data = fs.statSync(item.dir);
    if (data.isDirectory()) {
      // 如果是文件夹
      router.use(`/${item.name}`, staticServer(path.join(root, item.dir)));
    } else {
      // 单文件处理方式
      router.get(`/${item.name}`, function (req: Request, res: Response) {
        res.sendFile(item.dir);
      });
    }
  }
  return router;
};

export default Assets;
