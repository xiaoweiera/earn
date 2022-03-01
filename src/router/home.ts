/**
 * @file home
 */

import {config as router} from "src/router/config";

const routes = [
	{
		path: router.home,
		component: () => import("src/pages/home/index.vue")
	},
	{
		path: `${router.home}/detail`,
		component: () => import("src/pages/home/detail/index.vue")
	},
];

export default routes;
