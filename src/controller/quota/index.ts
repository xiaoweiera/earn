/**
 * @file 指标
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import API from "src/api/";
import I18n from "src/utils/i18n/";
import safeGet from "@fengqiaogang/safe-get";
import { names } from "src/config/header";
import * as alias from "src/utils/root/alias";
import type { Request, Response } from "express";
import { go404 } from "src/controller/common/redirect";
import type { Data, IndicatorItem } from "src/types/quota/";

// 推荐指标
export const indicators = async function (req: Request, res: Response) {
  const i18n = I18n(req);
  const api = new API(req);
  res.locals.menuActive = names.quota.indicators;
  const list = await api.quota.getIndicator<IndicatorItem>({
    page: 1,
    page_size: 20,
  });
  res.send({
    title: i18n.news.meta.title.quota,
    description: i18n.news.meta.description,
    keywords: i18n.news.meta.keywords,
    [alias.quota.indicator]: list,
  });
};

// 指标异动 - 列表
export const signals = async function (req: Request, res: Response) {
  const i18n = I18n(req);
  const api = new API(req);

  res.locals.menuActive = names.quota.signals;

  const list = await api.quota.getSignals<Data>({
    page: 1,
    page_size: 100,
  });

  const data = {
    title: i18n.news.meta.title.alert,
    keywords: i18n.news.meta.keywords,
    description: i18n.news.meta.description,
    [alias.quota.signals]: list,
  };
  res.send(data);
};

// 指标异动 - 详情
export const detail = async function (req: Request, res: Response) {
  const id = safeGet<string>(req.params, "id");
  if (id) {
    const i18n = I18n(req);
    const api = new API(req);
    const [data, recommend] = await Promise.all([
      api.quota.getDetail<Data>(id), // 详情数据
      api.quota.getRecommend<Data[]>(id), // 相关推荐
    ]);
    res.locals.menuActive = names.quota.signals;
    let title: string = i18n.news.meta.title.alert;
    let description = i18n.news.meta.description;
    let keywords: string = i18n.news.meta.keywords;
    const content = _.trim(safeGet<string>(data, "content") || "");
    if (content) {
      if (content.length > 50) {
        title = `${content.slice(0, 47)}... - KingData`;
      } else {
        title = `${content.slice(0, 50)} - KingData`;
      }
      if (content.length > 220) {
        description = `${content.slice(0, 217)}...`;
      } else {
        description = content.slice(0, 220);
      }
      if (data.chart && data.chart.name) {
        keywords = `${data.chart.name},${keywords}`;
      }
    }

    res.send({
      title,
      description,
      keywords,
      [alias.quota.detail]: data,
      [alias.quota.recommend]: recommend,
    });
  } else {
    go404(req, res);
  }
};
