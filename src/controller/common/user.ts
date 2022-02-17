/**
 * @file 用户数据
 * @author svon.me@gmail.com
 */

import API from "src/api/index";
import safeSet from "@fengqiaogang/safe-set";
import {NextFunction, Request, Response} from "express";
import {Authorization} from "src/plugins/express/authorization";

export const userInfo = async function(req: Request, res: Response, next: NextFunction) {
	const { token } = Authorization(req);
	if (token) {
		const api = new API(req);
		try {
			const data = await api.user.getInfo();
			if (data) {
				safeSet(res.locals, "common.user", data);
			}
		} catch (e) {
			console.log(e);
			// todo
		}
	}
	next();
}

// 用户找回密码
export const userForget = function (req: Request, res: Response) {
	res.send({});
};
// 邮箱注册
export const register = function (req: Request, res: Response) {
	res.send({});
};


