/**
 * @file 博客
 * @author svon.me@gmail.com
 */

import { Model } from "src/logic/blog";
import {Request, Response} from "express";
import { names } from "src/config/header";
import safeGet from "@fengqiaogang/safe-get";
import { BlogDetail } from "src/types/blog/";

export const list = async function (req: Request, res: Response) {
	const api = new Model(req);
	res.locals.menuActive = names.blog.blog;
	const id = safeGet<string>(req.query, "group");

	const [ list, tabs, ads, tops, hots ] = await Promise.all([
		api.getList(id),
		api.getTabs(),
		api.blog.ads(),
		api.getTopList(),
		api.getHotList(),
	]);

	const result = {
		"API.blog.ads": ads,      // 广告
		"API.blog.tabs": tabs,    // 分组
		"API.blog.getList": list, // 列表数据
		"API.blog.getTopList": tops, // 置顶数据
		"API.blog.getHotList": hots, // 热门数据
	};
	res.send(result);
}

// 博客详情
export const detail = async function (req: Request, res: Response) {
	const api = new Model(req);
	res.locals.menuActive = names.blog.blog;
	const id = safeGet<number>(req.params, "id");
	// 获取详情数据
	const data = await api.blog.getDetail<BlogDetail>(id);
	const result = {
		"API.blog.getDetail": data
	};
	res.send(result);
}
