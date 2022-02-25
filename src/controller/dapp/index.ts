import { Model } from "src/logic/dapp";
import {Request, Response} from "express";
import * as alias from "src/utils/root/alias";

export const list = async function (req: Request, res: Response) {
    const api = new Model(req);
    const [ list, summary ] = await Promise.all([
        api.getList(),
        api.home.getSummary()
    ]);
    const result = {
        "API.dapp.list": list,      // IDO数据
        [alias.dApp.summary.list]: summary
    };
    res.send(result);
}

//获取IGO列表
export const igolist = async function (req: Request, res: Response) {
    const api = new Model(req);
    const [ list, summary ] = await Promise.all([
        api.getIGOList(),
        api.home.getSummary()
    ]);
    const result = {
        "API.dapp.igoList": list,      // IGO数据
        [alias.dApp.summary.list]: summary
    };
    res.send(result);
}

//nft列表
export const nftlist = async function (req: Request, res: Response) {
    const api = new Model(req);
    const [ list, summary ] = await Promise.all([
        api.getNftList(),
        api.home.getSummary()
    ]);
    const result = {
        "API.dapp.nftList": list,      // nft数据
        [alias.dApp.summary.list]: summary
    };
    res.send(result);
}
