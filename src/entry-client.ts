/**
 * @file 客户端
 * @author svon.me@gmail.com
 */

// 引入 tailwindcss
import "virtual:windi.css";
import "virtual:windi-devtools";
// 引入项目全局样式
import "src/styles/main.scss";

import {config} from "src/router/config";
import {createApp} from "./bootstrap/main";
import * as webkit from "src/plugins/webkit/";
import { Device } from "src/types/common/device";
import { setDeviceValue } from "src/plugins/browser/cookie";

// 设置 Element Ui 中英文
import ElementPlus from "element-plus";
import {Language} from "src/types/language";
import safeGet from "@fengqiaogang/safe-get";
import zhEn from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import Decrypt from "src/plugins/encryption/decrypt";
import {AppId, languageKey, rootData, getEnv} from "src/config";
import {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";


const main = async function () {
	const text = safeGet<string>(window, rootData);
	const data = text ? Decrypt<object>(text) : {};

	console.log("env : ", getEnv());
	console.log("Server data ", data);

	const {app, router} = createApp(data);

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
	const lang = safeGet<Language>(data, `query.${languageKey}`) || Language.auto;
	if (lang === Language.cn) {
		app.use(ElementPlus, {
			locale: zhCn,
		});
	} else {
		app.use(ElementPlus, {
			locale: zhEn,
		});
	}

	const [process] = await Promise.all([
		webkit.env.process(), // 尝试与移动端设备进行交互
		router.isReady() // 路由准备
	]);
	// 如果移动端有返回数据
	if (process && process.device) {
		// 设置设备类型
		setDeviceValue(process.device);
	} else {
		// 设置默认类型
		setDeviceValue(Device.web);
	}
	app.mount(`#${AppId}`, true);
};

setTimeout(main);


