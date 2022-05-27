/**
 * @file 指标
 * @author svon.me@gmail.com
 */

import { config as routerConfig } from "src/router/config";

const routes = [
  {
    // 推荐指标
    path: routerConfig.quota,
    component: () => import("src/pages/quota/indicators/index.vue"),
  },
  {
    // 指标详情
    path: `${routerConfig.quota}/:id`,
    component: () => import("src/pages/quota/indicators/detail.vue"),
  },
  {
    // 指标异动 - 列表
    path: routerConfig.news,
    component: () => import("src/pages/quota/signals.vue"),
  },
  {
    // 指标异动 - 详情
    path: `${routerConfig.news}/:id`,
    component: () => import("src/pages/quota/detail/index.vue"),
  },
];

export default routes;
