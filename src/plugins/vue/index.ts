/**
 * @file Vue SSR
 * @author svon.me@gmail.com
 */

import fs from "fs";
import _ from "lodash";
import path from "path";
import template from "../template/";
import I18n from "src/utils/i18n";
import {Env, Command} from "src/config";
import { createServer as createViteServer, ViteDevServer } from "vite";

const getEntryHtml = function (root: string, env: Env) {
	if (env.VITE_command === Command.build) {
		const entry = path.join(root, "dist/server", "entry-server.js");
		const templateSrc = path.join(root, "dist/client", env.template);
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
	async createVite (): Promise<ViteDevServer> {
		return createViteServer({
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
	protected async getVite (): Promise<ViteDevServer> {
		if (this.vite) {
			return this.vite;
		}
		const value = await this.createVite();
		this.vite = value;
		return value;
	}
	private async getRender(url: string) {
		const { entry, html } = getEntryHtml(this.root, this.env);
		// 线上环境
		if (this.env.VITE_command === Command.build) {
			// const modules = Object.keys(require.cache);
			const { render } = require(entry);
			// this.nocache(modules);
			return { render, text: html };
		} else {
			const vite = await this.getVite();
			const text = await vite.transformIndexHtml(url, html);
			const { render } = await vite.ssrLoadModule(entry);
			return { render, text };
		}
	}
	async render (url: string, data: object = {}): Promise<string> {
		const { render, text } = await this.getRender(url);
		if (render && text) {
			const i18n = I18n(url);
			const value = Object.assign({}, data, { lang: i18n.getLang() });
			const result = await render(url, value);
			return this.getHtml(text, value, result);
		}
		return "";
	}
}

export default SSR;





