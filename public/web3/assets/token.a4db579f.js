import{aM as a,M as t,v as s,aC as n,J as r}from"./app.46fe480c.js";import{b as o,D as e,v as c}from"./dapp.f9c88518.js";import"./interface.812a3c85.js";import"./lodash.6b1417a0.js";import{t as p}from"./selectTag.4b4be7a4.js";const i=async function(r){const e=await o({symbol_type:r}),c=a((function(a,o){const e=t(a,"category[0]");return Object.assign({},a,{href:s({path:"token"===r?n.apyToken:n.apyLp,query:{symbol:a.name,category:e||""}})})}),e);return p.value=c,c},f=function(a){return e({name:a})},m=function(a){return i(a)},u=function(a){return r(c(a))};export{f as a,i as b,u as g,m as r};
