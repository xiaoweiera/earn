import{_ as e}from"./index.4668723f.js";import{d as l,o as a,c as t,b as o,a as n,n as r,t as s,A as i,l as p,u as d,ch as g,x as u,w as _,h as b,cl as c,cm as w}from"./app.c3012526.js";import{_ as y}from"./router.d44cad27.js";import{h as x}from"./table.23471ded.js";import{_ as f,a as h}from"./tool.7893560b.js";import{j as m}from"./selectTag.8747d614.js";const v={class:"flex items-center font-kdExp"},k={class:"relative mr-2"},I={class:"flex items-center text-kd14px20px text-global-highTitle text-opacity-85"},T={class:"mr-1"},j={key:0,class:"rounded-kd4px bg-global-highTitle px-1 py-0.5 text-center bg-opacity-6 text-kd12px14px text-global-highTitle text-opacity-45"},N=l({props:{logo:String,name:String,chain:String,des:String,isNew:Boolean},setup:l=>(d,g)=>{const u=e;return a(),t("div",v,[o("div",k,[n(u,{class:r(["xshidden",{"new-24":l.isNew}]),type:l.logo?l.logo:"icon-morentoken",size:"32"},null,8,["type","class"]),n(u,{class:r(["mdhidden",{"new-16":l.isNew}]),type:l.logo?l.logo:"icon-morentoken",size:"24"},null,8,["type","class"])]),o("div",null,[o("div",I,[o("span",T,s(l.name),1),l.chain?(a(),i(u,{key:0,class:"mr-1",type:l.chain,size:"14"},null,8,["type"])):p("v-if",!0)]),l.des?(a(),t("span",j,s(l.des),1)):p("v-if",!0)])])}}),S={class:"font-kdExp"},R={class:"text-kd20px26px text-global-highTitle text-opacity-85"},A={class:"text-global-highTitle text-opacity-85"},C=l({props:{value0:Number,value1:Number},setup:e=>(l,n)=>(a(),t("div",S,[o("span",R,s(d(g)(e.value0))+"%",1),o("span",A," / "+s(d(g)(e.value1))+"%",1)]))}),q={class:"font-kdExp text-center"},E={class:"flex items-center justify-center"},z=["src"],B={class:"text-kd12px16px text-global-highTitle"},$={class:"text-kd12px16px text-highTitle text-opacity-65 font-kdExp"},L=l({props:{logo:String,name:String,value:Number,des:String},setup(e){const l=e,n=u((()=>l.value>=0?"text-global-numGreen":"text-global-numRed"));return(l,i)=>(a(),t("div",q,[o("div",E,[o("img",{class:"w-4 h-4 mr-1",src:e.logo,alt:""},null,8,z),o("span",B,s(e.name),1)]),o("div",{class:r([d(n),"text-kd20px26px font-bold font-kdExp"])},s(d(g)(e.value))+"%",3),o("div",$,s(e.des),1)]))}}),F=l({props:{value:Number},setup:e=>(l,o)=>(a(),t("div",{class:r([e.value>=0?"text-global-numGreen":"text-global-numRed","text-kd26px26px font-bold font-kdExp"])},s(d(g)(e.value))+"%",3))}),G=l({props:{data:Object,pageType:Boolean,page:String,origin:String,dialogType:String},setup(e){const l=e,o=e=>`/apy/token?symbol=${e}`,r=e=>{let a="",t="";"supply"===e?"lend_Best_operate"===l.page?(a="借贷最佳路径打开抵押池子详情",t="lend_list_supply_info"):"token_borrow_all"===l.page&&(a="币种分析打开抵押池子详情",t="token_list_supply_info"):"lend_Best_operate"===l.page?(a="借贷最佳路径打开借出池子详情",t="lend_list_borrow_info"):"token_borrow_all"===l.page&&(a="币种分析打开抵押池子详情",t="token_list_supply_info"),x.event(a,t)};return(s,i)=>{const g=N,u=y,v=c,k=f,I=C,T=L,j=m,S=F,R=h,A=w;return a(),t("div",null,[p("    大屏"),n(A,{onClick:i[2]||(i[2]=e=>(()=>{let e="",a="";"lend_Best_operate"===l.page?(e="借贷池子全部池子点击查看图表/打开池子详情页",a="lend_borrow_poolsinfo"):"token_borrow_all"===l.page&&(e="借贷池子全部池子点击查看图表/打开池子详情页",a="token_borrow_all_poolsinfo"),x.event(e,a)})()),class:"xshidden","header-cell-style":"font-family: PingFang SC; font-weight:400;font-size: 14px;line-height: 18px;color: rgba(3, 54, 102, 0.65);font-weight:400px;",align:"center","header-align":"center",data:e.data,style:{width:"100%","border-top":"1px solid rgba(3, 54, 102, 0.06)"}},{default:_((()=>[n(v,{prop:"palt",width:"170px",label:d(b).apyIndex.plat},{default:_((e=>[n(u,{target:"_blank",href:o(e.row.symbol_alias)},{default:_((()=>[n(g,{class:"hand",isNew:e.row.new,logo:e.row.project_logo,chain:e.row.chain,name:e.row.project,des:e.row.strategy_tags},null,8,["isNew","logo","chain","name","des"])])),_:2},1032,["href"])])),_:1},8,["label"]),n(v,{prop:"loanAmount",width:"150px",label:d(b).apyIndex.borrowAmount},{default:_((e=>[n(u,{target:"_blank",href:o(e.row.symbol_alias)},{default:_((()=>[n(k,{class:"hand",value:e.row.quota_remain,valueRate:e.row.quota_remain_percent},null,8,["value","valueRate"])])),_:2},1032,["href"])])),_:1},8,["label"]),n(v,{prop:"clearNumber",width:"tokenLending"===e.pageType?"140px":"200px",label:`${d(b).apyIndex.lowestLtv}/${d(b).apyIndex.clearRatio}`,sortable:""},{default:_((e=>[n(u,{target:"_blank",href:o(e.row.symbol_alias)},{default:_((()=>[n(I,{class:"hand",value0:e.row.mortgage_rate,value1:e.row.liquidation_rate},null,8,["value0","value1"])])),_:2},1032,["href"])])),_:1},8,["width","label"]),n(v,{prop:"gain",align:"center",label:d(b).apyIndex.mortgageInterest,sortable:""},{default:_((l=>[n(j,{type:"lend",origin:e.origin,dialogType:e.dialogType,id:l.row.lending_id},{reference:_((()=>[n(T,{onClick:i[0]||(i[0]=e=>r("supply")),class:"hand",logo:l.row.lending_symbol_logo,name:l.row.lending_symbol,value:l.row.lending_apy,des:l.row.lending_apy_detail},null,8,["logo","name","value","des"])])),_:2},1032,["origin","dialogType","id"])])),_:1},8,["label","align"]),n(v,{prop:"loanRate",label:d(b).apyIndex.borrowApy,align:"center",sortable:""},{default:_((l=>[n(j,{type:"lend",origin:e.origin,dialogType:e.dialogType,id:l.row.loaning_id},{reference:_((()=>[n(T,{onClick:i[1]||(i[1]=e=>r("borrow")),class:"hand",logo:l.row.symbol_logo,name:l.row.symbol,value:l.row.apy,des:l.row.apy_detail},null,8,["logo","name","value","des"])])),_:2},1032,["origin","dialogType","id"])])),_:1},8,["label"]),n(v,{prop:"cost",label:d(b).apyIndex.cost,sortable:""},{default:_((e=>[n(u,{target:"_blank",href:o(e.row.symbol_alias)},{default:_((()=>[n(S,{value:e.row.real_apy},null,8,["value"])])),_:2},1032,["href"])])),_:1},8,["label"]),n(v,{prop:"tool",align:"right",label:d(b).apyIndex.operate,width:"110px"},{default:_((l=>[n(R,{page:e.page,type:"lend",data:l.row},null,8,["page","data"])])),_:1},8,["label"])])),_:1},8,["header-cell-style","data"]),p("    小屏"),n(A,{class:"mdhidden","header-cell-style":"font-family: PingFang SC; font-weight:400;font-size: 14px;line-height: 18px;color: rgba(3, 54, 102, 0.65);font-weight:400px;",align:"center","header-align":"center",data:e.data,style:{width:"100%","border-top":"1px solid rgba(3, 54, 102, 0.06)"}},{default:_((()=>[n(v,{fixed:"",prop:"palt",width:"170px",label:d(b).apyIndex.plat},{default:_((e=>[n(u,{target:"_blank",href:o(e.row.symbol_alias)},{default:_((()=>[n(g,{isNew:e.row.new,logo:e.row.project_logo,chain:e.row.chain,name:e.row.project,des:e.row.strategy_tags},null,8,["isNew","logo","chain","name","des"])])),_:2},1032,["href"])])),_:1},8,["label"]),n(v,{prop:"loanAmount",width:"200px",label:d(b).apyIndex.borrowAmount},{default:_((e=>[n(u,{target:"_blank",href:o(e.row.symbol_alias)},{default:_((()=>[n(k,{value:e.row.quota_remain,valueRate:e.row.quota_remain_percent},null,8,["value","valueRate"])])),_:2},1032,["href"])])),_:1},8,["label"]),n(v,{prop:"clearNumber",width:"200px",label:`${d(b).apyIndex.lowestLtv}/${d(b).apyIndex.clearRatio}`,sortable:""},{default:_((e=>[n(u,{target:"_blank",href:o(e.row.symbol_alias)},{default:_((()=>[n(I,{value0:e.row.mortgage_rate,value1:e.row.liquidation_rate},null,8,["value0","value1"])])),_:2},1032,["href"])])),_:1},8,["label"]),n(v,{prop:"gain",width:"200px",label:d(b).apyIndex.mortgageInterest,align:"center",sortable:""},{default:_((e=>[n(u,{target:"_blank",href:o(e.row.symbol_alias)},{default:_((()=>[n(T,{onClick:i[3]||(i[3]=e=>d(x).click("借贷最佳路径打开抵押池子详情","lend_list_supply_info")),logo:e.row.lending_symbol_logo,name:e.row.lending_symbol,value:e.row.lending_apy,des:e.row.lending_single_apy_detail},null,8,["logo","name","value","des"])])),_:2},1032,["href"])])),_:1},8,["label"]),n(v,{prop:"loanRate",width:"200px",label:d(b).apyIndex.borrowApy,align:"center",sortable:""},{default:_((e=>[n(u,{target:"_blank",href:o(e.row.symbol_alias)},{default:_((()=>[n(T,{onClick:i[4]||(i[4]=e=>d(x).click("借贷最佳路径打开借出池子详情","lend_list_borrow_info")),logo:e.row.symbol_logo,name:e.row.symbol,value:e.row.apy,des:e.row.apy_detail},null,8,["logo","name","value","des"])])),_:2},1032,["href"])])),_:1},8,["label"]),n(v,{prop:"cost",width:"200px",label:d(b).apyIndex.cost,sortable:""},{default:_((e=>[n(u,{target:"_blank",href:o(e.row.symbol_alias)},{default:_((()=>[n(S,{value:e.row.real_apy},null,8,["value"])])),_:2},1032,["href"])])),_:1},8,["label"]),n(v,{prop:"tool",align:"right",label:d(b).apyIndex.operate,width:"110px"},{default:_((l=>[n(R,{page:e.page,type:"lend",data:l.row},null,8,["page","data"])])),_:1},8,["label"])])),_:1},8,["header-cell-style","data"])])}}});export{G as _};
