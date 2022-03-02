/**
 * @file 博客
 * @author svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import { Model } from "src/logic/blog";
import {Request, Response} from "express";
import { names } from "src/config/header";
import safeGet from "@fengqiaogang/safe-get";
import { BlogDetail } from "src/types/blog/";
import * as alias from "src/utils/root/alias";

export const list = async function (req: Request, res: Response) {
	const i18n = I18n(req);
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
		title: i18n.blog.meta.title,
		keywords: i18n.blog.meta.keywords,
		description: i18n.blog.meta.description,

		"API.blog.ads": ads,      // 广告
		[alias.blog.tabs]: tabs,    // 分组
		[alias.blog.list]: list, // 列表数据
		"API.blog.getTopList": tops, // 置顶数据
		"API.blog.getHotList": hots, // 热门数据
	};
	res.send(result);
}

// 博客详情
export const detail = async function (req: Request, res: Response) {
	const i18n = I18n(req);
	const api = new Model(req);
	res.locals.menuActive = names.blog.blog;
	const id = safeGet<number>(req.params, "id");
	// 获取详情数据
	const data = await api.blog.getDetail<BlogDetail>(id);
	const result = {
		title: data && data.name ? `${i18n.blog.meta.title}-${data.name}` : i18n.blog.meta.title,
		keywords: i18n.blog.meta.keywords,
		description: i18n.dapp.meta.description,

		[alias.blog.detail]: data
	};
	res.send(result);
}
