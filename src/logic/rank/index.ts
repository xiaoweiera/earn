import API from "src/api";
export class Model extends API {
  //链
  getChains(position: string) {
    // @ts-ignore
    return this.rank.getChains(position);
  }
}
