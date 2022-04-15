import * as api from "src/config/api";
import { DefaultValue, get, tryError } from "src/plugins/dao/http";
import ApiTemplate from "../template";
import { investmentModel, detailModel } from "src/types/invest";
export default class extends ApiTemplate {
  //得到l轮次列表
  @tryError(DefaultValue({})) // 处理默认值
  @get(api.invest.info, 0) // 定义一个 get 请求
  getInvestInfo<T>(investor_id: number | string): Promise<T> {
    const query = { investor_id };
    const callback = function (data: detailModel) {
      data.investment_stages = ["All"].concat(data.investment_stages);
      data.project_categories = ["All"].concat(data.project_categories);
      return data;
    };
    return [query, callback] as any;
  }
  //得到l轮次列表
  @tryError(DefaultValue([])) // 处理默认值
  @get(api.invest.investment, 0) // 定义一个 get 请求
  getInvestment<T>(param: investmentModel): Promise<T> {
    const query = Object.assign({ page: 1, page_size: 10 }, param);
    return [query] as any;
  }
}
