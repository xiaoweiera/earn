/**
 * @file 简易模版
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import htmlEncode from "js-htmlencode";
import Icons from "src/config/iconfont";
import type { Language } from "src/types/language";
import Crypto from "src/plugins/encryption/crypto";
import { languageKey, rootData } from "src/config";
import { getEnv, production } from "src/config/";
import tpl from "./template";

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

const makeScript = function(data: Result): string {
  const env = getEnv();

  const value = _.omit(data, ["title", "keywords", "description", "content", "libs"]);
  const scriptCodes: string[] = [];
  const scriptLibs: string[] = [...Icons];

  // 百度
  if (env.baidu && env.baidu.tag) {
    scriptLibs.push(`https://hm.baidu.com/hm.js?${env.baidu.tag}`);
  }
  // 谷歌
  if (env.google && env.google.tag) {
    const id = env.google.tag;
    scriptLibs.push(`https://www.googletagmanager.com/gtag/js?id=${id}`);
    scriptCodes.push(`window.dataLayer = window.dataLayer || []; function gtag(){ dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${id}');`);
  }
  /*
	// 人机教验
	if (env.google && env.google.captcha) {
		scriptLibs.push(`https://www.recaptcha.net/recaptcha/api.js?render=${env.google.captcha}`);
	}
	*/
  // 缓存数据
  scriptCodes.push(`window["${rootData}"] = "${Crypto(value)}";`);

  const html: string[] = [];
  _.each(scriptLibs, (src: string) => {
    html.push(`<script src="${src}" async="async"></script>`);
  });
  _.each(scriptCodes, (value: string) => {
    html.push(`<script>${value}</script>`);
  });
  return html.join("");
};

const template = function(html: string, result: Result): string {
  const env = getEnv();
  result.libs = makeScript(result);
  // 处理 Html 中的转译字符
  result.content = htmlEncode.htmlDecode(result.content);
  const option = Object.assign({ ...env }, result, { languageKey });
  return tpl(html, option);
};

export default template;
