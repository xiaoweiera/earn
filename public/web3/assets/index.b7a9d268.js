import{_ as e}from"./index.4668723f.js";import{d as s,ab as a,e as t,bi as n,f as o,Z as i,o as c,c as r,b as l,P as u,t as p,A as f,aG as d,b0 as m}from"./app.c3012526.js";const v={class:"mr-1 select-none"},y=s({props:{title:{type:String,default:()=>""},name:{type:String,default:()=>""},sort:{type:String,default:()=>"",validator:e=>!!a(e)||("asc"===e||"desc"===e)}},emits:["change"],setup(s,{emit:a}){const y=s,g=t(""),x=n("setSortGroup"),S=n("getSortGroup");o((function(){if(x&&i(x)){x((function(){g.value=""}))}g.value=y.sort}));const b=()=>{const e=(s=g.value)&&"asc"===s?"":s&&"desc"===s?"asc":"desc";var s;if(S&&d((function(e){e&&i(e)&&e()}),S.value),g.value=e,y.name){const s={};m(s,"sort_field",y.name),m(s,"sort_type",e),a("change",s)}else a("change",{sort:e})};return(a,t)=>{const n=e;return c(),r("div",{class:"flex items-center cursor-pointer",onClick:b},[l("div",v,[u(a.$slots,"default",{},(()=>[l("span",null,p(s.title),1)]))]),"asc"===g.value?(c(),f(n,{key:0,type:"icon-paixu-shang",size:"15"})):"desc"===g.value?(c(),f(n,{key:1,type:"icon-paixu-xia",size:"15"})):(c(),f(n,{key:2,type:"icon-paixu",size:"15"}))])}}});export{y as _};