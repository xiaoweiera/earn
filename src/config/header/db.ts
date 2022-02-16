/**
 * @file 处理导航数据
 */
import {MenuItem} from "src/types/menu";
import DBList from "@fengqiaogang/dblist";

const primaryKey = "id";
const foreignKey = "pid";
const foreignKeyValue = "0";


export const createDb = function(value: MenuItem[]): DBList {
	const db = new DBList([], primaryKey, foreignKey, foreignKeyValue);
	const list = db.flatten<MenuItem>(value);
	db.insert(list);
	return db;
}


