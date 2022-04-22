/**
 * @file home
 */

import { config as router } from "src/router/config";

const routes = [
  {
    path: "/",
    component: () => import("src/pages/home/index.vue"),
  },
  {
    path: `${router.homeDetail}/:id`,
    component: () => import("src/pages/home/detail/index.vue"),
  },
];

export default routes;
