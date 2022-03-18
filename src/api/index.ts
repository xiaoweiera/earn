import type { Lang } from "src/types/language";
import ApiTemplate from "./template";

import Home from "./home";
import DApp from "./dapp";
import Blog from "./blog";
import User from "./user";
import Common from "./common";
import Quota from "./quota";

export default class API extends ApiTemplate {
  public home: Home;
  public blog: Blog;
  public dApp: DApp;
  public user: User;
  public common: Common;
  public quota: Quota;
  constructor(value?: Lang) {
    super(value);
    this.home = new Home(value);
    this.blog = new Blog(value);
    this.dApp = new DApp(value);
    this.user = new User(value);
    this.common = new Common(value);
    this.quota = new Quota(value);
  }
}
