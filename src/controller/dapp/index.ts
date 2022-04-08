import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import API from "src/api";
import type { Router } from "express";
import { Model } from "src/logic/dapp";
import { Model as InvestModel } from "src/logic/dapp/invest";
import type { Request, Response } from "express";
import type { DAppProject } from "src/types/dapp/data";
import { TabName, ProjectType } from "src/types/dapp/data";
import * as alias from "src/utils/root/alias";
import { names } from "src/config/header";
import I18n from "src/utils/i18n";

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

// 空投列表
export const airdropList = async function (req: Request, res: Response) {
  const api = new Model(req);
  res.locals.menuActive = names.dapp.airdrop;
  const query: any = { ...req.query };
  const [list] = await Promise.all([api.getAirdropList(query)]);
  const result = {
    [alias.airdrop.list]: list, // airdrop数据
  };
  res.send(result);
};

//投融资列表
export const investList = async function (req: Request, res: Response) {
  const api = new InvestModel(req);
  res.locals.menuActive = names.dapp.invest;
  const query: any = {
    ...req.query,
    paginate: true,
  };
  const params: any = {
    ...req.query,
    paginate: true,
  };
  const [project, funds] = await Promise.all([api.getProjectsList(query), api.getFundsList(params)]);
  const result = {
    [alias.invest.list.projects]: project, // 投融资项目
    [alias.invest.list.funds]: funds, //投资动向
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
