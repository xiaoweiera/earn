/**
 * @file 服务端
 * @author svon.me@gmail.com
 */

import {basename} from "path";
import {createApp} from "./bootstrap/main";
import {renderToString} from "vue/server-renderer";
import {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";

/**
 * @param url 页面路由
 * @param data 页面需要使用的数据
 */

interface Manifest {
	[key: string]: string[];
}

export const render = async function (url: string, data: object = {}) {
	const ctx: any = {};
	const {app, router} = createApp(data);
	router.beforeEach(function (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
		const matched = to.matched;
		if (matched && matched.length > 0) {
			next();
		} else {
			// 如过无匹配的路由，则触发异常
			throw new Error("Router Error");
		}
	});
	console.log("url = ", url);
	await router.push(url);
	await router.isReady();
	const html = await renderToString(app, ctx);
	if (html) {
		const links = renderPreloadLinks(ctx.modules, {});
		return [ html, links ];
	}
	return [];
};

function renderPreloadLinks(modules: string[], manifest: Manifest) {
	let links = '';
	const seen = new Set();
	modules.forEach((id) => {
		const files = manifest[id];
		if (files) {
			files.forEach((file) => {
				if (!seen.has(file)) {
					seen.add(file)
					const filename = basename(file)
					if (manifest[filename]) {
						for (const depFile of manifest[filename]) {
							links += renderPreloadLink(depFile)
							seen.add(depFile)
						}
					}
					links += renderPreloadLink(file)
				}
			})
		}
	})
	return links
}

function renderPreloadLink(file: string) {
	if (file.endsWith('.js')) {
		return `<link rel="modulepreload" crossorigin href="${file}">`
	} else if (file.endsWith('.css')) {
		return `<link rel="stylesheet" href="${file}">`
	} else if (file.endsWith('.woff')) {
		return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
	} else if (file.endsWith('.woff2')) {
		return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
	} else if (file.endsWith('.gif')) {
		return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
	} else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
		return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
	} else if (file.endsWith('.png')) {
		return ` <link rel="preload" href="${file}" as="image" type="image/png">`
	} else {
		// TODO
		return ''
	}
}
