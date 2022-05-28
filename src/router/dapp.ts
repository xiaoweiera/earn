import { routerConfig } from "src/router/config";
/*
const routes = [
  {
    path: `${router.dappList}/discover`,
    component: () => import("src/pages/dapp/discover.vue"),
  },
  {
    path: `${router.nftList}/discover`,
    component: () => import("src/pages/dapp/nft.vue"),
  },
  {
    path: `${router.airdrop}/list/:name`,
    component: () => import("src/pages/dapp/airdrop/index.vue"),
  },
  {
    path: router.invest,
    component: () => import("src/pages/dapp/investment/index.vue"),
  },
  {
    path: `${router.invest}/:id`,
    component: () => import("src/pages/dapp/investment/detail/index.vue"),
  },
  // 详情
  {
    path: `${router.dapp}/:id`,
    component: () => import("src/pages/dapp/detail/index.vue"),
  },
  {
    path: `${router.dapp}/:id/:tab`,
    component: () => import("src/pages/dapp/detail/index.vue"),
  },
  {
    path: `${router.nft}/:id`,
    component: () => import("src/pages/dapp/detail/index.vue"),
  },
  {
    path: `${router.nft}/:id/:tab`,
    component: () => import("src/pages/dapp/detail/index.vue"),
  },
  {
    path: `${router.airdrop}/:id`,
    component: () => import("src/pages/dapp/detail/index.vue"),
  },
  {
    path: `${router.airdrop}/:id/:tab`,
    component: () => import("src/pages/dapp/detail/index.vue"),
  },
  {
    path: `${router.funds}/:id`,
    component: () => import("src/pages/dapp/detail/index.vue"),
  },
  {
    path: `${router.funds}/:id/:tab`,
    component: () => import("src/pages/dapp/detail/index.vue"),
  },
  {
    path: router.dappApply,
    component: () => import("src/pages/dapp/apply/index.vue"),
  },
];
 */

const routes = [
  // ido 列表
  {
    path: routerConfig.dapp.idoListPattern(),
    component: () => import("src/pages/dapp/list/ido.vue"),
  },
  // igo
  {
    path: routerConfig.dapp.igoListPattern(),
    component: () => import("src/pages/dapp/list/igo.vue"),
  },
  // nft
  {
    path: routerConfig.dapp.nftListPattern(),
    component: () => import("src/pages/dapp/list/mint.vue"),
  },
  // airdrop
  {
    path: routerConfig.dapp.airdropListPattern(),
    component: () => import("src/pages/dapp/list/airdrop.vue"),
  },
  // 详情
  {
    path: routerConfig.dapp.idoDetailPattern(),
    component: () => import("src/pages/dapp/detail/index.vue"),
  },
  {
    path: routerConfig.dapp.igoDetailPattern(),
    component: () => import("src/pages/dapp/detail/index.vue"),
  },
  {
    path: routerConfig.dapp.nftDetailPattern(),
    component: () => import("src/pages/dapp/detail/index.vue"),
  },
  {
    path: routerConfig.dapp.airdropDetailPattern(),
    component: () => import("src/pages/dapp/detail/index.vue"),
  },
  {
    path: routerConfig.dapp.investListPattern(),
    component: () => import("src/pages/dapp/investment/index.vue"),
  },
  {
    path: routerConfig.dapp.investDetailPattern(),
    component: () => import("src/pages/dapp/investment/detail/index.vue"),
  },
];

export default routes;
