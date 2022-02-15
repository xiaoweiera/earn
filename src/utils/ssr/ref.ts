/**
 * @file 读取缓存中数据并同时创建变量
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import API from "src/api/index";
import safeGet from "@fengqiaogang/safe-get";
import getRootData from "src/utils/root/data";
import {ref, reactive, Ref, toRaw, UnwrapNestedRefs} from "vue";

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

type ApiFun = <T>(query?: object | string | number) => T;

const getData = function<T>(api: string | ApiFun | Function, query?: object | string | number) {
	if (_.isString(api)) {
		const model = {
			api: new API()
		};
		const fun = safeGet<ApiFun>(model, api);
		if (fun && _.isFunction(fun)) {
			return fun<T>(query);
		}
	}
	if (_.isFunction(api)) {
		return api<T>(query);
	}
}

// Ref 数据
export const onLoadRef = async function<T>(data: Ref, api: string | ApiFun | Function, query?: object | string | number) {
	if (data.value && data.value.length < 1) {
		const value = await getData(api, query);
		if (value) {
			data.value = value;
		}
	}
}

// Reactive 数据
export const onLoadReactive = async function<T>(data: UnwrapNestedRefs<T>, api: string | ApiFun | Function, query?: object | string | number) {
	const obj = toRaw(data);
	const keys = Object.keys(obj);
	if (keys.length < 1) {
		const value = await getData<T>(api, query);
		if (value) {
			for (const key in value) {
				// @ts-ignore
				data[key] = value[key];
			}
		}
	}
}
