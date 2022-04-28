/**
 * @file
 * @author zhangkun@163.com
 */

import ApiTemplate from "src/api/template";
import { DefaultValue, tryError, required } from "src/utils/decorate";
import { get, userToken } from "src/plugins/dao/http";
import * as api from "src/config/api";

export default class extends ApiTemplate {
  // 上传图片
  @tryError(DefaultValue({}))
  @get(api.upload.policy)
  @userToken()
  getPolicy<T>(@required filename: string): Promise<T> {
    const query = {
      filename: filename,
    };
    return [query] as any;
  }
}
