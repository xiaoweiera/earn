/**
 * @file 接口模版
 * @author svon.me@gmail.com
 */

import {Request} from "express";
import { isObject } from "src/utils/";
import {Lang} from "src/types/language";

export default class {
	protected lang: Lang | undefined;
	constructor(lang?: Lang) {
		this.lang = lang;
	}
	protected getRequest (): Request | undefined {
		if (this.lang && isObject(this.lang)) {
			return this.lang as Request;
		}
	}
}
