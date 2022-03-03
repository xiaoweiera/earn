/**
 * @file redis
 * @author svon.me@gmail.com
 */

import {uuid} from "src/utils";
import { RedisClientType } from "redis";

let redis: RedisClientType;

export const setClient = function (client: RedisClientType) {
	redis = client;
}

export const getClient = function (): RedisClientType | undefined {
	return redis;
}

export const makeKey = function (...args: any[]) {
	return uuid(args);
}

export const expire = function (name: string, time?: number) {
	if (time && time > 0) {
		const client = getClient();
		if (client) {
			return client.expire(name, time);
		}
	}
}

export const set = async function (name: string, value: any, time?: number) {
	const client = getClient();
	if (client) {
		const d = JSON.stringify({ value });
		if (time) {
			await client.set(name, d);
			return expire(name, time);
		} else {
			return client.set(name, d);
		}
	}
}

export const get = function (name: string) {
	const client = getClient();
	if (client) {
		return client.get(name);
	}
}
