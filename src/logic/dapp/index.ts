import API from "src/api/index";
import {Query, Status, ProjectItem, AdItem} from "src/types/dapp/ixo";
import {nftQuery, nftStatus, ProjectNftItem, AdNftItem} from "src/types/dapp/nft";
import { config } from "src/router/config";
import * as R from "ramda";
import { getValue } from "src/utils/ssr/ref";
import { SiteConfig } from "src/types/common/chain";
import * as alias from "src/utils/root/alias";
import I18n from "src/utils/i18n";
import { getParam } from "src/utils/router/";


const configs = getValue<SiteConfig>(alias.common.chain.site, {} as SiteConfig);
export const tabAll = 'all';

export const getAll = function () {
	const i18n = I18n();
	return {
		id: tabAll,
		name: i18n.address.all,
		slug: tabAll,
	};
}

//获取公链
export const tabChain = function (data:any, key: string, href:string) {
	return function () {
		let arr:any = [getAll()];
		R.forEach((item:any) => {
			if(configs.chain[item]){
				arr.push(configs.chain[item])
			}
		},data);
		const query = getParam<object>();
		return R.map(function (item: any) {
			return {
				...item,
				[key]: item.slug,
				href: {
					path: href,
					query: {
						...query,
						[key]: item.slug,
					}
				}
			}
		}, arr);
	};
}

//获取平台
export const tabPlat = function (data:any, key: string, href:string) {
	return function () {
		let arr:any = [getAll()];
		R.forEach((item:any) => {
			if(configs.tge_platform[item]){
				arr.push(configs.tge_platform[item])
			}
		},data);
		const query = getParam<object>();
		return R.map(function (item: any) {
			return {
				...item,
				[key]: item.slug,
				href: {
					path: href,
					query: {
						...query,
						[key]: item.slug,
					}
				}
			}
		}, arr);
	};
}
//获取项目类型
export const tabCage = function (data:any, key: string, href:string) {
	return function (): any[] {
		let arr:any = [getAll()];
		R.forEach((item:any) => {
			if(configs.category[item]){
				arr.push(configs.category[item])
			}
		},data);
		const query = getParam<object>();
		return R.map(function (item: any) {
			return {
				...item,
				[key]: item.slug,
				href: {
					path: href,
					query: {
						...query,
						[key]: item.slug,
					}
				}
			}
		}, arr);
	};
}

interface T {
}

export class Model extends API {
    getSummary(): T {
        throw new Error('Method not implemented.');
    }
  //IDO数据
	getList(query:any) {
		return this.dApp.getList(query);
	}
  //IGO数据
  getIGOList() {
    return this.dApp.getIGOList();
  }
  //nft数据
  getNftList(query:any) {
		return this.dApp.getNftList(query);
    // return this.dApp.getNftList<ProjectNftItem | AdNftItem>(query);
  }
	getUpcomingProjects(chain?: string) {
		const query: Query = {
			chain: chain ? chain : "all",
			status: Status.upcoming
		};
		return this.dApp.ixo<ProjectItem | AdItem>(query);
	}
	getOngoingProjects(chain?: string) {
		const query: Query = {
			chain: chain ? chain : "all",
			status: Status.ongoing
		};
		return this.dApp.ixo<ProjectItem | AdItem>(query);
	}
	getEndedProjects(query:object) {
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
