import API from "src/api/index";
import {Query, Status, ProjectItem, AdItem} from "src/types/dapp/ixo";

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
  getNftList() {
    return this.dApp.getNftList();
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

}
