/**
 * @file 博客
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import {Env} from "src/config";
import * as blog from "src/controller/blog";
import safeGet from "@fengqiaogang/safe-get";
import redirect from "src/controller/common/redirect";
import {config as routerConfig} from "src/router/config";
import {Request, Response, Router as ExpressRouter} from "express";

const Router = async function (root: string, env: Env) {
	const router = ExpressRouter();

	router.get(`${routerConfig.blog}/detail`, function (req: Request, res: Response) {
		const query = req.query;
		const id = safeGet<string>(query, "id");
		if (id) {
			const value = _.omit<object>(query, [ "id" ]);
			redirect(req, res, `${routerConfig.blog}/${id}`, {...value});
		} else {
			redirect(req, res, routerConfig.blog);
		}
	});
	// 博客详情
	router.get(`${routerConfig.blog}/:id`, blog.detail);
	// 列表
	router.get(routerConfig.blog, blog.list);

	return router;
}

export default Router;
