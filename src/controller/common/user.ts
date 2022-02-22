/**
 * @file 用户数据
 * @author svon.me@gmail.com
 */

import API from "src/api/index";
import safeSet from "@fengqiaogang/safe-set";
import redirect from "src/controller/common/redirect";
import {dashboard, getEnv, tokenName} from "src/config";
import {NextFunction, Request, Response} from "express";
import {Authorization} from "src/plugins/express/authorization";
import safeGet from "@fengqiaogang/safe-get";

const userCache = "common.user";

export const userInfo = async function (req: Request, res: Response, next: NextFunction) {
	const {token} = Authorization(req);
	if (token) {
		const api = new API(req);
		try {
			const data = await api.user.getInfo();
			if (data) {
				safeSet(res.locals, userCache, data);
			}
		} catch (e) {
			console.log(e);
			// todo
		}
	}
	next();
}

// 处理用户退出
export const userLogout = function (req: Request, res: Response) {
	const env = getEnv();
	// 删除用户 cookie
	res.clearCookie(tokenName, {
		path: '/',
		// httpOnly: true,
		domain: env.VITE_cookie,
	});
	redirect(req, res, dashboard);
}

// 前置，如果用户已登录，则跳转走
export const prepend = function (req: Request, res: Response, next: NextFunction) {
	const cache = safeGet(res.locals, userCache);
	if (cache) {
		redirect(req, res, dashboard);
	} else {
		next();
	}
}

// 用户找回密码
export const userForget = function (req: Request, res: Response) {
	res.send({
		title: "找回密码"
	});
};
// 邮箱注册
export const register = function (req: Request, res: Response) {
	res.send({
		title: "注册"
	});
};
// 用户登录
export const login = function (req: Request, res: Response) {
	res.send({
		title: "登录"
	});
};


