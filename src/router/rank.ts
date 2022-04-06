/**
 * @file home
 */

import { config as router } from "src/router/config";

const routes = [
  {
    path: `${router.rankDapp}`,
    component: () => import("src/pages/rank/dapp/index.vue"),
  },
  {
    path: `${router.rankGame}`,
    component: () => import("src/pages/rank/game/index.vue"),
  },
  {
    path: `${router.rankDefi}`,
    component: () => import("src/pages/rank/defi/index.vue"),
  },
  {
    path: `${router.rankNft}`,
    component: () => import("src/pages/rank/nft/index.vue"),
  },
];

export default routes;