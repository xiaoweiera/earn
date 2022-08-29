import type { Lang } from "src/types/language";
import ApiTemplate from "./template";

import Earn from "./earn"
import User from "./user";
import Common from "./common";
import Chart from "./chart/";
import WxChat from "./wxchat";

export default class API extends ApiTemplate {
  public earn: Earn;
  public user: User;
  public common: Common;
  public chart: Chart;
  public wx: WxChat;
  constructor(value?: Lang) {
    super(value);
    this.earn = new Earn(value);
    this.user = new User(value);
    this.common = new Common(value);
    this.chart = new Chart(value);
    this.wx = new WxChat(value);
  }
}
