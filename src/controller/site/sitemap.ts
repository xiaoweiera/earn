/**
 * @file sitemap
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import type { Env } from "src/config";
import { languageKey } from "src/config";
import { Language } from "src/types/language";
import { createHref } from "src/plugins/router/pack";

enum Change {
  always = "always", // 随时更新
  hourly = "hourly", // 小时
  daily = "daily", // 天
  weekly = "weekly", // 周
  monthly = "monthly", // 月
  yearly = "yearly", // 年
  never = "never", // 从不
}

export interface Site {
  loc: string; // 网址
  lastmod?: string; // 更新时间 （年月日）
  changefreq?: Change; // 更新频率
  priority?: number; // 优先级
}

export const sitemap = function (env: Env): Site[] {
  const list: Site[] = [
  ];
  const data: Site[] = [];
  _.each(list, (item: Site) => {
    const url = env.VITE_domain ? `${env.VITE_domain}${item.loc}` : item.loc;
    data.push(
      {
        ...item,
        loc: createHref(url, {
          [languageKey]: Language.en,
        }),
      },
      {
        ...item,
        loc: createHref(url, {
          [languageKey]: Language.cn,
        }),
      },
    );
  });
  return data;
};
