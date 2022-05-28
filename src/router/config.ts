export { config } from "./config/option";

import { Router as RouterDapp } from "./config/dapp";
import { Router as RouterRank } from "./config/rank";

export const routerConfig = {
  dapp: new RouterDapp(),
  rank: new RouterRank(),
};
