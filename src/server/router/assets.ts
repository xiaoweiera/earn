/**
 * @file 静态文件处理
 * @author svon.me@gmail.com
 */
import path from "path";
import {createServer} from "vite";
import Compression from "compression";
import { getProcess } from "src/config/process";
import {Env, Command} from "src/config";
import Express, {Router, NextFunction, Request, Response} from "express";

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

	if (env.command === Command.build) {
		router.use(Compression());
		if (env.VITE_staticPath && !/^http/.test(env.VITE_staticPath)) {
			const dist = path.join(root, "dist/client");
			router.use(env.VITE_staticPath, Express.static(dist));
		}
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


	router.get('/process', function(req: Request, res: Response) {
		const data = JSON.stringify(getProcess());
		res.type("json");
		res.send(data);
	});

	return router;
}

export default Assets;




