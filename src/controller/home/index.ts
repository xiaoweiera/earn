/**
 * @file 博客
 * @author svon.me@gmail.com
 */

import { Model } from "src/logic/home";
import {Request, Response} from "express";

export const begin = async function (req: Request, res: Response) {
    const api = new Model(req);
    const [ summary,topicRank,recommend] = await Promise.all([
        api.getSummary(),
        api.getTopicRank(),
        api.getRecommend()
    ]);
    const result = {
        "API.home.getSummary": summary,      // 数据汇总
        "API.home.getTopicRank":topicRank,    // 首页顶部话题榜单接口
        "API.home.getRecommend":recommend //推荐话题
    };
    res.send(result);
}

