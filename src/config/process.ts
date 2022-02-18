/**
 * @file 环境变量
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import { ImportMetaEnv, Command } from "../types/env";

const _getOsProcess = function (): ImportMetaEnv {
	try {
		return (process.env || {}) as any;
	} catch (e) {
		// todo
	}
	return {} as any;
}

const env = _getOsProcess();

export const domain = env.VITE_domain;
export const home = `https://${env.VITE_domain}/`;
export const appDownload = `https://${env.VITE_domain}/download/`;

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
	return {
		...env,
		mode: env.VITE_mode,
		command: safeGet<Command>(env, "command") || Command.build,
	};
}
