/**
 * @file Express App
 * @author svon.me@gmail.com
 */

import path from "path";
import Express from "express";
import {getEnv} from "src/config";
import Router from "./router/index";
import Assets from "./router/assets";
import CookieParser from "cookie-parser";
// import userAgent from "express-useragent";
import common from "src/controller/common/";
import cors from "src/controller/common/cors";


const root: string = path.resolve(__dirname, "../..");

const main = async function () {
	const app = Express();

	const config = Object.assign({}, getEnv(), {
		port: process.env.port || 3333,
		host: process.env.host || "0.0.0.0",
	});
	console.log(config);

	app.use(cors);


	const assets = await Assets(root, config);
	app.use(assets);

	app.use(CookieParser());
	// app.use(userAgent.express());
	// 处理公共数据
	app.use(common);

	// // 处理常用数据
	// app.use(function (req: Request, res: Response, next: NextFunction) {
	// 	const i18n = I18n(req);
	//
	// 	Object.assign(res.locals, {
	// 		keywords: "",
	// 		description: "",
	// 		// 标题
	// 		title: i18n.common.site.name,
	// 	});
	// 	next();
	// });

	const router = await Router(root, config);
	app.use(router);
	// @ts-ignore
	const http = await app.listen(config.port, config.host);
	return { app, http, config };
}

export { main };

