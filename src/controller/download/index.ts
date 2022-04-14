/**
 * @file
 * @author zhangkun@163.com
 */
import API from "src/api/";
import { Request, Response } from "express";
import * as alias from "src/utils/root/alias";

export const download = async function (req: Request, res: Response) {
  const api = new API(req);
  const [list] = await Promise.all([api.common.getSystemInfo()]);
  const result = {
    [alias.common.system.info]: list, // 下载地址
  };
  res.send(result);
};
