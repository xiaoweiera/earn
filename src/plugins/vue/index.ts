/**
 * @file Vue SSR
 * @author svon.me@gmail.com
 */

import fs from "fs";
import path from "path";
import template from "../template/";
import {Env, production} from "src/config";
import { createServer as createViteServer, ViteDevServer } from "vite";

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
	async init (): Promise<ViteDevServer> {
		return createViteServer({
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
	async render (url: string, data: object = {}): Promise<string> {
		// 线上环境
		if (this.env.mode === production) {
			const { render } = require(this.entry);
			const result = await render(url, data);
			return this.getHtml(this.html, data, result);
		}
		process.env.href = url;
		const vite = await this.init();
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





