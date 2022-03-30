/**
 * @file 公共接口
 */

import { tidingName } from "src/config/";
import * as api from "src/config/api";
import Cookie from "src/plugins/browser/cookie";
import { DefaultValue, expire, get, post, tryError, userToken } from "src/plugins/dao/http";
import type { AreaCode } from "src/types/common/area";
import type { SiteConfig } from "src/types/common/chain";
import type { TidingList } from "src/types/common/tiding";
import ApiTemplate from "../template";

// 国际区号默认数据
const areaCodeDefault = DefaultValue([
  {
    cn: "中国",
    en: "China",
    phone_code: "+86",
  },
]);

// 公链站点默认数据
const chainSiteDefault = DefaultValue({
  category: {},
  chain: [],
  tge_platform: [],
});

export default class extends ApiTemplate {
  // 获取国际区号
  @tryError(areaCodeDefault)
  @get(api.common.areaCodeList, expire.day2)
  @userToken()
  getAreaCodeList(): Promise<AreaCode[]> {
    return [] as any;
  }

  // 公链站点配置
  @tryError(chainSiteDefault)
  @get(api.common.chainSiteConfig, expire.min10)
  @userToken()
  getChainSiteConfig(): Promise<SiteConfig> {
    return [] as any;
  }

  // 获取导航菜单消息列表
  @tryError(DefaultValue([]))
  @get(api.common.tidingTime)
  @userToken()
  getTidings(): Promise<TidingList[]> {
    const cookie = new Cookie(this.getRequest());
    const params = {
      [tidingName]: cookie.getTidingTime(),
    };
    return [params] as any;
  }
  // 博客解锁
  @tryError(DefaultValue(false))
  @post(api.blog.unLock)
  @userToken()
  blogUnLock(data: object): Promise<boolean> {
    const callback = function (value: object) {
      return !!value;
    };
    return [data, callback] as any;
  }
}
