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
import { config as routerConfig } from "src/router/config";

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

export const sitemap = function(env: Env): Site[] {
  const today = dayjs().format("YYYY-MM-DD");
  const list: Site[] = [{
    // 首页
    loc: routerConfig.home,
    lastmod: today,
    changefreq: Change.daily,
    priority: 0.3,
  }, {
    // 数据报表
    loc: routerConfig.topic,
    changefreq: Change.weekly,
    priority: 1,
  }, {
    // growthpad
    loc: routerConfig.growthpad,
    priority: 1,
  }, {
    // 博客
    loc: routerConfig.blog,
    lastmod: today,
    changefreq: Change.daily,
    priority: 0.7,
  }, {
    // 指标异动
    loc: routerConfig.news,
    lastmod: today,
    changefreq: Change.hourly,
    priority: 0.3,
  }, {
    // 推荐指标
    loc: routerConfig.quota,
    changefreq: Change.weekly,
    priority: 1,
  }, {
    // 空投
    loc: routerConfig.airdrop,
    changefreq: Change.daily,
    lastmod: today,
    priority: 0.5,
  }, {
    // DApp 列表
    loc: routerConfig.dappList,
    changefreq: Change.daily,
    lastmod: today,
    priority: 0.5,
  }, {
    // IGO 列表
    loc: `${routerConfig.dappList}?igo=true`,
    changefreq: Change.daily,
    lastmod: today,
    priority: 0.5,
  }, {
    // NFT 列表
    loc: routerConfig.nftList,
    changefreq: Change.daily,
    lastmod: today,
    priority: 0.5,
  }, {
    // NFT 列表
    loc: routerConfig.address,
    changefreq: Change.weekly,
    priority: 1,
  }, {
    // DApp 排行榜
    loc: `${routerConfig.dapp}/rank`,
    changefreq: Change.daily,
    lastmod: today,
    priority: 0.7,
  }, {
    // NFT 排行榜
    loc: `${routerConfig.dapp}/nft`,
    changefreq: Change.daily,
    lastmod: today,
    priority: 0.7,
  }, {
    // game 排行榜
    loc: `${routerConfig.dapp}/rank?category=game`,
    changefreq: Change.daily,
    lastmod: today,
    priority: 0.7,
  }, {
    // defi 排行榜
    loc: `${routerConfig.dapp}/rank?category=defi`,
    changefreq: Change.daily,
    lastmod: today,
    priority: 0.7,
  }];
  const data: Site[] = [];
  _.each(list, (item: Site) => {
    const url = env.VITE_domain ? `${env.VITE_domain}${item.loc}` : item.loc;
    data.push({
      ...item,
      loc: createHref(url, {
        [languageKey]: Language.en,
      }),
    }, {
      ...item,
      loc: createHref(url, {
        [languageKey]: Language.cn,
      }),
    });
  });
  return data;
};
