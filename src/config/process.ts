/**
 * @file 环境变量
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import type { ImportMetaEnv } from "../types/env";
import { Command, oss, EnvKeys } from "../types/env";

const _getOsProcess = function (): ImportMetaEnv {
  const env: ImportMetaEnv = {
    VITE_oss: oss,
  } as ImportMetaEnv;
  try {
    const data = process.env || {};
    for (const name of EnvKeys) {
      const value = safeGet<string>(data, name);
      safeSet(env, name, value);
    }
    // 如果线上环境接口地址未配置，则使用默认接口地址
    if (!env.VITE_productionApi) {
      env.VITE_productionApi = env.VITE_api;
    }
    // 如果局域网接口地址未配置，则使用默认接口地址
    if (!env.VITE_LanApi) {
      env.VITE_LanApi = env.VITE_api;
    }
  } catch (e) {
    // todo
  }
  return env;
};

export enum Device {
  web = "web",
  app = "app",
}

// 环境变量
export interface Process extends ImportMetaEnv {
  mode: string;
  command: Command;
}

export const getProcess = function (): Process {
  const env = _getOsProcess();
  return {
    ...env,
    mode: env.VITE_mode,
    command: (env.VITE_command || Command.build) as Command,
  };
};
