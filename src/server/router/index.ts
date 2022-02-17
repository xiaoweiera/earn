/**
 * @file 路由
 * @author svon.me@gmail.com
 */

import Blog from "./blog";
import { Env } from "src/config";
import { config } from "src/router/config";
import Send from "src/plugins/express/send";
import redirect from "src/controller/common/redirect";
import { Router as ExpressRouter, Request, Response } from "express";


const Router = async function (root: string, env: Env): Promise<ExpressRouter> {
	const router = ExpressRouter();
	// 博客
	const blog = await Blog(root, env);
	const send = await Send(root, env);
	// 封装 send 方法
	router.use(send);

	// 装载博客相关路由
	router.use(blog);

	// 404
	router.get(config.E404, function (req: Request, res: Response) {
		res.send({});
	});
	router.get("*", function (req: Request, res: Response) {
		redirect(req, res, config.E404);
	});
	return router;
}

export default Router;
