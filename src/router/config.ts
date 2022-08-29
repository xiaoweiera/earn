import { Router as RouterUser } from "./config/user";
export { config } from "./config/option";

export const routerConfig = {
  user: new RouterUser(),
};
