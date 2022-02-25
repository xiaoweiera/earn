/**
 * @file 装饰器
 */
import "reflect-metadata";
import {compact, isEmpty, isFunction, isString, toBoolean} from "src/utils";

type CallBack = <T>(...args: any[]) => T
export type ErrCatch = (e: Error, ...args: any[]) => void

// 执行回调函数
const runCallback = function <T>(callback?: string | CallBack | ErrCatch, args?: any[]): T | undefined {
	// @ts-ignore
	let app: CallBack
	// @ts-ignore
	if (callback && isString(callback) && isFunction(this[callback])) {
		// @ts-ignore
		app = this[callback].bind(this)
	} else if (callback && isFunction(callback)) {
		// @ts-ignore
		app = callback
	}
	// @ts-ignore
	if (app) {
		if (args && args.length > 0) {
			return app<T>(...args)
		} else {
			return app<T>()
		}
	}
	return void 0
}

// 处理异常默认值
export const ErrorDefault = function (value?: any, log?: boolean) {
	return function (e: Error, ...args: any[]) {
		if (log) {
			if (args.length > 0) {
				console.log(...args)
			}
		}
		return value
	}
}

// 处理异常，默认返回空
export const ErrorNull = ErrorDefault(void 0);


export const before = function (callback: string | CallBack | any) {
	return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
		const app = descriptor.value;
		descriptor.value = function (...args: any[]) {
			const fun: CallBack = runCallback.bind(this) as any;
			const status = fun<boolean>(callback);
			if (toBoolean(status)) {
				return app.apply(this, args);
			} else {
				throw {
					code: 500,
					message: `before result = false, Function name = ${methodName}, CallBack name = ${callback.name}`
				};
			}
		}
	}
}

export const tryError = function (errCatch?: string | ErrCatch) {
	return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
		const app = descriptor.value
		descriptor.value = async function (...args: any[]) {
			try {
				return await Promise.resolve(app.apply(this, args));
			} catch (e) {
				const query: any[] = compact([ e ].concat(args));
				const callback: CallBack = runCallback.bind(this) as any;
				const result = callback<any>(errCatch, query);
				if (result) {
					return result;
				}
				console.warn('Function %s trigger Error', methodName);
				// @ts-ignore
				return ErrorNull(...query);
			}
		}
	}
}


const requiredMetadataKey = Symbol('required')

export const required = function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
	// @ts-ignore
	let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
	existingRequiredParameters.push(parameterIndex);
	// @ts-ignore
	Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

export const validate = function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
	const fun = descriptor.value;
	descriptor.value = function (...args: any[]) {
		// @ts-ignore
		const requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
		if (requiredParameters) {
			for (const parameterIndex of requiredParameters) {
				if (parameterIndex >= args.length || isEmpty(args[parameterIndex])) {
					throw new Error("Missing required argument.");
				}
			}
		}
		// @ts-ignore
		return fun.apply(this, args);
	}
}
