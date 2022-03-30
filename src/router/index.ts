/**
 * @file 路由
 * @author svon.me@gmail.com
 */

import type { Router } from "vue-router";
import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from "vue-router";
import { config } from "./config";

import Home from "./home";
import DAppList from "./dapp";
import BlogList from "./blog";
import User from "./user";
import quota from "./quota";

const routes = [
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
      ...quota,
      {
        path: config.E404,
        component: () => import("src/pages/e404/index.vue"),
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
