/**
 * @file 处理跨域
 * @author svon.me@gmail.com
 */

import {Equals} from "src/utils";
import {NextFunction, Request, Response} from "express";

const cors = function(req: Request, res: Response, next: NextFunction) {
	const origin = req.headers.origin;
	if (origin) {
		res.set({
			// * 为允许任何域访问
			// 如果只允许某个域名 请设置单独的域名
			"Access-Control-Allow-Origin": origin,
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Content-Length, Token, Accept,X-Requested-With",
		});
	}
	if (Equals(req.method, "OPTIONS")) {
		return res.send(200);
	}
	next();
};

export default cors;
