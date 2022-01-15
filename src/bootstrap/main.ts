/**
 * @file Application
 */
import application from "./app.vue";
import { App, createSSRApp } from "vue";
import { createRouter } from "src/router/";

/**
 * @file 创建 Vue 实例
 * @param data
 */
export function createApp(data: object = {}) {
	const app: App = createSSRApp(application, { root: data });
	const router = createRouter();
	app.use(router);
	return { app, router };
}
