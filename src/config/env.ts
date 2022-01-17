/**
 * @file env
 * @author svon.me@gmail.com
 */

export enum Command {
	build = "build",
	serve = "serve"
}

export const production = "production";
export const development = "development";

export const mode = function () {
	return process.env.mode === development ? development : production;
}

export const command = function () {
	return process.env.command === Command.serve ? Command.serve : Command.build;
}
