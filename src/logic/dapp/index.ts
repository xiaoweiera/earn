import API from "src/api/index";
import {Query, Status, ProjectItem, AdItem} from "src/types/dapp/ixo";
import {nftQuery, nftStatus, ProjectNftItem, AdNftItem} from "src/types/dapp/nft";
import {config} from "src/router/config";


// 拼接url
export const changeUrl = function (data: Object, router: Object, ids: string) {
	const routerUrl = router;
	// const query = router.query;
	let queryUrl: Object = {};
	// R.forEach((item:any) => {
	//   queryUrl={
	//     ...query,
	//   }
	//   queryUrl[ids]=item[ids]
	//   let href=''
	//   R.forEach((items:any)=>{
	//     href+=`${items}=${queryUrl[items]}&`
	//   },Object.keys(queryUrl))
	//   item.href=(`${router.path}?${href}`).substring(0,(`${router.path}?${href}`).length-1)
	// },data);
	return queryUrl;
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
