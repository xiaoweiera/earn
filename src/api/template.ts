/**
 * @file 接口模版
 * @author svon.me@gmail.com
 */

import {Lang} from "src/types/language";

export default class {
	protected lang: Lang | undefined;
	constructor(lang?: Lang) {
		this.lang = lang;
	}
}
