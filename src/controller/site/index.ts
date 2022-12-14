/**
 * @file 站点相关信息
 * @author svon.me@gmail.com
 */

import path from "path";
import _ from "lodash";
import type { Env } from "src/config/";
import type { Request, Response } from "express";
import { Router } from "express";
import { goHome } from "src/controller/common/redirect";
import { robots } from "./robots";
import type { Site } from "./sitemap";
import { sitemap } from "./sitemap";

const site = function(root: string, env: Env) {
  const router = Router();

  const robotsValue = robots(env);
  const favicon = path.join(root, "public/favicon.ico");

  router.all("/index", goHome);
  router.all("/index.html", goHome);

  router.all("/favicon.ico", (req: Request, res: Response) => {
    res.status(200);
    res.sendFile(favicon);
  });

  router.all("/ahrefs_a41a2ea87b23852e5ff4ba882ec1ae7d210002c1f090bc6a9f01bbc8942fed50", (req: Request, res: Response) => {
    res.status(200);
    res.type("html");
    res.send("ahrefs-site-verification_a41a2ea87b23852e5ff4ba882ec1ae7d210002c1f090bc6a9f01bbc8942fed50");
  });

  router.all("/robots.txt", (req: Request, res: Response) => {
    res.type("text");
    res.send(robotsValue);
  });

  router.all("/sitemap.xml", (req: Request, res: Response) => {
    res.type("xml");
    const html = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>"];
    html.push("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">");

    _.each(sitemap(env), (data: Site) => {
      if (data.loc) {
        html.push("<url>");
        html.push(`<loc>${data.loc}</loc>`);
        if (data.lastmod) {
          html.push(`<lastmod>${data.lastmod}</lastmod>`);
        }
        if (data.changefreq) {
          html.push(`<changefreq>${data.changefreq}</changefreq>`);
        }
        if (data.priority) {
          html.push(`<priority>${data.priority}</priority>`);
        }
        html.push("</url>");
      }
    });
    html.push("</urlset>");
    const value = html.join("\n");
    // 对 & 进行字符转译
    res.send(value.replace(/&/g, "&amp;"));
  });

  router.all("/sitemap.txt", (req: Request, res: Response) => {
    res.type("text");
    const value: string[] = [];
    _.each(sitemap(env), (data: Site) => {
      if (data.loc) {
        value.push(data.loc);
      }
    });
    res.send(value.join("\n"));
  });

  return router;
};

export default site;
