/**
 * @file 客户端
 * @author svon.me@gmail.com
 */

// 引入 tailwindcss
import "virtual:windi.css";
import "virtual:windi-devtools";
// 引入项目全局样式
import "src/styles/main.scss";

import { config } from "src/router/config";
import {createApp} from "./bootstrap/main";
import { AppId, languageKey, rootData } from "src/config";

// 设置 Element Ui 中英文
import ElementPlus from "element-plus";
import {getParam} from "src/utils/router";
import Language from "src/types/language";
import safeGet from "@fengqiaogang/safe-get";
import zhEn from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import Decrypt from "src/plugins/encryption/decrypt";
import {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";


const main = async function () {
	const text = safeGet<string>(window, rootData);
	const data = text ? Decrypt<object>(text) : {};

	console.log("root data ", data);

	console.log("process env");
	console.log(process.env);

	const { app, router } = createApp(data);

	router.beforeEach(function (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
		const matched = to.matched;
		if (matched && matched.length > 0) {
			next();
		} else {
			// 如果当前路由无匹配状态，则默认跳转至 404 页面
			next(config.E404);
		}
	});

	// 设置 Element Ui 中英文
	const lang = getParam<Language>(languageKey) || Language.en;
	if (lang === Language.cn) {
		app.use(ElementPlus, {
			locale: zhCn,
		});
	} else {
		app.use(ElementPlus, {
			locale: zhEn,
		});
	}

	await router.isReady();
	app.mount(`#${AppId}`, true);
};

setTimeout(main);


