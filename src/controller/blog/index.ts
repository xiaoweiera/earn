/**
 * @file 博客
 * @author svon.me@gmail.com
 */

import * as API from "src/api";
import * as blog from "src/logic/blog";
import {Request, Response} from "express";
import { names } from "src/config/header";
import safeGet from "@fengqiaogang/safe-get";
import { BlogDetail } from "src/types/blog/";

export const list = async function (req: Request, res: Response) {
	res.locals.menuActive = names.blog.blog;
	const id = safeGet<string>(req.query, "group");
	const [ list, tabs, ads, hots ] = await Promise.all([
		blog.getList(id),
		blog.getTabs(),
		blog.getAds(),
		blog.getHots()
	]);

	console.log("blog list = ", list.length);

	const result = {
		"API.blog.ads": ads,
		"API.blog.tabs": tabs,
		"API.blog.getHots": hots,
		"API.blog.getList": list,
	};
	res.send(result);
}

// 博客详情
export const detail = async function (req: Request, res: Response) {
	res.locals.menuActive = names.blog.blog;
	const id = safeGet<number>(req.params, "id");
	// 获取详情数据
	const data = await API.blog.getDetail<BlogDetail>(id);
	const result = {
		"API.blog.getDetail": data
	};
	res.send(result);
}
