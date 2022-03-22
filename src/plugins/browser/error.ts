/**
 * @file 网站数据异常监听
 * @author svon.me@gmail.com
 */

import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";
import { getEnv, production } from "src/config";

const app = function () {
  Sentry.init({
    dsn: "https://fab97bac3bc54600962a9f6a8957c72e@o1174490.ingest.sentry.io/6270506",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
};

const main = function () {
  const env = getEnv();
  // 只有线上环境才执行
  if (env.VITE_name && env.VITE_name === production) {
    app();
  }
};

main();
