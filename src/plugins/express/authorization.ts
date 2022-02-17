/**
 * @file 处理用户信息
 * @author svon.me@gmail.com
 */


import {Request} from "express";
import { tokenName } from "src/config/";
import safeGet from "@fengqiaogang/safe-get";

interface Auth {
	token: string
}

export const Authorization = function (req: Request): Auth {
	const cookie = req.cookies;
	const token = safeGet<string>(cookie, tokenName);
	return { token };
}
