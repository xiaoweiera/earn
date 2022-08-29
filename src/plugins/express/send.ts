/**
 * @file 内容输出
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import SSR from "src/plugins/vue";
import { footers } from "src/config/footer";
import type { Env } from "src/config";
import { Command } from "src/config";
import { languageKey } from "src/config";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import { Language } from "src/types/language";
import * as alias from "src/utils/root/alias";
import { go404 } from "src/controller/common/redirect";
import type { NextFunction, Request, Response } from "express";
import * as console from "src/plugins/log/";

const send = async function (root: string, env: Env) {
  // Vue 渲染
  const ssr: SSR = await new SSR(root, env);

  return function (req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl;
    const start = Date.now();
    const log = function () {
      const method = req.method;
      const query = req.query;
      const end = Date.now();
      console.log("%s %s %s %sms", method, url, JSON.stringify(query), end - start);
    };
    const send = res.send.bind(res);
    // @ts-ignore
    res.send = async function (value?: any) {
      if (value && _.isNumber(value)) {
        res.status(value);
        log();
        return send();
      }
      if (value && _.isString(value)) {
        log();
        return send(value);
      }
      const data = {
        url,
        query: Object.assign(
          {
            [languageKey]: safeGet<string>(req.query, languageKey) || Language.auto,
          },
          req.query || {},
          req.params || {},
        ),
        ...res.locals,
        ...value,
      };
      // 获取默认选中的数据
      const menuActive = safeGet<string>(res.locals, "menuActive");
      // 处理底部导航数据
      safeSet(data, alias.common.layout.footer, footers(req));

      try {
        const html = await ssr.render(url, data);
        log();
        return send(html);
      } catch (e: any) {
        console.log(e);
        log();
        // 线上环境跳转到 404 页面
        if (env.VITE_command === Command.build) {
          return go404(req, res);
        } else {
          // 开发环境下输出错误日志
          return send(e);
        }
      }
    };
    return next();
  };
};

export default send;
