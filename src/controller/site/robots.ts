/**
 * @file robots
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import {Env} from "src/config";
import { config as routerConfig } from "src/router/config";

const disallow = function(list: string[]): string {
  const arr: string[] = ["User-agent: *"];
  _.each(list, function(value: string) {
    arr.push(`Disallow: ${value}`);
  });
  return arr.join("\n");
}

const allow = function(list: string[]) {
  const arr: string[] = ["User-agent: *"];
  _.each(list, function(value: string) {
    arr.push(`Allow: ${value}`);
  });
  return arr.join("\n");
}

export const robots = function(env: Env) {
  const robots: string[] = [];
  // 禁止爬虫访问的目录
  robots.push(disallow([
    env.VITE_staticPath,
    routerConfig.E404,
    routerConfig.user.index
  ]));
  robots.push("\n\n");
  // 运行访问的目录
  robots.push(allow(["/"]));
  robots.push("\n");
  robots.push(`Sitemap: ${env.VITE_domain ? env.VITE_domain : ""}/sitemap.xml`);
  return robots.join("");
}
