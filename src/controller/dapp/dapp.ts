/**
 * @file Dapp 相关内容
 */

import _ from "lodash";
import API from "src/api";
import I18n from "src/utils/i18n";
import { names } from "src/config/header";
import { TabTypes } from "src/logic/dapp/dapp";
import { DAppType } from "src/types/dapp/dapp";
import safeGet from "@fengqiaogang/safe-get";
import * as alias from "src/utils/root/alias";
import type { Result } from "src/types/dapp/detail";

import type { Request, Response } from "express";

export const list = async function (name: DAppType, req: Request, res: Response) {
  const i18n = I18n(req);
  const api = new API(req);

  let title = "";
  let keywords = "";
  let description = "";

  const activity_stage = safeGet<string>(req.query, "activity_stage") || TabTypes.upcoming;

  const query = {
    keyword: _.trim(safeGet<string>(req.query, "keyword")),
    chain: safeGet<string>(req.query, "chain"),
    platform: safeGet<string>(req.query, "platform"),
    category: safeGet<string>(req.query, "category"),
    // 活动类型
    activity_type: _.toUpper(name),
    // 活动状态
    activity_stage: _.toUpper(activity_stage),
  };
  if (name === DAppType.igo) {
    res.locals.menuActive = names.dapp.igo;
    title = i18n.home.webIgo.title;
    keywords = i18n.home.webIdo.key;
    description = i18n.home.webIdo.des;
  }
  if (name === DAppType.ido) {
    res.locals.menuActive = names.dapp.dapp;
    title = i18n.home.webIdo.title;
    keywords = i18n.home.webIdo.key;
    description = i18n.home.webIdo.des;
  }
  if (name === DAppType.mint) {
    res.locals.menuActive = names.dapp.nft;
    title = i18n.home.webNft.title;
    keywords = i18n.home.webNft.key;
    description = i18n.home.webNft.des;
  }
  if (name === DAppType.airdrop) {
    res.locals.menuActive = names.dapp.airdrop;
    title = i18n.home.webAirdrop.title;
    keywords = i18n.home.webAirdrop.key;
    description = i18n.home.webAirdrop.des;
  }
  if (name === DAppType.invest) {
    res.locals.menuActive = names.dapp.invest;
    title = i18n.invest.page.title;
    keywords = i18n.invest.page.key;
    description = i18n.invest.page.description;
  }

  const result = await api.dApp.getList<Result>(query);

  res.send({
    title,
    keywords,
    description,

    [alias.dApp.list]: safeGet<object[]>(result, "items") || [],
    // 公链
    [alias.dApp.chains]: safeGet<string[]>(result, "extra.available_chains") || [],
    // 平台
    [alias.dApp.platforms]: safeGet<string[]>(result, "extra.available_platforms") || [],
    // 分类
    [alias.dApp.categories]: safeGet<string[]>(result, "extra.available_categories") || [],
  });
};
