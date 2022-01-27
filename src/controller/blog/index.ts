/**
 * @file 博客
 * @author svon.me@gmail.com
 */

import * as API from "src/api";
import {Request, Response} from "express";
import { names } from "src/config/header";
import safeGet from "@fengqiaogang/safe-get";
import { BlogDetail, BlogData } from "src/types/blog/";

export const list = async function (req: Request, res: Response) {
	res.locals.menuActive = names.blog.blog;
	const list = await API.blog.getList<BlogData>();
	const result = {
		"API.blog.getList": list
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
