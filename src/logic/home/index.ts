import API from "src/api";
// headerName,headerCss,contentCss
export const getHeader=(key:string)=>{
		if(key==='name'){
			return ['Name','text-left','text-left']
		}else if(key==='chains'){
			return ['Chain','text-center','text-center']
		}else if(key==='tge_platform'){
			return ['TGE Platform','text-center','text-right']
		}else if(key==='overall_score'){
			return ['Rating','text-center','text-right']
		}else if(key==='categories'){
			return ['项目类型','text-center','text-right']
		}else if(key==='current_price'){
			return ['Current Price','text-center','text-center']
		}else if(key==='ido_price'){
			return ['IDO Price','text-center','text-center']
		}else if(key==='balance_24h'){
			return ['Balance(24h)','text-center','text-center']
		}else if(key==='balance_7d'){
			return ['Balance(7d)','text-center','text-center']
		}else if(key==='volume_24h'){
			return ['Volume(24h)','text-center','text-center']
		}else if(key==='volume_7d'){
			return ['volume(7d)','text-center','text-center']
		}else if(key==='ido_fundraising_goal'){
			return ['Total Raised','text-center','text-center']
		}else if(key==='mcap'){
			return ['Market Cap','text-center','text-center']
		}else if(key==='floor_price'){
			return ['Floor Price','text-center','text-center']
		}else if(key==='mint_price'){
			return ['Mint Price','text-center','text-center']
		}else if(key==='ido_sale_amount'){
			return ['Tokens for Sale','text-center','text-right']
		}else if(key==='owners'){
			return ['Owners','text-center','text-center']
		}else if(key==='assets'){
			return ['Assets','text-center','text-center']
		}else if(key==='mcap_tvl'){
			return ['MCap/TVL','text-center','text-center']
		}else if(key==='users_24h'){
			return ['User(24h)/Change','text-center','text-center']
		}else if(key==='users_7d'){
			return ['User(7d)/Change','text-center','text-center']
		}else if(key==='tvl'){
			return ['TVL/Change','text-center','text-center']
		}else if(key==='ath_since_ido'){
			return ['ATH Since IDO','text-center','text-right']
		}else if(key==='current_roi_usd'){
			return ['Current ROI USD','text-center','text-right']
		}
}
export class Model extends API {
	getSummary() {
		return this.home.getSummary()
	}

	getTopicRank() {
		return this.home.getTopicRank()
	}
}
