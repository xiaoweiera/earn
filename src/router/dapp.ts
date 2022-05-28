import { config as router } from "src/router/config";

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

export default routes;
