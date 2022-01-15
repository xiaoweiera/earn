/**
 * @file 简易模版
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import { rootData } from "src/config";
import Icons from "src/config/iconfont";
import Language from "src/types/language";
import safeGet from "@fengqiaogang/safe-get";
import Crypto from "src/plugins/encryption/crypto";

interface Result {
	data?: object | string;
	lang: Language;
	content: string;
}

const makeScript = function (data: Result): string {
	const code = `window["${rootData}"] = "${Crypto(data)}";`;
	// const i18n = `/libs/language.js?lang=${data.lang}`
	const libs = [...Icons];
	const html = [
		`<script type="application/javascript" charset="UTF-8">${code}</script>`
	];
	_.each(libs, function (src: string) {
		html.push(`<script type="application/javascript" charset="UTF-8" src="${src}"></script>`);
	});
	return html.join("\n");
}

const template = function (html: string, result: Result): string {
	const reg = /{([\w]+)}/g;
	result.data = makeScript(result);
	return html.replace(reg,function(variable: string, key: string): string {
		return safeGet<string>(result, key) || "";
	});
}

export default template;
