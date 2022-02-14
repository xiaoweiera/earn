/**
 * @file 处理用户信息
 * @author svon.me@gmail.com
 */


import {Request, Response} from "express";
import safeGet from "@fengqiaogang/safe-get";

export const Authorization = function (req: Request, res: Response): object {
	const cookie = req.cookies;
	const token = safeGet<string>(cookie, "token");
	return { token };
}
