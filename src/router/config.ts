export { config } from "./config/option";

import { Router as RouterBlog } from "./config/blog";
import { Router as RouterDapp } from "./config/dapp";
import { Router as RouterRank } from "./config/rank";
import { Router as RouterQuota } from "./config/quota";
import { Router as RouterUser } from "./config/user";
import { Router as RouterCommon } from "./config/common";

export const routerConfig = {
  dapp: new RouterDapp(),
  rank: new RouterRank(),
  blog: new RouterBlog(),
  quota: new RouterQuota(),
  user: new RouterUser(),
  common: new RouterCommon(),
};
