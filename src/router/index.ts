/**
 * @file 路由
 * @author svon.me@gmail.com
 */

import { config } from "./config";
import {config as router} from "src/router/config";
import {
	Router,
	createWebHistory,
	createMemoryHistory,
	createRouter as _createRouter,
} from "vue-router";

import DAppList from "./dapp";


const routes = [
	{
		path: "/",
		component: () => import("src/pages/layout/index.vue"),
		children: [
			{
				path: "/",
				name: "home",
				component: () => import("src/pages/index.vue"),
			},

			...DAppList,

			{
				path: `${router.blog}/:id`,
				// @ts-ignore
				component: () => import("src/pages/blog/detail.vue")
			},

			{
				path: config.E404,
				component: () => import("src/pages/error.vue"),
			}
		]
	}
]


export function createRouter(): Router {
	return _createRouter({
		routes,
		history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
	});
}
