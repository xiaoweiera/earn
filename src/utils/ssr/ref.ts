/**
 * @file 读取缓存中数据并同时创建变量
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import * as API from "src/api/index";
import {ref, reactive, Ref} from "vue";
import getRootData from "src/utils/root/data";
import safeGet from "@fengqiaogang/safe-get";

const model = { API };

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

type ApiFun = <T>() => T;

//
export const onLoadRef = async function<T>(api: string | ApiFun | Function, data: Ref) {
	if (data.value && data.value.length < 1) {
		if (_.isString(api)) {
			const fun = safeGet<ApiFun>(model, api);
			if (fun && _.isFunction(fun)) {
				api = fun;
			}
		}
		if (_.isFunction(api)) {
			const value = await api<T>();
			if (value) {
				data.value = value;
			}
		}
	}
}
