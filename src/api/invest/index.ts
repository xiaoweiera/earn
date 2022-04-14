// import * as api from "src/config/api";
// import { DefaultValue, get, tryError } from "src/plugins/dao/http";
// import ApiTemplate from "../template";
// import safeGet from "@fengqiaogang/safe-get";
// import { listModel } from "src/types/invest";
// export default class extends ApiTemplate {
//     //得到列表
//     @tryError(DefaultValue([])) // 处理默认值
//     @get(api.invest.list, 0) // 定义一个 get 请求
//     getList<T>(query: listModel): Promise<T> {
//         const callback = function (data: object) {
//             return safeGet(data, "results");
//         };
//         // 返回参数
//         return [query, callback] as any;
//     }
// }
