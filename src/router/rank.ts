/**
 * @file home
 */

import { config as router } from "src/router/config";

const routes = [
  {
    path: `${router.rankDapp}`,
    component: () => import("src/pages/rank/dapp/index.vue"),
  },
];

export default routes;
