/**
 * @file Application
 */
import application from "./app.vue";
import { init } from "src/utils/i18n";
import {languageKey} from "src/config";
import { App, createSSRApp } from "vue";
import Language from "src/types/language";
import { set } from "src/utils/root/data";
import { createRouter } from "src/router/";
import safeGet from "@fengqiaogang/safe-get";

/**
 * @file 创建 Vue 实例
 * @param data
 */
export function createApp(data: object = {}) {
	// 缓存数据
	set(data);

	const lang = safeGet<Language>(data, languageKey) || Language.en;

	console.log("main - lang = ", lang);

	const I18n = init(lang);
	console.log("I18n.common.site.name = ", I18n.common.site.name);


	const app: App = createSSRApp(application);
	const router = createRouter();
	app.use(router);
	return { app, router };
}
