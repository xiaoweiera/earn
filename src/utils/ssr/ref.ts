/**
 * @file 读取缓存中数据并同时创建变量
 * @author svon.me@gmail.com
 */


import { ref, reactive } from "vue";
import getRootData from "src/utils/root/data";


export const getValue = function<T>(key: string, auto: T): T {
	const data = getRootData<T>(key);
	if (data) {
		return data;
	}
	return auto;
}

export const createRef = function<T>(key: string, auto: T) {
	const value = getValue<T>(key, auto);
	return ref<T>(value);
}

export const createReactive = function<T>(key: string, auto: T) {
	const value = getValue<T>(key, auto);
	// @ts-ignore
	return reactive<T>(value);
}
