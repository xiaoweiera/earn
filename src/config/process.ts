/**
 * @file 环境变量
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";

export enum Command {
	build = "build",
	serve = "serve"
}

export const domain = "kingdata.com";
export const home = `https://${domain}/`;

export const languageKey = "lang";

export const production = "production";
export const development = "development";

export enum Device {
	web= "web",
	app = "app"
}

// 环境变量
export interface Process {
	mode: string;
	command: Command;
}

const _getOsProcess = function () {
	try {
		return process.env || {};
	} catch (e) {
		// todo
	}
	return {};
}

export const getProcess = function (): Process {
	const data = _getOsProcess();
	return {
		mode: safeGet<string>(data, "mode") || production,
		command: safeGet<Command>(data, "command") || Command.build,
	};
}
