/**
 * @file 客户端
 * @author svon.me@gmail.com
 */

// 引入 tailwindcss
import "virtual:windi.css";
import "virtual:windi-devtools";
// 引入项目全局样式
import "src/styles/main.scss";

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


const main = async function () {
	const text = safeGet<string>(window, rootData);
	const data = text ? Decrypt<object>(text) : {};

	const { app, router } = createApp(data);

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


