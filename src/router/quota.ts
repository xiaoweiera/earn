/**
 * @file 指标
 * @author svon.me@gmail.com
 */

import { config as routerConfig } from "src/router/config";

const routes = [
  {
    // 指标推荐
    path: routerConfig.news,
    component: () => import("src/pages/quota/signals.vue"),
  },
];

export default routes;
