/**
 * @file 首页
 * weier
 */

import { Model } from "src/logic/home";
import type { Request, Response } from "express";
import redirect from "src/controller/common/redirect";
import { config } from "src/router/config";
import I18n from "src/utils/i18n";
import safeGet from "@fengqiaogang/safe-get";
// home页面
export const begin = async function (req: Request, res: Response) {
  const i18n = I18n(req);
  const api = new Model(req);
  const category = "NFT";
  const [ads, topicRank, trend] = await Promise.all([api.getAdList(25), api.getTopicRank(category), api.getTrend()]);
  const result = {
    "title": i18n.home.webInfo.home.title,
    "keywords": i18n.home.webInfo.home.key,
    "description": i18n.home.webInfo.home.des,

    "API.home.ads": ads, //Ad
    "API.home.getTopicRank": topicRank, // 首页顶部话题榜单接口
    "API.home.getTrend": trend, // 今日趋势
  };
  res.send(result);
};

// 详情页面
export const detail = async function (req: Request, res: Response) {
  const i18n = I18n(req);
  const api = new Model(req);
  const id: string = safeGet<string>(req.params, "id");
  if (!id) {
    redirect(req, res, config.home);
    return;
  }
  const chain = req.query.chain as string;
  const category = req.query.category as string;
  const search = req.query.search as string;
  const params = { page: 1, page_size: 10 };
  // 项目列表
  const projectParams = {
    id,
    page: 1,
    page_size: 30,
    chain: chain || "",
    category: category || "",
    query: search || "",
  };

  try {
    const [detail, projects, recommend, top3] = await Promise.all([api.getDetail(id), api.getProjects(projectParams), api.getRecommend(params), api.getTop3(id)]);
    const result = {
      // @ts-ignore
      "title": detail && detail.id ? detail.name : i18n.home.webInfo.homeDetail.title,
      "keywords": i18n.home.webInfo.homeDetail.key,
      // @ts-ignore
      "description": detail && detail.id ? detail.desc : i18n.home.webInfo.homeDetail.des,

      "API.home.getDetail": detail, // 话题详情
      "API.home.getProjects": projects, // 话题项目
      "API.home.getRecommend": recommend, // 推荐话题
      "API.home.getTop3": top3, // 话题项目top3
    };
    res.send(result);
  } catch {
    redirect(req, res, config.home);
  }
};
