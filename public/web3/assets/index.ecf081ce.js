import{$ as a,a0 as t,a1 as e,a2 as s,e as r,a3 as o,a4 as n,y as l,a5 as i,k as c,a6 as u,a7 as p,a8 as h}from"./app.c3012526.js";var m,d,g=Number.isInteger||function(a){return a<<0===a},y=a((function(a,e){var s=a<0?e.length+a:a;return t(e)?e.charAt(s):e[s]})),f=a((function(a,t){return a.map((function(a){for(var e,s=t,r=0;r<a.length;){if(null==s)return;e=a[r],s=g(e)?y(e,s):s[e],r+=1}return s}))})),w=a((function(a,t){return f([a],t)[0]})),v=a((function(a,t){return w([a],t)})),x=e((function(a,t,e){var s=a(t),r=a(e);return s<r?-1:s>r?1:0})),_=e((function(a,t,e){var s=a(t),r=a(e);return s>r?-1:s<r?1:0}));(d=m||(m={})).summary="api/apy/whale/summary",d.hotAddress="/api/apy/whale/hot_address",d.followHotAddress="/api/apy/whale/traced_address",d.following="/api/apy/whale/trace_address",d.changeAddress="/api/apy/whale/address_change",d.followChangeAddress="/api/apy/whale/traced_address_change",d.addressInfo="/api/apy/whale/address",d.payInfo="/api/apy/whale/address_tx",d.myTag="/api/apy/whale/my_tag",d.tagList="/api/apy/whale/tag_list",d.myTagList="/api/apy/whale/my_tag_list";const b=async()=>await s({url:m.summary,method:"get"}),A=async a=>await s({url:m.hotAddress,params:a,method:"get"}),I=async a=>s({url:m.followHotAddress,params:a,method:"get"}),S=async a=>await s({url:m.changeAddress,params:a,method:"get"}),k=async a=>await s({url:m.followChangeAddress,params:a,method:"get"}),H=async a=>await s({url:m.addressInfo,params:a,method:"get"}),$=async a=>await s({url:m.payInfo,params:a,method:"get"}),C=async(a,t)=>s({url:m.following,data:{address:a,state:t},method:"post"}),O=async a=>s({url:m.myTag,data:a,method:"post"}),E=a=>{const t=[],e=[];return i((s=>{const r=s.timestamp,o=c(r);if(!e.includes(o)){const s=u((a=>o===c(a.timestamp)),a);e.push(o),t.push(s)}}),a),t},L=(a,t)=>{if(0===a.length)return a.concat(t);if(t.length>0){if(c(t[0][0].timestamp)===c(a[a.length-1][0].timestamp)){const e=a.splice(a.length-1,1),s=t.splice(0,1),r=[e[0].concat(s[0])];return a.concat(r,t)}return a.concat(t)}},N=a=>a?42===a.length?l(a):a:"-",T={Ethereum:"https://etherscan.io/tx/",BSC:"https://bscscan.com/tx/",HECO:"https://hecoinfo.com/tx/",xDai:"https://blockscout.com/xdai/mainnet/tx/",Polygon:"https://polygonscan.com/tx/",Fantom:"https://ftmscan.com/tx/",OEC:"https://www.oklink.com/oec/tx/",Avalanche:"https://explorer.avax.network/tx/",Optimism:"https://optimistic.etherscan.io/tx/",Arbitrum:"https://arbiscan.io/tx/",Celo:"https://explorer.celo.org/tx/",Moonriver:"https://moonriver.moonscan.io/tx/",Boba:"https://blockexplorer.boba.network/tx/"},J=(a,t)=>T[t]?T[t]+a:null,j=(a,t,e)=>"desc"===t?o(_(v(a)),e):"asc"===t?o(x(v(a)),e):e,B=async a=>{let t;return t="my"===a?await(async()=>await s({url:m.myTagList,method:"get"}))():await(async()=>await s({url:m.tagList,method:"get"}))(),t},q=(a,t)=>{var e;const s=null==(e=p.value)?void 0:e.browser_url;if(s){const e=s.find((t=>t.chain===a));if(e)return"Celo"===e.chain?e.url.replace("token",t):`${e.url}${t}`}},D=(a,t)=>{var e;const s=null==(e=p.value)?void 0:e.market_url;if(s){const e=s.find((t=>t.chain===a));if(e){const s="Ethereum"===e.chain?"eth":a;return e.url.indexOf("dex.guru")>=0?`${e.url}${t}-${s}`:`${e.url}${h(a)}/${t}`}}},F=r([]),M=()=>{if(localStorage.getItem("portfolioHistory")&&"null"!==localStorage.getItem("portfolioHistory")){const a=JSON.parse(null==localStorage?void 0:localStorage.getItem("portfolioHistory"));return a.length>2?(localStorage.setItem("portfolioHistory",null),[]):(F.value=a,a)}return[]},P=a=>{let t=!1;n((e=>{e.id===a.id&&(t=!0)}),F.value),t||(F.value.length>0?F.value=[a,F.value[0]]:F.value=[a],localStorage.setItem("portfolioHistory",JSON.stringify(F.value)))},z=a=>{F.value.length>0&&(F.value=F.value.filter((t=>t.id!==a)),localStorage.setItem("portfolioHistory",JSON.stringify(F.value)))};export{A as a,b,B as c,N as d,J as e,C as f,I as g,k as h,S as i,q as j,z as k,P as l,D as m,$ as n,E as o,F as p,L as q,H as r,j as s,M as t,O as u};