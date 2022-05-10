/**
 * @file web3
 * @author svon.me@gmail.com
 */
import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { go404 } from "src/controller/common/redirect";

let cache = "";

const getFile = async function (): Promise<string> {
  if (cache) {
    return cache;
  }
  const src = path.join(__dirname, "../../../public/web3/index.html");
  return new Promise(function (resolve, reject) {
    fs.readFile(src, function (err: any, html: Buffer) {
      if (html) {
        cache = html.toString();
        resolve(cache);
      } else {
        reject(err);
      }
    });
  });
};

export const web3 = async function (req: Request, res: Response, menu: string) {
  try {
    const html = await getFile();
    res.locals.menuActive = menu;
    res.send({ html });
  } catch (e) {
    go404(req, res);
  }
};
