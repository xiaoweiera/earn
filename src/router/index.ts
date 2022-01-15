/**
 * @file 路由
 * @author svon.me@gmail.com
 */

import {
	Router,
	createWebHistory,
	createMemoryHistory,
	createRouter as _createRouter,
} from "vue-router";


const routes = [
	{
		path: '/',
		component: () => import('src/pages/index.vue'),
	}
]


export function createRouter(): Router {
	return _createRouter({
		routes,
		history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
	});
}
