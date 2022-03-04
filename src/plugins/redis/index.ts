/**
 * @file redis
 * @author svon.me@gmail.com
 */

import {uuid} from "src/utils";
import { RedisClientType } from "redis";
import safeGet from "@fengqiaogang/safe-get";

let redis: RedisClientType;

const jsonKey = "v";

export const setClient = function (client: RedisClientType) {
	redis = client;
}

export const getClient = function (): RedisClientType | undefined {
	return redis;
}

// 创建 Key
export const makeKey = function (...args: any[]) {
	if (getClient()) {
		return uuid(args);
	}
}
// 设置过期时间
export const expire = function (name: string, time?: number) {
	if (time && time > 0) {
		const client = getClient();
		if (client) {
			return client.expire(name, time);
		}
	}
}

// 判断 key 是否存在
export const has = async function (name: string): Promise<boolean> {
	const client = getClient();
	if (client) {
		const count = await client.exists(name);
		if (count && count > 0) {
			return true;
		}
	}
	return false;
}
// 读取数据
export const get = async function<T>(name: string) {
	const client = getClient();
	if (client) {
		const value = await client.get(name);
		if (value) {
			const data: object = JSON.parse(value);
			return safeGet<T>(data, jsonKey);
		}
	}
}

// 写入数据
export const set = async function (name: string, value: any, time?: number) {
	const client = getClient();
	if (client) {
		const d = JSON.stringify({ [jsonKey]: value });
		if (time) {
			await client.set(name, d);
			return expire(name, time);
		} else {
			return client.set(name, d);
		}
	}
}