/**
 * @file 活动
 * @author svon.me@gmail.com
 */

import * as api from "src/config/api";
import { DefaultValue, get, tryError, userToken } from "src/plugins/dao/http";
import ApiTemplate from "../template";

export default class extends ApiTemplate {
  // 邀请 - invite
  @tryError(DefaultValue(null))
  @get(api.activity.invite)
  @userToken(false)
  getInviteDetail<T>(id: string | number): Promise<T> {
    return [{ id }] as any;
  }
}
