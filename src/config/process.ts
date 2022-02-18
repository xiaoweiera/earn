/**
 * @file 环境变量
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import { ImportMetaEnv, Command } from "../types/env";
import safeSet from "@fengqiaogang/safe-set";

const _getOsProcess = function (): ImportMetaEnv {
	const env = {};
	try {
		const data = (process.env || {});
		const keys = ["VITE_mode", "VITE_api", "VITE_domain", "VITE_cookie", "VITE_google"];
		for(const name of keys) {
			const value = safeGet<string>(data, name);
			safeSet(env, name, value);
		}
	} catch (e) {
		// todo
	}
	return env as ImportMetaEnv;
}

export enum Device {
	web= "web",
	app = "app"
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
		command: safeGet<Command>(env, "command") || Command.build,
	};
}
