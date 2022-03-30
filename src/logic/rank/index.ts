import API from "src/api";
import { groupModel, dappListModel } from "src/types/rank";
export class Model extends API {
  //链
  getChains(position: string) {
    // @ts-ignore
    return this.rank.getChains(position);
  }
  //分组
  getGroup(query: groupModel) {
    return this.rank.getGroups(query);
  }
  //dapp 列表
  getDappList(query: dappListModel) {
    return this.rank.getDappList(query);
  }
}
