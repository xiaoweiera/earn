import {Model} from "src/logic/dapp";
import {Request, Response} from "express";
import * as alias from "src/utils/root/alias";
import { names } from "src/config/header";

export const list = async function (req: Request, res: Response) {
    const api = new Model(req);
    const is_igo =req.query['isigo'] as string;
    console.log(is_igo);
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
    const params = {page: 1, page_size: 8};
    const projectParams={
        page:params.page,
        page_size:params.page_size,
        status: status ? status : 'upcoming',
        chain,
        platform,
        category,
        sort_field,
        sort_type,
        paginate,
        is_igo: is_igo ? is_igo : '',
        query:search ? search : '',
    }
    const [ list, summary ] = await Promise.all([
        api.getList(projectParams),
        api.home.getSummary()
    ]);
    const result = {
        "API.dapp.list": list,      // IDO数据
        [alias.dApp.summary.list]: summary
    };
    res.send(result);
}

// nft列表
export const nftList = async function (req: Request, res: Response) {
	const api = new Model(req);
	const query: any = {...req.query, paginate: true};
	if (!query.status) {
		query.status = "upcoming";
	}
	const [ list, summary ] = await Promise.all([
		api.getNftList(query),
		api.home.getSummary()
	]);
	const result = {
		[alias.nft.list]: list,      // nft数据
		[alias.dApp.summary.list]: summary
	};
	res.send(result);
}
