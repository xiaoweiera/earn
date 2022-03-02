/**
 * @file echarts 公共方法
 * @author svon.me@gmail.com
 */

// import {uuid} from "src/utils/";

export * as stateAlias from "./alias";
import {inject, provide, ref, Ref, reactive, UnwrapNestedRefs, watch as VueWatch} from "vue";


type SetState = (value?: any) => void
type Watch = (value?: any) => void

const cache = new Set<string>();

const makeName = function (value: string): string {
	return value;
}


// 创建 Ref 数据
export const useRefProvide = function <T>(name: string, value?: T, watch?: Watch): [ Ref<T>, SetState ] {
	const key = makeName(name);
	const state = value ? ref<T | undefined>(value) : ref<T>();
	const setState = function (data?: T) {
		state.value = data;
		if (watch) {
			watch(state);
		}
	};
	provide(name, setState);
	provide(`get.${key}`, state);
	cache.add(key);
	return [ state as Ref<T>, setState ];
}
// 创建 Reactive 数据
export const useReactiveProvide = function <T>(name: string, value?: T, watch?: Watch): [ Ref<T>, SetState ] {
	const key = makeName(name);
	// @ts-ignore
	const state = reactive<T>(value ? value : {} as T);

	const setState = function (data?: T) {
		if (data) {
			for (const key in data) {
				// @ts-ignore
				state[key] = data[key];
			}
		} else {
			const keys = Object.keys(state);
			for (const key of keys) {
				// @ts-ignore
				delete state[key];
			}
		}
		if (watch) {
			watch(state);
		}
	};
	provide(name, setState);
	provide(`get.${key}`, state);

	cache.add(key);
	return [ state as Ref<T>, setState ];
}

export const useWatch = function<T>(state: Ref<T> | UnwrapNestedRefs<T>, watch?: Watch) {
	if (state && watch) {
		VueWatch(state as any, function () {
			watch(state);
		});
	}
}

export const hasState = function (name: string): boolean {
	const key = makeName(name);
	return cache.has(key);
}

// 不区分数据类型获取数据
export const getInject = function <T>(name: string): T | undefined {
	if (hasState(name)) {
		const key = makeName(name);
		const state = inject<T>(`get.${key}`);
		if (state) {
			return state;
		}
	}
	return void 0;
}
// 获取 Ref 数据
export const getRefInject = function <T>(name: string): Ref<T> | undefined {
	return getInject<Ref<T>>(name);
}
// 获取 Reactive 数据
export const getReactiveInject = function <T>(name: string): UnwrapNestedRefs<T> | undefined {
	return getInject<UnwrapNestedRefs<T>>(name);
}

// 获取修改数据的钩子函数
export const setInject = function (name: string): SetState | undefined {
	if (hasState(name)) {
		const key = makeName(name);
		return inject<SetState>(key);
	}
}



