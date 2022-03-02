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
