/**
 * @file freemint
 * weier
 */

import type { Request, Response } from "express";
import * as alias from "src/utils/root/alias";
import * as eth from "src/pages/freemint/lib/etherscan.js";
// freeMint页面
export const toolNft = async function (req: Request, res: Response) {
  const [card] = await Promise.all([eth.etherscan.getGasTracker()]);
  res.locals.menuActive = "freeMintLive";
  const result = {
    [alias.freeMint.card]: card, // 链
  };
  res.send(result);
};
