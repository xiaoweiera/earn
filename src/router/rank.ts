/**
 * @file home
 */

import { config as router } from "src/router/config";

const routes = [
  // 列表
  {
    path: router.rankDapp,
    component: () => import("src/pages/rank/dapp/index.vue"),
  },
  {
    path: router.rankGame,
    component: () => import("src/pages/rank/game/index.vue"),
  },
  {
    path: router.rankDefi,
    component: () => import("src/pages/rank/defi/index.vue"),
  },
  {
    path: router.rankNft,
    component: () => import("src/pages/rank/nft/index.vue"),
  },
  // 详情
  {
    path: "/rank/:type/:id",
    component: () => import("src/pages/dapp/detail/index.vue"),
  },
  /*
  {
    path: `${router.rankGame}/:id`,
    component: ()=> import("src/pages/dapp/detail/index.vue")
  },
  {
    path: `${router.rankDefi}/:id`,
    component: ()=> import("src/pages/dapp/detail/index.vue")
  },
  {
    path: `${router.rankNft}/:id`,
    component: ()=> import("src/pages/dapp/detail/index.vue")
  },
   */
];

export default routes;
