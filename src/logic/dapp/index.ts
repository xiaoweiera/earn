import API from "src/api/index";
import {Query, Status, ProjectItem, AdItem} from "src/types/dapp/ixo";
import {nftQuery, nftStatus, ProjectNftItem, AdNftItem} from "src/types/dapp/nft";
import { config } from "src/router/config";
import * as R from "ramda";
import { getValue } from "src/utils/ssr/ref";
import { SiteConfig } from "src/types/common/chain";
import * as alias from "src/utils/root/alias";
import I18n from "src/utils/i18n";


const configs = getValue<SiteConfig>(alias.common.chain.site, {} as SiteConfig);
export const tabAll = 'all';

export const getAll = function () {
	const i18n = I18n();
	return {
		id: tabAll,
		name: i18n.address.all
	};
}
//获取公链
export const tabChain = function (data:any) {
	let arr:any = [getAll()];
	R.forEach((item:any) => {
		if(configs.chain[item]){
			arr.push(configs.chain[item])
		}
	},data)
	return arr;
}
//获取平台
export const tabPlat = function (data:any) {
	let arr:any = [getAll()];
	R.forEach((item:any) => {
		if(configs.tge_platform[item]){
			arr.push(configs.tge_platform[item])
		}
	},data)
	return arr;
}
//获取项目类型
export const tabCage = function (data:any) {
	let arr:any = [getAll()];
	R.forEach((item:any) => {
		if(configs.category[item]){
			arr.push(configs.category[item])
		}
	},data)
	return arr;
}

export class Model extends API {
  //IDO数据
	getList() {
		return this.dApp.getList();
	}
  //IGO数据
  getIGOList() {
    return this.dApp.getIGOList();
  }
  //nft数据
  getNftList(chain?: string) {
		const query: nftQuery = {
			chain: chain ? chain : "all",
			status: nftStatus.upcoming
		};
    return this.dApp.getNftList<ProjectNftItem | AdNftItem>(query);
  }
	getUpcomingProjects(chain?: string) {
		const query: Query = {
			chain: chain ? chain : "all",
			status: Status.ended
		};
		return this.dApp.ixo<ProjectItem | AdItem>(query);
	}
	getOngoingProjects(chain?: string) {
		const query: Query = {
			chain: chain ? chain : "all",
			status: Status.ended
		};
		return this.dApp.ixo<ProjectItem | AdItem>(query);
	}
	getEndedProjects(chain?: string) {
		const query: Query = {
			chain: chain ? chain : "all",
			status: Status.ended
		};
		return this.dApp.ixoend<ProjectItem | AdItem>(query);
	}
}

// 跳转IDO链接
export const getUrl = function (name:string, type:boolean) {
	if(type === true){
		if(name === Status.upcoming ) {
			return `${config.dappList}?type=${Status.upcoming}`;
		}else if (name === Status.ongoing) {
			return `${config.dappList}?type=${Status.ongoing}`;
		}else if (name === Status.ended) {
			return `${config.dappList}?type=${Status.ended}`;
		}
	}else if (type === false) {
		if(name === Status.upcoming ) {
			return `${config.nft}/discover?type=${Status.upcoming}`;
		}
	}
}
