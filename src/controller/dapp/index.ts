import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import API from "src/api";
import type { Request, Response, Router } from "express";
import type { Callback } from "src/types/common/";
import { Model } from "src/logic/dapp";
import { Model as InvestModel } from "src/logic/dapp/invest";
import type { DAppProject } from "src/types/dapp/data";
import { ProjectType, TabName } from "src/types/dapp/data";
import * as alias from "src/utils/root/alias";
import { names } from "src/config/header";
import I18n from "src/utils/i18n";
import { TabTypes } from "src/types/dapp/airdrop";

export const list = async function (req: Request, res: Response) {
  const api = new Model(req);
  // 判断当前是否为 igo
  const is_igo = safeGet<string>(req, "query.igo") || safeGet<string>(req, "query.isIgo");
  if (is_igo) {
    res.locals.menuActive = names.dapp.igo;
  } else {
    res.locals.menuActive = names.dapp.dapp;
  }
  const chain = req.query.chain as string;
  const category = req.query.category as string;
  const platform = req.query.platform as string;
  const status = req.query.type as string;
  const sort_field = req.query.sort_field as string;
  const sort_type = req.query.sort_type as string;
  const paginate = true;
  const search = req.query.search as string;
  const params = {
    page: 1,
    page_size: 16,
  };
  const projectParams = {
    page: params.page,
    page_size: params.page_size,
    status: status || "upcoming",
    chain: chain || "",
    platform: platform || "",
    category: category || "",
    sort_field: sort_field || "",
    sort_type: sort_type || "",
    paginate,
    is_igo: !!is_igo,
    query: search || "",
  };
  const i18n = I18n(req);
  const [list, summary] = await Promise.all([api.getList(projectParams), api.home.getSummary()]);
  const result = {
    "title": is_igo ? i18n.home.webIgo.title : i18n.home.webIdo.title,
    "keywords": i18n.home.webIdo.key,
    "description": i18n.home.webIdo.des,

    "API.dapp.list": list, // IDO数据
    [alias.dApp.summary.list]: summary,
  };
  res.send(result);
};

// nft列表
export const nftList = async function (req: Request, res: Response) {
  const i18n = I18n(req);
  const api = new Model(req);
  res.locals.menuActive = names.dapp.nft;
  const query: any = {
    ...req.query,
    paginate: true,
  };
  if (!query.status) {
    query.status = "upcoming";
  }
  const [list, summary] = await Promise.all([api.getNftList(query), api.home.getSummary()]);
  const result = {
    "title": i18n.home.webNft.title,
    "keywords": i18n.home.webNft.key,
    "description": i18n.home.webNft.des,

    "API.nft.list": list, // nft数据
    [alias.dApp.summary.list]: summary,
  };
  res.send(result);
};

//处理缓存数据
const airdrop = {
  [TabTypes.all]: async function (req: Request) {
    const api = new Model(req);
    const query = req.query;
    const [ongoingList, potentialList, upcomingList, endedList, operationList, hotList] = await Promise.all([
      api.getOngoingList({ ...query, page: 1, page_size: 4, status: TabTypes.ongoing }),
      api.getPotentialList({ ...query, page: 1, page_size: 4, status: TabTypes.potential }),
      api.getUpcomingList({ ...query, page: 1, page_size: 4, status: TabTypes.upcoming }),
      api.getEndedList({ ...query, page: 1, page_size: 4, status: TabTypes.ended }),
      api.getOperationList({ ...query, page: 1, page_size: 4, potential: true }),
      api.getHotPotentialList({ ...query, page: 1, page_size: 4, potential: false }),
    ]);
    return {
      [alias.airdrop.ongoing]: ongoingList, // airdrop进行中数据
      [alias.airdrop.potential]: potentialList, // airdrop优质空投数据
      [alias.airdrop.upcoming]: upcomingList, // airdrop即将开始数据
      [alias.airdrop.ended]: endedList, // airdrop已结束数据
      [alias.airdrop.operation]: operationList, // airdrop运营热门数据
      [alias.airdrop.hotPotential]: hotList, // airdrop运营优质数据
    };
  },
  [TabTypes.ongoing]: async function (req: Request) {
    const api = new Model(req);
    const ongoingList = await api.getOngoingList({ page: 1, page_size: 20, status: TabTypes.ongoing });
    return {
      [alias.airdrop.ongoing]: ongoingList, // airdrop进行中数据
    };
  },
  [TabTypes.potential]: async function (req: Request) {
    const api = new Model(req);
    const potentialList = await api.getPotentialList({ page: 1, page_size: 20, status: TabTypes.potential });
    return {
      [alias.airdrop.potential]: potentialList, // airdrop优质空投数据
    };
  },
  [TabTypes.upcoming]: async function (req: Request) {
    const api = new Model(req);
    const upcomingList = await api.getPotentialList({ page: 1, page_size: 20, status: TabTypes.upcoming });
    return {
      [alias.airdrop.upcoming]: upcomingList, // airdrop即将开始数据
    };
  },
  [TabTypes.ended]: async function (req: Request) {
    const api = new Model(req);
    const endedList = await api.getEndedList({ page: 1, page_size: 20, status: TabTypes.ended });
    return {
      [alias.airdrop.ended]: endedList, // airdrop已结束数据
    };
  },
  [TabTypes.hot]: async function (req: Request) {
    const api = new Model(req);
    const operationList = await api.getOperationList({ page: 1, page_size: 6, potential: true });
    const hotList = await api.getHotPotentialList({ page: 1, page_size: 6, potential: false });
    return {
      [alias.airdrop.operation]: operationList, // airdrop运营精选数据
      [alias.airdrop.hotPotential]: hotList, // airdrop运营精选数据
    };
  },
};

// 空投列表
export const airdropList = async function (req: Request, res: Response) {
  const i18n = I18n(req);
  res.locals.menuActive = names.dapp.airdrop;
  const name = safeGet<TabTypes>(req.params, "name") || TabTypes.all;
  let data: object = {};
  // 判断 [name] 是否是 [airdrop] 的键
  if (name in airdrop) {
    // 获取回调函数
    const callback = safeGet<Callback>(airdrop, name);
    data = await callback(req);
  }
  res.send({
    ...data,
    title: i18n.home.webAirdrop.title,
    keywords: i18n.home.webAirdrop.key,
    description: i18n.home.webAirdrop.des,
  });
};

//投融资列表
export const investList = async function (req: Request, res: Response) {
  const api = new InvestModel(req);
  res.locals.menuActive = names.dapp.invest;
  const [project, funds, list] = await Promise.all([api.getProjectsList({ page: 1, page_size: 8, stage: "All", keyword: "" }), api.getFundsList({ page: 1, page_size: 8, keyword: "" }), api.getRoundList()]);
  const result = {
    [alias.invest.list.projects]: project, // 投融资项目
    [alias.invest.list.funds]: funds, //投资动向
    [alias.invest.list.round]: list, //轮次列表
  };
  res.send(result);
};
//投融资详情
export const investDetail = async function (req: Request, res: Response) {
  const i18n = I18n(req);
  const result = {
    title: i18n.home.webNft.title,
    keywords: i18n.home.webNft.key,
    description: i18n.home.webNft.des,
  };
  res.send(result);
};

/**
 * 项目库详情
 * @param router 路由
 * @param path 路径
 * @param type 项目类型
 * @param rank 是否属于排行榜
 */
export const dAppDetail = function (router: Router, path: string, type: ProjectType, rank = false) {
  const detail = async function (req: Request, res: Response) {
    const project = {
      type,
      rank,
      tab: TabName.dashboard,
    } as DAppProject;
    if (rank) {
      switch (type) {
      case ProjectType.nft:
        res.locals.menuActive = names.rank.nft;
        break;
      case ProjectType.defi:
        res.locals.menuActive = names.rank.defi;
        break;
      case ProjectType.game:
        res.locals.menuActive = names.rank.gamefi;
        break;
      case ProjectType.dapp:
        res.locals.menuActive = names.rank.dapp;
        break;
      }
    } else {
      switch (type) {
      case ProjectType.nft:
        res.locals.menuActive = names.dapp.nft;
        break;
      case ProjectType.airdrop:
        res.locals.menuActive = names.dapp.airdrop;
        break;
      case ProjectType.dapp:
        if (safeGet(req.query, ProjectType.igo)) {
          safeSet(project, "type", ProjectType.igo);
          res.locals.menuActive = names.dapp.igo;
        } else {
          res.locals.menuActive = names.dapp.dapp;
        }
        break;
      }
    }

    req.params = Object.assign(project, req.params || {});

    const result: object = {};
    const id = safeGet<string | number>(req.params, "id");
    if (id) {
      const api = new API(req);
      const data = await api.dApp.getDetail(id);
      Object.assign(result, {
        [alias.dApp.detail]: data,
      });
    }
    res.send(result);
  };
  router.get(`${path}/:id`, detail);
  router.get(`${path}/:id/:tab`, detail);
};
