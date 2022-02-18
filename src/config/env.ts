import path from "path";
import dotenv from "dotenv";
import {ConfigEnv} from "vite";
import UrlPattern from "url-pattern";
import safeGet from "@fengqiaogang/safe-get";
import { ImportMetaEnv, production } from "../types/env";

interface Result {
	error?: boolean;
	parsed: ImportMetaEnv;
}

const getCookieDomain = function (data: ImportMetaEnv): string {
	if (data.VITE_cookie) {
		return data.VITE_cookie;
	}
	if (data.VITE_domain) {
		const reg = '(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/*)';
		const pattern = new UrlPattern(reg);
		const result = pattern.match(data.VITE_domain);
		return `${result.domain}.${result.tld}`;
	}
	return "";
}

export const getConfig = function(env: ConfigEnv | object): Promise<ImportMetaEnv> {
  let result: Result;
	const mode = safeGet<string>(env, "mode");
  if (mode !== production) {
    const src = path.join(__dirname, "../..", `.env.${mode}`);
		console.log("env src = %s", src);
		result = dotenv.config({
      path: src
    }) as any;
  } else {
    result = dotenv.config() as any;
  }
  if (result.error) {
    return env as any;
  }

	let VITE_cookie = getCookieDomain(result.parsed);
	const data = { ...result.parsed, VITE_cookie };
  return Promise.resolve(data);
}

