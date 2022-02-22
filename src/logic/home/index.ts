import API from "src/api";
//得到header数据 headerName,headerCss
export const getHeader=(key:string)=>{
		if(key==='name'){
			return ['Name','text-left']
		}else if(key==='chains'){
			return ['Chain','text-center']
		}else if(key==='tge_platform'){
			return ['TGE Platform','text-center']
		}else if(key==='overall_score'){
			return ['Rating','text-center']
		}else if(key==='categories'){
			return ['项目类型','text-center']
		}else if(key==='current_price'){
			return ['Current Price','text-center']
		}else if(key==='ido_price'){
			return ['IDO Price','text-center']
		}else if(key==='balance_24h'){
			return ['Balance(24h)','text-center']
		}else if(key==='balance_7d'){
			return ['Balance(7d)','text-center']
		}else if(key==='volume_24h'){
			return ['Volume(24h)','text-center']
		}else if(key==='volume_7d'){
			return ['volume(7d)','text-center']
		}else if(key==='ido_fundraising_goal'){
			return ['Total Raised','text-center']
		}else if(key==='mcap'){
			return ['Market Cap','text-center']
		}else if(key==='floor_price'){
			return ['Floor Price','text-center']
		}else if(key==='mint_price'){
			return ['Mint Price','text-center']
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
}
//得到td数据
export const getData=(key:string,data:any,type:string)=>{
	let header:string=''
	let value:any=[]
	if(key==='name'){
		if(type==='data') {
			value=[data['']]
		}else{

		}
	}else if(key==='chains'){
		value=data['chains']
	}else if(key==='tge_platform'){
		value=data['tge_platform']
	}else if(key==='overall_score'){
		value=data['overall_score']
	}else if(key==='categories'){
		value=data['categories']
	}else if(key==='current_price'){
		value=data['current_price']
	}else if(key==='ido_price'){
		value=data['ido_price']
	}else if(key==='balance_24h'){
		value=data['balance_24h']
	}else if(key==='balance_7d'){
		value=data['balance_7d']
	}else if(key==='volume_24h'){
		value=data['volume_24h']
	}else if(key==='volume_7d'){
		value=data['volume_7d']
	}else if(key==='ido_fundraising_goal'){
		value=data['ido_fundraising_goal']
	}else if(key==='mcap'){
		value=data['mcap']
	}else if(key==='floor_price'){
		value=data['floor_price']
	}else if(key==='mint_price'){
		value=data['mint_price']
	}else if(key==='ido_sale_amount'){
		value=[data['ido_sale_amount'],data['ido_symbol']]
	}else if(key==='owners'){
		value=data['owners']
	}else if(key==='assets'){
		value=data['assets']
	}else if(key==='mcap_tvl'){
		value=data['mcap_tvl']
	}else if(key==='users_24h'){
		value=[data['users_24h'],data['users_change_percent_24h']]
	}else if(key==='users_7d'){
		value=[data['users_7d'],data['users_change_percent_7d']]
	}else if(key==='tvl'){
		value=[data['tvl'],data['tvl_change_percent_24h']]
	}else if(key==='ath_since_ido'){
		value=data['ath_since_ido']
	}else if(key==='current_roi_usd'){
		value=data['current_roi_usd']
	}
	return value

}
export class Model extends API {
	getSummary() {
		return this.home.getSummary()
	}

	getTopicRank() {
		return this.home.getTopicRank()
	}
}
