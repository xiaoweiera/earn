var t=Object.defineProperty,e=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,n=(e,a,s)=>a in e?t(e,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[a]=s,i=(t,i)=>{for(var r in i||(i={}))a.call(i,r)&&n(t,r,i[r]);if(e)for(var r of e(i))s.call(i,r)&&n(t,r,i[r]);return t};import{aK as r,an as o,aF as c,aB as p,ba as l,bg as u,b9 as g,ao as x,aU as d,aH as m,b4 as f,ch as h,aI as y,g as b,Z as j}from"./app.c3012526.js";import{a as $}from"./interface.2a62e05c.js";import{i as v}from"./index.4668723f.js";import{p as k}from"./pick.3ced5230.js";const _=function(t){if(t){const e=r(o(t,"interval")||"1D"),a={left:"",right:""},s=c((function(t,e){const s=i({},t);return s.type||(s.type=$.line),t.unit&&(t.kline?a.right=t.unit:a.left=t.unit),s}),t.legends),n=c((function(t){const a=p(t);if("h"===e.type){return{time:a,date:l(a),value:u(a,"MM/DD HH:mm")}}{const t=g(a);return{time:a,date:t,value:t}}}),t.xAxis),h=new x(s,"id"),y=c((function(t,e){const a=h.selectOne({id:e}),s=o(a,"unit")||"",r=o(a,"project")||"",p=o(a,"chain")||"",l=o(a,"project_category")||"",u=o(a,"strategy_tags")||"";return c((function(t,e){return d(t)?Object.assign({unit:s,project:r,chain:p,project_category:l,strategy_tags:u},k(["time","date"],n[e]),t):i({value:t,unit:s,project:r,chain:p,project_category:l,strategy_tags:u},k(["time","date"],n[e]))}),t)}),t.series);return Object.assign({yAxis:a,xAxis:n,series:y,legends:s,key:m()},f(["xAxis","series","legends"],t))}},O=function(t,e){const a=o(e,"data.detail")||"",s=a?`<span  class="ml-1.5 text-xs text-global-highTitle text-opacity-60">(${a})</span>`:"";return`${t.icon}${t.name}${t.value}${s}`},w=function(t,e){const a=o(e,"data.chain")||"",s=o(e,"data.value")||"",n=o(e,"data.unit")||"",i=o(e,"data.project")||"",r=o(e,"data.project_category")||"",c=o(e,"data.strategy_tags")||"",p=v({type:a,size:14,className:"ml-2"}),l=`<span class="text-kd12px16px text-global-highTitle ml-1">${"$"===n?n+h(s,!1):h(s,!1)+n}</span>`,u=v({type:r,size:14,className:"ml-2"}),g=`<span class="font-kdExp ml-1 text-kd12px16px text-global-highTitle ">${t.name}</span>`,x=`<span class="font-kdExp ml-1 text-kd12px18px text-global-highTitle text-opacity-65">${i}</span>`,d=c?`<span  class="text-kd12px14px text-global-highTitle text-opacity-45 rounded-kd4px bg-global-highTitle bg-opacity-6 px-1 ml-1 py-0.5">${c}</span>`:"";return`${t.icon}${g}${x}${p}${u}${d}${l}`},T=function(t){const e=b._hmt;if(e&&e.push&&j(e.push))return e.push(t)},P=new Proxy({},{get:function(t,e){const a=b._hmt;return"id"===e?a&&a[e]?a[e]:void 0:t.hasOwnProperty(e)?o(t,e):o(a,e)}});P.push=T,P.event=function(...t){const e=y("_trackEvent",t);return T(e)},P.click=(...t)=>P.event(...t);export{O as a,w as c,_ as e,P as h};
