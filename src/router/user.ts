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
	{
		// 邮箱注册
		path: router.user.register,
		component: () => import("src/pages/account/register.vue")
	},
];

export default routes;
