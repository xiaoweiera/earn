import{_ as e}from"./countdown.4f0e36cb.js";import{_ as a,a as t,b as s,c as l,d as n,e as o,f as i}from"./index.15953e59.js";import{N as r,O as c,cd as d,aw as p,aM as u,aD as x,_ as y,d as h,e as f,aO as m,q as v,f as b,o as k,c as g,b as w,F as _,i as A,n as j,t as T,u as E,a as C,w as I,g as N,j as F,W as P,bu as q,r as B,ci as H,a1 as O,c2 as Y,P as D,aB as X,v as z,m as G,cA as J,c4 as M,cB as R,bh as S,bt as W,aI as K,bo as L,bl as Q}from"./app.46fe480c.js";import{e as U,h as V,_ as Z}from"./apyFixed.ae26f358.js";import{G as $,H as ee,I as ae,J as te}from"./dapp.f9c88518.js";import{E as se,P as le}from"./interface.812a3c85.js";/* empty css               */import{_ as ne,a as oe}from"./meta.530fca83.js";import"./lodash.6b1417a0.js";import"./index.4c06d6a8.js";import"./echarts.0dcdbd40.js";import"./pick.bb0f00ec.js";import"./router.fc465fac.js";/* empty css              *//* empty css                */const ie=function(e){return U(e)},re=function(e,a){const t=e[a];let s;switch(a){case"votes":case"voters":s=d(t);break;case"percent":case"rate":case"user_profit_percent":s=c(t,"%");break;case"apy":s=c(t,"%","+");break;default:s=t}return s},ce=[{label:r.apy.heco.head.name,key:"node_name"},{label:r.apy.heco.head.region,key:"area"},{label:r.apy.heco.head.participants,key:"voters",sortable:!0,render:re},{label:r.apy.heco.head.voters,key:"votes",sortable:!0,render:re},{label:r.apy.heco.head.percent,key:"percent",sortable:!0,render:re,width:"200px"},{label:r.apy.heco.head.ratio,key:"user_profit_percent",sortable:!0,render:re,width:"150px"},{label:"APY",key:"apy",sortable:!0,className:"text-green font-bold text-xl whitespace-nowrap",render:re}],de=[{label:r.apy.heco.head.name,key:"node_name",fixed:"left"},{label:"APY",key:"apy",width:"120px",sortable:!0,className:"text-green font-bold text-xl",render:re},{label:r.apy.heco.head.region,key:"area"},{label:r.apy.heco.head.participants,key:"voters",width:"100px",sortable:!0,render:re},{label:r.apy.heco.head.voters,key:"votes",width:"100px",sortable:!0,render:re},{label:r.apy.heco.head.percent,key:"percent",width:"200px",sortable:!0,render:re},{label:r.apy.heco.head.ratio,key:"user_profit_percent",width:"130px",sortable:!0,render:re}];const pe={class:"flex justify-between items-center pb-3"},ue={class:"text-global-highTitle text-opacity-65 text-sm font-medium"},xe={class:"tabs"},ye=["onClick"],he={class:"flex items-center text-global-highTitle text-opacity-45"},fe={class:"text-xs mr-4"};var me=y(h({props:{name:{type:String,required:!0}},setup(e){const c=e,d=f(m()),p=f(""),u=f("apy"),x=v(new se),y=[{label:"APY",key:"apy"},{label:r.apy.heco.head.voters,key:"votes"},{label:r.apy.heco.head.percent,key:"percent"},{label:r.apy.heco.head.participants,key:"voters"}],h=P((async()=>{const e=await async function(e){const a=await ae(e);return a.trends=ie(a.trends),a}({column:u.value,node_name:c.name}),a=e.trends?e.trends:new se;x.legends=a.legends,x.xAxis=a.xAxis,x.series=a.series,x.yAxis=a.yAxis,p.value=q(e.update_time),d.value=m()}));return b((()=>{V.event("去投票","heco_expand"),h()})),(e,c)=>{const f=a,m=t,v=s,b=l,P=n,q=o,B=i;return k(),g("div",null,[w("div",pe,[w("div",ue,[w("div",xe,[(k(),g(_,null,A(y,(e=>w("span",{key:e.key,class:j({active:e.key===u.value}),onClick:a=>{return t=e.key,u.value=t,h();var t}},T(e.label),11,ye))),64))])]),w("div",he,[w("span",fe,T(E(r).apy.heco.head.update)+": "+T(p.value),1),C(f,{title:u.value,size:"16"},null,8,["title"])])]),E(x).xAxis&&E(x).xAxis.length>0?(k(),g("div",{class:"h-52.5",key:d.value},[C(B,{"bg-color":"#F8FBFD",legend:!1},{default:I((()=>[N(" 提示框 trigger: 触发方式 "),C(m,{trigger:"axis"}),(k(!0),g(_,null,A(E(x).legends,((e,a)=>(k(),F(v,{key:a,index:a,value:e.name,type:e.type,position:e.kline?E(le).right:E(le).left},null,8,["index","value","type","position"])))),128)),C(b,{index:0,unit:E(x).yAxis.left},null,8,["unit"]),C(b,{index:1,unit:E(x).yAxis.right},null,8,["unit"]),N(" 设置X轴 "),C(P,{value:E(x).xAxis},null,8,["value"]),N("数据"),(k(!0),g(_,null,A(E(x).legends,((e,a)=>(k(),g(_,{key:a},[N("\n            通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)\n            value: 数据\n          "),C(q,{index:a,color:e.color,value:E(x).series[e.id]},null,8,["index","color","value"])],64)))),128))])),_:1})])):N("v-if",!0)])}}}),[["__scopeId","data-v-6bdf8d3c"]]);const ve={class:"w-full block"},be={key:1,class:"flex items-center"},ke=h({props:{data:{type:Object,required:!0}},setup:e=>(a,t)=>{const s=me;return k(),g("div",ve,[e.data.custom?(k(),F(s,{key:0,name:e.data.node_name},null,8,["name"])):(k(),g("div",be,[w("span",{class:j(["text-sm text-global-highTitle text-kdExp leading-6",e.data.className])},T(e.data.node_name),3)]))])}});const ge={class:"bg-global-white px-4"},we={class:"w-300 mx-auto max-w-full text-kdFang"},_e={class:"text-center"},Ae={class:"title text-kdExp font-medium text-global-highTitle text-opacity-85"},je={class:"description"},Te={class:"item"},Ee={class:"sub"},Ce={class:"ml-1 text-global-highTitle text-opacity-85"},Ie={class:"text-kdExp leading-6"},Ne={class:"item"},Fe={class:"sub"},Pe={class:"ml-1 text-global-highTitle text-opacity-85"},qe={class:"text-kdExp leading-6"},Be={class:"item"},He={class:"sub"},Oe={key:0,class:"ml-1 text-global-highTitle text-opacity-85 text-kdExp leading-6"},Ye={class:"mt-6 h-75"},De={class:"mt-6"},Xe={class:"hidden md:block"},ze={class:"text-xs font-medium"},Ge={key:0,class:"text-xs font-medium"},Je={key:1,class:"text-xs font-medium"},Me={class:"block md:hidden"},Re={class:"text-sm text-global-highTitle"},Se={class:"text-xs font-medium"},We={class:"pt-4 pb-16"},Ke={class:"text-base text-global-highTitle"},Le={class:"pt-1.5 text-sm leading-5 whitespace-pre-wrap text-global-default text-opacity-85"};var Qe=y(h({setup(a){const c=v(new te),y=v(new se),h=f([]),P=f(),q=async function(){const e=await async function(){const e=await $();return e.trends=ie(e.trends),e}();c.votes=e.votes,c.voters=e.voters;const a=e.trends?e.trends:new se;y.legends=a.legends,y.xAxis=a.xAxis,y.series=a.series,y.yAxis=a.yAxis},U=async function(){h.value=await async function(e,a){try{const t=await ee({column:e,sort_type:a});return new p(t).clone((function(e){return u((function(e,a){let t;switch(a){case"votes":case"voters":case"percent":case"rate":case"apy":t=x(e);break;default:t=e}return t}),e)}))}catch(t){return[]}}()},Z=f(""),ae=function(e,a,t){const s=X(h.value);if(t){const l=new p(s,e,a);return l.remove({[a]:t}),l.update({[e]:t},{expand:!1}),l.clone()}return s},ne=function(e){const a=e.id;a&&a===Z.value?(h.value=ae("id","pid",a),Z.value=""):function(e,a,t){const s=t.id,l=ae(a,"pid",Z.value),n=L([e,"pid","dbIndex","expand","custom"],t),o=m();Q(n,e,o),Q(n,"pid",s),Q(n,"custom",!0),Q(n,"expand",!1);let i=0;for(let r=l.length;i<r;i++){const a=l[i];if(a[e]===s){a.expand=!0,i+=1;break}}h.value=[].concat(l.slice(0,i),n,l.slice(i)),Z.value=a}("id",a,e)},oe=function(e){const a=X(e);a.custom||ne(a)},re=function(e){if(e){V.event("查看图表","heco_expand");const a=z(e);G.open(a)}},pe=function({row:e,column:a,rowIndex:t,columnIndex:s}){if(Z.value){const a=e.pid;if(a&&a===Z.value)return 0===s?[1,ce.length+1]:[0,0]}},ue=function(e){return e.row.custom?"":"cursor-pointer"},xe=function(){return function(){const e=S(W()),a=[6,12,18,24,30];let t=K(e);const s=K();for(let l=0;l<a.length;l++){const n=K(e.add(a[l],"hour"));if(n>s){t=n;break}}P.value=t}(),Promise.all([q(),U()])},ye=function(e){if("00"===e.hour&&"00"===e.minute&&"00"===e.second)return xe()};return b(xe),(a,p)=>{const u=e,x=B("client-only"),f=t,m=s,v=l,b=n,q=o,X=i,z=ke,G=J,S=M,W=R;return k(),g("div",ge,[w("div",we,[w("div",_e,[w("h3",Ae,T(E(r).apy.heco.title),1),w("p",je,[w("span",Te,[w("span",Ee,T(E(r).apy.heco.description.votes),1),w("span",Ce,[w("span",Ie,T(E(d)(E(c).votes))+" HT",1)])]),w("span",Ne,[w("span",Fe,T(E(r).apy.heco.description.voters),1),w("span",Pe,[w("span",qe,T(E(r).part(E(r).apy.heco.description.person,E(H)(E(c).voters),{value:E(d)(E(c).voters)})),1)])]),w("span",Be,[C(x,null,{default:I((()=>[w("span",He,T(E(r).apy.heco.description.dateEnd),1),P.value?(k(),g("span",Oe,[C(u,{value:P.value,onChange:ye},{default:I((e=>[O(T(e.hour)+" : "+T(e.minute)+" : "+T(e.second),1)])),_:1},8,["value"])])):N("v-if",!0)])),_:1})])])]),w("div",Ye,[E(y).xAxis&&E(y).xAxis.length>0?(k(),F(X,{key:0},{default:I((()=>[N(" 提示框 trigger: 触发方式 "),C(f,{trigger:"axis"}),(k(!0),g(_,null,A(E(y).legends,((e,a)=>(k(),F(m,{key:a,index:a,value:e.name,color:e.color,type:e.type,position:e.kline?E(le).right:E(le).left},null,8,["index","value","color","type","position"])))),128)),C(v,{index:0,position:E(le).left,unit:E(y).yAxis.left},null,8,["position","unit"]),C(v,{index:1,position:E(le).right,unit:E(y).yAxis.right},null,8,["position","unit"]),N(" 设置X轴 "),C(b,{value:E(y).xAxis},null,8,["value"]),N("数据"),(k(!0),g(_,null,A(E(y).legends,((e,a)=>(k(),g(_,{key:a},[N("\n              通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)\n              value: 数据\n            "),C(q,{index:a,color:e.color,value:E(y).series[e.id]},null,8,["index","color","value"])],64)))),128))])),_:1})):N("v-if",!0)]),w("div",De,[N(" 大屏 "),w("div",Xe,[C(W,{class:"w-full heco-custom-expand",data:h.value,"row-key":"id","row-class-name":ue,"span-method":pe,onRowClick:oe},{default:I((()=>[(k(!0),g(_,null,A(E(ce),((e,a)=>(k(),F(G,{key:a,width:e.width,prop:e.key,sortable:e.sortable,label:e.label,fixed:e.fixed},Y({_:2},["node_name"===e.key?{name:"default",fn:I((e=>[C(z,{data:e.row},null,8,["data"])]))}:e.render?{name:"default",fn:I((a=>[w("div",{class:"text-sm text-global-highTitle"},[w("span",{class:j(["text-kdExp leading-6",e.className])},T(e.render(a.row,e.key)),3)])]))}:{name:"default",fn:I((a=>[w("div",{class:"text-sm text-global-highTitle"},[w("span",{class:j(["text-kdExp leading-6",e.className])},T(a.row[e.key]),3)])]))}]),1032,["width","prop","sortable","label","fixed"])))),128)),C(G,{prop:"node_name",label:E(r).apy.heco.head.operation},{default:I((e=>[w("div",null,[C(S,{type:"text",onClick:D((a=>re(e.row.jump_url)),["stop","prevent"])},{default:I((()=>[w("span",ze,T(E(r).apy.heco.button.vote),1)])),_:2},1032,["onClick"]),C(S,{type:"text"},{default:I((()=>[e.row.expand?(k(),g("span",Ge,T(E(r).apy.heco.button.off),1)):(k(),g("span",Je,T(E(r).apy.heco.button.expand),1))])),_:2},1024)])])),_:1},8,["label"])])),_:1},8,["data"])]),N(" 手机端 "),w("div",Me,[C(W,{class:"w-full heco-custom-expand",data:h.value,"row-key":"id"},{default:I((()=>[(k(!0),g(_,null,A(E(de),((e,a)=>(k(),F(G,{key:a,width:e.width,prop:e.key,sortable:e.sortable,label:e.label,fixed:e.fixed},Y({_:2},[e.render?{name:"default",fn:I((a=>[w("div",Re,[w("span",{class:j(["text-kdExp leading-6",e.className])},T(e.render(a.row,e.key)),3)])]))}:{name:"default",fn:I((a=>[w("div",{class:"text-sm text-global-highTitle"},[w("span",{class:j(["text-kdExp leading-6",e.className])},T(a.row[e.key]),3)])]))}]),1032,["width","prop","sortable","label","fixed"])))),128)),C(G,{prop:"node_name",label:"操作"},{default:I((e=>[w("div",null,[C(S,{type:"text",onClick:D((a=>re(e.row.jump_url)),["stop","prevent"])},{default:I((()=>[w("span",Se,T(E(r).apy.heco.button.vote),1)])),_:2},1032,["onClick"])])])),_:1})])),_:1},8,["data"])])]),w("div",We,[w("h4",Ke,T(E(r).apy.heco.note.label)+":",1),w("p",Le,[(k(!0),g(_,null,A(E(r).apy.heco.note.texts,((e,a)=>(k(),g("span",{class:"block",key:a},T(e),1)))),128))])])])])}}}),[["__scopeId","data-v-30de63b1"]]);const Ue={class:"hidden"},Ve=h({setup:e=>(e,a)=>{const t=Qe,s=Z,l=ne,n=oe;return k(),g(_,null,[C(t),C(s),w("div",Ue,[C(l,{value:E(r).apyIndex.pageHeco.title},null,8,["value"]),C(n,{keywords:E(r).menu.seo.key,description:E(r).menu.seo.des},null,8,["keywords","description"])])],64)}});export{Ve as default};
