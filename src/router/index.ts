/**
 * @file 路由
 * @author svon.me@gmail.com
 */

import { config } from "./config";
import {
	Router,
	createWebHistory,
	createMemoryHistory,
	createRouter as _createRouter,
} from "vue-router";

import DAppList from "./dapp";
import BlogList from "./blog";


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
			...BlogList,

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
