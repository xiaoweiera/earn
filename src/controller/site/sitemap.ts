/**
 * @file sitemap
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import dayjs from "dayjs";
import type { Env } from "src/config";
import { languageKey } from "src/config";
import { Language } from "src/types/language";
import { createHref } from "src/plugins/router/pack";
import { config as routerOption, routerConfig } from "src/router/config";

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
  const today = dayjs().format("YYYY-MM-DD");
  const list: Site[] = [
    {
      // 首页
      loc: routerOption.home,
      lastmod: today,
      changefreq: Change.daily,
      priority: 0.3,
    },
    {
      // 数据报表
      loc: routerOption.topic,
      changefreq: Change.weekly,
      priority: 1,
    },
    {
      // growthpad
      loc: routerOption.growthpad,
      priority: 1,
    },
    {
      // 博客
      loc: routerOption.blog,
      lastmod: today,
      changefreq: Change.daily,
      priority: 0.7,
    },
    {
      // 指标异动
      loc: routerOption.news,
      lastmod: today,
      changefreq: Change.hourly,
      priority: 0.3,
    },
    {
      // 推荐指标
      loc: routerOption.quota,
      changefreq: Change.weekly,
      priority: 1,
    },
    {
      // 投融资
      loc: routerOption.invest,
      changefreq: Change.daily,
      lastmod: today,
      priority: 0.5,
    },
    {
      // 空投
      loc: routerConfig.dapp.airdropList(),
      changefreq: Change.daily,
      lastmod: today,
      priority: 0.5,
    },
    {
      // DApp 列表
      loc: routerConfig.dapp.idoList(),
      changefreq: Change.daily,
      lastmod: today,
      priority: 0.5,
    },
    {
      // IGO 列表
      loc: routerConfig.dapp.igoList(),
      changefreq: Change.daily,
      lastmod: today,
      priority: 0.5,
    },
    {
      // NFT 列表
      loc: routerConfig.dapp.nftList(),
      changefreq: Change.daily,
      lastmod: today,
      priority: 0.5,
    },
    {
      // 大户地址
      loc: routerOption.address,
      changefreq: Change.weekly,
      priority: 1,
    },
    {
      // DApp 排行榜
      loc: routerConfig.rank.dappList(),
      changefreq: Change.daily,
      lastmod: today,
      priority: 0.7,
    },
    {
      // NFT 排行榜
      loc: routerConfig.rank.nftList(),
      changefreq: Change.daily,
      lastmod: today,
      priority: 0.7,
    },
    {
      // game 排行榜
      loc: routerConfig.rank.gameList(),
      changefreq: Change.daily,
      lastmod: today,
      priority: 0.7,
    },
    {
      // defi 排行榜
      loc: routerConfig.rank.defiList(),
      changefreq: Change.daily,
      lastmod: today,
      priority: 0.7,
    },
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
