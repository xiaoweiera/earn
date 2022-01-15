/**
 * @file Express App
 * @author svon.me@gmail.com
 */

import path from "path";
import Router from "./router/index";
// @ts-ignore
import Assets from "./router/assets";
import {Argv, getEnv} from "src/config";
import Express, { Request, Response } from "express";


const root: string = path.resolve(__dirname, "../..");

const main = async function (argv?: object) {
	const app = Express();
	const config = getEnv(argv as Argv);

	console.log(config);

	const assets = await Assets(root, config);
	app.use(assets);

	const router = await Router(root, config);
	app.use(router);

	app.get("*", async function (req: Request, res: Response) {
		res.send({});
	});

	const http = await app.listen(config.port, "0.0.0.0");
	return { app, http };
}

export { main };

