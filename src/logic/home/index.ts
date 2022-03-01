import API from "src/api";
import {projectParams, recommendModel, summaryModel} from "src/types/home";


//得到header数据 headerName,headerCss
export const getHeader=(key:string,name?:string)=>{
		if(key==='name'){
			return [name,'justify-begin']
		}else if(key==='chains'){
			return ['Chain','justify-center']
		}else if(key==='tge_platform'){
			return ['TGE Platform','justify-center']
		}else if(key==='overall_score'){
			return ['Rating','justify-center']
		}else if(key==='categories'){
			return ['项目类型','justify-center']
		}else if(key==='current_price'){
			return ['Current Price','justify-center']
		}else if(key==='ido_price'){
			return ['IDO Price','justify-center']
		}else if(key==='balance_24h'){
			return ['Balance(24h)','justify-center']
		}else if(key==='balance_7d'){
			return ['Balance(7d)','justify-center']
		}else if(key==='volume_24h'){
			return ['Volume(24h)','justify-center']
		}else if(key==='volume_7d'){
			return ['volume(7d)','justify-center']
		}else if(key==='ido_fundraising_goal'){
			return ['Total Raised','justify-center']
		}else if(key==='mcap'){
			return ['Market Cap','justify-center']
		}else if(key==='floor_price'){
			return ['Floor Price','justify-center']
		}else if(key==='mint_price'){
			return ['Mint Price','justify-center']
		}else if(key==='ido_sale_amount'){
			return ['Tokens for Sale','text-center']
		}else if(key==='owners'){
			return ['Owners','text-center']
		}else if(key==='assets'){
			return ['Assets','text-center']
		}else if(key==='mcap_tvl'){
			return ['MCap/TVL','text-center']
		}else if(key==='users_24h'){
			return ['User(24h)/Change','text-center']
		}else if(key==='users_7d'){
			return ['User(7d)/Change','text-center']
		}else if(key==='tvl'){
			return ['TVL/Change','text-center']
		}else if(key==='ath_since_ido'){
			return ['ATH Since IDO','text-center']
		}else if(key==='current_roi_usd'){
			return ['Current ROI USD','text-center']
		}
		return ['No','text-center']
}
//得到td数据
export const getData=(key:string,data:any)=>{
	let value:any
	if(key==='chains'){
		value=data['chain']
	}else if(key==='tge_platform'){
		value=data['platform']
	}else if(key==='categories'){
		value=data['category']
	}else if(key==='ido_sale_amount'){
		value=[data['ido_sale_amount'],data['ido_symbol']]
	}else if(key==='users_24h'){
		value=[data['users_24h'],data['users_change_percent_24h']]
	}else if(key==='users_7d'){
		value=[data['users_7d'],data['users_change_percent_7d']]
	}else if(key==='tvl'){
		value=[data['tvl'],data['tvl_change_percent_24h']]
	}else{
		value=data[key]
	}
	return value?value:{}

}
export class Model extends API {
	getSummary() {
		// @ts-ignore
		return this.home.getSummary<summaryModel>();
	}
	//topic table切换
	getTopicRank() {
		return this.home.getTopicRank()
	}
	//推荐话题
	getRecommend(params:recommendModel){
		return this.home.getRecommend(params)
	}
	//今日趋势
	getTrend(){
		return this.home.getTrend()
	}
	//话题项目top3
	getTop3(id:string){
		return this.home.getTop3(id)
	}
	//话题详情
	getDetail(id:string){
		return this.home.getDetail(id)
	}
	getProjects(params:projectParams){
		return this.home.getProjects(params)
	}
	//TGE平台列表
	getPlatform(){
		return this.home.getPlatform()
	}
}
