import _ from "lodash";
import API from "src/api/index";
import {Query, Status, ProjectItem, AdItem} from "src/types/dapp/ixo";
import {ProjectNftItem} from "src/types/dapp/nft";
import { config } from "src/router/config";
import * as R from "ramda";
import { getValue } from "src/utils/root/data";
import { SiteConfig } from "src/types/common/chain";
import * as alias from "src/utils/root/alias";
import I18n from "src/utils/i18n";
import { getParam } from "src/utils/router/";
import { getDateMDY, dateFormat, dateTime, dateYMDFormat } from "src/utils/"
import safeGet from "@fengqiaogang/safe-get";
import * as logic from "src/types/dapp";
import DBList from "@fengqiaogang/dblist";
import dayjs from "dayjs";
import {createHref} from "src/plugins/router/pack";


const configs = getValue<SiteConfig>(alias.common.chain.site, {} as SiteConfig);
export const tabAll = 'All';


export const getAll = function () {
	return {
		id: tabAll,
		name: "All",
		slug: "All"
	};
}

//获取公链
export const tabChain = function (data:any, key: string, href:string) {
	return function () {
		let arr:any = [getAll()];
		R.forEach((item:any) => {
			const value = safeGet(configs, `chain.${item}`);
			if(value){
				arr.push(value);
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
			const value = safeGet(configs, `tge_platform.${item}`);
			if(value){
				arr.push(value);
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
		let arr:any = ['All'].concat(data);
		const query = getParam<object>();
		return R.map(function (item: any) {
			return {
				...item,
				[key]: item,
				name:item,
				href: {
					path: href,
					query: {
						...query,
						[key]: item,
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
	//获取首页nft进行时
	getUpcomingNftList(query:any) {
		return this.dApp.getNftList(query);
	}
	getEndedProjects(query:object) {
		return this.dApp.ixoEnd<ProjectItem | AdItem>(query);
	}
}

// 跳转IDO链接
export const getUrl = function (name:string, type:boolean) {
	if(type){
		if(name === Status.upcoming ) {
			return `${config.dappList}?type=${Status.upcoming}`;
		}else if (name === Status.ongoing) {
			return `${config.dappList}?type=${Status.ongoing}`;
		}else if (name === Status.ended) {
			return `${config.dappList}?type=${Status.ended}`;
		}
	}else{
		if(name === Status.upcoming ) {
			return `${config.nft}/discover?type=${Status.upcoming}`;
		}
	}
}

//获取公链logo
export const getLog = function (name:string) {
	const data = safeGet<object>(configs, `chain.${name}`);
	if(data) {
		return safeGet<string>(data, "logo");
	}
	return "N/A";
}
//获取tegicon
export const getTegLog = function (name:string) {
	return safeGet<string>(configs, `tge_platform.${name}.logo`) || "";
}
//获取跳转链接
export const getTegUrl = function (name:string) {
	return safeGet<string>(configs, `tge_platform.${name}.website`) || "";
}

export  const sortTime = function (list:any) {
	return R.map(function (data: logic.ProjectItem) {
		const value = dateYMDFormat(data.mint_start_at);
		data.pid = dateTime(value);
		return data;
	}, list);
}
export const sortVal = function(list: any[], diff?: string, reverse?: boolean) {
	const app = function(value1: any, value2: any) {
		if (diff) {
			if (reverse) {
				return safeGet<number>(value2, diff) - safeGet<number>(value1, diff)
			}
			return safeGet<number>(value1, diff) - safeGet<number>(value2, diff)
		}
		if (reverse) {
			return value2 - value1
		}
		return value1 - value2
	}
	return R.sort(app, list)
}

//判断是否是今天和明天
export const getTodayTime = function (value: number) {
	const today = dayjs();
	const date = dayjs(value);

	// 判断是否是今天
	if (today.isSame(date, "day")) {
		const i18n = I18n();
		return i18n.home.nfts.today;
	}
	const tomorrow = dayjs().add(1, "day");
	// 判断是否是明天
	if (tomorrow.isSame(date, "day")) {
		const i18n = I18n();
		return i18n.home.nfts.tomorrow;
	}
	return getDateMDY(value);
}
//跳转路由
export const getNextUrl = function (val:any) {
	if(val.url) {
		window.open(createHref(`${val.url}?type=dashboard`));
	}
}

export const transformNftList = function (list: ProjectNftItem[]) {
	const days: number[] = [];
	const db = new DBList([], "mint_start_at", "date");
	_.forEach(list, function (item: ProjectNftItem) {
		const date = dateTime(dateFormat(item.mint_start_at, "YYYY-MM-DD") + '00:00:00');
		days.push(date)
		db.insert({ ...item, date });
	});
	return _.map(_.sortBy(_.uniq(days)), function (date: number) {
		return {
			title: getTodayTime(date),
			list: db.select({ date }),
		}
	});
}

