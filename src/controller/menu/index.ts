/**
 * @file 菜单
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import {MenuItem} from "~/types/menu";
import DBList from "@fengqiaogang/dblist";
import { headers, names } from "src/config/header";
import {NextFunction, Request, Response} from "express";

const primaryKey = "id";
const foreignKey = "pid";
const foreignKeyValue = "0";


const createDb = function (value?: MenuItem[]): DBList {
	const db = new DBList([], primaryKey, foreignKey, foreignKeyValue);
	if (value) {
		db.insert(value);
	}
	return db;
}
const cache = createDb().flatten<MenuItem>(headers);

export const menuList = async function (req: Request, res: Response, next: NextFunction) {
	const active = names.dapp.dapp; // 默认导航
	const db = createDb(cache);
	const list = db.parentDeepFlatten<MenuItem>({ id: active });
	const ids = _.map(list, item => item.id);
	db.update({ id: ids }, {
		active: true
	});
	res.locals.headers = db.childrenDeep();
	res.locals.menuActive = active;

	next();
}
