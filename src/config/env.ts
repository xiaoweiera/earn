/**
 * @file 读取 .env.* 配置文件
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import UrlPattern from "url-pattern";
import type { ConfigEnv } from "vite";
import type { ImportMetaEnv } from "../types/env";
import { Command, production, EnvKeys } from "../types/env";

interface Result {
  error?: boolean;
  parsed: ImportMetaEnv;
}

const getCookieDomain = function (data: ImportMetaEnv): string {
  if (data.VITE_cookie) {
    return data.VITE_cookie;
  }
  if (data.VITE_domain) {
    const reg = "(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/*)";
    const pattern = new UrlPattern(reg);
    const result = pattern.match(data.VITE_domain);
    return `${result.domain}.${result.tld}`;
  }
  return "";
};

const getFileSrc = function (mode: string, local?: boolean) {
  const root = path.join(__dirname, "../..");
  if (local) {
    return path.join(root, `.env.${mode}.local`);
  }
  return path.join(root, `.env.${mode}`);
};

const fsStat = function (mode: string, local?: boolean): Promise<string> {
  const src = getFileSrc(mode, local);
  return new Promise((resolve) => {
    fs.stat(src, (err) => {
      if (err) {
        resolve("");
      } else {
        resolve(src);
      }
    });
  });
};

const getEnv = function (path: string): Result {
  return dotenv.config({ path }) as any;
};

export const getConfig = async function (env: ConfigEnv | object): Promise<ImportMetaEnv> {
  // 读取环境变量中的配置
  const envData: ImportMetaEnv = {} as ImportMetaEnv;
  for (const name of EnvKeys) {
    const value = process.env[name];
    if (value) {
      safeSet(envData, name, value);
    }
  }

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
    const VITE_cookie = getCookieDomain(result.parsed);
    // 合并配置参数
    const data = Object.assign({ ...result.parsed }, { ...envData }, { VITE_cookie });

    if (data.VITE_command === Command.build) {
      const value = `${data.VITE_staticPath}/${Date.now()}`;
      if (data.VITE_staticDomain) {
        data.VITE_staticDomain = `${data.VITE_staticDomain}${value}`;
      } else {
        data.VITE_staticDomain = value;
      }
    }
    return Promise.resolve(data);
  }
  return env as any;
};
