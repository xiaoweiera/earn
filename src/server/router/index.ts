/**
 * @file 路由
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import { Env } from "src/config";
import SSR from "src/plugins/vue";
import { Router as ExpressRouter, Request, Response, NextFunction } from "express";

const Router = async function (root: string, env: Env): Promise<ExpressRouter> {

	const router = ExpressRouter();
	const ssr: SSR = await new SSR(root, env);

	await ssr.init();

	router.use(function (req: Request, res: Response, next: NextFunction) {
		const url = req.originalUrl;
		console.time(url);
		const send = res.send.bind(res);
		// @ts-ignore
		res.send = async function (value?: any) {
			if (value && _.isNumber(value)) {
				res.status(value);
				console.timeEnd(url);
				return send();
			}
			if (value && _.isString(value)) {
				console.timeEnd(url);
				return send(value);
			}
			const html = await ssr.render(url, value);
			console.timeEnd(url);
			return send(html);
		};
		return next();
	});
	return router;
}

export default Router;
