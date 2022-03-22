/**
 * @file 服务端异常监听
 * @author svon.me@gmail.com
 */

import { Express } from "express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { getEnv, Command } from "src/config";

const isWatch = function (): boolean {
  const env = getEnv();
  // 只有线上环境才执行
  return !!(env.VITE_command && env.VITE_command === Command.build);
};

export const before = function (app: Express) {
  if (isWatch()) {
    Sentry.init({
      dsn: "https://fab97bac3bc54600962a9f6a8957c72e@o1174490.ingest.sentry.io/6270506",
      integrations: [
        // 启用 http 跟踪
        new Sentry.Integrations.Http({
          tracing: true,
        }),
        // 启用 Express 跟踪
        new Tracing.Integrations.Express({ app }),
      ],
      tracesSampleRate: 5.0,
    });
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
  }
};

export const after = function (app: Express) {
  if (isWatch()) {
    app.use(Sentry.Handlers.errorHandler());
  }
};
