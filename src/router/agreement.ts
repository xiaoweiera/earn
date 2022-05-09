/**
 * @file agreement
 */

import { config as router } from "src/router/config";

const routes = [
  {
    path: router.agreement,
    component: () => import("src/pages/agreement/index.vue"),
  },
];

export default routes;
