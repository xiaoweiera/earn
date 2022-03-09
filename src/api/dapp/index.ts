/**
 * @file 项目库
 */

import * as api from "src/config/api";
import { DefaultValue, expire, get, required, tryError, userToken, validate } from "src/plugins/dao/http";
import type { Query } from "src/types/dapp/ixo";
import type { nftQuery } from "src/types/dapp/nft";
import { nftStatus } from "src/types/dapp/nft";
import ApiTemplate from "../template";

export default class extends ApiTemplate {
  // 项目库列表
  @tryError(DefaultValue([]))
  @get(api.dapp.list, expire.min5)
  @userToken()
  getList<T>(query: object = {}): Promise<T> {
    return [query] as any;
  }

  //	获取nft列表
  @tryError(DefaultValue([]))
  @get(api.dapp.nftList, expire.min5)
  @userToken()
  @validate
  getNftList<T>(@required query: nftQuery): Promise<T> {
    const params = Object.assign({
      page: 1,
      page_size: 20,
      category: "All",
      chain: "All",
      status: nftStatus.upcoming, // 默认状态
      query: "", // 默认搜索为空
    }, query);
    return [params] as any;
  }

  // ixo 数据
  @tryError(DefaultValue([]))
  @get(api.dapp.ixo, expire.min5)
  @userToken()
  @validate
  ixo<T>(@required query: Query) {
    const params = Object.assign({
      page: 1,
      page_size: 10,
      query: "",
      category: "All",
      paginate: false,
    }, query);
    return [params] as any;
  }

  // ixoEnd 数据
  @tryError(DefaultValue([]))
  @get(api.dapp.ixo, expire.min30)
  @userToken()
  @validate
  ixoEnd<T>(@required query: Query) {
    const params = Object.assign({
      page: 1,
      page_size: 10,
      paginate: true,
      status: "ended",
      query: "",
      sort_field: "",
      sort_type: "",
    }, query);
    return [params] as any;
  }
}
