import { config as router } from "src/router/config";

const routes = [
  {
    path: `${router.invest}/:id`,
    component: () => import("src/pages/dapp/investment/detail/index.vue"),
  },
];

export default routes;
