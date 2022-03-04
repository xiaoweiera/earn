/**
 * @file 博客
 * @author svon.me@gmail.com
 */

import {Model} from "src/logic/home";
import {Model as DAppModel} from "src/logic/dapp";
import {Request, Response} from "express";
import * as alias from "src/utils/root/alias";
import redirect from "src/controller/common/redirect";
import {config} from "src/router/config";
import I18n from "src/utils/i18n";
//home页面
export const begin = async function (req: Request, res: Response) {
    const i18n = I18n(req);
    const api = new Model(req);
    const DAppApi = new DAppModel(req);
    const params = {page: 1, page_size: 100, show_commercial: true};
    //IXO接口参数
    const chain = req.query['chain'] as string;
    //nft接口参数
    const group = req.query['group'] as string;
    const nftParams = {
        page: 1,
        page_size: 15,
        chain: group || '',
        category: '',
        status: 'upcoming',
        query: '',
        sort_field: '',
        sort_type: '',//desc asc
        paginate: false,
    }
    //IXO接口参数
    const bracket = req.query['bracket'] as string;
    const category = req.query['category'] as string;
    const platform = req.query['platform'] as string;
    const search = req.query['search'] as string;
    const Endedparams = ({
        chain: bracket || '',
        category: category || '',
        platform: platform || '',
        status: 'ended',
        query: search || '',
        sort_field: '',
        sort_type: '',//desc asc
    })
    const [summary, topicRank, recommend, trend, platforms, UpcomingList, OngoingList, UpcomingNftList, EndedList] = await Promise.all([
        api.getSummary(),
        api.getTopicRank(),
        api.getRecommend(params),
        api.getTrend(),
        api.getPlatform(),
        DAppApi.getUpcomingProjects(chain),
        DAppApi.getOngoingProjects(chain),
        DAppApi.getUpcomingNftList(nftParams),
        DAppApi.getEndedProjects(Endedparams),
    ]);
    const result = {
        title: i18n.home.webInfo.home.title,
        keywords: i18n.home.webInfo.home.key,
        description: i18n.home.webInfo.home.des,

        [alias.dApp.summary.list]: summary,      // 数据汇总
        "API.home.getTopicRank": topicRank,    // 首页顶部话题榜单接口
        "API.home.getRecommend": recommend, //推荐话题
        "API.home.getTrend": trend, //今日趋势
        "API.home.getPlatform": platforms, //TGE平台列表
        [alias.dApp.ixo.upcoming]: UpcomingList,//IXO即将开始
        [alias.dApp.ixo.ongoing]: OngoingList,//IXO进行时
        [alias.nft.upcoming]: UpcomingNftList, //nft进行时
        [alias.dApp.ixo.ended]: EndedList, //IXO结束
    };
    res.send(result);
}

//详情页面
export const detail = async function (req: Request, res: Response) {
    const i18n = I18n(req);
    const api = new Model(req);
    const id = req.query['id'] as string
    if (!id) {
        redirect(req, res, config.home)
        return
    }
    const chain = req.query['chain'] as string
    const category = req.query['category'] as string
    const search = req.query['search'] as string
    const params = {page: 1, page_size: 10}
    //项目列表
    const projectParams = {
        id: id,
        page: 1,
        page_size: 30,
        chain: chain || '',
        category: category || '',
        query: search || ''
    }


    try {
        const [detail, projects, recommend, top3] = await Promise.all([
            api.getDetail(id),
            api.getProjects(projectParams),
            api.getRecommend(params),
            api.getTop3(id),
        ]);
        const result = {
            //@ts-ignore
            title: (detail && detail.id) ? detail.name : i18n.home.webInfo.homeDetail.title,
            keywords: i18n.home.webInfo.homeDetail.key,
            //@ts-ignore
            description: (detail && detail.id) ? detail.desc : i18n.home.webInfo.homeDetail.des,

            "API.home.getDetail": detail,//话题详情
            "API.home.getProjects": projects,//话题项目
            "API.home.getRecommend": recommend, //推荐话题
            "API.home.getTop3": top3, //话题项目top3
        };
        res.send(result);
    } catch {
        redirect(req, res, config.home)
    }

}



