/**
 * @file Express App
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import path from "path";
import Router from "./router/index";
import Assets from "./router/assets";
import Language from "src/types/language";
import safeSet from "@fengqiaogang/safe-set";
import safeGet from "@fengqiaogang/safe-get";
import { getI18n } from "src/plugins/language/i18n";
import {Argv, getEnv, languageKey} from "src/config";
import Express, { Request, Response, NextFunction } from "express";

const root: string = path.resolve(__dirname, "../..");

const main = async function (argv?: object) {
	const app = Express();
	const config = getEnv(argv as Argv);

	console.log(config);

	const assets = await Assets(root, config);
	app.use(assets);

	// 处理中英文标识
	app.use(function (req: Request, res: Response, next: NextFunction) {
		let value: Language = safeGet<Language>(req.query, languageKey) || Language.en;
		value = _.toLower(value) as Language;
		switch (value) {
			case Language.cn:
			case Language.en:
				safeSet(req.query, languageKey, value);
				safeSet(res, `locals.${languageKey}`, value);
				break;
			default:
				safeSet(req.query, languageKey, Language.en);
				safeSet(res, `locals.${languageKey}`, Language.en);
				break;
		}
		next();
	}, function (req: Request, res: Response, next: NextFunction) {
		const i18n = getI18n(res);
		Object.assign(res.locals, {
			keywords: "",
			description: "",
			title: i18n.common.site.name,
		});
		next();
	});

	const router = await Router(root, config);
	app.use(router);

	app.get("*", async function (req: Request, res: Response) {
		res.send({});
	});

	const http = await app.listen(config.port, "0.0.0.0");
	return { app, http };
}

export { main };

