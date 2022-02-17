/**
 * @file 简易模版
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import tpl from "./template";
import htmlEncode from "js-htmlencode";
import Icons from "src/config/iconfont";
import { Language } from "src/types/language";
import Crypto from "src/plugins/encryption/crypto";
import {rootData, languageKey} from "src/config";
import { getEnv } from "src/config/";

interface Result {
	lang: Language;
	title: string;
	content: string;
	keywords: string;
	description: string;
	data?: string;
	libs?: string;
	[key: string]: any;
}

const makeScript = function (data: Result): string {
	const env = getEnv();

	const value = _.omit(data, [ "title", "keywords", "description", "content", "libs" ]);
	const code = `window["${rootData}"] = "${Crypto(value)}";`;

	// 谷歌人机教验
	const recaptcha = `https://www.recaptcha.net/recaptcha/api.js?render=${env.google.captcha}`;

	const libs = [ ...Icons, recaptcha ];

	const html: string[] = [];
	_.each(libs, function (src: string) {
		html.push(`<script src="${src}" async></script>`);
	});
	html.push(`<script>${code}</script>`);
	return html.join("");
}

const template = function (html: string, result: Result): string {
	result.libs = makeScript(result);
	// 处理 Html 中的转译字符
	result.content = htmlEncode.htmlDecode(result.content);
	const option = Object.assign({}, result, {languageKey});
	return tpl(html, option);
}

export default template;
