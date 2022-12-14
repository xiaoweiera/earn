/**
 * @file 公共接口
 */

import _ from "lodash";
import I18n from "src/utils/i18n/";
import * as api from "src/config/api";
import { tidingName } from "src/config/";
import safeGet from "@fengqiaogang/safe-get";
import Cookie from "src/plugins/browser/cookie";
import { DefaultValue, expire, get, post, tryError, userToken } from "src/plugins/dao/http";
import type { AreaCode } from "src/types/common/area";
import type { SiteConfig } from "src/types/common/chain";
import type { TidingList } from "src/types/common/tiding";
import ApiTemplate from "../template";
import window from "src/plugins/browser/window";
import { routerConfig } from "src/router/config";
import { createHref } from "src/plugins/router/pack";

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

  // 获取下载地址
  @tryError(DefaultValue({}))
  @get(api.common.system, expire.min5)
  @userToken()
  getSystemInfo<T>(): Promise<T> {
    return [] as any;
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

  // 获取用户 ip 地址
  @tryError(DefaultValue({}))
  @get(api.common.ipValidate, 0, {
    baseURL: "https://kingdata.xyz",
  })
  @userToken()
  ipValidate(): Promise<object> {
    return [] as any;
  }

  async ipIsChina(): Promise<boolean> {
    const name = "ip-validate";
    const cookie = new Cookie(this.getRequest());
    const status = cookie.get(name);
    if (status) {
      return false;
    }
    const data = await this.ipValidate();
    // 判断是否是 chinese 地区 ip
    const value = safeGet<boolean>(data, "chinese");
    if (value) {
      const time = 1000 * 60 * 60 * 24;
      cookie.set(name, "1", time); // 缓存1天，1天之后在做检查
    }
    return value;
  }

  // PV/UV 统计
  @tryError(DefaultValue(null))
  @post(api.common.visit)
  visit(): void {
    const path = window.location.pathname;
    const data = { path };
    return [data] as any;
  }
}
