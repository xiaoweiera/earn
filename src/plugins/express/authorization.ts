/**
 * @file 处理用户信息
 * @author svon.me@gmail.com
 */

import jsCookie from "js-cookie";
import {Request, Response} from "express";
import {getEnv, tokenName} from "src/config/";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";

interface Auth {
	token?: string
}

// 获取用户凭证
export const Authorization = function (req?: Request): Auth {
	if (req && req.cookies) {
		const token = safeGet<string>(req.cookies, tokenName);
		return { token };
	} else {
		const token = jsCookie.get(tokenName);
		return { token };
	}
}

// 删除用户凭证
export const removeAuthInfo = function (req?: Request, res?: Response) {
	const env = getEnv();
	if (req && res) {
		const cookie = req.cookies;
		safeSet(cookie, tokenName, "");
		// 删除用户 cookie
		res.clearCookie(tokenName, {
			path: '/',
			// httpOnly: true,
			domain: env.VITE_cookie,
		});
	} else {
		jsCookie.remove(tokenName, {
			domain: env.VITE_cookie,
			path: '/',
		});
	}
}
