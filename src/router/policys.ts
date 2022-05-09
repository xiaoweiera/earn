/**
 * @file policy
 */

import { config as router } from "src/router/config";

const routes = [
  {
    path: router.policy,
    component: () => import("src/pages/policy/index.vue"),
  },
];

export default routes;
