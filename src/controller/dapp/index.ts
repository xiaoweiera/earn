import safeGet from "@fengqiaogang/safe-get";
import type { Request, Response, Router } from "express";
import API from "src/api";
import { names } from "src/config/header";
import { Model } from "src/logic/dapp";
import { Model as InvestModel } from "src/logic/dapp/invest";
import type { Callback } from "src/types/common/";
import { ActivityStage, TabTypes } from "src/types/dapp/airdrop";
import type { DAppProject } from "src/types/dapp/data";
import { ProjectType, TabName } from "src/types/dapp/data";
import { compact, forEach, toArray } from "src/utils";
import I18n from "src/utils/i18n";
import * as alias from "src/utils/root/alias";

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
  const search = req.query.search as string;
  const params = {
    page: 1,
    page_size: 16,
  };
  const projectParams = {
    page: params.page,
    page_size: params.page_size,
    activity_type: "IDO",
    activity_stage: status || "UPCOMING",
    chain: chain || "",
    platform: platform || "",
    category: category || "",
    sort_field: sort_field || "",
    sort_type: sort_type || "",
    keyword: search || "",
  };
  const i18n = I18n(req);
  const [list] = await Promise.all([api.getList(projectParams)]);
  const result = {
    "title": is_igo ? i18n.home.webIgo.title : i18n.home.webIdo.title,
    "keywords": i18n.home.webIdo.key,
    "description": i18n.home.webIdo.des,

    "API.dapp.list": list, // IDO数据
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
  };
  if (!query.status) {
    query.status = "UPCOMING";
  }
  const [list] = await Promise.all([api.getNftList(query)]);
  const result = {
    "title": i18n.home.webNft.title,
    "keywords": i18n.home.webNft.key,
    "description": i18n.home.webNft.des,

    "API.nft.list": list, // nft数据
  };
  res.send(result);
};

//处理缓存数据
const airdrop = {
  [TabTypes.all]: async function (req: Request) {
    const api = new Model(req);
    const query = req.query;
    const [ongoingList, potentialList, upcomingList, endedList, operationList, hotList] = await Promise.all([
      api.getAirdropList({
        ...query,
        page: 1,
        page_size: 4,
        activity_type: "AIRDROP",
        activity_stage: ActivityStage.ongoing,
      }),
      api.getAirdropList({
        ...query,
        page: 1,
        page_size: 4,
        activity_type: "AIRDROP",
        potential: true,
      }),
      api.getAirdropList({
        ...query,
        page: 1,
        page_size: 4,
        activity_type: "AIRDROP",
        activity_stage: ActivityStage.upcoming,
      }),
      api.getAirdropList({
        ...query,
        page: 1,
        page_size: 4,
        activity_type: "AIRDROP",
        activity_stage: ActivityStage.ended,
      }),
      api.getAirdropList({
        ...query,
        page: 1,
        page_size: 4,
        activity_type: "AIRDROP",
        recommended: true,
      }),
      api.getAirdropList({
        ...query,
        page: 1,
        page_size: 4,
        activity_type: "AIRDROP",
        recommended: false,
      }),
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
    const ongoingList = await api.getAirdropList({
      page: 1,
      page_size: 20,
      activity_type: "AIRDROP",
      activity_stage: ActivityStage.ongoing,
    });
    return {
      [alias.airdrop.ongoing]: ongoingList, // airdrop进行中数据
    };
  },
  [TabTypes.potential]: async function (req: Request) {
    const api = new Model(req);
    const potentialList = await api.getAirdropList({
      page: 1,
      page_size: 20,
      activity_type: "AIRDROP",
      potential: true,
    });
    return {
      [alias.airdrop.potential]: potentialList, // airdrop优质空投数据
    };
  },
  [TabTypes.upcoming]: async function (req: Request) {
    const api = new Model(req);
    const upcomingList = await api.getAirdropList({
      page: 1,
      page_size: 20,
      activity_type: "ActivityStage",
      activity_stage: TabTypes.upcoming,
    });
    return {
      [alias.airdrop.upcoming]: upcomingList, // airdrop即将开始数据
    };
  },
  [TabTypes.ended]: async function (req: Request) {
    const api = new Model(req);
    const endedList = await api.getAirdropList({
      page: 1,
      page_size: 20,
      activity_type: "AIRDROP",
      activity_stage: ActivityStage.ended,
    });
    return {
      [alias.airdrop.ended]: endedList, // airdrop已结束数据
    };
  },
  [TabTypes.hot]: async function (req: Request) {
    const api = new Model(req);
    const operationList = await api.getAirdropList({
      page: 1,
      page_size: 6,
      activity_type: "AIRDROP",
      recommended: true,
    });
    const hotList = await api.getAirdropList({
      page: 1,
      page_size: 6,
      activity_type: "AIRDROP",
      recommended: false,
    });
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
  const i18n = I18n(req);
  const api = new InvestModel(req);
  res.locals.menuActive = names.dapp.invest;
  const stage = req.query.stage as string;
  const keyword = req.query.keyword as string;
  const search = req.query.search as string;
  const params = {
    page: 1,
    page_size: 8,
    stage: stage || "All",
    keyword: keyword || "",
  };
  const fundsParams = {
    params: 1,
    page_size: 8,
    keyword: search || "",
  };
  const [project, funds, list] = await Promise.all([api.getProjectsList(params), api.getFundsList(fundsParams), api.getRoundList()]);
  const result = {
    title: i18n.invest.page.title,
    keywords: i18n.invest.page.key,
    description: i18n.invest.page.description,

    [alias.invest.list.projects]: project, // 投融资项目
    [alias.invest.list.funds]: funds, //投资动向
    [alias.invest.list.round]: list, //轮次列表
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
      // 排行榜（分析）详情
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
      // 新项目详情
      switch (type) {
      case ProjectType.mint:
        res.locals.menuActive = names.dapp.nft;
        break;
      case ProjectType.airdrop:
        res.locals.menuActive = names.dapp.airdrop;
        break;
      case ProjectType.igo:
        res.locals.menuActive = names.dapp.igo;
        break;
      case ProjectType.ido:
        res.locals.menuActive = names.dapp.dapp;
        break;
      case ProjectType.funds:
        res.locals.menuActive = names.dapp.invest;
        break;
      }
    }

    req.params = Object.assign(project, req.params || {}, req.query);

    const result: object = {};
    const id = safeGet<string | number>(req.params, "id");
    if (id) {
      const api = new API(req);
      const data = await api.dApp.getDetail(id);

      const title = function () {
        if (data && data.name) {
          return `${data.name} - KingData`;
        }
        return "KingData";
      };

      const Keywords = function () {
        const array = [safeGet<string>(data, "name")];
        // 代币名称
        array.push(safeGet<string>(data, "ido.ido_symbol") || safeGet<string>(data, "airdrop.airdrop_symbol"));
        // 分类
        array.push(...toArray([], data.categories));
        // 公链
        forEach(function (item: object) {
          if (item) {
            const value = safeGet<string>(item, "name");
            if (value) {
              array.push(value);
            }
          }
        }, toArray([], data.chains));
        const list = compact(array);
        return list.join(",") + ",dashboard,reviews,website,twitter,telegram,tvl,token,User,Market Cap,Volume,MCap/TVL,Introduction";
      };

      if (data && data.id) {
        Object.assign(result, {
          [alias.dApp.detail]: data,
          title: title(),
          keywords: Keywords(),
          description: data.description,
        });
      }
    }
    res.send(result);
  };
  if (path.includes("/:")) {
    router.get(path, detail);
  } else {
    router.get(`${path}/:id`, detail);
  }
};
