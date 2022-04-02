
/**
 * @file 下载路由
 */

import { config as router } from "src/router/config";

const routes = [
  {
    path: router.download,
    component: () => import("src/pages/download/index.vue"),
  },
];

export default routes;