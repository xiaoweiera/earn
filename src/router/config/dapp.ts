/**
 * @file 新项目相关路由配置
 * @author svon.me@gmail.com
 */

import { config } from "./option";

export class Router {
  // ido 相关
  // 在路由调整，使用
  idoList() {
    return config.ido;
  }

  // 路由跳转使用，传 id 与其它参数
  idoDetail(id: string | number, query?: object) {
    return {
      path: `${this.idoList()}/${id}`,
      query,
    };
  }

  // 在定义路由使用
  // 比如 node.js 绑定路由
  // 比如 vue router 绑定路由
  idoListPattern() {
    return this.idoList();
  }

  idoDetailPattern() {
    return `${this.idoListPattern()}/:id`;
  }

  // igo 相关
  igoList() {
    return config.igo;
  }

  igoDetail(id: string | number, query?: object) {
    return {
      path: `${this.igoList()}/${id}`,
      query,
    };
  }

  igoListPattern() {
    return this.igoList();
  }

  igoDetailPattern() {
    return `${this.igoListPattern()}/:id`;
  }

  // nft 相关
  nftList() {
    return config.nft;
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

  // airdrop 相关
  airdropList() {
    return config.airdrop;
  }

  airdropDetail(id: string | number, query?: object) {
    return {
      path: `${this.airdropList()}/${id}`,
      query,
    };
  }

  airdropListPattern() {
    return this.airdropList();
  }

  airdropDetailPattern() {
    return `${this.airdropListPattern()}/:id`;
  }

  // 投融资 相关
  investList() {
    return config.invest;
  }
  investListPattern() {
    return this.investList();
  }
  //投资动向详情
  fundsList() {
    return config.funds;
  }
  fundsDetailPattern() {
    return `${this.fundsList()}/:id`;
  }
  fundsDetail(id: string | number, query?: object) {
    return {
      path: `${this.fundsList()}/${id}`,
      query,
    };
  }
  //  申请页面
  apply() {
    return config.dappApply;
  }
  applyPattern() {
    return this.apply();
  }
}
