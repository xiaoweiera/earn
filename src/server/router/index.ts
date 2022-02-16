/**
 * @file 路由
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import Blog from "./blog";
import Home from "./home"
import { Env } from "src/config";
import SSR from "src/plugins/vue";
import { config } from "src/router/config";
import { Router as ExpressRouter, Request, Response, NextFunction } from "express";



const Router = async function (root: string, env: Env): Promise<ExpressRouter> {
	const router = ExpressRouter();
	//home
	const home = await Home(root, env);
	// 博客
	const blog = await Blog(root, env);
	// Vue 渲染
	const ssr: SSR = await new SSR(root, env);


	// 封装 send 方法
	router.use(function (req: Request, res: Response, next: NextFunction) {
		const url = req.originalUrl;
		const start = Date.now();
		const log = function () {
			const method = req.method;
			const query = req.query;
			const end = Date.now();
			console.log("%s %s %s %sms", method, url, JSON.stringify(query), end - start);
		}
		const send = res.send.bind(res);
		// @ts-ignore
		res.send = async function (value?: any) {
			if (value && _.isNumber(value)) {
				res.status(value);
				log();
				return send();
			}
			if (value && _.isString(value)) {
				log();
				return send(value);
			}
			const data = {
				...value,
				...res.locals,
				query: Object.assign({}, req.params || {}, req.query || {}),
			};
			try {
				const html = await ssr.render(url, data);
				log();
				return send(html);
			} catch (e: any) {
				console.log(e);
				log();
				// return res.redirect(config.E404);
				return send(e);
			}
		};
		return next();
	});
	// 装载home相关路由
	router.use(home);
	// 装载博客相关路由
	router.use(blog);

	// 404
	router.get(config.E404, function (req: Request, res: Response) {
		res.send({});
	});
	router.get("*", async function (req: Request, res: Response) {
		res.redirect(config.E404);
	});
	return router;
}

export default Router;
