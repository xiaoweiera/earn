/**
 * @file 路由
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import SSR from "src/plugins/vue";
import { config } from "src/router/config";
import { Env, languageName } from "src/config";
import { getI18ns } from "src/plugins/language/i18n";
import { Router as ExpressRouter, Request, Response, NextFunction } from "express";

const Router = async function (root: string, env: Env): Promise<ExpressRouter> {

	const router = ExpressRouter();
	const ssr: SSR = await new SSR(root, env);

	// await ssr.init();

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
				[languageName]: getI18ns()
			};
			try {
				const html = await ssr.render(url, data);
				log();
				return send(html);
			} catch (e: any) {
				console.log(e);
				log();
				return res.redirect(config.E404);
			}
		};
		return next();
	});
	return router;
}

export default Router;
