/**
 * @file 静态文件处理
 * @author svon.me@gmail.com
 */
import path from "path";
import {createServer} from "vite";
import Compression from "compression";
import { getProcess } from "src/config/process";
import {Env, Command} from "src/config";
import redirect from "src/controller/common/redirect";
import { config as routerConfig } from "src/router/config";
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

	const goHome = function (req: Request, res: Response) {
		redirect(req, res, routerConfig.home);
	};

	router.all("/index", goHome);
	router.all("/index.html", goHome);

	if (env.VITE_command === Command.build) {
		router.use(Compression());
		if (env.VITE_staticPath && !/^http/.test(env.VITE_staticPath)) {
			router.all(`${env.VITE_staticPath}/:date`, goHome);
			router.all(`${env.VITE_staticPath}/:date/index`, goHome);
			router.all(`${env.VITE_staticPath}/:date/index.html`, goHome);

			const dist = path.join(root, "dist/client");
			// 设置静态文件代理
			router.use(`${env.VITE_staticPath}/:date`, Express.static(dist, {
				// 设置强缓
				immutable: true,
				maxAge: '31536000000'
			}));
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




