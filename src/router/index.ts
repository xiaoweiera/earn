/**
 * @file 路由
 * @author svon.me@gmail.com
 */

import { config as router, config } from "./config";
import type { Router } from "vue-router";
import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from "vue-router";

import Earn from "./earn"
const routes = [
  {
    path: "/",
    component: () => import("src/pages/layout/earn/index.vue"),
    children: [
      {
        path: "/",
        name: "earn",
        component: () => import("src/pages/earn/index.vue"),
      },
        ...Earn,
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
