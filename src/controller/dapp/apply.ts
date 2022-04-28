/**
 * @file
 * @author zhangkun@163.com
 */
import { Request, Response } from "express";
import { Model } from "src/logic/dapp/apply";
import * as alias from "src/utils/root/alias";

//投融资列表
export const applyList = async function (req: Request, res: Response) {
  const api = new Model(req);
  const [list] = await Promise.all([api.getOptionData()]);
  const result = {
    [alias.dApp.apply]: list, // 项目类型和公链
  };
  res.send(result);
};
