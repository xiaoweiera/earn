/**
 * @file 排行榜相关路由配置
 * @author svon.me@gmail.com
 */

import { config } from "./option";

export class Router {
  // dapp 相关
  // 在路由调整，使用
  dappList() {
    return config.rankDapp;
  }

  // 路由跳转使用，传 id 与其它参数
  dappDetail(id: string | number, query?: object) {
    return {
      path: `${this.dappList()}/${id}`,
      query,
    };
  }

  // 在定义路由使用
  // 比如 node.js 绑定路由
  // 比如 vue router 绑定路由
  dappListPattern() {
    return this.dappList();
  }

  dappDetailPattern() {
    return `${this.dappListPattern()}/:id`;
  }

  // game 相关
  gameList() {
    return config.rankGame;
  }

  gameDetail(id: string | number, query?: object) {
    return {
      path: `${this.gameList()}/${id}`,
      query,
    };
  }

  gameListPattern() {
    return this.gameList();
  }

  gameDetailPattern() {
    return `${this.gameListPattern()}/:id`;
  }

  // defi 相关
  defiList() {
    return config.rankDefi;
  }

  defiDetail(id: string | number, query?: object) {
    return {
      path: `${this.defiList()}/${id}`,
      query,
    };
  }

  defiListPattern() {
    return this.defiList();
  }

  defiDetailPattern() {
    return `${this.defiListPattern()}/:id`;
  }

  // nft 相关
  nftList() {
    return config.rankNft;
  }

  nftDetail(id: string | number, query?: object) {
    return {
      path: `${this.nftList()}/${id}`,
      query,
    };
  }

  nftListPattern() {
    return this.nftList();
  }

  nftDetailPattern() {
    return `${this.nftListPattern()}/:id`;
  }
}
