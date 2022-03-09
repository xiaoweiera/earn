/**
 * @file redis
 * @author svon.me@gmail.com
 */

import { createClient } from "redis";
import * as console from "src/plugins/log/";

const connect = async function(url?: string) {
  if (url) {
    const client = createClient({ url });
    client.on("error", (err: any) => {
      console.log("Redis Client Error", err);
    });
    client.on("ready", () => {
      console.log("redis ready。url = %s", url);
    });
    await client.connect();
    return client;
  }
};

export const getRedisClient = async function() {
  const value = [process.env.VITE_REDIS_URL];
  let client;
  for (const url of value) {
    client = await connect(url);
    if (client) {
      break;
    }
  }
  if (client) {
    return client;
  }
  console.log("暂无可用 redis 资源");
};
