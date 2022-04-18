/**
 * @file 解锁
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import API from "src/api/";
import Cookie from "src/plugins/browser/cookie";
import window from "src/plugins/browser/window";
import { createHref } from "src/plugins/router/pack";
import { Type } from "src/types/common/lock";
import { User } from "src/types/common/user";
import * as alias from "src/utils/root/alias";
import { getValue } from "src/utils/root/data";

// 获取分享链接
export const getShareLink = function (type?: Type, id?: string | number, href?: string) {
  const user = getValue<User>(alias.common.user, {} as User);
  const url = href || window.location.href;
  if (user && user.id) {
    const data = {
      suser: `${user.id}`,
    };
    if (type && id) {
      safeSet(data, "stype", type);
      safeSet(data, "sid", id);
    }
    return createHref(url, data);
  }
  return createHref(url);
};

// 查看状态
export const getStatus = async function (type?: Type, id?: string | number) {
  if (type && id && type === Type.blog) {
    const api = new API();
    return api.blog.getLockStatus(id);
  }
};

export const onload = function () {
  const cookie = new Cookie();
  const query = getValue<object>("query", {});
  const user_id = safeGet<string>(query, "suser");
  const type = safeGet<string>(query, "stype");
  const id = safeGet<string>(query, "sid");

  if (user_id && id && type === "blog") {
    const data = {
      user_id,
      blog_id: id,
      uuid: cookie.getUuid(),
    };
    const api = new API();
    return api.common.blogUnLock(data);
  }
};
