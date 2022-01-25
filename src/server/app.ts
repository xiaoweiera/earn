/**
 * @file Express App
 * @author svon.me@gmail.com
 */

import path from "path";
import Router from "./router/index";
import Assets from "./router/assets";
import I18n from "src/utils/i18n";
import {getEnv, production, domain} from "src/config";
import Express, { Request, Response, NextFunction } from "express";

const root: string = path.resolve(__dirname, "../..");

const main = async function () {
	const app = Express();
	const config = Object.assign({}, getEnv(), {
		port: process.env.port || 3333,
		host: process.env.host || "0.0.0.0",
	});

	console.log(config);

	const assets = await Assets(root, config);
	app.use(assets);

	// 处理常用数据
	app.use(function (req: Request, res: Response, next: NextFunction) {
		let location: string;
		if (process.env.location) {
			location = process.env.location;
		} else {
			if (config.mode !== production) {
				location = `https://${domain}`
			} else {
				location = `https//:${req.get('host')}`;
			}
			process.env.location = location;
		}
		Object.assign(res.locals, {
			location,
			keywords: "",
			description: "",
			// 标题
			title: I18n.common.site.name,
		});
		next();
	});

	const router = await Router(root, config);
	app.use(router);
	// @ts-ignore
	const http = await app.listen(config.port, config.host);
	return { app, http };
}

export { main };

