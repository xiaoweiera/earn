/**
 * @file 静态文件处理
 * @author svon.me@gmail.com
 */
import path from "path";
import {createServer} from "vite";
import Compression from "compression";
import { getLangContent } from "src/plugins/language/";
import Express, {Router, NextFunction, Request, Response} from "express";
import {Env, production, staticPath, languageKey, languageName, languageLink} from "src/config";

const Assets = async function(root: string, env: Env) {
	const router = Router();
	const name = "favicon.ico";
	router.all(`/${name}`, function (req: Request, res: Response, next: NextFunction) {
		const options = {
			root: path.join(root, "public"),
			dotfiles: 'deny',
			headers: {
				'x-timestamp': Date.now(),
				'x-sent': true
			}
		};
		res.sendFile(name, options, function (err) {
			if (err) {
				next(err);
			}
		});
	});

	router.get(languageLink, function (req: Request, res: Response) {
		res.type("application/json");
		const value = getLangContent();
		const text = `window["${languageName}"] = ${value};`;
		res.send(text);
	});

	if (env.mode === production) {
		const dist = path.join(root, "dist/client");
		router.use(Compression());
		router.use(staticPath, Express.static(dist));
	} else {
		const vite = await createServer({
			root,
			logLevel: "info",
			server: {
				middlewareMode: 'ssr',
				watch: {
					usePolling: true,
					interval: 100
				}
			}
		});
		router.use(vite.middlewares);
	}
	return router;
}

export default Assets;




