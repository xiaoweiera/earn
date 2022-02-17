/**
 * @file 判断是否显示子菜单
 */

import {MenuItem} from "src/types/menu";
import {createDb} from "src/config/header/db";

const isShowChildren = function (children?: MenuItem[]): boolean {
	if (children) {
		const db = createDb(children);
		const arr = db.select({ header: true });
		if (arr.length > 0) {
			return true;
		}
	}
	return false;
}

export default isShowChildren;
