/**
 * @file 环境变量
 * @author svon.me@gmail.com
 */

import Language from "../types/language";
import safeGet from "@fengqiaogang/safe-get";

export enum Command {
	build = "build",
	serve = "serve"
}

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
	lang: Language;
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
		lang: safeGet<Language>(data, languageKey) || Language.en,
	};
}
