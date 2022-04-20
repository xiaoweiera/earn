import type { Lang } from "src/types/language";
import ApiTemplate from "./template";

import Home from "./home";
import DApp from "./dapp";
import Blog from "./blog";
import User from "./user";
import Common from "./common";
import Quota from "./quota";
import Rank from "./rank";
import APY from "./apy/";
import Comment from "./comment";
import Invest from "./invest";

export default class API extends ApiTemplate {
  public home: Home;
  public blog: Blog;
  public dApp: DApp;
  public user: User;
  public common: Common;
  public quota: Quota;
  public rank: Rank;
  public apy: APY;
  public comment: Comment;
  public invest: Invest;
  constructor(value?: Lang) {
    super(value);
    this.home = new Home(value);
    this.blog = new Blog(value);
    this.dApp = new DApp(value);
    this.user = new User(value);
    this.common = new Common(value);
    this.quota = new Quota(value);
    this.rank = new Rank(value);
    this.apy = new APY(value);
    this.comment = new Comment(value);
    this.invest = new Invest(value);
  }
}
