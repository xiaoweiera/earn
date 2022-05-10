/**
 * @file 路由
 * @author svon.me@gmail.com
 */

import { config as router, config } from "./config";
import type { Router } from "vue-router";
import { Activity } from "src/types/common/activity";
import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from "vue-router";

import Home from "./home";
import DAppList from "./dapp";
import BlogList from "./blog";
import User from "./user";
import DownLoad from "./download";
import quota from "./quota";
import rank from "./rank";
import invest from "./invest";

const routes = [
  // 活动
  {
    path: `/activity/${Activity.invite}/:id`,
    component: () => import("src/pages/activity/invite.vue"),
  },
  {
    path: router.agreement,
    component: () => import("src/pages/agreement/index.vue"),
  },
  {
    path: router.instructions,
    component: () => import("src/pages/instructions/index.vue"),
  },
  {
    path: router.policy,
    component: () => import("src/pages/policy/index.vue"),
  },
  {
    path: "/",
    component: () => import("src/pages/layout/index.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("src/pages/home/index.vue"),
      },
      ...User,
      ...Home,
      ...DAppList,
      ...BlogList,
      ...DownLoad,
      ...quota,
      ...rank,
      ...invest,
      {
        path: `${config.apy}/:name*`,
        component: () => import("src/pages/apy/index.vue"),
      },
      {
        path: config.topic,
        component: () => import("src/pages/apy/index.vue"),
      },
      {
        path: config.portfolio,
        component: () => import("src/pages/address/index.vue"),
      },
      {
        path: `${config.address}/:name*`,
        component: () => import("src/pages/address/index.vue"),
      },
      {
        path: config.E404,
        component: () => import("src/pages/e404/index.vue"),
      },
      {
        path: "/demo",
        component: () => import("src/pages/demo/index.vue"),
      },
    ],
  },
];

export function createRouter(): Router {
  return _createRouter({
    routes,
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  });
}
