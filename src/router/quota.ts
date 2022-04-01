/**
 * @file 指标
 * @author svon.me@gmail.com
 */

import { config as routerConfig } from "src/router/config";

const routes = [
  {
    // 指标推荐 - 列表
    path: routerConfig.news,
    component: () => import("src/pages/quota/signals.vue"),
  },
  {
    // 指标推荐 - 详情
    path: `${routerConfig.news}/:id`,
    component: () => import("src/pages/quota/detail/index.vue"),
  },
];

export default routes;
