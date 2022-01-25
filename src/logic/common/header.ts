/**
 * @file 菜单
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import DBList from "@fengqiaogang/dblist";
import { headers } from "src/config/header";

const primaryKey = "id";
const foreignKey = "pid";
const foreignKeyValue = "0";


const createDb = function<T>(): DBList {
	const db = new DBList([], primaryKey, foreignKey, foreignKeyValue);
	const list = db.flatten<T>(headers);
	db.insert(list);
	return db;
}

export const getMenuList = function<T>(active?: string): T[] {
	const db = createDb<T>();
	if (active) {
		const list = db.parentDeepFlatten<T>({ id: active });
		const ids = _.map(list, (item: T) => {
			// @ts-ignore
			return item.id;
		});
		db.update({ id: ids }, {
			active: true
		});
	}
	return db.childrenDeep<T>();
}
