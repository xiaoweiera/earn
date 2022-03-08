/**
 * @file 站点相关信息
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import path from "path";
import { Env } from "src/config/";
import { robots } from "./robots";
import { sitemap, Site } from "./sitemap";
import {Request, Response, Router} from "express";

const Site = function(root: string, env: Env) {
  const router = Router();

  const robotsValue = robots(env);
  const favicon = path.join(root, "public/favicon.ico");
  const ahrefs = "ahrefs_a41a2ea87b23852e5ff4ba882ec1ae7d210002c1f090bc6a9f01bbc8942fed50";
  const ahrefsFile = path.join(root, `public/${ahrefs}`);

  router.all("/favicon.ico", function (req: Request, res: Response) {
    res.status(200);
    res.sendFile(favicon);
  });

  router.all("/ahrefs_a41a2ea87b23852e5ff4ba882ec1ae7d210002c1f090bc6a9f01bbc8942fed50", function (req: Request, res: Response) {
    res.status(200);
    res.type("html");
    res.send("ahrefs-site-verification_a41a2ea87b23852e5ff4ba882ec1ae7d210002c1f090bc6a9f01bbc8942fed50");
  });

  router.all("/robots.txt", function(req: Request, res: Response) {
    res.type("text");
    res.send(robotsValue);
  });

  router.all("/sitemap.xml", function(req: Request, res: Response) {
    res.type("xml");
    const html = ['<?xml version="1.0" encoding="UTF-8" ?>'];
    html.push('<sitemapindex>');

    _.each(sitemap(env), function(data: Site) {
      if (data.loc) {
        html.push("<sitemap>");
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
        html.push("</sitemap>\n");
      }
    });
    html.push('</sitemapindex>');
    const value = html.join("\n");
    // 对 & 进行字符转译
    res.send(value.replace(/&/g, "&amp;"));
  });

  router.all("/sitemap.txt", function(req: Request, res: Response) {
    res.type("text");
    const value: string[] = [];
    _.each(sitemap(env), function(data: Site) {
      if (data.loc) {
        value.push(data.loc);
      }
    });
    res.send(value.join("\n"));
  });



  return router;
}

export default Site;

