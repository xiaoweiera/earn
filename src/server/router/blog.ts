/**
 * @file 博客
 * @author svon.me@gmail.com
 */

import {Env} from "src/config";
import {config} from "src/router/config";
import * as blog from "src/controller/blog";
import { Router as ExpressRouter } from "express";

const Router = async function (root: string, env: Env) {
	const router = ExpressRouter();

	// 列表
	router.get(config.blog, blog.list);

	// 博客详情
	router.get(`${config.blog}/detail`, blog.detail);
	router.get(`${config.blog}/:id`, blog.detail);

	return router;
}

export default Router;
