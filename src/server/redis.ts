/**
 * @file redis
 * @author svon.me@gmail.com
 */

import { createClient, RedisClientType } from "redis";

export const getRedisClient = async function () {
	const client = createClient({
		socket: {
			port: 6379,
			host: "www.svon.org",
		},
		password: "jBeEZsp9G3zS6wvJ", // redis 密码
		database: 13 // 数据库 ID
	});
	client.on("error", function (err: any) {
		console.log('Redis Client Error', err);
	});
	await client.connect();
	return client;
}


