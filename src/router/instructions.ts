/**
 * @file instructions
 */

import { config as router } from "src/router/config";

const routes = [
  {
    path: router.instructions,
    component: () => import("src/pages/instructions/index.vue"),
  },
];

export default routes;
