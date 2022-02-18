/**
 * @file 公共逻辑
 * @author svon.me@gmail.com
 */

import { userInfo } from "./user";
import redirect from "./redirect";
import { getEnv } from "src/config/"
import {Router, Request, Response} from "express";
import { tokenName, dashboard } from "src/config/";
import { config as routerConfig } from "src/router/config";

const common = Router();

// 处理用户退出
common.all(routerConfig.user.logout, function (req: Request, res: Response) {
	const env = getEnv();
	// 删除用户 cookie
	res.clearCookie(tokenName, {
		path: '/',
		// httpOnly: true,
		domain: env.VITE_cookie,
	});
	redirect(req, res, dashboard);
});

common.use(userInfo);

export default common;
