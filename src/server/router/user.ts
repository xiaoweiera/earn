/**
 * @file 用户信息
 * @author svon.me@gmail.com
 */

import { Router as ExpressRouter } from "express";
import { userForget } from "src/controller/common/user";
import {config as routerConfig} from "src/router/config";

const User = function() {
	const router = ExpressRouter();

	// 找回密码
	router.all(routerConfig.user.forget, userForget);

	// 邮箱注册
	router.all(routerConfig.user.register, userForget);

	return router;
}

export default User;

