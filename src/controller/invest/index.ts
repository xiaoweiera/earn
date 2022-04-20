//投融资详情
import { Request, Response } from "express";
import API from "src/api";
import { investmentModel } from "src/types/invest";
import * as alias from "src/utils/root/alias";
import safeGet from "@fengqiaogang/safe-get";
import I18n from "src/utils/i18n";

export const investDetail = async function (req: Request, res: Response) {
  const api = new API(req);
  const i18n = I18n(req);
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
    title: i18n.invest.page.title,
    keywords: i18n.invest.page.key,
    description: i18n.invest.page.description,

    [alias.invest.detail.info]: info, // 详情信息
    [alias.invest.detail.investment]: investment, // 轮次列表
  };
  res.send(result);
};
