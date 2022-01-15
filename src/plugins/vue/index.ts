/**
 * @file Vue SSR
 * @author svon.me@gmail.com
 */

import fs from "fs";
import path from "path";
import template from "../template/";
import Language from "src/types/language";
import {Env, production} from "src/config";
import { createServer as createViteServer, ViteDevServer } from "vite";

class SSR {
	private env: Env;
	private readonly entry: string;
	private readonly html: string;
	private vite: ViteDevServer | undefined;
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
	async init (): Promise<void> {
		this.vite = await createViteServer({
			server: { middlewareMode: "ssr" }
		});
	}
	protected getHtml(lang: Language, html: string, data: object, result: string[]): string {
		return template(html, {
			data,
			lang,
			content: [...result].join(""),
		});
	}
	async render (url: string, data: object = {}): Promise<string> {
		const vite = this.vite;
		try {
			// 线上环境
			if (this.env.mode === production) {
				const { render } = require(this.entry);
				const result = await render(url, data);
				return this.getHtml(Language.en, this.html, data, result);
			}
			// 开发环境
			if (vite) {
				const text = await vite.transformIndexHtml(url, this.html);
				const { render } = await vite.ssrLoadModule(this.entry);
				const result = await render(url, data);
				return this.getHtml(Language.en, text, data, result);
			}
		} catch (e) {
			// todo
			console.log(e);
		}
		return "";
	}
}

export default SSR;





