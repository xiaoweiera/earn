import { Model } from "src/logic/dapp";
import {Request, Response} from "express";

export const list = async function (req: Request, res: Response) {
    const api = new Model(req);
    const [ list ] = await Promise.all([
        api.getList(),
    ]);
    const result = {
        "API.dapp.list": list,      // 数据汇总
    };
    res.send(result);
}