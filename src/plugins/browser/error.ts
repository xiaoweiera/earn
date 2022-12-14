/**
 * @file 网站数据异常监听
 * @author svon.me@gmail.com
 */

import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";
import { Command, getEnv } from "src/config";

const isWatch = function (): boolean {
  const env = getEnv();
  // 只有线上环境才执行
  return !!(env.VITE_command && env.VITE_command === Command.build);
};

const app = function () {
  Sentry.init({
    dsn: "https://fab97bac3bc54600962a9f6a8957c72e@o1174490.ingest.sentry.io/6270506",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 5.0,
  });
};

const main = function () {
  if (isWatch()) {
    app();
  }
};

main();
