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
import { getEnv, production } from "src/config/";

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
	const dataCode = `window["${rootData}"] = "${Crypto(value)}";`;
	let seoCode = '';

	// 谷歌人机教验
	const recaptcha = `https://www.recaptcha.net/recaptcha/api.js?render=${env.google.captcha}`;

	const libs = [ ...Icons, recaptcha ];

	// 正式环境下生效
	if (env.VITE_mode === production) {
		// 百度统计
		libs.push('https://hm.baidu.com/hm.js?fdb9f024136898f0d5822f8a4b71b036');
		// 谷歌统计
		libs.push('https://www.googletagmanager.com/gtag/js?id=G-0L1ZS5F062');
		seoCode = `window.dataLayer = window.dataLayer || []; function gtag(){ dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-0L1ZS5F062');`;
	}
	const html: string[] = [];
	_.each(libs, function (src: string) {
		html.push(`<script src="${src}" async></script>`);
	});
	if (seoCode) {
		html.push(`<script>${seoCode}</script>`);
	}
	html.push(`<script>${dataCode}</script>`);
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
