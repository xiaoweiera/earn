/**
 * @file 简易模版
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import htmlEncode from "js-htmlencode";
import { Command, languageKey, rootData } from "src/config";
import { getEnv } from "src/config/";
import Icons from "src/config/iconfont";
import Crypto from "src/plugins/encryption/crypto";
import type { Language } from "src/types/language";
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

const makeScript = async function (data: Result): Promise<string> {
  const env = getEnv();
  const value = _.omit(data, ["content", "libs"]); // "title", "keywords", "description",
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
  // // 人机教验
  // if (env.google && env.google.captcha) {
  //   scriptLibs.push(`https://www.recaptcha.net/recaptcha/api.js?render=${env.google.captcha}`);
  // }
  // 缓存数据
  const text = await Crypto(value);
  const html: string[] = [];
  // 线上模式引入 wechat js sdk
  if (env.VITE_command === Command.build) {
    html.push("<script src=\"//res.wx.qq.com/open/js/jweixin-1.6.0.js\"></script>");
  }
  _.each(scriptLibs, (src: string) => {
    html.push(`<script src="${src}" async="async"></script>`);
  });
  _.each(scriptCodes, (value: string) => {
    html.push(`<script>${value}</script>`);
  });
  if (env.google && env.google.io) {
    let code = "!function(e,t,n,g,i){e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},n=t.createElement(\"script\"),tag=t.getElementsByTagName(\"script\")[0],n.async=1,n.src=('https:'==document.location.protocol?'https://':'http://')+g,tag.parentNode.insertBefore(n,tag)}(window,document,\"script\",\"assets.giocdn.com/2.1/gio.js\",\"gio\");";
    code += `gio("init","${env.google.io}", {});`;
    code += "gio(\"send\");";

    const gio = `window.__gio_init = function() { ${code} };`;

    html.push(`<script>${gio}</script>`);
  }
  html.push(`<script type="text/html" id="${rootData}">${text}</script>`);
  return html.join("");
};

const template = async function (html: string, result: Result): Promise<string> {
  const env = getEnv();
  result.libs = await makeScript(result);
  // 处理 Html 中的转译字符
  result.content = htmlEncode.htmlDecode(result.content);
  const option = Object.assign({ ...env }, result, { languageKey });
  return tpl(html, option);
};

export default template;
