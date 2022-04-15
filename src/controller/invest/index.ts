//投融资详情
import { Request, Response } from "express";
import API from "src/api";
import { investmentModel } from "src/types/invest";
import * as alias from "src/utils/root/alias";
import safeGet from "@fengqiaogang/safe-get";

export const investDetail = async function (req: Request, res: Response) {
  const api = new API(req);
  const investor_id = safeGet<number>(req.params, "id");
  const investmentParam: investmentModel = {
    id: investor_id,
    keyword: "",
    project_category: "",
    stage: "",
    sort_field: "",
    sort_type: "",
  };
  const [info, investment] = await Promise.all([api.invest.getInvestInfo(investor_id), api.invest.getInvestment(investmentParam)]);
  const result = {
    [alias.invest.detail.info]: info, // 详情信息
    [alias.invest.detail.investment]: investment, // 轮次列表
  };
  res.send(result);
};
