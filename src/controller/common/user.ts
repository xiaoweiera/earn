/**
 * @file 用户数据
 * @author svon.me@gmail.com
 */

import API from "src/api/index";
import {dashboard} from "src/config";
import safeSet from "@fengqiaogang/safe-set";
import safeGet from "@fengqiaogang/safe-get";
import * as alias from "src/utils/root/alias";
import redirect from "src/controller/common/redirect";
import {NextFunction, Request, Response} from "express";
import {Authorization, removeAuthInfo} from "src/plugins/express/authorization";

// 用户详情
export const userInfo = async function (req: Request, res: Response) {
	const {token} = Authorization(req);
	if (token) {
		const api = new API(req);
		try {
			const data = await api.user.getInfo();
			if (data) {
				const result = {};
				safeSet(result, alias.common.user, data);
				return result;
			}
		} catch (e) {
			removeAuthInfo(req, res); // 删除用户 token
		}
	}
	return {};
}

// 处理用户退出
export const userLogout = function (req: Request, res: Response) {
	removeAuthInfo(req, res);
	redirect(req, res, dashboard);
}

// 前置，如果用户已登录，则跳转走
export const prepend = function (req: Request, res: Response, next: NextFunction) {
	const cache = safeGet(res.locals, alias.common.user);
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


