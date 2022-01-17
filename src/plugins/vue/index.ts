/**
 * @file Vue SSR
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import fs from "fs";
import path from "path";
import template from "../template/";
import Language from "src/types/language";
import {Env, production} from "src/config";
import { createServer as createViteServer, ViteDevServer } from "vite";
import safeGet from "@fengqiaogang/safe-get";

class SSR {
	private env: Env;
	private readonly entry: string;
	private readonly html: string;
	constructor(root: string, env: Env) {
		this.env = env;
		if (env.mode === production) {
			const templateSrc = path.join(root, "dist/client", env.template);
			this.html = fs.readFileSync(templateSrc, "utf-8");
			this.entry = path.join(root, "dist/server", "entry-server.js");
		} else {
			const templateSrc = path.join(root, env.template);
			this.html = fs.readFileSync(templateSrc, "utf-8");
			this.entry = path.join(root, "src", "entry-server.ts");
		}
	}
	async init (lang: string = Language.en): Promise<ViteDevServer> {
		return createViteServer({
			define: {
				"process.env": {
					lang,
					mode: this.env.mode,
					command: this.env.command,
				}
			},
			server: { middlewareMode: "ssr" }
		});
	}
	protected getHtml(html: string, data: object, result: string[]): string {
		const option = {
			...data,
			content: [...result].join("")
		};
		return template(html, option as any);
	}
	protected nocache (modules: string[]) {
		// 删除模块
		delete require.cache[require.resolve(this.entry)];
		const list = Object.keys(require.cache);
		const diff = _.difference(list, modules);
		_.each(diff, function (key: string) {
			delete require.cache[key];
		});
	}
	async render (url: string, data: object = {}): Promise<string> {
		// 线上环境
		if (this.env.mode === production) {
			const modules = Object.keys(require.cache);
			console.time("vue - require");
			const { render } = require(this.entry);
			const result = await render(url, data);
			console.timeEnd("vue - require");
			this.nocache(modules);
			return this.getHtml(this.html, data, result);
		}
		const vite = await this.init(safeGet<string>(data, "lang"));
		// 开发环境
		if (vite) {
			const text = await vite.transformIndexHtml(url, this.html);
			const { render } = await vite.ssrLoadModule(this.entry);
			const result = await render(url, data);
			return this.getHtml(text, data, result);
		}
		return "";
	}
}

export default SSR;





