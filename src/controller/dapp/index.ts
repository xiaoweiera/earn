import { Model } from "src/logic/dapp";
import {Request, Response} from "express";

export const list = async function (req: Request, res: Response) {
    const api = new Model(req);
    const [ list ] = await Promise.all([
        api.getList(),
    ]);
    const result = {
        "API.dapp.list": list,      // IDO数据
    };
    res.send(result);
}

//获取IGO列表
export const igolist = async function (req: Request, res: Response) {
    const api = new Model(req);
    const [ list ] = await Promise.all([
        api.getIGOList(),
    ]);
    const result = {
        "API.dapp.igoList": list,      // IGO数据
    };
    res.send(result);
}

//nft列表
export const nftlist = async function (req: Request, res: Response) {
    const api = new Model(req);
    const [ list ] = await Promise.all([
        api.getNftList(),
    ]);
    const result = {
        "API.dapp.nftList": list,      // nft数据
    };
    res.send(result);
}