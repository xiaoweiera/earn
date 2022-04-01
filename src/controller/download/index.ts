import { Request, Response } from "express";
import { Model } from "src/logic/common/down";

/**
 * @file
 * @author zhangkun@163.com
 */
export const download = async function (req: Request, res: Response) {
  const api = new Model(req);
  const [list] = await Promise.all([api.getDownUrl()]);
  const result = {
    "API.down.getUrl": list, // 下载地址
  };
  res.send(result);
};
