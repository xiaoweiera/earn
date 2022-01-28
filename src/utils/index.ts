/**
 * @file 常用方法
 * @author svon.me@gmail.com
 */

import _, {size} from "lodash";
export * from "./check/is";
export * from "./convert/to";
export * from "./time/index";

export { size };

export const Equals = function (...args: Array<string | number>): boolean {
	const len = args.length;
	let status = false;
	for (let i = 1; i < len && len > 1; i++) {
		const value1 = _.trim(`${args[i - 1]}`);
		const value2 = _.trim(`${args[i]}`);
		if (value1 === value2) {
			status = true;
		} else {
			status = false;
			break;
		}
	}
	return status;
}

