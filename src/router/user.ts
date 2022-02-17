/**
 * @file 用户相关
 */

import {config as router} from "src/router/config";

const routes = [
	{
		// 找回密码
		path: router.user.forget,
		component: () => import("src/pages/account/forget.vue")
	},
];

export default routes;
