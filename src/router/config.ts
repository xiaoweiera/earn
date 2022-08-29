export { config } from "./config/option";

import { Router as RouterUser } from "./config/user";

export const routerConfig = {
  user: new RouterUser(),
};
