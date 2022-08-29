import type { Lang } from "src/types/language";
import ApiTemplate from "./template";

import Earn from "./earn"
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
import Activity from "./activity";
import Upload from "./upload";
import Chart from "./chart/";
import WxChat from "./wxchat";
import FreeMint from "./freemint";

export default class API extends ApiTemplate {
  public earn: Earn;
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
  public activity: Activity;
  public upload: Upload;
  public chart: Chart;
  public wx: WxChat;
  public freeMint: FreeMint;
  constructor(value?: Lang) {
    super(value);
    this.earn = new Earn(value);
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
    this.activity = new Activity(value);
    this.upload = new Upload(value);
    this.chart = new Chart(value);
    this.wx = new WxChat(value);
    this.freeMint = new FreeMint(value);
  }
}
