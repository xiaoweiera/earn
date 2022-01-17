/**
 * @file 简易模版
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import tpl from "./template";
import htmlEncode from "js-htmlencode";
import Icons from "src/config/iconfont";
import Language from "src/types/language";
import Crypto from "src/plugins/encryption/crypto";
import { rootData, languageLink, languageKey, languageName } from "src/config";

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
	const value = _.omit(data, [languageName, "content", "title", "keywords", "description", "libs"]);
	const code = `window["${rootData}"] = "${Crypto(value)}";`;
	const i18n = `${languageLink}?${languageKey}=${data.lang}`
	const libs = [i18n, ...Icons];
	const html = [
		`<script type="application/javascript" charset="UTF-8">${code}</script>`
	];
	_.each(libs, function (src: string) {
		html.push(`<script type="application/javascript" charset="UTF-8" src="${src}"></script>`);
	});
	return html.join("\n");
}

const template = function (html: string, result: Result): string {
	result.libs = makeScript(result);
	// 处理 Html 中的转译字符
	result.content = htmlEncode.htmlDecode(result.content);
	const option = Object.assign({}, result, { languageKey });
	return tpl(html, option);
}

export default template;
