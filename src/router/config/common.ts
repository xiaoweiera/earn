/**
 * @file 博客相关路由配置
 * @author svon.me@gmail.com
 */

import { config } from "./option";
import { getEnv } from "src/config/";

export class Router {
  // 下载
  download(query?: object) {
    const env = getEnv();
    if (query) {
      return {
        query,
        path: env.appDownload,
      };
    }
    return env.appDownload;
  }

  downloadPattern() {
    return "/download";
  }

  // 首页
  home(query?: object) {
    if (query) {
      return {
        path: config.dashboard,
        query,
      };
    }
    return config.dashboard;
  }

  homePattern() {
    return config.dashboard;
  }
}
