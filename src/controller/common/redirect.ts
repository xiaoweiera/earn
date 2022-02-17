/**
 * @file 重定向
 * @author svon.me@gmail.com
 */

import {languageKey} from "src/config";
import {Request, Response} from "express";
import {Language} from "src/types/language";
import safeGet from "@fengqiaogang/safe-get";
import {Query} from "src/types/browser/location";
import {createHref} from "src/plugins/router/pack";

const redirect = function (req: Request, res: Response, url: string, query: Query = {}) {
	const lang = safeGet<string>(req.query, languageKey) || Language.auto;
	const value: Query = { [languageKey]: lang, ...query };
	// 重定向到指定 url 中
	res.redirect(302, createHref(url, value));
};

export default redirect;
