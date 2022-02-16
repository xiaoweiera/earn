/**
 * @file 内容输出
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import {Env} from "src/config";
import SSR from "src/plugins/vue";
import {Request, Response, NextFunction} from "express";


const send = async function (root: string, env: Env) {
	// Vue 渲染
	const ssr: SSR = await new SSR(root, env);

	return function (req: Request, res: Response, next: NextFunction) {
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
	}
}

export default send;
