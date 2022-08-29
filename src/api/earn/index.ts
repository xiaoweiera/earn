import * as api from "src/config/api";
import { DefaultValue, get, tryError } from "src/plugins/dao/http";
import ApiTemplate from "../template";
// const timeConfig = {
//     headers:{
//         chain:chainName.value
//     }
// };
export default class extends ApiTemplate {
    //base config
    @tryError(DefaultValue({})) // 处理默认值
    @get(api.earn.config, 0) // 定义一个 get 请求
    getConfig<T>(): Promise<T> {
        return [] as any;
    }
    //首页table
    @tryError(DefaultValue({})) // 处理默认值
    @get(api.earn.tableList, 0) // 定义一个 get 请求
    getTableList<T>(query: any): Promise<T> {
        // 返回参数
        return [query] as any;
    }
    //feed流
    @tryError(DefaultValue([])) // 处理默认值
    @get(api.earn.feedList, 0) // 定义一个 get 请求
    getFeedList<T>(query: any): Promise<T> {
        // 返回参数
        return [query] as any;
    }
    //address Info
    @tryError(DefaultValue([])) // 处理默认值
    @get(api.earn.addressInfo, 0) // 定义一个 get 请求
    getAddressInfo<T>(query: any): Promise<T> {
        // 返回参数
        return [query] as any;
    }
}
