/**
 * @file 首页
 * weier
 */

import type { Request, Response } from "express";
import { Model } from "src/logic/rank";
import { GroupPosition } from "src/logic/rank/config";
import { chainPage } from "src/logic/rank/config";
import * as alias from "src/utils/root/alias";
import { groupModel, dappListModel } from "src/types/rank";
import I18n from "src/utils/i18n";
import { config as routerConfig } from "src/router/config";
// dapp页面
export const dapp = async function (req: Request, res: Response) {
  const api = new Model(req);
  const i18n = I18n(req);
  const query: groupModel = {
    position: GroupPosition.dappRank,
    chain: "all",
  };
  const tableQuery: dappListModel = {
    chain: (req.query.chain as string) || "",
    group_id: (req.query.group as string) || undefined,
    interval: "24h",
    sort_field: "volume",
    sort_type: "desc",
    query: "",
    page: 1,
    page_size: 50,
  };
  const [chains, groups, dappList] = await Promise.all([api.getChains(chainPage.dapp_rank, routerConfig.rankDapp), api.getGroup(query), api.getDappList(tableQuery)]);
  const result = {
    title: i18n.dapp.rank.page.title,
    keywords: i18n.dapp.rank.page.meta,
    description: i18n.dapp.rank.page.content,

    [alias.rank.chains]: chains, // 链
    [alias.rank.groups]: groups, // 分组
    [alias.rank.dappList]: dappList, // dapp list
  };
  res.send(result);
};

// game 页面
export const game = async function (req: Request, res: Response) {
  const api = new Model(req);
  const i18n = I18n(req);
  const query: groupModel = {
    position: GroupPosition.dappRank,
    chain: "all",
  };
  const tableQuery: dappListModel = {
    category: "game",
    chain: (req.query.chain as string) || "",
    group_id: (req.query.group as string) || undefined,
    interval: "24h",
    sort_field: "volume",
    sort_type: "desc",
    query: "",
    page: 1,
    page_size: 50,
  };
  const [chains, groups, dappList] = await Promise.all([api.getChains(chainPage.dapp_rank, routerConfig.rankDapp), api.getGroup(query), api.getDappList(tableQuery)]);
  const result = {
    title: i18n.dapp.rank.page.title,
    keywords: i18n.dapp.rank.page.meta,
    description: i18n.dapp.rank.page.content,

    [alias.rank.chains]: chains, // 链
    [alias.rank.groups]: groups, // 分组
    [alias.rank.dappList]: dappList, // dapp list
  };
  res.send(result);
};

//defi 页面
export const defi = async function (req: Request, res: Response) {
  const api = new Model(req);
  const i18n = I18n(req);
  const query: groupModel = {
    position: GroupPosition.dappRank,
    chain: "all",
  };
  const tableQuery: dappListModel = {
    category: "defi",
    chain: (req.query.chain as string) || "",
    group_id: (req.query.group as string) || undefined,
    interval: "24h",
    sort_field: "volume",
    sort_type: "desc",
    query: "",
    page: 1,
    page_size: 50,
  };
  const [chains, groups, dappList] = await Promise.all([api.getChains(chainPage.dapp_rank, routerConfig.rankDapp), api.getGroup(query), api.getDappList(tableQuery)]);
  const result = {
    title: i18n.dapp.rank.page.title,
    keywords: i18n.dapp.rank.page.meta,
    description: i18n.dapp.rank.page.content,

    [alias.rank.chains]: chains, // 链
    [alias.rank.groups]: groups, // 分组
    [alias.rank.dappList]: dappList, // dapp list
  };
  res.send(result);
};

//nft 页面
export const nft = async function (req: Request, res: Response) {
  const api = new Model(req);
  const i18n = I18n(req);
  const query: groupModel = {
    position: GroupPosition.nftRank,
    chain: "all",
  };
  const tableQuery: dappListModel = {
    chain: (req.query.chain as string) || "",
    group_id: (req.query.group as string) || undefined,
    interval: "24h",
    sort_field: "volume",
    sort_type: "desc",
    query: "",
    page: 1,
    page_size: 50,
  };
  const [chains, groups, nftList] = await Promise.all([api.getChains(chainPage.nft_rank, routerConfig.rankNft), api.getGroup(query), api.getNftList(tableQuery)]);
  const result = {
    title: i18n.nft.rank.page.title,
    keywords: i18n.nft.rank.page.meta,
    description: i18n.nft.rank.page.content,

    [alias.rank.chains]: chains, // 链
    [alias.rank.groups]: groups, // 分组
    [alias.rank.nftList]: nftList, // dapp list
  };
  res.send(result);
};
