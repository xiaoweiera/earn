/**
 * @file Vue SSR
 * @author svon.me@gmail.com
 */

import fs from "fs";
import _ from "lodash";
import path from "path";
import template from "../template/";
import Language from "src/types/language";
import {Env, production} from "src/config";
import safeGet from "@fengqiaogang/safe-get";
import { createServer as createViteServer, ViteDevServer } from "vite";

const getEntryHtml = function (root: string, env: Env, lang: Language = Language.en) {
	if (env.mode === production) {
		const entry = path.join(root, "dist/server", lang, "entry-server.js");
		const templateSrc = path.join(root, "dist/client", lang, env.template);
		const html = fs.readFileSync(templateSrc, "utf-8");
		return { entry, html };
	} else {
		const entry = path.join(root, "src", "entry-server.ts");
		const templateSrc = path.join(root, env.template);
		const html = fs.readFileSync(templateSrc, "utf-8");
		return { entry, html };
	}
}

class SSR {
	private readonly env: Env;
	private readonly root: string;
	private vite: ViteDevServer | undefined;
	constructor(root: string, env: Env) {
		this.env = env;
		this.root = root;
	}
	async createVite (value:Language | string = Language.en): Promise<ViteDevServer> {
		const configFile = path.join(this.root, "vite.config.ts");
		console.log("configFile = ", configFile);
		return createViteServer({
			configFile,
			server: {
				middlewareMode: "ssr"
			}
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
		const list = Object.keys(require.cache);
		const diff = _.difference(list, modules);
		_.each(diff, function (key: string) {
			delete require.cache[key];
		});
	}
	protected async getVite (lang: string | Language): Promise<ViteDevServer> {
		if (this.vite) {
			return this.vite;
		}
		const value = await this.createVite(lang);
		this.vite = value;
		return value;
	}
	private async getRender(url: string) {
		const lang = safeGet<string>(process.env, "lang") || "en";
		const { entry, html } = getEntryHtml(this.root, this.env, lang as Language);
		// 线上环境
		if (this.env.mode === production) {
			// const modules = Object.keys(require.cache);
			const { render } = require(entry);
			// this.nocache(modules);
			return { render, text: html };
		} else {
			const vite = await this.getVite(lang);
			const text = await vite.transformIndexHtml(url, html);
			const { render } = await vite.ssrLoadModule(entry);
			return { render, text };
		}
	}
	async render (url: string, data: object = {}): Promise<string> {
		const { render, text } = await this.getRender(url);
		if (render && text) {
			const lang = safeGet<string>(process.env, "lang") || "en";
			const value = Object.assign({}, data, { lang });
			const result = await render(url, value);
			return this.getHtml(text, data, result);
		}
		return "";
	}
}

export default SSR;





