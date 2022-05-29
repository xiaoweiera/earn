export { config } from "./config/option";

import { Router as RouterBlog } from "./config/blog";
import { Router as RouterDapp } from "./config/dapp";
import { Router as RouterRank } from "./config/rank";
import { Router as RouterQuota } from "./config/quota";

export const routerConfig = {
  dapp: new RouterDapp(),
  rank: new RouterRank(),
  blog: new RouterBlog(),
  quota: new RouterQuota(),
};
