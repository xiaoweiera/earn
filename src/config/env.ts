/**
 * @file 读取 .env.* 配置文件
 * @author svon.me@gmail.com
 */

import fs from "fs";
import path  from "path";
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

const getFileSrc = function (mode: string, local?: boolean) {
	const root = path.join(__dirname, "../..");
	if (local) {
		return path.join(root, `.env.${mode}.local`);
	}
	return path.join(root, `.env.${mode}`);
}

const fsStat = function (mode: string, local?: boolean): Promise<string> {
	const src = getFileSrc(mode, local);
	return new Promise(function (resolve) {
		fs.stat(src, function (err, stats) {
			if (err) {
				resolve("");
			} else {
				resolve(src);
			}
		})
	})
}

const getEnv = function (path: string): Result {
	return dotenv.config({ path }) as any;
}

export const getConfig = async function(env: ConfigEnv | object): Promise<ImportMetaEnv> {
  let result: Result | undefined;
	const mode = safeGet<string>(env, "mode");
  if (mode !== production) {
		const local = await fsStat(mode, true);
		if (local) {
			result = getEnv(local);
		} else {
			const src = await fsStat(mode);
			result = getEnv(src);
		}
  }
	if (!result) {
		result = dotenv.config() as any;
	}
	if (result && result.parsed) {
		let VITE_cookie = getCookieDomain(result.parsed);
		const data = { ...result.parsed, VITE_cookie };
		const value = `${data.VITE_staticPath}/${Date.now()}`;
		if (data.VITE_staticDomain) {
			data.VITE_staticDomain = `${data.VITE_staticDomain}${value}`;
		} else {
			data.VITE_staticDomain = value;
		}
		return Promise.resolve(data);
	}
	return env as any;
}

