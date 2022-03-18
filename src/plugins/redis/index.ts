/**
 * @file redis
 * @author svon.me@gmail.com
 */

import { random } from "lodash";
import { MD5 } from "src/plugins/encryption/md5";
import type { RedisClientType } from "redis";
import safeGet from "@fengqiaogang/safe-get";

let redis: RedisClientType;

const jsonKey = "v";

export const setClient = function (client: RedisClientType) {
  redis = client;
};

export const getClient = function (): RedisClientType | undefined {
  return redis;
};

// 创建 Key
export const makeKey = function (...args: any[]) {
  if (getClient() && args.length > 0) {
    const value = MD5(args);
    return `web_${value}`;
  }
};
// 设置过期时间
export const expire = async function (name: string, time?: number) {
  if (time && time > 0) {
    const client = getClient();
    if (client) {
      try {
        let value = time;
        if (time >= 60) {
          value = time + random(0, 200) - random(0, 15);
        }
        await client.expire(name, value);
      } catch (e) {
        // todo
      }
    }
  }
};

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
};
// 读取数据
export const get = async function <T>(name: string) {
  const client = getClient();
  if (client) {
    try {
      const value = await client.get(name);
      if (value) {
        const data: object = JSON.parse(value);
        return safeGet<T>(data, jsonKey);
      }
    } catch (e) {
      // todo
    }
  }
};

// 写入数据
export const set = async function (name: string, value: any, time?: number) {
  const client = getClient();
  if (client) {
    const d = JSON.stringify({ [jsonKey]: value });
    try {
      await client.set(name, d);
      await expire(name, time);
    } catch (e) {
      // todo
    }
  }
};

// 删除缓存
export const remove = async function (name: string) {
  const client = getClient();
  if (name && client) {
    return client.del(name);
  }
};
