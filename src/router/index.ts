/**
 * @file 路由
 * @author svon.me@gmail.com
 */

import { config } from "./config";
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
