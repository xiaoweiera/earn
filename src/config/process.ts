/**
 * @file 环境变量
 * @author svon.me@gmail.com
 */

import {IsSSR} from "~/config/ssr";

export { IsSSR } from "./ssr";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import { ImportMetaEnv, Command, oss } from "../types/env";

const _getOsProcess = function (): ImportMetaEnv {
	const env: ImportMetaEnv = {
		VITE_oss: oss,
	} as ImportMetaEnv;
	try {
		const data = (process.env || {});
		const keys = [
			"VITE_mode",
			"VITE_command",
			"VITE_api",
			"VITE_LanApi",
			"VITE_domain",
			"VITE_cookie",
			"VITE_google",
			"VITE_staticPath",
			"VITE_staticDomain"
		];
		for(const name of keys) {
			const value = safeGet<string>(data, name);
			safeSet(env, name, value);
		}
		if (env.VITE_LanApi) {
			return env;
		}
		env.VITE_LanApi = env.VITE_api;
	} catch (e) {
		// todo
	}
	return env;
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
		command: (env.VITE_command || Command.build) as Command,
	};
}
