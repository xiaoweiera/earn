/**
 * @file 数据图表
 */

import { config } from "src/router/config";
import { Lang } from "src/types/language";
import { MenuItem } from "src/types/menu";
import I18n from "src/utils/i18n";

export const name = {
  topic: "topic-list",
};

export const TopicList = function (lang?: Lang): MenuItem {
  const i18n = I18n(lang);
  return {
    id: name.topic,
    name: i18n.nav.analysis.name, // '数据'
    icon: "icon-shuju",
    href: `${config.topic}?tagID=11&topicID=34`,
    expand: "HeaderSubData",
    blank: true,
    header: true,
  };
};
/*
children: [
      {
        name: i18n.menu.data.topic, // 数据专题
        icon: "icon-shuju",
        href: config.topic,
        more: true,
        header: false,
        children: [
          {
            more: true,
            name: i18n.nav.analysis.chart.children.recommad.name,
            href: `${config.topic}?tagID=item&topicID=0`,
          },
          {
            more: true,
            name: i18n.nav.analysis.chart.children.special.name,
            children: [
              {
                more: true,
                name: i18n.nav.analysis.chart.children.special.children.usdt.name,
                href: `${config.topic}?tagID=1&topicID=22`,
              },
              {
                more: true,
                name: i18n.nav.analysis.chart.children.special.children.shichang.name,
                href: `${config.topic}?tagID=1&topicID=23`,
              },
              {
                more: true,
                name: i18n.nav.analysis.chart.children.special.children.quanqiu.name,
                href: `${config.topic}?tagID=1&topicID=27`,
              },
              {
                more: true,
                name: i18n.nav.analysis.chart.children.special.children.huidu.name,
                href: `${config.topic}?tagID=1&topicID=25`,
              },
            ],
          },
          {
            more: true,
            name: i18n.nav.analysis.chart.children.project.name,
            children: [
              {
                more: true,
                name: i18n.nav.analysis.chart.children.project.children.dex.name,
                href: `${config.topic}?tagID=11&topicID=24`,
              },
              {
                more: true,
                name: i18n.nav.analysis.chart.children.project.children.defi.name,
                href: `${config.topic}?tagID=11&topicID=10`,
              },
              {
                more: true,
                name: i18n.nav.analysis.chart.children.project.children.gonglian.name,
                href: `${config.topic}?tagID=11&topicID=34`,
              },
            ],
          },
          {
            more: true,
            name: i18n.nav.analysis.chart.children.bsc.name,
            children: [
              {
                more: true,
                name: i18n.nav.analysis.chart.children.bsc.children.bsc.name,
                href: `${config.topic}?tagID=12&topicID=33`,
              },
            ],
          },
          {
            more: true,
            name: i18n.nav.analysis.chart.children.heco.name,
            children: [
              {
                more: true,
                name: i18n.nav.analysis.chart.children.heco.children.mdex.name,
                href: `${config.topic}?tagID=10&topicID=15`,
              },
              {
                more: true,
                name: i18n.nav.analysis.chart.children.heco.children.heco.name,
                href: `${config.topic}?tagID=10&topicID=17`,
              },
              {
                more: true,
                name: i18n.nav.analysis.chart.children.heco.children.mdx.name,
                href: `${config.topic}?tagID=10&topicID=30`,
              },
              {
                more: true,
                name: i18n.nav.analysis.chart.children.heco.children.coin.name,
                href: `${config.topic}?tagID=10&topicID=32`,
              },
            ],
          },
          {
            more: true,
            name: i18n.nav.analysis.chart.children.eth.name,
            children: [
              {
                more: true,
                name: i18n.nav.analysis.chart.children.eth.children.sushi.name,
                href: `${config.topic}?tagID=9&topicID=13`,
              },
              {
                more: true,
                name: i18n.nav.analysis.chart.children.eth.children.uni.name,
                href: `${config.topic}?tagID=9&topicID=12`,
              },
              {
                more: true,
                name: i18n.nav.analysis.chart.children.eth.children.ampl.name,
                href: `${config.topic}?tagID=9&topicID=5`,
              },
              {
                more: true,
                name: i18n.nav.analysis.chart.children.eth.children.eth.name,
                href: `${config.topic}?tagID=9&topicID=35`,
              },
            ],
          },
          {
            more: true,
            name: i18n.nav.analysis.chart.children.dot.name,
            children: [
              {
                more: true,
                name: i18n.nav.analysis.chart.children.dot.children.dot.name,
                href: `${config.topic}?tagID=8&topicID=3`,
              },
            ],
          },
          {
            more: true,
            name: i18n.nav.analysis.chart.children.fil.name,
            children: [
              {
                more: true,
                name: i18n.nav.analysis.chart.children.fil.children.fil.name,
                href: `${config.topic}?tagID=7&topicID=14`,
              },
            ],
          },
          {
            more: true,
            name: i18n.nav.analysis.chart.children.exchange.name,
            children: [
              {
                more: true,
                name: i18n.nav.analysis.chart.children.exchange.children.zhuliu.name,
                href: `${config.topic}?tagID=6&topicID=26`,
              },
              {
                more: true,
                name: i18n.nav.analysis.chart.children.exchange.children.jiaoyi.name,
                href: `${config.topic}?tagID=6&topicID=29`,
              },
            ],
          },
        ],
      },
    ],
 */
