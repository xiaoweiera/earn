/**
 * @file freemint
 */

import { config as router } from "src/router/config";

const routes = [
  //feed
  {
    path: router.freemintLive,
    component: () => import("src/pages/freemint/feed/live/index.vue"),
  },
  {
    path: router.freemintTop,
    component: () => import("src/pages/freemint/feed/top/index.vue"),
  },
  // tool
  {
    path: router.freemintNFT,
    component: () => import("src/pages/freemint/tool/nft.vue"),
  },
  {
    path: router.freemintBlock,
    component: () => import("src/pages/freemint/tool/block.vue"),
  },
  {
    path: router.freemintAddress,
    component: () => import("src/pages/freemint/tool/address.vue"),
  },
  {
    path: router.freemintTimer,
    component: () => import("src/pages/freemint/tool/timer.vue"),
  },
];

export default routes;
