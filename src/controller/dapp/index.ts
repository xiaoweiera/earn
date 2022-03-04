import {Model} from "src/logic/dapp";
import {Request, Response} from "express";
import * as alias from "src/utils/root/alias";
import { names } from "src/config/header";
import I18n from "src/utils/i18n";

export const list = async function (req: Request, res: Response) {
    const i18n = I18n(req);
    const api = new Model(req);
    const is_igo =req.query['isIgo'] as string;
    if (is_igo) {
        res.locals.menuActive = names.dapp.gamefi;
    }else {
        res.locals.menuActive = names.dapp.dapp;
    }
    const chain=req.query['chain'] as string;
    const category=req.query['category'] as string;
    const platform=req.query['platform'] as string;
    const status=req.query['type'] as string;
    const sort_field=req.query['sort_field'] as string;
    const sort_type=req.query['sort_type'] as string;
    const paginate = true;
    const search=req.query['search'] as string;
    const params = {page: 1, page_size: 16};
    const projectParams={
        page:params.page,
        page_size:params.page_size,
        status: status ? status : 'upcoming',
        chain: chain || '',
        platform: platform || '',
        category: category || '',
        sort_field: sort_field || '',
        sort_type: sort_type || '',
        paginate,
        is_igo: is_igo ? is_igo : false,
        query:search ? search : '',
    }
    const [ list, summary ] = await Promise.all([
        api.getList(projectParams),
        api.home.getSummary()
    ]);
    const result = {
        title: i18n.home.webIdo.title,
        keywords: i18n.home.webIdo.key,
        description: i18n.home.webIdo.des,

        "API.dapp.list": list,      // IDO数据
        [alias.dApp.summary.list]: summary
    };
    res.send(result);
}

// nft列表
export const nftList = async function (req: Request, res: Response) {
  const i18n = I18n(req);
	const api = new Model(req);
  res.locals.menuActive = names.dapp.nft;
	const query: any = {...req.query, paginate: true};
	if (!query.status) {
		query.status = "upcoming";
	}
	const [ list, summary ] = await Promise.all([
		api.getNftList(query),
		api.home.getSummary()
	]);
	const result = {
    title: i18n.home.webNft.title,
    keywords: i18n.home.webNft.key,
    description: i18n.home.webNft.des,

		[alias.nft.list]: list,      // nft数据
		[alias.dApp.summary.list]: summary
	};
	res.send(result);
}
