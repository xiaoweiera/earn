/**
 * @file 读取缓存中数据并同时创建变量
 * @author svon.me@gmail.com
 */


import { ref, reactive } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import getRootData from "src/utils/root/data";


export const createRef = function<T>(key: string, auto: T) {
	const data = getRootData<T>(key);
	if (data) {
		return ref<T>(data);
	}
	return ref<T>(auto);
}

export const createReactive = function<T>(key: string, auto: T) {
	const data = getRootData<T>(key);
	if (data) {
		// @ts-ignore
		return reactive<T>(data);
	}
	// @ts-ignore
	return reactive<T>(auto);
}
