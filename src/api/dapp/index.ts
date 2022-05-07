/**
 * @file 项目库
 */

import * as api from "src/config/api";
import { DefaultValue, expire, get, required, tryError, userToken, validate, post } from "src/plugins/dao/http";
import type { Query } from "src/types/dapp/ixo";
import type { nftQuery } from "src/types/dapp/nft";
import type { AirdropQuery } from "src/types/dapp/airdrop";
import { nftStatus } from "src/types/dapp/nft";
import ApiTemplate from "../template";
import type { DAppData, DataQuery, newsModel, TokenQuery, TokenDataQuery } from "src/types/dapp/data";
import { echart } from "src/logic/ui/echart/decorate";
import type { EchartData } from "src/types/echarts/type";
import { FundsQuery } from "src/types/dapp/invest";
import { FormData } from "src/types/dapp/apply";

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
    const params = Object.assign(
      {
        page: 1,
        page_size: 20,
        category: "All",
        chain: "All",
        status: nftStatus.upcoming, // 默认状态
        query: "", // 默认搜索为空
      },
      query,
    );
    return [params] as any;
  }

  // ixo 数据
  @tryError(DefaultValue([]))
  @get(api.dapp.ixo, expire.min5)
  @userToken()
  @validate
  ixo<T>(@required query: Query): Promise<T> {
    const params = Object.assign(
      {
        page: 1,
        page_size: 10,
        query: "",
        category: "All",
        paginate: false,
      },
      query,
    );
    return [params] as any;
  }

  // ixoEnd 数据
  @tryError(DefaultValue([]))
  @get(api.dapp.ixo, expire.min30)
  @userToken()
  @validate
  ixoEnd<T>(@required query: Query): Promise<T> {
    const params = Object.assign(
      {
        page: 1,
        page_size: 20,
        paginate: true,
        status: "ended",
        query: "",
        sort_field: "",
        sort_type: "",
      },
      query,
    );
    return [params] as any;
  }

  // airdrop首页 数据
  @tryError(DefaultValue([]))
  @get(api.dapp.airdropList, expire.min30)
  @userToken()
  @validate
  getAirdropList<T>(@required query: AirdropQuery): Promise<T> {
    return [query] as any;
  }

  // airdrop 进行中数据
  @tryError(DefaultValue([]))
  @get(api.dapp.airdropList)
  @userToken()
  @validate
  getOngoingList<T>(@required query: AirdropQuery): Promise<T> {
    return [query] as any;
  }

  // airdrop 潜在优质数据
  @tryError(DefaultValue([]))
  @get(api.dapp.airdropList)
  @userToken()
  @validate
  getPotentialList<T>(@required query: AirdropQuery): Promise<T> {
    return [query] as any;
  }

  // airdrop 即将开始数据
  @tryError(DefaultValue([]))
  @get(api.dapp.airdropList)
  @userToken()
  @validate
  getUpcomingList<T>(@required query: AirdropQuery): Promise<T> {
    return [query] as any;
  }

  // airdrop 结束数据
  @tryError(DefaultValue([]))
  @get(api.dapp.airdropList)
  @userToken()
  @validate
  getEndedList<T>(@required query: AirdropQuery): Promise<T> {
    return [query] as any;
  }

  // airdrop运营推荐 数据
  @tryError(DefaultValue([]))
  @get(api.dapp.operation, expire.min30)
  @userToken()
  @validate
  getOperationList<T>(@required query: AirdropQuery): Promise<T> {
    return [query] as any;
  }

  // airdrop运营推荐 数据
  @tryError(DefaultValue([]))
  @get(api.dapp.operation, expire.min30)
  @userToken()
  @validate
  getHotPotentialList<T>(@required query: AirdropQuery): Promise<T> {
    return [query] as any;
  }

  // 投融资的project数据
  @tryError(DefaultValue([]))
  @get(api.dapp.investList, expire.min30)
  @userToken()
  @validate
  getProjectsList<T>(@required query: FundsQuery): Promise<T> {
    return [query] as any;
  }

  // 投融资的funds数据
  @tryError(DefaultValue([]))
  @get(api.dapp.funds, expire.min30)
  @userToken()
  @validate
  getFundsList<T>(@required query: FundsQuery): Promise<T> {
    return [query] as any;
  }
  // 投融资的轮次数据
  @tryError(DefaultValue([]))
  @get(api.dapp.roundList, expire.min30)
  @userToken()
  @validate
  getRoundList<T>(): Promise<T> {
    return [] as any;
  }
  // 项目库详情
  @tryError(DefaultValue({}))
  @get(api.dapp.detail, expire.min5)
  @validate
  getDetail(@required id: string | number): Promise<DAppData> {
    const query = { id };
    const callback = function (data: DAppData) {
      if (data && data.id) {
        return data;
      }
      return {};
    };
    return [query, callback] as any;
  }

  // 用户资产图表
  @tryError(DefaultValue({}))
  @echart
  @get(api.dapp.userData, expire.min30)
  @userToken()
  @validate
  getUserData(@required query: DataQuery): Promise<EchartData> {
    return [query] as any;
  }

  // 用户市值图表
  @tryError(DefaultValue({}))
  @echart
  @get(api.dapp.marketCapData, expire.min30)
  @userToken()
  @validate
  getMarketCapData(@required query: DataQuery): Promise<EchartData> {
    return [query] as any;
  }

  // 用户TVL图表
  @tryError(DefaultValue({}))
  @echart
  @get(api.dapp.TVLData, expire.min30)
  @userToken()
  @validate
  getTVLData(@required query: DataQuery): Promise<EchartData> {
    return [query] as any;
  }

  // 地板价图表
  @tryError(DefaultValue({}))
  @echart
  @get(api.dapp.floorData, expire.min30)
  @userToken()
  @validate
  getFloorData(@required query: DataQuery): Promise<EchartData> {
    return [query] as any;
  }

  // 代币图表
  @tryError(DefaultValue({}))
  @echart
  @get(api.dapp.tokenData, expire.min30)
  @userToken()
  @validate
  getTokenData(@required query: TokenDataQuery): Promise<EchartData> {
    return [query] as any;
  }

  // 代币列表
  @tryError(DefaultValue({}))
  @get(api.dapp.tokenList, expire.min30)
  @userToken()
  @validate
  getTokenList<T>(@required query: TokenQuery): Promise<T> {
    return [query] as any;
  }

  //News列表
  @tryError(DefaultValue([]))
  @get(api.dapp.news, expire.min5)
  @validate
  getNews<T>(@required query: newsModel): Promise<T> {
    return [query] as any;
  }

  // 项目信息
  @tryError(DefaultValue({}))
  @get(api.dapp.tokenList, expire.min30)
  @userToken()
  @validate
  getProjectInfo<T>(@required query: any): Promise<T> {
    return [query] as any;
  }
  //项目类型和公链
  @tryError(DefaultValue([]))
  @get(api.dapp.options, expire.min5)
  @validate
  getOptionData<T>(): Promise<T> {
    return [] as any;
  }

  //提交项目
  @tryError(DefaultValue([]))
  @post(api.dapp.commit, expire.min5)
  @validate
  onSubmit<T>(@required data: FormData): Promise<T> {
    return [data] as any;
  }
}
