/**
 * @file 用户数据
 * @author svon.me@gmail.com
 */

import API from "src/api/index";
import safeSet from "@fengqiaogang/safe-set";
import {NextFunction, Request, Response} from "express";
import {Authorization} from "src/plugins/express/authorization";

const User = async function(req: Request, res: Response, next: NextFunction) {
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

export default User;
