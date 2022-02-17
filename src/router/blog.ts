/**
 * @file 博客
 */

import {config as router} from "src/router/config";

const routes = [
	{
		path: `${router.blog}/:id`,
		component: () => import("src/pages/blog/detail.vue")
	},
	{
		path: `${router.blog}/detail`,
		component: () => import("src/pages/blog/detail.vue")
	},
	{
		path: router.blog,
		// @ts-ignore
		component: () => import("src/pages/blog/list.vue")
	},
];

export default routes;
